import React from 'react'
import styles from '../../App.module.css';
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
    <React.Fragment>

    <div>
      <Header/>
      <section className={styles['property-details']}>
        <Gallary images={images} />
        <PropertyDetails
          id={"j938hgj"}
          title="Property Title"
          price={925}
          description="Brief Description: Here is a nice property. You will love it!"
        />
      </section>
    </div>

    Further Description here?

    </React.Fragment>
  )
}

export default PropertyDetailsPage