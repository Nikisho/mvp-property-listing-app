import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useSelector } from 'react-redux';
import { selectAvatarIcon } from '../../context/navSlice';

interface ChatBoxHeaderProps {
    imageUrl: string;
    name: string;
}
const ChatBoxHeader: React.FC<ChatBoxHeaderProps> = ({
    imageUrl,
    name
}) => {
    const avatarIcon = useSelector(selectAvatarIcon);
    return (
        <>
            <div className='flex bg-white p-2 border-b space-x-5 items-center'>
                {
                    imageUrl?

                        <img
                            src={imageUrl} onError={({ currentTarget }) => {
                                currentTarget.onerror = null; // prevents looping
                                currentTarget.src=avatarIcon;
                              }}
                            className='rounded-full h-10 w-10 contain'
                        />
                        :
                        <AccountCircleIcon
                            fontSize='large'
                            className='hover:opacity-20'
                            sx={{ fontSize: 45 }}
                        />
                }
                <div className='text-lg font-semibold'>{name}</div>
            </div>
        </>
    )
}

export default ChatBoxHeader