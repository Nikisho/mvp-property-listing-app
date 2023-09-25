import ChatWidget from './ChatWidget';

interface SidebarProps {
    rooms: {room_id: number}[]
}
const Sidebar: React.FC<SidebarProps> = ({rooms}) => {
    return (
        <div className='flex flex-col xl:w-1/3'>
            {
                rooms?.map((room) => (
                    <ChatWidget
                        room_id={room.room_id}
                        key={room.room_id}
                    />
                ))
            }
        </div>
    )
}

export default Sidebar