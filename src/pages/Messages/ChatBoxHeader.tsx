import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

interface ChatBoxHeaderProps {
    imageUrl: string;
    name: string;
}
const ChatBoxHeader: React.FC<ChatBoxHeaderProps> = ({
    imageUrl,
    name
}) => {
    return (
        <>
            <div className='flex bg-white p-2 border-b space-x-5 items-center'>
                {
                    imageUrl?

                        <img
                            src={imageUrl}
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