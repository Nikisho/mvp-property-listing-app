import { useEffect, useState } from 'react'
import { supabase } from '../../../supabase';
import UserListingCard from './UserListingCard';
import Header from '../../components/Header/Header';
import convertUrlsToJSON from '../../utils/convertUrlsToJSON';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../context/navSlice';
import { UserMetadata } from '@supabase/supabase-js';

interface UserListingsProps {
    image_arr: string;
    property_id: string;
    price_pcm: number;
    address: string;
    description: string;
}
function UserListingsPage() {
    const user: UserMetadata = useSelector(selectCurrentUser);
    const [userListings, setUserListings] = useState<UserListingsProps[]>([]);
    console.log(user.user.id)
    const fetchUserListings = async () => {
        try {
            const { data, error } = await supabase
                .from('listed_properties')
                .select()
                .eq("pm_user_uid", `${user.user.id}`);
            if (error) {
                console.error(error.message);
            }
            setUserListings(data!);
        } catch (err:any) {
            console.error(err.message);
        }
    };
    useEffect(() => {
        fetchUserListings();
    }, []);
    return (
        <div>
            <Header />
            <div className='flex justify-center '>
                {/* {profile} */}
                <div className=' w-2/3 p-4  space-y-3'>

                    {
                        userListings?.map((listing) =>
                            <UserListingCard
                                key={listing.property_id}
                                image_url={convertUrlsToJSON(listing?.image_arr[0]!)}
                                address={listing.address}
                                price_pcm={listing.price_pcm}
                                description={listing.description}
                            />
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default UserListingsPage