import ChatBoxHeader from './ChatBoxHeader'
import { useSelector } from 'react-redux'
import { selectRoom } from '../../context/navSlice'
import MessagesContainer from './MessagesContainer';
import InputBox from './InputBox';

const ChatBox = () => {
    const room = useSelector(selectRoom);
    if (!room.id) return (
        <div className='flex justify-center h-2/3 items-center'>
            <div>
                <i>Select a conversation.</i>
            </div>
        </div>
    )
    return (
        <> 
            <div className='xl:w-2/3 h-full border-r bg-gray-100 flex flex-col '>
                <ChatBoxHeader 
                    key={room.id}
                    name={room.recipient}
                    imageUrl={room.imageUrl}
                />
                <MessagesContainer room_id={room.id}/>
                <InputBox room_id={room.id} />
            </div>
        </>
    )
}

export default ChatBox