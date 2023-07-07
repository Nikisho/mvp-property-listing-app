import React from 'react';

interface GallaryProps {
  image: string;
}
const Gallary: React.FC<GallaryProps> = ({ image }) => {
  
  return (
    <div className=' w-full md:w-1/2'>
      <div className=''>
        <img className='rounded-lg w-full' src={image}/>
      </div>
    </div>
  )
}

export default Gallary;