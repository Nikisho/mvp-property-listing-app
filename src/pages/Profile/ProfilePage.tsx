import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { supabase } from '../../../supabase';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../context/navSlice';
interface pmDetailsProps {
    name: string;
    email: string;
    reviews: {
        name: string,
        review: string
    }[]
    user_id: string;
    image_url: string;
    description: string;
    phone_number: string;
};

function ProfilePage() {
    const [pmDetails, setPmDetails] = useState<pmDetailsProps>();
    const { user_id } = useParams();
    const currentUser = useSelector(selectCurrentUser);
    const [review, setReview] = useState<string>('');
    const getPropManagerDetails = async () => {

        try {
            const { data } = await supabase
                .from('users')
                .select()
                .eq('user_uid', user_id);
            setPmDetails(data![0]);
        } catch (error: any) {
            console.error(error.message);
        }
    };
    const publishReview =  async () => {
        const { error } = await supabase
            .from('users')
            .update({
                review: {
                    name: currentUser.name,
                    review: review
                }}
            )
            .eq('user_uid', user_id)

        if (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        getPropManagerDetails();
    }, []);

    return (
        <>
            <Header />
            <div className='flex justify-center '>
                {/* {profile} */}
                <div className='border w-full rounded-xl p-4 space-y-10
                                xl:w-5/12 xl:space-y-1 xl:shadow-lg '>
                    {/* {picture and name} */}
                    <div className='flex-col flex space-y-2 items-center border-b'>
                        {
                            pmDetails?.image_url ?
                                <div className=''>
                                    <img
                                        src={pmDetails.image_url}

                                        className='h-24 rounded-xl'
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
                            {pmDetails?.description}
                        </div>
                    </div>
                    {/* {Review section} */}
                    <div className='p-3'>
                        <div className='text-xl font-bold pb-2  '>
                            Reviews
                        </div>
                        <div className='py-2 space-y-2'>
                            <textarea placeholder="Add a review"
                                className="rounded-lg p-2 border w-full h-20 text-sm "
                                value={review}
                                onChange={e => setReview(e.target.value)}
                                required

                            />
                            <div className='flex justify-end'>
                                <button className='p-1 bg-blue-200 hover:scale-95 transition duration-500'
                                onClick={() => publishReview()}
                                >
                                    Publish
                                </button>
                            </div>
                        </div>
                        <div className='overflow-y-auto h-52'>

                            {pmDetails?.reviews ?
                                pmDetails?.reviews.map((review) => (
                                    <div className='flex flex-col space-y-2 p-3 rounded-xl shadow-lg border '>
                                        <div className='text-xl font-bold'>{review.name}</div>
                                        <div className=''>
                                            {review.review}
                                        </div>
                                    </div>

                                )) :
                                <div>
                                    <i>No reviews yet.</i>
                                </div>
                            }
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
                            Mobile number: {pmDetails?.phone_number}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfilePage