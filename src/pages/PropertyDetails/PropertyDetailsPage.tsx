import React from 'react'
import Gallary from '../../components/Gallary/Gallary';
import PropertyDetails from '../../components/PropertyDetails/PropertyDetails';
import Header from '../../components/Header';

function PropertyDetailsPage() {

  const images = [
    '/images/image_01.jpg',
    '/images/image_02.jpg',
    '/images/image_03.jpg',
    '/images/image_04.jpg',
    '/images/image_05.jpg',
  ];
  return (

    <div className='space-y-2'>
      <Header/>
      <section className='flex space-x-10 p-5 justify-center'>
        <Gallary images={images} />
        <PropertyDetails
          id={"j938hgj"}
          title="Property Title"
          price={925}
          description="Brief Description: Here is a nice property. You will love it!"
        />
      </section>
    </div>
  )
}

export default PropertyDetailsPage