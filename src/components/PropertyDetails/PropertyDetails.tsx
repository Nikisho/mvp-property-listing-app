import React from 'react';
import styles from './PropertyDetails.module.css';

interface PropertyDetailsProps {
    id: number;
    title: string;
    price_pcm: number;
    description: string;
}

function clickMe(){
    alert('You clicked me!');
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({
    title,
    price_pcm,
    description
}) => {
    return (
        <div className={styles['property-details']}>
            <span className={styles['title']}>{title}</span>
            <span className={styles['price']}>£{price_pcm}</span>
            <p className={styles['description-wrapper']}>{description}</p>
            <div className={styles['btn-wrapper']}>
                <button onClick={clickMe} className={`${styles['btn']} ${styles['outline']}`}>
                    Speak to Landlord
                </button>
                <button onClick={clickMe} className={styles['btn']}>
                    Apply for Property
                </button>
            </div>
        </div>
    )
}

export default PropertyDetails;