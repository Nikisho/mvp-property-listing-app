import React, { useState } from 'react'
import { supabase } from '../../../supabase';
import { useDispatch } from 'react-redux'
import { setCurrentUser } from '../../context/navSlice';
import { User } from '@supabase/supabase-js';
import LoadingComponent from '../../components/LoadingComponent';

function SignUpForm() {
	const [user, setUser] = useState({
		name: '',
		email: '',
		password: '',
	});
	const dispatch = useDispatch();
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
	const changeHandler = (e: { target: { name: string; value: string; }; }) => {
		setUser({ ...user, [e.target.name]: e.target.value })
	};

	const insertIntoUsers = async (userCredential: User ) => {
		const { error } = await supabase
			.from('users')
			.insert({
				name: user.name,
				email: userCredential.email,
				user_uid: userCredential.id,
			})
		if (error) {
			console.error(error.message);
		}
	};
	const passwordIsvalid = (password: string): boolean => {
		if (
			password.length > 6 &&
			password.search(/[A-Z]/) >= 0 &&
			password.search(/[A-Z]/) >= 0
		) {
			return true;
		}
		return false;
	};

	const signUpEmail = async (e: React.MouseEvent): Promise<void> => {
		e.preventDefault();
		if (passwordIsvalid(user.password) === false) {
			alert('Your password must be at least 6 characters long, contain an uppercase and lowercase charachter and a number')
			return;
		}
		if (Object.values(user).includes("")) {
			alert("Please Fill In all Required Fields.");
			return;
		};

		
		const { data, error } = await supabase.auth.signUp({
			email: user.email,
			password: user.password,
		});
		if (error) {
			console.error(error.message);
		}
		// IF SIGNED IN => HOMEPAGE
		if (data.session) {
			console.log(data.user);
			dispatch(setCurrentUser({
				userAuthenticationInfo: data.user,
				isLoggedIn: true,
				session: data.session
			}));
			insertIntoUsers(data.user as User);
			setIsLoggedIn(true);
		};
	};
	if (isLoggedIn) {
		return <LoadingComponent />
	}
	return (
		<div className='pt-4 grid place-items-center '>
			<form className='space-y-2 w-5/6  sm:w-2/3 md:w-1/3 xl:w-1/4 border p-2 rounded-xl shadow-lg'>
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

export default SignUpForm