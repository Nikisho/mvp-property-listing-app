import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { supabase } from '../../../supabase';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../context/navSlice';
import LoadingComponent from '../../components/LoadingComponent';
import { Rating } from '@mui/material';
import ReviewsComponent from '../../components/Reviews/ReviewsComponent';
interface pmDetailsProps {
    name: string;
    email: string;
    user_uid: string;
    user_id: string;
    image_url: string;
    description: string;
    phone_number: string;
};
interface reviewProps {
    name: string;
    review: string;
    reviewer_user_id: number
    rating: number;
}
function ProfilePage() {
    const [pmDetails, setPmDetails] = useState<pmDetailsProps>();
    const { user_id } = useParams();
    const currentUser = useSelector(selectCurrentUser);
    const [reviews, setReviews] = useState<reviewProps[]>();
    const [newReview, setNewReview] = useState<string>('')
    const [loadingPage, setLoadingPage] = useState<boolean>(false);
    const [rating, setRating] = useState<number | null>(0);
    console.log(typeof (rating))
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

    const fetchUserReviews = async () => {
        const { data, error } = await supabase
            .from('reviews')
            .select()
            .eq('reviewed_user_uid', user_id);
        if (data) {
            setReviews(data);
        }
        if (error) {
            console.error(error.message);
        };
    };

    const publishReview = async () => {
        if (rating === 0 ) {
            alert('Choose a rating');
            return;
        }
        if (!newReview) {
            alert('The review cannot be blank.')
            return;
        }
        if (currentUser.user.id === pmDetails?.user_uid) {
            alert('You cannot leave yourself a review')
            return;
        }
        if (reviews?.some(review => review.reviewer_user_id === currentUser.technicalKey)) {
            alert('You already left a review.');
            return;
        }
        const { error } = await supabase
            .from('reviews')
            .insert({
                name: currentUser.name,
                review: newReview,
                reviewer_user_id: currentUser.technicalKey,
                reviewed_user_id: pmDetails?.user_id,
                reviewed_user_uid: user_id,
                rating: rating
            });

        if (error) {
            console.error(error?.message);
        }
        setLoadingPage(true);
    };

    useEffect(() => {
        getPropManagerDetails();
        fetchUserReviews()
    }, []);

    if (loadingPage) return (
        < LoadingComponent />
    )
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
                        <Rating
                            name="simple-controlled"
                            value={rating}
                            onChange={(event, newRating) => {
                                setRating(newRating);
                                console.log(event)
                            }}
                        />
                        <div className='py-2 space-y-2'>
                            <textarea placeholder="Write a review"
                                className="rounded-lg p-2 border w-full h-20 text-sm "
                                value={newReview}
                                onChange={e => setNewReview(e.target.value)}
                                required

                            />
                            <div className='flex justify-end'>
                                <button className='p-2 rounded-lg bg-blue-400 hover:scale-95 transition duration-500'
                                    onClick={() => publishReview()}
                                >
                                    Publish
                                </button>
                            </div>
                        </div>
                        <div className='overflow-y-auto h-52'>
                            <ReviewsComponent reviews={reviews!} />
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