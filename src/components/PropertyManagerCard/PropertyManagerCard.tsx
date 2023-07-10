import React from 'react'
// import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

interface PropertyManagerCardProps {
    pm_name: string;
    pm_image_url: string;
    pm_user_id: string;
}
const PropertyManagerCard: React.FC<PropertyManagerCardProps> = ({
    pm_name,
    pm_image_url,
    pm_user_id,
}) => {
    console.log(pm_user_id)
    return (
        <div>
            <button className='flex space-x-5 p-4 w-full items-center shadow-lg rounded-xl my-2'>
                {
                    (pm_image_url) ?
                        <img
                            src={pm_image_url}
                            className='rounded-full h-12'
                        />
                        :
                        <AccountCircleIcon
                            fontSize='large'
                            className='hover:opacity-20'
                        />
                }

                <div className='text-xl font-bold'>
                    <text>{pm_name}</text>
                    <div className='flex space-x-2'>
                        {/* <text>4.5</text> */}
                        <div>
                            {/* <StarIcon
                            fontSize='medium'
                            color='secondary'
                            className='mb-1'
                        /> */}
                        </div>
                    </div>
                </div>
            </button>

        </div>
    )
}

export default PropertyManagerCard