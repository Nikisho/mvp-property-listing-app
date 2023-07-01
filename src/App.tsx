import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { LoginPage, HomePage, PropertyDetailsPage, PostListingPage, SigninPage } from './pages'
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
      path: "/propertydetails/:id",
      element: <PropertyDetailsPage />,
    },
    {
      path: "/postlisting",
      element: <PostListingPage />,
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
  ])
  //--watches auth state--//
  useEffect(() => {
    auth.onAuthStateChanged(() => {
      setUser(auth.currentUser);
    })
  }, []);
  
  if (!user) return (
    <>
    <RouterProvider router={loginRouter}/>
    </>
  )

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
