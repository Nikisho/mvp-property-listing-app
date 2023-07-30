import React from 'react'
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

interface PropertyManagerCardProps {
    pm_name: string;
    pm_image_url: string;
    pm_user_uid: string;
}
const PropertyManagerCard: React.FC<PropertyManagerCardProps> = ({
    pm_name,
    pm_image_url,
    pm_user_uid,
}) => {

    const navigate = useNavigate();
    function handleClick() {
        navigate(`/profilepage/${pm_user_uid}`);
    };

    return (
        <div>
            <button className='flex space-x-5 p-4 w-full items-center shadow-lg rounded-xl hover:opacity-80 my-2 hover:bg-gray-300' onClick={handleClick}>
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