import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { LoginPage, HomePage } from './pages'


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
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>

  )
}

export default App
