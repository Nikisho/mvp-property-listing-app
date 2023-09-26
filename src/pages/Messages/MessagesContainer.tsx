import React, { useEffect, useState } from 'react'
import { supabase } from '../../../supabase';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../context/navSlice';

interface MessagesContainerProps {
    room_id: number;
    isLoading: boolean;
};
interface MessagesProps {
    message_id: number;
    room_id: number;
    content: string;
    user_id: number;
};

const MessagesContainer: React.FC<MessagesContainerProps> = ({
    room_id,
    isLoading
}) => {
    const [messages, setMessages] = useState<MessagesProps[]>();
    const user = useSelector(selectCurrentUser);

    const fetchMessages = async () => {
        if (!room_id) return;
        const { error, data } = await supabase
            .from('messages')
            .select()
            .eq('room_id', room_id)
        if (error) console.error(error.message);
        setMessages(data!)
    };

    useEffect(() => {
        fetchMessages();
    }, [room_id, isLoading]);

    return (
        <div className='h-full px-3 py-1 overflow-y-auto'>
            {
                messages?.map((message) => (
                    <div key={message.message_id} className={`flex ${ user.technicalKey === message.user_id && 'justify-end'}`}>
                        <div className={`p-2 m-1 rounded-xl w-fit ${ user.technicalKey === message.user_id ? 'bg-blue-100' :'bg-white '}`}>
                            {message.content}
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default MessagesContainer