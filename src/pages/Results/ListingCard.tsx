import React from 'react'
import { useNavigate } from 'react-router-dom';
import { currencyFormatter } from '../../utils/currencyFormat';

interface PropertyDetailsProps {
  property_id: number;
	ad_title: string;
  image_url: string;
  price_pcm: number;
};

const ListingCard: React.FC<PropertyDetailsProps> = ({ image_url, price_pcm, property_id, ad_title }) => {

  const navigate = useNavigate();
  function handleClick() {
    navigate(`/rooms/${property_id}`);
  };

  return (
    <div className='m-3 bg-white hover:scale-95 space-y-1 transition shadow-lg p-2 rounded-lg'
      onClick={() => handleClick()}
    >
      <div>

        <img
          src={image_url}
          className='rounded-md h-60 xl:h-44 xl:w-full 2xl:w-full 2xl:h-64 w-full'
        />
      </div>

      <div className=''>
        <p className='text-md font-semibold'>{ad_title}</p>
        <p className='text-lg ' >{currencyFormatter('currency','GBP').format(price_pcm)} pcm</p>
      </div>

      {/* description */}
      {/* <div>
        <p className='truncate'>{description}</p>
      </div> */}

    </div>
  )
}

export default ListingCard