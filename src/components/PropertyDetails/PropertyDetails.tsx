import React from 'react';
import styles from './PropertyDetails.module.css';

interface PropertyDetailsProps {
    id: string;
    title: string;
    price: number;
    description: string;
}

function clickMe(){
    alert('You clicked me!');
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({
    id,
    title,
    price,
    description
}) => {
    return (
        <div className={styles['property-details']}>
            <span className={styles['title']}>{title}</span>
            <span className={styles['price']}>£{price.toFixed(2)}</span>
            <p>{description}</p>
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