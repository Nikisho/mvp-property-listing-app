import { useEffect, useState } from 'react';
import ListingCard from './ListingCard';
import { supabase } from '../../../supabase';
import convertUrlsToJSON from '../../utils/convertUrlsToJSON';
import { useParams } from 'react-router-dom';

interface PropertyDetailsProps {
	property_id: number;
	ad_title: string
	image_url: string,
	price_pcm: number
	create: number,
	image_arr: string[]
};

function Listing() {
	const {lat, lng, radius, min_price, max_price, min_room, max_room} = useParams();
	const [listed_properties, setListedProperties] = useState<PropertyDetailsProps[]>([]);
	const getListedProperties: VoidFunction = async () => {

		const { data, error } = await supabase.rpc('query_location',{
			queried_lat: lat,
			queried_lng: lng,
			range: radius,
			min_room: min_room,
			max_room: max_room,
			min_price: min_price,
			max_price: max_price
		});

		setListedProperties(data!);
		if (error) {
			console.error(error.message);
		}
	};

	useEffect(() => {
		getListedProperties();
	}, []);

	return (
		<div className=' p-2 grid place-items-center '>
			<div className=' grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 justify-between xl:w-3/5 w-full'>
				{listed_properties?.map((listing) =>
					<ListingCard
						key={listing.property_id}
						image_url={convertUrlsToJSON(listing?.image_arr[0]!)}
						ad_title={listing.ad_title}
						price_pcm={listing.price_pcm}
						property_id={listing.property_id}
					/>)}
			</div>
		</div>
	)
}

export default Listing;