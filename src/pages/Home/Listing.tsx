import { useEffect, useState } from 'react';
import ListingCard from './ListingCard';
import { supabase } from '../../../supabase';
import convertUrlsToJSON from '../../utils/convertUrlsToJSON';

interface PropertyDetailsProps {
	property_id: number,
	description: string;
	image_url: string,
	price_pcm: number
	create: number,
	address: string,
	image_arr: string[]
};

function Listing() {

	const [listed_properties, setListedProperties] = useState<PropertyDetailsProps[]>([]);
	const getListedProperties: VoidFunction = async () => {
		const { data, error } = await supabase
			.from('listed_properties')
			.select()
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
				{listed_properties.map((listing) =>
					<ListingCard
						key={listing.property_id}
						image_url={convertUrlsToJSON(listing?.image_arr[0]!)}
						description={listing.description}
						price_pcm={listing.price_pcm}
						address={listing.address}
						property_id={listing.property_id}
					/>)}
			</div>
		</div>
	)
}

export default Listing;