import { Header } from '../../components'
import Sidebar from './Sidebar'
import ChatBox from './ChatBox'
import { Grow } from '@mui/material'
import { supabase } from '../../../supabase'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../../context/navSlice'
import { useEffect, useState } from 'react'

const MessagesPage = () => {
    const user = useSelector(selectCurrentUser);
    const [rooms, setRooms] = useState<{room_id: number}[]>();
    const fetchRoomID = async () => {
        const {data, error} = await supabase
            .from('participants')
            .select('room_id')
            .eq('user_id', user.technicalKey);
        if (error) console.error(error.message);
        if (data) {
            setRooms(data);
        }
    };

    useEffect(() => {
        fetchRoomID();
    },[]);

    return (
        <>
            <Grow timeout={2000} in>
                <div>
                    <Header />
                    <div className='flex my-5 mx-10 h-[420px] rounded-xl shadow-lg '>
                        <Sidebar 
                            rooms={rooms!}
                        />
                        <ChatBox />
                    </div>
                </div>
            </Grow>
        </>
    )
}

export default MessagesPage