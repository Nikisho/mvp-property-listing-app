import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from '../../../supabase';
import { useDispatch } from 'react-redux'
import { setCurrentUser } from '../../context/navSlice';

function SigninForm() {
    const [user, setUser] = useState({
        email: '',
        password: '',
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const changeHandler = (e: { target: { name: string; value: string; }; }) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    };

    const signinEmail = async (e: React.MouseEvent) => {
        e.preventDefault();
        if (Object.values(user).includes("")) {
            alert("Please Fill In All Required Fields");
            return;
        };
        const { data, error } = await supabase.auth.signInWithPassword({
            email: user.email,
            password: user.password,
        });
        if (error) {
            console.error(error.message);
        }
        // IF SIGNED IN => HOMEPAGE
        if (data) {
            console.log(data.user);
            dispatch(setCurrentUser({
                userAuthenticationInfo: data.user,
                isLoggedIn: true,
                session: data.session
            }));
            navigate('/');
        };
    };
    return (
        <div className="pt-4 grid place-items-center">
            <form className='space-y-2 w-5/6  sm:w-2/3 md:w-1/4 border p-2 rounded-xl shadow-lg'>
                <div className='text-2xl font-semibold'><h1>Sign in</h1></div>
                <div className='flex flex-col'>
                    <label className='self-start text-xl my-2 '>Email address </label>
                    <input className='h-10 border p-2' type="email" name="email" id='email' onChange={changeHandler} required placeholder='Enter Your Email Address' />
                    {/* {renderErrorMessage("uname")} */}
                </div>
                <div className='flex flex-col' >
                    <label className='self-start text-xl my-2 '>Password </label>
                    <input className='h-10 border p-2' type="password" name="password" id='password' onChange={changeHandler} required placeholder='Enter Password' />
                    {/* {renderErrorMessage("pass")} */}
                </div>
                <button className='bg-green-200 text-lg w-full font-semibold p-3 flex justify-center transition duration-700 hover:scale-95'
                    onClick={signinEmail}>
                    Sign in
                </button>
                <div className='text-sm'>
                    First time? <a className='text-blue-600' href='/signup'>Sign up here!</a>
                </div>
            </form>
        </div>
    )
}

export default SigninForm