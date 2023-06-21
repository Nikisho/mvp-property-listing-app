import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  function navigateHomePage() {
    navigate(`/`);
  };
  function navigatePostListingPage() {
    navigate(`/postlisting`);
  };

  return (
    <div className=' flex p-3 bg-emerald-200 justify-between items-center'>
      {/* {git test} */}
      {/* Company logo and home button */}
      <div className='text-xl font-semibold px-3 py-2 bg-white rounded-xl shadow-lg hover:opacity-80' onClick={() => navigateHomePage()}>
        <text>Company</text>
      </div>

      {/* search bar */}
      <div className='hidden md:flex flex-row bg-white p-3 px-3 shadow-lg rounded-full space-x-2 hover:animate-pulse'>

        <div className='px-3 border-r font-semibold'>Where</div>
        <div className='px-3 font-semibold'>When</div>
      </div>

      {/* Options and proile button */}
      <div className='flex space-x-4 items-center'>
        <text className='hover:text-blue-400' onClick={() => navigatePostListingPage()}>Post a listing</text>
        <AccountCircleIcon
          fontSize='large'
          className='hover:opacity-20'
        />
      </div>

    </div>
  )
}

export default Header