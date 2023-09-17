import ChatWidget from './ChatWidget';

interface SidebarProps {
    rooms: {room_id: number}[]
}
const Sidebar: React.FC<SidebarProps> = ({rooms}) => {
    return (
        <>
            {
                rooms?.map((room) => (
                    <ChatWidget
                        room_id={room.room_id}
                        key={room.room_id}
                    />
                ))
            }
        </>
    )
}

export default Sidebar