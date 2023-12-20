import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectAvatarIcon, selectCurrentUser, selectMessages, setMessages, setRoom } from '../../context/navSlice';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { supabase } from '../../../supabase';

interface ChatWidgetProps {
    room_id: number;
}
interface RecipientProps {
    image_url: string
    name: string;
}
const ChatWidget: React.FC<ChatWidgetProps> = ({ room_id }) => {
    const user = useSelector(selectCurrentUser);
    const messages = useSelector(selectMessages);
    const avatarIcon = useSelector(selectAvatarIcon);

    const [recipient, setRecipient] = useState<RecipientProps>();
    const dispatch = useDispatch();

    const fetchRecipientData = async (id: number) => {
        const { data, error } = await supabase
            .from('users')
            .select()
            .eq('user_id', id)
        if (error) console.error(error.message);
        if (data) setRecipient(data[0]!)
    }
    const fetchRecipient = async () => {
        const { data, error } = await supabase
            .from('participants')
            .select('user_id')
            .eq('room_id', room_id)
            .neq('user_id', user.technicalKey);
        if (error) console.error(error.message);
        if (data) {
            fetchRecipientData(data[0].user_id);
        }
    }

    const handleClick = () => {
        dispatch(setRoom({
            id: room_id,
            imageUrl: recipient?.image_url,
            recipient: recipient?.name
        }))
    };
    const checkReadStatus = (room_id: number) => {
        if (!(messages.filter((message: { room_id: number, isRead: boolean }) => message.room_id === room_id && message.isRead === false).length > 0)) {
            return false;
        }
        return true;
    };
    

    const updateIsReadStatus = async () => {
        let messagesEditable = [...messages]
        const objIndex = messages.findIndex(((message: { room_id: number }) => message.room_id === room_id));
        messagesEditable[objIndex] = {
            isRead: true,
            room_id: room_id,
        };

        dispatch(setMessages(messagesEditable))

        const { error } = await supabase
            .from('messages')
            .update({
                isRead: true
            })
            .eq('room_id', room_id)
            .eq('receiver_id', user.technicalKey)

        if (error) { 
            console.error(error.message);
        }
    };

    useEffect(() => {
        fetchRecipient();
    }, []);

    return (
        <div onClick={updateIsReadStatus}>

            <div className={`flex p-2 h-20 border-b hover:bg-gray-100 items-center justify-between px-5`} key={room_id}
                onClick={() => handleClick()}
            >
                <div className='flex space-x-5 items-center '>
                    <div>
                        {
                            recipient?.image_url ?
                                <img
                                    src={recipient.image_url} onError={({ currentTarget }) => {
                                        currentTarget.onerror = null; // prevents looping
                                        currentTarget.src=avatarIcon;
                                      }}
                                    className='rounded-full h-10 w-10'
                                />
                                :
                                <AccountCircleIcon
                                    sx={{ fontSize: 45 }}
                                    className='hover:opacity-20'
                                />
                        }
                    </div>
                    <div className='text-lg'>
                        {recipient?.name}
                    </div>
                </div>
                {checkReadStatus(room_id) && (
                    <div className=' p-1.5 justify-end bg-red-600 rounded-full animate-bounce '>

                    </div>
                )
                }
            </div>

        </div>
    )
}

export default ChatWidget