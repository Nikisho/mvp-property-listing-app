import React from 'react'
import { Header } from '../../components'
import Sidebar from './Sidebar'
import ChatBox from './ChatBox'

const MessagesPage = () => {
    return (
        <>
            <Header />
            <div className='flex my-5 mx-10 h-[420px] rounded-xl shadow-lg '>
                    <Sidebar />
                    <ChatBox />
            </div>
        </>
    )
}

export default MessagesPage