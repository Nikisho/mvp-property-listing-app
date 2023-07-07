import { useEffect, useState } from 'react'
import Gallary from '../../components/Gallary/Gallary';
import Header from '../../components/Header/Header';
import { useParams } from 'react-router-dom';
import { supabase } from "../../../supabase"
import { uuidv4 } from '../../utils/uuidv4';
import { currencyFormatter } from '../../utils/currencyFormat';
import { PropertyManagerCard } from '../../components';
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

	const handleApplyButtonClick: VoidFunction = () => {
		const questionsLink: string = "https://docs.google.com/forms/d/e/1FAIpQLSdADoLJPZuPxUce3CnkwpBGa88fEDR1h7gnR86j1rPV5W5QCA/viewform?usp=sharing "
		window.open(questionsLink, "_blank");
	};

	useEffect(() => {
		getListedProperty();
	}, [])

	return (

		<div className='space-y-5 '>
			<Header />
			<div className='flex justify-center'>

				<div className='w-3/4 space-y-5'>
					<div className='flex  md:flex md:flex-row space-x-12'>
						<Gallary image={listedProperty?.image_url!} />
						{/* {property details} */}
						<div className='space-y-3 rounded-lg shadow-lg flex flex-col justify-center p-5 2xl:w-1/3 w-1/2'>
							<div className='text-2xl font-bold'>
								{listedProperty?.address}
							</div>

							<div className='text-xl'>
								{currencyFormatter('currency', 'GBP').format(listedProperty?.price_pcm!)}
							</div>
							<PropertyManagerCard
								pm_image_url={pmDetails?.image_url!}
								pm_name={pmDetails?.name!}
								pm_user_id={pmDetails?.user_id!}
							/>
							<div className='flex space-x-4'>
								<button onClick={handleApplyButtonClick} className='cursor-pointer w-2/3 py-5 rounded-lg bg-blue-300 border-2 border-gray-200 hover:border-blue-200 hover:bg-blue-400'>
									Apply for Property
								</button>

							</div>

						</div>

					</div>
					{/* {further details} */}
					<div className='flex space-x-10 '>
						{/* {description} */}
						<div className='md:w-1/2 w-full 2xl:w-1/3 lg:w-1/2'>

							<div className='text-2xl font-bold'>
								Description
							</div>
							<div className='text-md'>
								{listedProperty?.description!}
							</div>
						</div>
						<div className='font-semibold w-1/2'>
							<div className='text-xl'>
								Amenities
							</div>
							<div>
								Bedrooms: {listedProperty?.number_of_bathrooms!}
							</div>
							<div>
								Bathrooms: {listedProperty?.number_of_bedrooms!}
							</div>
						</div>
					</div>

				</div>
			</div>
		</div>
	)
}
export default PropertyDetailsPage