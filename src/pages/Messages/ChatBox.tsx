import ChatBoxHeader from './ChatBoxHeader'
import { useSelector } from 'react-redux'
import { selectRoom } from '../../context/navSlice'
import MessagesContainer from './MessagesContainer';
import InputBox from './InputBox';
import { useState } from 'react';

const ChatBox = () => {
    const room = useSelector(selectRoom);
    const [isLoading, setIsLoading] = useState(false);

    if (!room.id) return (
        <div className='flex justify-center border items-center w-full h-full'>
            <div>
                <i>Select a conversation.</i>
            </div>
        </div>
    )
    return (
        <> 
            <div className='xl:w-2/3 h-full border bg-gray-100 flex flex-col'>
                <ChatBoxHeader 
                    key={room.id}
                    name={room.recipient}
                    imageUrl={room.imageUrl}
                />
                <MessagesContainer room_id={room.id} isLoading={isLoading}/>
                <InputBox room_id={room.id} 
                    setIsloading={setIsLoading}
                />
            </div>
        </>
    )
}

export default ChatBox