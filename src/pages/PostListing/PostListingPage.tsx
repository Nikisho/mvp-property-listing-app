import React, { useState } from 'react'
import { useMultistepForm } from '../../hooks/useMultistepForm'
import { Header } from '../../components'
import PropertyTypeForm from './PropertyTypeForm'
import AddressForm from './AddressForm'
import UploadImagesForm from './UploadImagesForm'
import NumberOfRoomsForm from './NumberOfRoomsForm'
import CostForm from './CostForm'
import AmenitiesForm from './AmenitiesForm'
import DescriptionForm from './DescriptionForm'
import { supabase } from '../../../supabase'
import { uuidv4 } from '../../utils/uuidv4'
import LoadingComponent from '../../components/LoadingComponent'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../../context/navSlice'
import { UserMetadata } from '@supabase/supabase-js'
import { Option } from 'react-google-places-autocomplete/build/types'

interface FormData {
    address: Option | null;
    numberOfRooms: string;
    numberOfBathrooms: string;
    costOfRoom: string;
    deposit: string;
    billsIncluded: string;
    roomDescription: string;
    adTitle: string;
    propertyType: string;
    ImageFiles: File[];
    ImageFilesURL: string[];
    livingRoom: string;
    wifi: string;
    parking: string;
    terraceOrBalcony: string;
    gardenOrPatio: string;
    disabledAccess: string;
    washingMachine: string;
    garage: string;
}

const PostListingPage = () => {
    const user: UserMetadata = useSelector(selectCurrentUser);
    const [postButtonClicked, setPostButtonClicked] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        address: null ,
        numberOfRooms: '',
        numberOfBathrooms: '',
        costOfRoom: '',
        deposit:'',
        billsIncluded: '',
        roomDescription: '',
        adTitle:'',
        propertyType: '',
        ImageFiles: [],
        ImageFilesURL: [],
        livingRoom: 'No',
        wifi: 'No',
        parking: 'No',
        terraceOrBalcony: 'No',
        gardenOrPatio: 'No',
        disabledAccess: 'No',
        washingMachine: 'No',
        garage: 'No',
    });

    function updateFields(fields: Partial<FormData>) {
        setFormData(prev => {
            return { ...prev, ...fields }
        })
    };

    const {
        steps,
        currentStepIndex,
        step,
        isFirstStep,
        isLastStep,
        next,
        back
    } = useMultistepForm(
        [
            <PropertyTypeForm {...formData} updateFields={updateFields} />,
            <NumberOfRoomsForm {...formData} updateFields={updateFields}  />,
            <AddressForm  {...formData} updateFields={updateFields} />,
            <UploadImagesForm {...formData} updateFields={updateFields}/>,
            <CostForm {...formData} updateFields={updateFields}/>,
            <AmenitiesForm {...formData} updateFields={updateFields}/>,
            <DescriptionForm {...formData} updateFields={updateFields}/>
        ]);

    async function postListing() {
        const property_id: string = uuidv4(9);
        let imageUrls: { publicUrl: string; }[] = [];
        try {
            
            for (let i = 0; i < formData.ImageFiles.length; i++) {
                const { data, error } = await supabase
                .storage
                .from('listings')
                .upload(`${user.user.id}/${property_id}/image_${i}`, formData.ImageFiles[i])
                if (error) {
                    console.error(error);
                }
                if (data) {
                    const { data } = supabase
                    .storage
                    .from('listings')
                    .getPublicUrl(`${user.user.id}/${property_id}/image_${i}`);
                    if (data) {
                        imageUrls.push(data);
                    }
                }
            };

            const { error } = await supabase
            .from('listed_properties')
            .insert({
                ad_title: formData.adTitle,
                description: formData.roomDescription,
                price_pcm: formData.costOfRoom,
                address: formData.address,
                number_of_bedrooms: formData.numberOfRooms,
                number_of_bathrooms: formData.numberOfBathrooms,
                image_arr: imageUrls,
                pm_user_uid: user.user.id,
                pm_user_id: user.technicalKey,
                bills_included: formData.billsIncluded,
                deposit: formData.deposit,
                property_type: formData.propertyType,
                living_room: formData.livingRoom,
                wifi_included: formData.wifi,
                parking: formData.parking,
                terrace_or_balcony: formData.terraceOrBalcony,
                garden_or_patio: formData.gardenOrPatio,
                disabled_access: formData.disabledAccess,
                washing_machine: formData.washingMachine,
                garage: formData.garage
            });
        if (error) {
            console.error(error);
        };
        setPostButtonClicked(true);

		} catch (err: any) {
			console.error(err);
		}
    };
        
    function onSubmit(e: React.MouseEvent<HTMLFormElement>) {
        e.preventDefault();
        if(!formData.address && currentStepIndex === 2 ) {
            alert('Please enter a location');
            return
        }
        if (!isLastStep) {
            return next();
        }
        postListing();
    }

    if (postButtonClicked) {
		return (
			<LoadingComponent />
		)
	}

    return (
        <div className='space-y-3 '>
            <Header />
            <form className='flex justify-center 
                                
                            h-screen' 
                    onSubmit={onSubmit}>
                <div className='flex-col  justify-between p-3 rounded-xl shadow-lg
                                w-full
                                lg:w-1/2
                                xl:w-1/2 xl:h-3/4 flex 
                '>
                    {step}
                    <div className=' flex justify-between '>
                        <div className='flex p-2'>
                            Step {currentStepIndex + 1} / {steps.length}
                        </div>
                        <div className='space-x-2'>

                            {!isFirstStep && <button className='rounded-sm bg-blue-300 px-2 py-1'
                                onClick={back}>
                                Back
                            </button>}
                            <button className='rounded-sm bg-blue-300 px-2 py-1' type='submit'
                                >
                                {isLastStep ? "Post Ad" : "Next"}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default PostListingPage