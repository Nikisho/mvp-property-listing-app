import { useEffect, useState } from 'react'
import Gallary from '../../components/Gallary/Gallary';
import PropertyDetails from '../../components/PropertyDetails/PropertyDetails';
import Header from '../../components/Header';
import { useParams } from 'react-router-dom';

interface PropertyDetailsProps {
  property_id: number ;
  description: string;
  image_url: string;
  price_pcm: number;
  create: number;
  address: string;
};

function PropertyDetailsPage() {
  const { id } = useParams();
  const [listedProperty, setListedProperty] = useState<PropertyDetailsProps>();

  const getListedProperty: VoidFunction = async () => {

    try {
      const response = await fetch(`http://localhost:5000/listed_properties/${id}`)
      const json_data = await  response.json();
      setListedProperty(json_data);
      console.log(json_data);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getListedProperty();
  }, [])

  return (

    <div className='space-y-2'>
      <Header />
      <section className='flex space-x-10 p-5 justify-center'>
        <Gallary image={listedProperty?.image_url!} />
        <PropertyDetails
          id={listedProperty?.property_id!}
          title={"Room " + listedProperty?.address!}
          price_pcm={listedProperty?.price_pcm!}
          description={listedProperty?.description!}
        />
      </section>
    </div>
  )
}

export default PropertyDetailsPage