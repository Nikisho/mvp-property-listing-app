import React from 'react';
import styles from './Gallary.module.css';

interface GallaryProps {
  image: string;
}
const Gallary: React.FC<GallaryProps> = ({ image }) => {
  
  return (
    <div className={styles['gallary']}>
      <div className='w-4/5'>
        <img className='rounded-xl hover:animate-pulse' src={image} />
      </div>
    </div>
  )
}

export default Gallary;