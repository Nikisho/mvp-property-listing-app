import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { LoginPage, HomePage, PropertyDetailsPage, PostListingPage } from './pages'


function App() {
  const router = createBrowserRouter([
    {
      path: "/Login",
      element: <LoginPage />,
    },
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/PropertyDetails/:id",
      element: <PropertyDetailsPage />,
    },
    {
      path: "/postlisting",
      element: <PostListingPage/>,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>

  )
}

export default App
