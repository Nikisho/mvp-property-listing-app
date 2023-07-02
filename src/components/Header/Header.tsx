import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../../firebase';

function Header() {
  const navigate = useNavigate();
  function navigateHomePage() {
    navigate(`/`);
  };
  function navigatePostListingPage() {
    navigate(`/postlisting`);
  };
  const handleSignOut = () => {
    signOut(auth).then(() => {
      console.log('Signout Successsful');
      navigate(`/`);
    }).catch((error) => {
      console.error(error.message)
    });
  }


  return (
    <div className=' sticky top-0 z-50 flex p-3 bg-emerald-200 justify-between items-center'>
      {/* {git test} */}
      {/* Company logo and home button */}
      <div className='text-xl font-semibold px-3 py-2 bg-white rounded-xl shadow-lg hover:opacity-80' onClick={() => navigateHomePage()}>
        <img
          src='https://firebasestorage.googleapis.com/v0/b/mvp-prop-listing-app.appspot.com/o/rentopialogo.png?alt=media&token=0c1367d4-67c6-4ba4-8f85-47c041f3e168'
          className='h-10'
        />
      </div>

      {/* search bar */}
      <div className='hidden md:flex flex-row bg-white p-3 px-3 shadow-lg rounded-full space-x-2 hover:animate-pulse'>

        <div className='px-3 border-r font-semibold'>Where</div>
        <div className='px-3 font-semibold'>When</div>
      </div>

      {/* Options and proile button */}
      <div className='flex space-x-4 items-center'>
        <text className='hover:text-blue-400' onClick={() => navigatePostListingPage()}>Post a listing</text>
        <button onClick={handleSignOut}>
        <AccountCircleIcon
          fontSize='large'
          className='hover:opacity-20'
        />
        </button>
      </div>

    </div>
  )
}

export default Header