import { useEffect, useState } from 'react'
import Gallary from '../../components/Gallary/Gallary';
import PropertyDetails from '../../components/PropertyDetails/PropertyDetails';
import Header from '../../components/Header/Header';
import { useParams } from 'react-router-dom';
import { supabase } from "../../../supabase"
import { uuidv4 } from '../../utils/uuidv4';
interface PropertyDetailsProps {
	property_id: number;
	description: string;
	image_url: string;
	price_pcm: number;
	create: number;
	address: string;
	pm_user_id: string;
	number_of_bedrooms: string;
    number_of_bathrooms: string;
};

interface pmDetailsProps {
	name: string;
	email: string;
	user_id: string;
	image_url: string;
};

function PropertyDetailsPage() {
	const { property_id } = useParams();
	const [listedProperty, setListedProperty] = useState<PropertyDetailsProps>();
	const [pmDetails, setPmDetails] = useState<pmDetailsProps>();
	console.log(uuidv4(9))
	const getListedProperty: VoidFunction = async () => {
	
		try {
			const { data, error } = await supabase
				.from('listed_properties')
				.select()
				.eq('property_id', `${property_id}`);
				
			const json_data: PropertyDetailsProps = data![0];
			setListedProperty(json_data);
			getPropManagerDetails(json_data.pm_user_id);
		} catch (error: any) {
			console.error(error.message);
		}
	};

	const getPropManagerDetails = async (pm_user_id: string) => {
		try {
			const { data, error } = await supabase
				.from("users")
				.select()
				.eq("user_id", `${pm_user_id}`)
			setPmDetails(data![0]);
		} catch (error: any) {
			console.error(error.message);
		}
	};

	useEffect(() => {
		getListedProperty();
	}, [])

	return (

		<div className='space-y-2 '>
			<Header />
			<section className='flex space-x-10 p-5 justify-center grid grid-cols-1 md:flex md:flex-row'>
				<Gallary image={listedProperty?.image_url!} />
				<PropertyDetails
					id={listedProperty?.property_id!}
					title={listedProperty?.address!}
					price_pcm={listedProperty?.price_pcm!}
					description={listedProperty?.description!}
					pm_name={pmDetails?.name!}
					pm_user_id={pmDetails?.user_id!}
					pm_image_url={pmDetails?.image_url!}
					number_of_bathrooms={listedProperty?.number_of_bathrooms!}
					number_of_bedrooms={listedProperty?.number_of_bedrooms!}
				/>
			</section>
		</div>
	)
}

export default PropertyDetailsPage