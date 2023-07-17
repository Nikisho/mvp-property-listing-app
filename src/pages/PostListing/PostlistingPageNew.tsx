import React, { useState } from 'react'
import { useMultistepForm } from '../../hooks/useMultistepForm'
import { Header } from '../../components'
import PropertyTypeForm from './PropertyTypeForm'
import AddressForm from './AddressForm'
import UploadImagesForm from './UploadImagesForm'
import NumberOfRoomsForm from './NumberOfRoomsForm'

interface FormData {
    address: string;
    numberOfRooms: number;
    numberOfBathrooms: number;
    costOfRoom: number;
    roomDescription: string;
    propertyType: string;
}

const PostlistingPageNew = () => {

    const [formData, setFormData] = useState<FormData>({
        address: '',
        numberOfRooms: 0,
        numberOfBathrooms: 0,
        costOfRoom: 0,
        roomDescription: '',
        propertyType: ''
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
            <NumberOfRoomsForm />,
            <AddressForm  {...formData} updateFields={updateFields} />,
            <UploadImagesForm />
        ]);

    function onSubmit(e: React.MouseEvent) {
        e.preventDefault();
        if (!isLastStep) {
            return next();
        }
        alert('Posted');
    }
    console.log(formData.propertyType)
    return (
        <div className='space-y-3'>
            <Header />
            <form className='flex justify-center h-screen'>
                <div className=' w-1/2 h-3/4 flex  flex-col  justify-between  p-3 rounded-xl shadow-lg '>

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
                            <button className='rounded-sm bg-blue-300 px-2 py-1'
                                onClick={onSubmit}>
                                {isLastStep ? "Post Ad" : "Next"}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default PostlistingPageNew