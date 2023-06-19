import React from 'react'
import { useNavigate } from 'react-router-dom';

function ListingCard({description, image_url, price_pcm, address}: any) {

  const navigate = useNavigate();
  function handleClick() {
    navigate("/PropertyDetails");
  };

  return (
    <div  className='m-3 bg-white rounded-xl hover:scale-95 space-y-1 transition'
          onClick={() => handleClick()}
    >
        <div>
          
          <img 
            src={image_url}
            className='rounded-xl'
          />
        </div>

        <div className=' flex justify-between'>
          <p className='text-lg font-bold'>{address}</p>
          <p className='text-md font-bold' >£{price_pcm}pcm</p>
        </div>


        {/* description */}
        <div>
          <p className='truncate'>{description}</p>
        </div>
      
    </div>
  )
}

export default ListingCard