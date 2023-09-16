import { Header } from '../../components'
import Sidebar from './Sidebar'
import ChatBox from './ChatBox'
import { Grow } from '@mui/material'

const MessagesPage = () => {
    return (
        <>
            <Grow timeout={2000} in>
                <div>

                    <Header />
                    <div className='flex my-5 mx-10 h-[420px] rounded-xl shadow-lg '>
                        <Sidebar />
                        <ChatBox />
                    </div>
                </div>
            </Grow>
        </>
    )
}

export default MessagesPage