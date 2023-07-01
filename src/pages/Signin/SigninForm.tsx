import { auth } from "../../../firebase";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function SigninForm() {
    const [user, setUser] = useState({
        email: '',
        password: '',
    });
    const navigate = useNavigate();
    const changeHandler = (e: { target: { name: string; value: string; }; }) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    };

    const signinEmail = (e: React.MouseEvent) => {
        e.preventDefault();
        if (Object.values(user).includes("")) {
            alert("Please Fill In All Required Fields");
            return;
        };
        signInWithEmailAndPassword(auth, user.email, user.password)
            .then(() => {
                // Signed in 
                if (auth.currentUser) {
                    navigate('/');
                };
            })
            .catch((error) => {
                console.error(error.message);
                console.log(error.code);
            });
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
                    First time? <a className='text-blue-600' href='/login'>Sign up here!</a>
                </div>
            </form>
        </div>
    )
}

export default SigninForm