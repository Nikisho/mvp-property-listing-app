import React, { SetStateAction, useEffect, useState } from 'react';
import ListingCard from './ListingCard';

interface PropertyDetails {
  property_id: number,
  description: string;
  image_url: string,
  price_pcm: number
  create: number,
  address: string
};

function Listing() {

  // const items: Array<string> = ['obj1', 'obj2', 'obj3', 'obj4', 'obj5', 'obj6'];
  const [listed_properties, setListedProperties] = useState<PropertyDetails[]>([])

  const  getListedProperties: VoidFunction = async ()  => {

    try {
      const response: Response = await fetch("http://localhost:5000/listed_properties");
      const json_data: Array<PropertyDetails> = await response.json(); 
      setListedProperties(json_data);

    } catch (error: any) {
      console.error(error.message);
    }
  }
  
  useEffect(() =>{
    getListedProperties();
  }, []);

  return (
    <div className=' p-2 grid place-items-center '>
      <div className=' grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 justify-between w-3/5'>
        {listed_properties.map((listing) =>
         <ListingCard 
            key={listing.property_id}
            image_url= {listing.image_url}
            description={listing.description}
            price_pcm={listing.price_pcm}
            address={listing.address}
        />)}
      </div>
    </div>
  )
}

export default Listing;