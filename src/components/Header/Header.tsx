import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../../firebase';
import { Menu } from '@headlessui/react'

function Header() {
	const navigate = useNavigate();
	function navigateHomePage() {
		navigate(`/`);
	};
	function navigatePostListingPage() {
		navigate(`/postlisting`);
	};
	const handleSignOut = () => {
		signOut(auth).then(() => {
			console.log('Signout Successsful');
			navigate(`/`);
		}).catch((error) => {
			console.error(error.message)
		});
	}


	return (
		<div className=' sticky top-0 z-50 flex p-3 bg-emerald-200 justify-between items-center'>
			{/* {git test} */}
			{/* Company logo and home button */}
			<div className='text-xl font-semibold px-3 py-2 bg-white rounded-xl shadow-lg hover:opacity-80' onClick={() => navigateHomePage()}>
				<img
					src='https://firebasestorage.googleapis.com/v0/b/mvp-prop-listing-app.appspot.com/o/rentopialogo.png?alt=media&token=0c1367d4-67c6-4ba4-8f85-47c041f3e168'
					className='h-10'
				/>
			</div>

			{/* search bar */}
			<div className='hidden md:flex flex-row  p-3 px-3 shadow-lg rounded-full space-x-2 hover:animate-pulse'>

				{/* <div className='px-3 border-r font-semibold'>Where</div>
				<div className='px-3 font-semibold'>When</div> */}
			</div>

			{/* Options and proile button */}
			<div className='flex space-x-4 items-center'>
				<button className='bg-blue-400 py-4 px-2 hover:bg-blue-900 hover:border-white'>
					<div className='text-white' onClick={() => navigatePostListingPage()}>Post a listing</div>
				</button>

				<div className=''>
					<Menu>
						<Menu.Button className="inline-flex w-full justify-cente px-4 py-2 text-sm font-medium hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">

							<AccountCircleIcon
								fontSize='large'
								className='hover:opacity-20'
								sx={{ fontSize: 45 }}
							/>

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