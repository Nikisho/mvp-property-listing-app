import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Header() {
  return (
    <div className='flex p-3 py-5 bg-emerald-200 justify-between'>
        <div className='text-xl font-bold'>
            <text>Company</text>
        </div>

        <div className='flex'>

            <text>Post a listing</text>

            {/* <AccountCircleIcon 
                color='primary'
                fontSize='large'
               
            /> */}
        </div>
    </div>
  )
}

export default Header