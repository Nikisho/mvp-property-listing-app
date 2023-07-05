import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { LoginPage, HomePage, PropertyDetailsPage, PostListingPage, SigninPage, ProfilePage, UserListingsPage, LoaderPage } from './pages'
import { auth } from '../firebase';
import { useEffect, useState } from 'react';
import { User } from 'firebase/auth';

function App() {
	const [user, setUser] = useState<User | null>(null);
	const router = createBrowserRouter([
		{
			path: "/",
			element: <HomePage />,
		},
		{
			path: "/login",
			element: <LoginPage />,
		},
		{
			path: '/signin',
			element: <SigninPage />
		},
		{
			path: "/propertydetails/:property_id",
			element: <PropertyDetailsPage />,
		},
		{
			path: "/postlisting",
			element: <PostListingPage />,
		},
		{
			path: "/profilepage/:user_id",
			element: <ProfilePage />,
		},
		{
			path: "/mylistings",
			element: <UserListingsPage />,
		},
		{
			path: '/test',
			element: <LoaderPage />
		},
	]);

	const loginRouter = createBrowserRouter([

		{
			path: "/",
			element: <SigninPage />,
		},
		{
			path: '/login',
			element: <LoginPage />
		},
		{
			path: '*',
			element: <LoaderPage />
		},
	])
	//--watches auth state--//
	useEffect(() => {
		auth.onAuthStateChanged(() => {
			setUser(auth.currentUser);
		})
	}, []);

	if (!user) return (
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
