import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { supabase } from '../../../supabase';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
interface pmDetailsProps {
    name: string;
    email: string;
    user_id: string;
    image_url: string;
};

function ProfilePage() {
    const [pmDetails, setPmDetails] = useState<pmDetailsProps>();
    const { user_id } = useParams();
    console.log(user_id);
    const getPropManagerDetails = async (pm_user_uid: string) => {
        try {
            const { data } = await supabase
                .from('users')
                .select()
                .eq('user_uid', `${pm_user_uid}`);
            setPmDetails(data![0]);
        } catch (error: any) {
            console.error(error.message);
        }
    };
    useEffect(() => {
        getPropManagerDetails(user_id as string);
    }, []);

    return (
        <>
            <Header />
            <div className='flex justify-center '>
                {/* {profile} */}
                <div className='border w-full rounded-xl p-4 space-y-10
                                xl:w-5/12 xl:space-y-1 xl:shadow-lg '>
                    {/* {picture and name} */}
                    <div className='flex justify-between items-center border-b'>
                        {
                            pmDetails?.image_url ?
                                <div className=''>
                                    <img
                                        src={pmDetails.image_url}
                                        style={{
                                            borderRadius: 100
                                        }}
                                    />
                                </div> :
                                <AccountBoxIcon
                                    sx={{ fontSize: 100 }}
                                />
                        }

                        <div className='text-2xl font-bold'>
                            {pmDetails?.name}
                        </div>
                        <div>
                            {/* {space to justify name} */}
                        </div>
                    </div>
                    {/* {About section} */}
                    <div className='p-3'>
                        <div className='text-xl font-bold pb-2 '>
                            About
                        </div>
                        <div>
                            I have been a landlord for over 10 years in the
                            South East area. I make sure that my tenants are always
                            happy with the property and jump on any queries whenever needed.
                            I also have a few agents looking at some of my listed_properties
                            to ensure that my tenants are always looked after.
                        </div>
                    </div>
                    {/* {Review section} */}
                    <div className='p-3'>
                        <div className='text-xl font-bold pb-2 '>
                            Reviews
                        </div>
                        <div>
                            <i>No reviews yet.</i>
                        </div>
                    </div>
                    {/* {Contact section} */}
                    <div className='p-3'>
                        <div className='text-xl font-bold pb-2 '>
                            Contact Information
                        </div>
                        <div>
                            Email: {pmDetails?.email}
                        </div>
                        <div>
                            Mobile number:
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfilePage