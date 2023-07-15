import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import {  PropertyDetailsPage  } from './pages'
// import { auth } from '../firebase';
// import { useEffect, useState } from 'react';
// import { User } from 'firebase/auth';

function App() {
	// const [user, setUser] = useState<User | null>(null);
	const router = createBrowserRouter([
		{
			path: "/propertydetails",
			element:<PropertyDetailsPage />,
		},
		// {
		// 	path: "/login",
		// 	element: <LoginPage />,
		// },
		// {
		// 	path: '/signin',
		// 	element: <SigninPage />
		// },
		// {
		// 	path: "/propertydetails/:property_id",
		// 	element: <PropertyDetailsPage />,
		// },
		// {
		// 	path: "/postlisting",
		// 	element: <PostListingPage />,
		// },
		// {
		// 	path: "/profilepage/:user_id",
		// 	element: <ProfilePage />,
		// },
		// {
		// 	path: "/mylistings",
		// 	element: <UserListingsPage />,
		// },
	]);

	// const loginRouter = createBrowserRouter([

	// 	{
	// 		path: "/",
	// 		element: <SigninPage />,
	// 	},
	// 	{
	// 		path: '/login',
	// 		element: <LoginPage />
	// 	},
	// 	{
	// 		path: '*',
	// 		element: <SigninPage />
	// 	},
	// ])
	//--watches auth state--//
	// useEffect(() => {
	// 	auth.onAuthStateChanged(() => {
	// 		setUser(auth.currentUser);
	// 	})
	// }, [auth.currentUser]);

	// if (!user) return (
	// 	<>
	// 		<RouterProvider router={loginRouter} fallbackElement={<SigninPage />} />
	// 	</>
	// )

	return (
		<>
			<RouterProvider router={router} />
		</>
	)
}

export default App
