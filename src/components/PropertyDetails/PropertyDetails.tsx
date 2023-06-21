import React from 'react';
import styles from './PropertyDetails.module.css';
import StarIcon from '@mui/icons-material/Star';
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
            <span className={styles['price']}>£{price_pcm} pcm</span>
            <p className={styles['description-wrapper']}>{description}</p>
            <div className='flex space-x-5 p-4 shadow-lg rounded-xl hover:opacity-80 my-2'>
                <img 
                    src='https://images.pexels.com/photos/2380794/pexels-photo-2380794.jpeg?auto=compress&cs=tinysrgb&w=600'
                    className='rounded-full h-16'
                />
                <div className='text-xl font-bold'>
                    <text>Steve</text>
                    <div className='flex space-x-2'>
                        <text>4.5</text>
                        <div>
                        <StarIcon
                            fontSize='medium'
                            color='secondary'
                            className='mb-1'
                        />
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles['btn-wrapper']}>
                <button onClick={clickMe} className={`${styles['btn']} ${styles['outline']}`}>
                    Speak to Landlord
                </button>
                <button onClick={clickMe} className={styles['btn']}>
                    Apply for Property
                </button>
            </div>
            <div>
                {/* {Placeholder for more details} */}
            </div>
        </div>
    )
}

export default PropertyDetails;