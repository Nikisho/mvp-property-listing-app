import React from 'react'
import ChatBoxHeader from './ChatBoxHeader'

const ChatBox = () => {
    return (
        <> 
            <div className='w-2/3 border-r bg-gray-100'>
                <ChatBoxHeader 
                    name='Andrew Silifant'
                    imageUrl='https://dwhhfiboburmnbvsmhjn.supabase.co/storage/v1/object/public/users/ab8b820d-142c-456a-9d47-73e3870789bd/profile_picture.jpg'
                />
            </div>
        </>
    )
}

export default ChatBox