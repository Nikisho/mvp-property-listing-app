import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../context/navSlice';
import { supabase } from '../../../supabase';
import SendIcon from '@mui/icons-material/Send';

interface InputBoxProps {
    room_id: number;
    setIsloading: (arg0: boolean) => void
};

const InputBox : React.FC<InputBoxProps> = ({
    room_id,
    setIsloading
}) => {

    const user = useSelector(selectCurrentUser);
    const [content, setContent] = useState<string>('');

    const postMessage = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (content === '') return;
        setIsloading(true)
        const { error } = await supabase
        .from('messages')
        .insert({
            user_id: user.technicalKey,
            content: content,
            room_id: room_id
        });
        if (error) console.error(error.message);
        setContent('');
        setIsloading(false)
    };

  return (
    <form className='bg-white border flex justify-center items-center space-x-4
                    h-1/6
                    xl:h-1/4 
    '
    onSubmit={postMessage}
    >
        <textarea 
            className='rounded-md border-2 h-12 w-3/4 py-2 px-5 text-md resize-none'
            value={content}
            onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit" className='border rounded-full p-2 bg-blue-200 items-center flex hover:scale-95 transition duration-500'
        >
            <SendIcon
                fontSize='small'
                color='success'
            />
        </button>
    </form>
  )
}

export default InputBox