import { useState } from 'react';
import { Header, PropertyManagerCard } from '../../components';
import { supabase } from '../../../supabase';

interface userDataProps {
	name: string;
	user_uid: string;
	image_url: string;
}
const SearchProfilePage = () => {
	const [QueriedEmail, setQueriedEmail] = useState('');
	const [queriedUserData, setQueriedUserData] = useState<userDataProps>()
	const searchUser = async () => {
		const { data, error } = await supabase
			.from('users')
			.select()
			.eq('email', QueriedEmail.toLocaleLowerCase())
		if (data) {
			setQueriedUserData(data![0]);
		}
		if (error) console.error(error.message);
	};

	return (
		<>
			<Header />

			<div className='grid place-items-center'>
				<div className='w-full lg:w-1/2 shadow-lg border p-3 m-3 rounded-xl'>
					<div className='text-lg font-semibold'>
						Search for users
					</div>
					<input className='p-2 my-2 rounded-lg text-lg border w-full'
						value={QueriedEmail}
						required
						placeholder="Enter the user's email address."
						onChange={e => setQueriedEmail(e.target.value)}
					/>
					<div className='flex justify-end'>
						<button className='p-2 rounded-lg text-white bg-blue-400 hover:scale-95 transition duration-500'
							onClick={() => searchUser()}
						>
							Search
						</button>
					</div>
					{
						queriedUserData && 
						<PropertyManagerCard 
							pm_image_url={queriedUserData?.image_url as string}
							pm_user_uid={queriedUserData?.user_uid}
							pm_name={queriedUserData?.name}
						/>
					}

				</div>
			</div>
		</>
	)
}

export default SearchProfilePage