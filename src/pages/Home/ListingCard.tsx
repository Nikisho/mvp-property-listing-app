import React from 'react'
import { useNavigate } from 'react-router-dom';
import { currencyFormatter } from '../../utils/currencyFormat';

interface PropertyDetailsProps {
  property_id: number;
  description: string;
  image_url: string;
  price_pcm: number;
  address: string;
};

const ListingCard: React.FC<PropertyDetailsProps> = ({ description, image_url, price_pcm, address, property_id }) => {

  const navigate = useNavigate();
  function handleClick() {
    navigate(`/propertydetails/${property_id}`);
  };

  return (
    <div className='m-3 bg-white rounded-xl hover:scale-95 space-y-1 transition'
      onClick={() => handleClick()}
    >
      <div>

        <img
          src={image_url}
          className='rounded-lg xl:h-40 xl:w-60 2xl:w-80 2xl:h-60 w-full'
        />
      </div>

      <div className=''>
        <p className='text-lg font-bold'>{address}</p>
        <p className='text-md font-semibold' >{currencyFormatter('currency','GBP').format(price_pcm)} pcm</p>
      </div>

      {/* description */}
      <div>
        <p className='truncate'>{description}</p>
      </div>

    </div>
  )
}

export default ListingCard