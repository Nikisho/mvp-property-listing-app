import React from 'react'
import { currencyFormatter } from '../../utils/currencyFormat';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { supabase } from '../../../supabase';
interface UserListingsProps {
    image_url: string;
    ad_title: string;
    price_pcm: number;
    description: string;
    property_id: string;
}

const UserListingCard: React.FC<UserListingsProps> = ({
    image_url,
    ad_title,
    price_pcm,
    property_id,
}) => {

    //Delete the row corresponding to the listing in the postgres table. 
    const deleteListing = async () => {
        const { error } = await supabase
            .from('listed_properties')
            .delete()
            .eq('property_id', property_id)
        if (error) console.error(error.message);
        window.location.reload();
    };

    return (
        <div className='flex rounded-xl justify-between p-3 shadow-lg  max-h-32'>
            <div className='flex space-x-3'>
                <div>
                    <img
                        src={image_url}
                        className='rounded-lg h-24 w-32'
                    />
                </div>
                <div className='flex flex-col justify-between'>
                    <div className='text-xl font-semibold'>{ad_title}</div>
                    <div>{currencyFormatter('currency', 'GBP').format(price_pcm)}</div>
                </div>
            </div>
            <button className='hover:scale-95'
                onClick={deleteListing}
            >
                <DeleteOutlineIcon
                    color='error'
                />
            </button>
        </div>
    )
}

export default UserListingCard