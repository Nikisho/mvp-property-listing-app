import { Header } from '../../components'
import Sidebar from './Sidebar'
import ChatBox from './ChatBox'
import { Grow } from '@mui/material'
import { supabase } from '../../../supabase'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../../context/navSlice'
import { useEffect, useState } from 'react'
import ChatTabs from './ChatTabs'

const MessagesPage = () => {
    const user = useSelector(selectCurrentUser);
    const [rooms, setRooms] = useState<{ room_id: number }[]>();
    const fetchRoomID = async () => {
        const { data, error } = await supabase
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
    }, []);

    return (
        <>
            <Grow timeout={2000} in>
                <div>
                    <Header />
                    <div className='flex justify-center bg-gray-300'>

                        <div className='bg-white rounded-xl shadow-lg 
                                        h-screen
                                        xl:h-[420px] xl:my-5 xl:mx-10 
                                        w-full 2xl:h-[790px] hidden xl:flex'>

                            <Sidebar
                                rooms={rooms!}
                            />
                            <ChatBox />
                        </div>
                        <div className='xl:hidden w-full'>

                            <ChatTabs
                                rooms={rooms!}
                            />
                        </div>
                    </div>
                </div>
            </Grow>
        </>
    )
}

export default MessagesPage