import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { auth } from '../../../firebase';

function LoginForm() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const changeHandler = (e: { target: { name: string; value: string; }; }) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  };

  const signUpEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    if (Object.values(user).includes("")) {
      alert("Please Fill In All Required Fields.");
      return;
    };
    createUserWithEmailAndPassword(auth, user.email, user.password)
      .then((userCredential) => {
          // Signed in 
          console.log(user);
          fetch("http://localhost:5000/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            "name": user.name,
            "email": userCredential.user.email,
            "firebase_uid": userCredential.user.uid,
          })
        });
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
    <div className='pt-4 grid place-items-center '>
      <form className='space-y-2 w-5/6  sm:w-2/3 md:w-1/4 border p-2 rounded-xl shadow-lg'>
        <div className='text-2xl font-semibold'><h1>Sign up</h1></div>
        <div className='flex flex-col'>
          <label className='self-start text-xl my-2 '>Name </label>
          <input className='h-10 border p-2' type="text" name="name" id='name' onChange={changeHandler} required placeholder='Enter Your Name' />
          {/* {renderErrorMessage("uname")} */}
        </div>
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
          onClick={signUpEmail}>
          Sign up
        </button>
        <div className='text-sm'>
          Already have an account? <a className='text-blue-600' href='/'>Sign in</a>.
        </div>
      </form>
    </div>
  )

}

export default LoginForm