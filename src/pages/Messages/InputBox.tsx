import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../context/navSlice';
import { supabase } from '../../../supabase';
import SendIcon from '@mui/icons-material/Send';

interface InputBoxProps {
    room_id: number;
};

const InputBox : React.FC<InputBoxProps> = ({
    room_id
}) => {

    const user = useSelector(selectCurrentUser);
    const [content, setContent] = useState<string>('');

    const postMessage = async (e: React.MouseEvent) => {
        e.preventDefault();
        if (content === '') return;
        const { error } = await supabase
        .from('messages')
        .insert({
            user_id: user.technicalKey,
            content: content,
            room_id: room_id
        });
        if (error) console.error(error.message);
        setContent('');
    };

  return (
    <div className='bg-white border h-1/4 flex justify-center items-center space-x-4'>
        <textarea 
            className='rounded-md border-2 border h-10 w-3/4 py-2 px-5 text-sm resize-none'
            value={content}
            onChange={(e) => setContent(e.target.value)}
        />
        <button className='border rounded-full p-2 bg-blue-200 items-center flex hover:scale-95 transition duration-500'
            onClick={postMessage}
        >
            <SendIcon
                fontSize='small'
                color='success'
            />
        </button>
    </div>
  )
}

export default InputBox