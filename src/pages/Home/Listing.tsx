import React, { SetStateAction, useEffect, useState } from 'react';
import ListingCard from './ListingCard';

interface PropertyDetails {
  property_id: number,
  description: string;
  image_url: string,
  create: number,
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
      <div className=' grid grid-cols-3 justify-between w-3/5'>
        {listed_properties.map((listing) => <ListingCard listing={listing.description}/>)}
      </div>
    </div>
  )
}

export default Listing;