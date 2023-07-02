import { useEffect, useState } from 'react'
import Gallary from '../../components/Gallary/Gallary';
import PropertyDetails from '../../components/PropertyDetails/PropertyDetails';
import Header from '../../components/Header';
import { useParams } from 'react-router-dom';

interface PropertyDetailsProps {
	property_id: number;
	description: string;
	image_url: string;
	price_pcm: number;
	create: number;
	address: string;
	pm_firebase_uid: string;
};

interface pmDetailsProps {
	name: string;
	email: string;
	firebase_uid: string;
};

function PropertyDetailsPage() {
	const { id } = useParams();
	const [listedProperty, setListedProperty] = useState<PropertyDetailsProps>();
	const [pmDetails, setPmDetails] = useState<pmDetailsProps>();

	const getListedProperty: VoidFunction = async () => {

		try {
			const response = await fetch(`http://localhost:5000/listed_properties/${id}`)
			const json_data = await response.json();
			setListedProperty(json_data);
			getPropManagerDetails(json_data.pm_firebase_uid);
		} catch (error: any) {
			console.error(error.message);
		}

		console.log(pmDetails)
	};

	const getPropManagerDetails = async (pm_firebase_uid: string) => {
		try {
			const response = await fetch(`http://localhost:5000/users/${pm_firebase_uid}`)
			const json_data = await response.json();
			setPmDetails(json_data);
		} catch (error: any) {
			console.error(error.message);
		}
		console.log('first');
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
					pm_firebase_uid={pmDetails?.firebase_uid!}
				/>
			</section>
		</div>
	)
}

export default PropertyDetailsPage