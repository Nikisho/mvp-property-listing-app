import React, { useEffect, useRef, useState } from 'react'
import { supabase } from '../../../supabase';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../context/navSlice';
import { ApplicationCard } from '../../components/ApplicationCard/ApplicationCard';

interface MessagesContainerProps {
    room_id: number;
    isLoading: boolean;
};
interface MessagesProps {
    message_id: number;
    room_id: number;
    content: string;
    sender_id: number;
};
interface ApplicationCardProps {
    gender: string;
    employment_status: string;
    start_date: Date;
    length_of_stay: number;
    parking: boolean;
    pets: boolean;
    salary_range: string;
    budget: number;
}
const MessagesContainer: React.FC<MessagesContainerProps> = ({
    room_id,
    isLoading
}) => {
    const [messages, setMessages] = useState<MessagesProps[]>();
    const [applicationData, setApplicationData] = useState<ApplicationCardProps>();
    const user = useSelector(selectCurrentUser);
    const messagesEndRef = useRef<null | HTMLDivElement>(null)
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    };
    
    const fetchMessages = async () => {
        if (!room_id) return;
        
        const { error, data } = await supabase
            .from('messages')
            .select()
            .eq('room_id', room_id)
            .order('created_at', { ascending: true })
        if (error) console.error(error.message);
        setMessages(data!)
    };

    const fetchApplication = async (id: number) => {
        const { error, data } = await supabase
            .from('tenancy_applications')
            .select()
            .eq('tenancy_id', id)
        if (error) console.error(error.message);
        setApplicationData(data![0])
    };

    const fetchTenancyId = async () => {
        const { error, data } = await supabase
            .from('rooms')
            .select('tenancy_id')
            .eq('room_id', room_id)
        if (error) console.error(error.message);
        fetchApplication(data![0].tenancy_id)
    };

    useEffect(() => {
        scrollToBottom()
        fetchTenancyId()
        fetchMessages();
    }, [room_id, isLoading]);

    return (
        <div className='h-full px-3 overflow-y-auto space-y-4 py-2 '>
            <ApplicationCard 
                gender={applicationData?.gender!}
                employmentStatus={applicationData?.employment_status!}
                startDate={applicationData?.start_date!}
                lengthOfStay={applicationData?.length_of_stay!}
                parking={applicationData?.parking!}
                pets={applicationData?.pets!}
                salaryRange={applicationData?.salary_range!}
                budget={applicationData?.budget!}
            />
            {
                messages?.map((message) => (
                    <div key={message.message_id} className={`flex ${ user.technicalKey === message.sender_id && 'justify-end'}`}>
                        <div className={`p-2 m-1 rounded-xl w-fit ${ user.technicalKey === message.sender_id ? 'bg-blue-100' :'bg-white '}`}>
                            {message.content}
                        <div ref={messagesEndRef} />
                            
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default MessagesContainer