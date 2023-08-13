import React from 'react'
import { currencyFormatter } from '../../utils/currencyFormat'
// import NotificationsIcon from '@mui/icons-material/Notifications';
interface UserListingsProps {
    image_url: string;
    ad_title: string;
    price_pcm: number;
    description: string;
}

const UserListingCard: React.FC<UserListingsProps> = ({
    image_url,
    ad_title,
    price_pcm,
    description
}) => {
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
                    {/* <div>
                        <NotificationsIcon
                            fontSize='small'
                            className=' animate-bounce'
                            style={{ color: 'red' }}
                        />
                    </div> */}
                </div>

            </div>

            <div className='flex flex-end justify-between w-1/2 text-ellipsis overflow-hidden '>
                <div></div>
                <div>{description}</div>
            </div>
        </div>
    )
}

export default UserListingCard