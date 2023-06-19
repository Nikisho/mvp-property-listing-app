import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Header() {
  return (
    <div className=' flex p-3 bg-emerald-200 justify-between items-center'>
      {/* {git test} */}
      {/* Company logo and home button */}
      <div className='text-xl font-semibold'>
        <text>Company</text>
      </div>

      {/* search bar */}
      <div className='flex flex-row bg-white p-3 px-3 shadow-lg rounded-full space-x-2 hover:animate-pulse'>

        <div className='px-3 border-r font-semibold'>Where</div>
        <div className='px-3 font-semibold'>When</div>
      </div>

      {/* Options and proile button */}
      <div className='flex space-x-4 items-center'>
        <text className='hover:text-blue-400'>Post a listing</text>
        <AccountCircleIcon
          fontSize='large'
          className='hover:opacity-20'
        />
      </div>

    </div>
  )
}

export default Header