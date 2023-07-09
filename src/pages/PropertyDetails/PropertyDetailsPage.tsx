import { useEffect, useState } from 'react'
import Gallary from '../../components/Gallary/Gallary';
import Header from '../../components/Header/Header';
import { useParams } from 'react-router-dom';
import { supabase } from "../../../supabase"
import { currencyFormatter } from '../../utils/currencyFormat';
import { PropertyManagerCard } from '../../components';
import { pushImagesToArray } from '../../utils/pushImagesToArray';
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
	image_arr: string
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
	const [listedImages, setListedImages] = useState<string[]>([]);

	const getListedProperty: VoidFunction = async () => {

		const { data, error } = await supabase
			.from('listed_properties')
			.select()
			.eq('property_id', `${property_id}`);

		const json_data: PropertyDetailsProps = data![0];
		
		const images: string[] = pushImagesToArray(json_data?.image_arr);
		setListedImages(images)
		setListedProperty(json_data);
		getPropManagerDetails(json_data.pm_user_id);
		if (error) {
			console.error(error);
		}
	};

	const getPropManagerDetails = async (pm_user_id: string) => {
		const { data, error } = await supabase
			.from("users")
			.select()
			.eq("user_id", `${pm_user_id}`)
		setPmDetails(data![0]);
		if (error) {
			console.error(error)
		}
	};
	const handleApplyButtonClick: VoidFunction = () => {
		const questionsLink: string = "https://docs.google.com/forms/d/e/1FAIpQLSdADoLJPZuPxUce3CnkwpBGa88fEDR1h7gnR86j1rPV5W5QCA/viewform?usp=sharing "
		window.open(questionsLink, "_blank");
	};

	useEffect(() => {
		getListedProperty();
	}, []);

	return (

		<div className='space-y-1 
		  				overflow-hidden
						md:space-y-2
						lg:space-y-5
						xl:space-y-5'>
			<Header />
			<div className='flex flex-col items-center p-5 
							lg:flex lg:justify-center
							xl:flex xl:justify-center'>

				<div className='space-y-5 w-full
								sm:w-2/3
								lg:p-3 lg:w-3/4
								 '>
					<div className='flex flex-col space-y-2
									md:flex md:flex-row md:space-x-12
									lg:space-x-10  
									xl:justify-center '>
						<Gallary images={listedImages} />
						{/* {property details} */}
						<div className='space-y-3 flex flex-col justify-center py-1
										md:w-1/2
										lg:w-1/2 lg:p-5
										xl:w-1/3 '>
							<div className='text-2xl font-bold'>
								{listedProperty?.address}
							</div>

							<div className='text-xl'>
								{currencyFormatter('currency', 'GBP').format(listedProperty?.price_pcm!)} pcm
							</div>
							<PropertyManagerCard
								pm_image_url={pmDetails?.image_url!}
								pm_name={pmDetails?.name!}
								pm_user_id={pmDetails?.user_id!}
							/>
							<div className='flex space-x-4'>
								<button onClick={handleApplyButtonClick} className='py-5 rounded-lg bg-blue-300 border-2 cursor-pointer border-gray-200 hover:border-blue-200 hover:bg-blue-400
																					w-full 
																					md:w-full
																					lg:w-full
																					xl:w-full
																					2xl:w-full'>
									Apply for Property
								</button>

							</div>

						</div>

					</div>
					{/* {further details} */}
					<div className='flex flex-col space-y-5 
									md:flex md:flex-row md:space-x-10
									lg:flex lg:flex-row lg:space-x-10 lg:space-y-2 lg:justify-between
									xl:justify-center xl:space-x-10 
									2xl:justify-center 2xl:flex 2xl:space-x-10'>
						{/* {description} */}
						<div className='space-y-3
										md:w-1/2 
										lg:w-1/2 
										xl:w-1/2 
										2xl:w-1/3'>

							<div className='text-2xl font-bold'>
								Description
							</div>
							<div className='text-md  whitespace-pre-wrap'>
								{listedProperty?.description!}
							</div>
						</div>
						<div className='font-semibold w-1/3'>
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