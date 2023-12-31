import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { SignUpPage, PropertyDetailsPage, PostListingPage, SigninPage, ProfilePage, UserListingsPage, MyProfilePage, ResultsPage, HomePage, AboutPage } from './pages'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser, setCurrentUser } from './context/navSlice';
import { supabase } from '../supabase';

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

	]);

	const loginRouter = createBrowserRouter([

		{
			path: "/",
			element: <SigninPage />,
		},
		{
			path: '/signup',
			element: <SignUpPage />
		},
		{
			path: '*',
			element: <SigninPage />
		},
	]);

	const getUserSession = async () => {
		supabase.auth.onAuthStateChange((event, session) => {
			console.log(event);
			if ((session !== null)) {
				dispatch(setCurrentUser({
					user: session.user,
					session: session,
					isLoggedIn: true
				}))
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