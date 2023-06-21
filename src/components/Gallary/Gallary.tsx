import React from 'react';

interface GallaryProps {
  image: string;
}
const Gallary: React.FC<GallaryProps> = ({ image }) => {
  
  return (
    <div className='flex justify-center w-full p-2 md:w-2/5'>
      <div className=''>
        <img className='rounded-xl' src={image}/>
      </div>
    </div>
  )
}

export default Gallary;