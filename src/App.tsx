import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { SignUpPage, PropertyDetailsPage, PostListingPage, SigninPage, ProfilePage, UserListingsPage, MyProfilePage, ResultsPage, HomePage, AboutPage, SearchProfilePage, ApplicationTemplatePage } from './pages'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser, setCurrentUser, setTenancyApplications } from './context/navSlice';
import { supabase } from '../supabase';
import { Session, User } from '@supabase/supabase-js';

function App() {
	const currentUser = useSelector(selectCurrentUser);
	const dispatch = useDispatch();
	const router = createBrowserRouter([
		{
			path: "/",
			element: <HomePage />,
		},
		{
			path: "/about",
			element: <AboutPage />,
		},
		{
			path: "/results/:lat/:lng/:location/:radius/:min_price/:max_price/:min_room/:max_room",
			element: <ResultsPage />,
		},
		{
			path: "/signup",
			element: <SignUpPage />,
		},
		{
			path: '/signin',
			element: <SigninPage />
		},
		{
			path: "/rooms/:property_id",
			element: <PropertyDetailsPage />,
		},
		{
			path: "/postlisting",
			element: <PostListingPage />,
		},
		{
			path: "/users/:user_id",
			element: <ProfilePage />,
		},
		{
			path: "/mylistings",
			element: <UserListingsPage />,
		},
		{
			path: "/myprofile",
			element: <MyProfilePage />,
		},
		{
			path: "/searchprofile",
			element: <SearchProfilePage />,
		},
		{
			path: "/apply/rooms/:property_id",
			element: <ApplicationTemplatePage />,
		},

	]);

	const loginRouter = createBrowserRouter([

		{
			path: "/",
			element: <HomePage />,
		},
		{
			path: '/signup',
			element: <SignUpPage />
		},
		{
			path: '/signin',
			element: <SigninPage />
		},
		{
			path: '*',
			element: <SigninPage />
		},
		{
			path: "/about",
			element: <AboutPage />,
		},
		{
			path: "/results/:lat/:lng/:location/:radius/:min_price/:max_price/:min_room/:max_room",
			element: <ResultsPage />,
		},
	]);

	const getApplicationsData = async (id: number) => {
		const { data, error } = await supabase
		.from('tenancy_applications')
		.select('tenancy_id, isRead')
		.eq('pm_user_id', id);

		if (error) {console.error(error.message);}

		dispatch(setTenancyApplications(data));
	};

	const fetchUserData = async (id: string, session: Session, user: User) => {
		const { data, error } = await supabase
			.from('users')
			.select()
			.eq('user_uid', `${id}`);

		if (error) {
			console.error(error.message);
		};
		dispatch(setCurrentUser({
			user: user,
			isLoggedIn: true,
			session: session,
			imageUrl: data![0].image_url,
			technicalKey: data![0].user_id,
			name: data![0].name,
			email: data![0].email,
			phoneNumber: data![0].phone_number
		}));
		getApplicationsData(data![0].user_id);
	};
	const getUserSession = async () => {
		supabase.auth.onAuthStateChange((event, session) => {
			console.log(event);
			if ((session !== null)) {
				fetchUserData(
					session.user.id, 
					session, 
					session.user
				);
			}
		})	
	};
	//--watches auth state--//
	useEffect(() => {
		getUserSession();
	}, []);

	if (!currentUser.isLoggedIn) return (
		<>
			<RouterProvider router={loginRouter} fallbackElement={<SigninPage />} />
		</>
	)

	return (
		<>
			<RouterProvider router={router} />
		</>
	)
}

export default App