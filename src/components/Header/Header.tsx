import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import { Menu } from '@headlessui/react'
import { supabase } from '../../../supabase';
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentUser, setCurrentUser } from '../../context/navSlice';
import { useEffect, useState } from 'react';

function Header() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const user = useSelector(selectCurrentUser);
	const [headerPicutre, setHeaderPicture] = useState<string>();
	function navigateHomePage() {
		navigate(`/`);
	};
	function navigatePostListingPage() {
		navigate(`/postlisting`);
	};

	const fetchUserData = async() => {

        const { data, error } = await supabase
            .from('users')
            .select()
            .eq('user_uid', `${user.user.id}`);

        if (error) {
            console.error(error.message);
        };

		setHeaderPicture(data![0].image_url)
	};

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

	useEffect( () => {
		fetchUserData();
	}, []);
	
	return (
		<div className='bg-sky-800 sticky top-0 z-50 flex p-0 p-2 space-x-1
						lg:p-3 justify-between items-center'>
			{/* {git test} */}
			{/* Company logo and home button */}
			<button className='text-xl font-semibold hover:opacity-80' type='button' onClick={() => navigateHomePage()}>
				<img
					src='https://dwhhfiboburmnbvsmhjn.supabase.co/storage/v1/object/public/application-bucket/logo.png'
					className='h-12 rounded-xl shadow-lg'
				/>
			</button>

			{/* search bar */}
			<div className='hidden md:flex flex-row  p-3 px-3 shadow-lg rounded-full space-x-2 hover:animate-pulse'>

				{/* <div className='px-3 border-r font-semibold'>Where</div>
				<div className='px-3 font-semibold'>When</div> */}
			</div>

			{/* Options and proile button */}
			<div className='flex space-x-4 items-center'>
				<button className='	hover:bg-blue-900
									rounded-lg py-1 w-16
									lg:py-2 lg:px-2 lg:w-auto lg:rounded-sm '>
					<div className='text-white ' onClick={() => navigatePostListingPage()}>Post an Ad</div>
				</button>

				<div className=''>
					<Menu>
						<Menu.Button className="inline-flex w-full justify-cente px-4 py-2 text-sm font-medium hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">

							{
								headerPicutre? 

								<img
									src={headerPicutre}
									className='rounded-full h-12 w-12 contain rounded-full'
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