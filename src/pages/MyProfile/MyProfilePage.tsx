import { useEffect, useRef, useState } from 'react'
import Header from '../../components/Header/Header';
import { supabase } from '../../../supabase';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../context/navSlice';
import CreateIcon from '@mui/icons-material/Create';
import LoadingComponent from '../../components/LoadingComponent';
import ReviewsComponent from '../../components/Reviews/ReviewsComponent';

interface MyProfilePageProps {
    email: string;
    description: string;
    image_url: string | ArrayBuffer;
    number: string;
    name: string;

};
interface reviewProps {
    name: string;
    review: string;
    rating: number;
    reviewer_user_id: number
}
function MyProfilePage() {
    const user = useSelector(selectCurrentUser);
    const [profileUpdated, setProfileUpdated] = useState<boolean>(false);
    const filePickerRef = useRef<HTMLInputElement>(null);
    const [profilePictureFile, setProfilePictureFile] = useState<File>();
    const [reviews, setReviews] = useState<reviewProps[]>();
    const [userInfo, setUserInfo] = useState<MyProfilePageProps>({
        email: '',
        description: '',
        image_url: '',
        number: '',
        name: '',
    });
    const changeHandler = (e: { target: { name: string; value: string; }; }) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    };
    const fetchUserData = async (pm_user_uid: string) => {

        const { data, error } = await supabase
            .from('users')
            .select()
            .eq('user_uid', `${pm_user_uid}`);

        if (error) {
            console.error(error.message);
        };
        setUserInfo({
            email: data![0].email as string,
            description: data![0].description as string,
            image_url: data![0].image_url as string,
            number: data![0].phone_number as string,
            name: data![0].name as string,
        });
    };
    const fetchUserReviews = async () => {
        const { data, error } = await supabase
            .from('reviews')
            .select()
            .eq('reviewed_user_uid', user.user.id);
        if (data) {
            setReviews(data);
        }
        if (error) {
            console.error(error.message);
        };
    };
    const amendProfilePicture = (e: any) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
            setProfilePictureFile(e.target.files[0])
        }

        reader.onload = (readerEvent) => {
            setUserInfo(prevState => ({
                ...prevState,
                image_url: readerEvent.target?.result!
            }))
        };
    }

    const updateProfilePictureInStorageBucket = async () => {

        const { error } = await supabase
            .storage
            .from('users')
            .upload(`${user.user.id}/profile_picture.jpg`, profilePictureFile as File, {
                cacheControl: '2',
                upsert: true
            });
        if (error) console.error(error.message);
    }

    //Update user's profile.
    const handleClick = async (e: React.MouseEvent) => {
        e.preventDefault();
        updateProfilePictureInStorageBucket();
        const { error } = await supabase
            .from('users')
            .update({
                email: userInfo.email,
                phone_number: userInfo.number,
                description: userInfo.description,
                image_url: `https://dwhhfiboburmnbvsmhjn.supabase.co/storage/v1/object/public/users/${user.user.id}/profile_picture.jpg`,
            })
            .eq('user_uid', user.user.id);
        if (error) { console.error(error.message); }
        setProfileUpdated(true);
    };

    useEffect(() => {
        fetchUserReviews()
        fetchUserData(user.user.id as string);
    }, []);


    if (profileUpdated) {
        return <LoadingComponent 
            page=''
        />
    }

    return (
        <>
            <Header />
            <div className='flex justify-center '>
                {/* {profile} */}
                <div className='border w-full rounded-xl p-4 space-y-10
                                xl:w-5/12 xl:space-y-1 xl:shadow-lg '>
                    {/* {picture and name} */}
                    <div className='flex flex-col items-center p-2 border-b'>
                        {
                            userInfo?.image_url ?
                                <button
                                    style={{
                                        backgroundImage: `url(${userInfo.image_url})`,
                                        backgroundSize: 'contain',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'center'
                                    }}
                                    className='p-10 rounded-xl hover:opacity-50'
                                    onClick={() => filePickerRef.current?.click()}
                                >
                                    <input ref={filePickerRef}
                                        onChange={amendProfilePicture}
                                        type="file"
                                        accept="image/png, image/jpeg"
                                        hidden
                                    />
                                    <CreateIcon
                                        fontSize='large'
                                        sx={{
                                            color: 'grey'
                                        }}
                                    />
                                </button> :
                                <button className='hover:opacity-50'
                                    onClick={() => filePickerRef.current?.click()}>
                                    <AccountBoxIcon
                                        sx={{ fontSize: 100 }}
                                    />
                                    <input ref={filePickerRef}
                                        onChange={amendProfilePicture}
                                        type="file"
                                        accept="image/png, image/jpeg"
                                        hidden
                                    />
                                </button>


                        }

                        <div className='text-2xl font-bold'>
                            {userInfo?.name}
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
                        <textarea placeholder="Add a brief description"
                            className="rounded-lg p-2 border h-28 w-full
											xl:h-52 xl:text-sm
											2xl:h-80 2xl:text-sm "
                            name='description'
                            id='description'
                            value={userInfo?.description}
                            onChange={changeHandler}
                        />
                    </div>
                    {/* {Review section} */}
                    <div className='p-3'>
                        <div className='text-xl font-bold pb-2  '>
                            Reviews
                        </div>
                        <div className='overflow-y-auto h-52'>
                            < ReviewsComponent reviews={reviews!} />
                        </div>
                    </div>
                    {/* {Contact section} */}
                    <div className='p-3'>
                        <div className='text-xl font-bold pb-2 '>
                            Contact Information
                        </div>
                        <div className='space-y-1'>
                            <div className='text-lg font-semibold'>
                                Email:
                            </div>
                            <input
                                className='p-2 rounded-lg border'
                                name='email'
                                id='email'
                                type='email'
                                value={userInfo.email}
                                onChange={changeHandler}
                            />
                        </div>
                        <div className='space-y-1'>
                            <div className=' text-lg font-semibold'>
                                Mobile number:
                            </div>
                            <input
                                className='p-2 rounded-lg border'
                                name='number'
                                id='number'
                                type='tel'
                                value={userInfo.number}
                                onChange={changeHandler}
                            />
                        </div>
                    </div>
                    <div className='p-2'>
                        <button className='p-2 rounded-xl shadow-lg bg-sky-300 text-sm font-semibold hover:scale-95 duration-500'
                            onClick={handleClick}
                        >
                            Update profile
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyProfilePage;