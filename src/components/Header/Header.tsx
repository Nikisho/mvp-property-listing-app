import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import { Menu } from '@headlessui/react'
import { supabase } from '../../../supabase';
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentUser, setCurrentUser } from '../../context/navSlice';
import { useEffect, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';

interface userDataProps {
	image_url: string;
	phone_number: string
};

function Header() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const user = useSelector(selectCurrentUser);
	const [userData, setUserData] = useState<userDataProps>();
	const fetchUserData = async () => {

		const { data, error } = await supabase
			.from('users')
			.select()
			.eq('user_uid', `${user.user.id}`);

		if (error) {
			console.error(error.message);
		};
		setUserData(data![0]);
		console.log(data![0]);
		dispatch(setCurrentUser({
			user: user.user,
			isLoggedIn: user.isLoggedIn,
			session: user.session,
			imageUrl: data![0].image_url,
			technicalKey: data![0].user_id,
			name: data![0].name,
			email: data![0].email,
			phoneNumber: data![0].phone_number
		}));
	};

	const navigatePostListing = () => {
		if (!userData?.phone_number) {
			alert('Please update your phone number in your profile before posting an ad.');
			return;
		};
		navigate(`/postlisting`)
	}

	const handleSignOut = async () => {

		const { error } = await supabase.auth.signOut();
		if (error) {
			console.error(error.message)
		}
		console.log('Signout Successsful');
		dispatch(setCurrentUser({
			userAuthenticationInfo: null,
			isLoggedIn: false,
			session: null
		}));
		navigate(`/`);
	}

	useEffect(() => {
		fetchUserData();
	}, []);

	return (
		<div className='bg-sky-800 sticky top-0 z-50 flex p-0 p-2 space-x-1 w-screen
						lg:p-3 justify-between items-center'>
			{/* {git test} */}
			{/* Company logo and home button */}
			<button className=' text-xl font-semibold hover:opacity-80' type='button' onClick={() => navigate(`/`)}>
				<img
					src='https://dwhhfiboburmnbvsmhjn.supabase.co/storage/v1/object/public/application-bucket/logo.png'
					className='h-12 rounded-xl shadow-lg'
				/>
			</button>

			{/* Options and proile button */}
			<div className='flex space-x-4 items-center pr-5 '>
				<button className='	hover:bg-blue-900
									hidden
									xl:block
									rounded-lg py-1 w-16
									lg:py-2 lg:px-2 lg:w-auto lg:rounded-sm '>
					<div className='text-white text-lg ' onClick={() => navigate(`/about`)}>About</div>
				</button>
				<button className='	hover:bg-blue-900
									rounded-lg py-1 w-16
									hidden
									xl:block
									lg:py-2 lg:px-2 lg:w-auto lg:rounded-sm '>
					<div className='text-white text-lg ' onClick={() => navigatePostListing()}>Post a listing</div>
				</button>
				<button className='	hover:bg-blue-900
									hidden
									xl:block
									rounded-lg py-1 w-16
									lg:py-2 lg:px-2 lg:w-auto lg:rounded-sm '>
					<div className='text-white text-lg ' onClick={() => navigate(`/searchprofile`)}>Reviews</div>
				</button>
				<div className='block xl:hidden'>
					<Menu>
						<Menu.Button className="inline-flex w-full justify-cente px-4 py-2 text-sm font-medium hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">

							<MenuIcon
								sx={{ color: 'white' }}
								fontSize='large'

							/>

						</Menu.Button>
						<Menu.Items className="absolute right-0 mt-2 w-52 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
							<div className="px-1 py-1 ">
								<Menu.Item >
									{({ active }) => (
										<a
											className={`${active ? 'bg-blue-300 text-white' : 'text-gray-900'
												} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
											href='/about'
										>
											About
										</a>
									)}
								</Menu.Item>
								<Menu.Item >
									{({ active }) => (
										<a
											className={`${active ? 'bg-blue-300 text-white' : 'text-gray-900'
												} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
											href='/postlisting'
										>
											Post a listing
										</a>
									)}
								</Menu.Item>
								<Menu.Item>
									{({ active }) => (
										<a
											className={`${active ? 'bg-blue-300 text-white' : 'text-gray-900'
												} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
											href='/searchprofile'
										>
											Reviews
										</a>
									)}
								</Menu.Item>
							</div>

						</Menu.Items>
					</Menu>

				</div>
				<div className=''>
					<Menu>
						<Menu.Button className="inline-flex w-full justify-cente px-4 py-2 text-sm font-medium hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">

							{
								userData?.image_url ?

									<img
										src={userData?.image_url}
										className='rounded-full h-10 w-10 contain rounded-full'
									/>
									:
									<AccountCircleIcon
										fontSize='large'
										className='hover:opacity-20'
										sx={{ fontSize: 45, color: '#fff' }}
									/>
							}

						</Menu.Button>
						<Menu.Items className="absolute right-0 mt-2 w-52 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
							<div className="px-1 py-1 ">
								<Menu.Item >
									{({ active }) => (
										<a
											className={`${active ? 'bg-blue-300 text-white' : 'text-gray-900'
												} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
											href='/mylistings'
										>
											My listings
										</a>
									)}
								</Menu.Item>
								<Menu.Item >
									{({ active }) => (
										<a
											className={`${active ? 'bg-blue-300 text-white' : 'text-gray-900'
												} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
											href='/myprofile'
										>
											My profile
										</a>
									)}
								</Menu.Item>
								<Menu.Item>
									{({ active }) => (
										<a
											onClick={handleSignOut}
											className={`${active ? 'bg-blue-300 text-white' : 'text-gray-900'
												} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
										>
											Sign out
										</a>
									)}
								</Menu.Item>
							</div>

						</Menu.Items>
					</Menu>

				</div>
			</div>
		</div>
	)
}

export default Header