import React, { useEffect, useState } from 'react'
import { supabase } from '../../../supabase';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../context/navSlice';

interface MessagesContainerProps {
    room_id: number
};
interface MessagesProps {
    id: number;
    room_id: number;
    content: string;
    user_id: number;
};

const MessagesContainer: React.FC<MessagesContainerProps> = ({
    room_id
}) => {
    const [messages, setMessages] = useState<MessagesProps[]>();
    const user = useSelector(selectCurrentUser);

    const fetchMessages = async () => {
        const { error, data } = await supabase
            .from('messages')
            .select()
            .eq('room_id', room_id)
        if (error) console.error(error.message);
        console.log(data, 'hey')
        setMessages(data!)
    };

    useEffect(() => {
        fetchMessages();
    }, [room_id]);

    return (
        <div className='h-full px-3 py-1 overflow-y-auto'>
            {
                messages?.map((message) => (
                    <div className={`flex ${ user.technicalKey === message.user_id && 'justify-end'}`}>
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