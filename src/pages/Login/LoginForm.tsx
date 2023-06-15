import React from 'react'

function LoginForm() {
  return (
    <div className='pt-4 grid place-items-center '>
      <form className='space-y-6 w-1/3'>
        <div className='flex flex-col'>
          <label className='self-start text-xl '><b>Name</b> </label>
          <input className='h-10 border p-2' type="text" name="uname" required placeholder='Enter Your Name' />
          {/* {renderErrorMessage("uname")} */}
        </div>
        <div className='flex flex-col' >
          <label className='self-start text-xl '><b>Password</b> </label>
          <input className='h-10 border p-2' type="password" name="pass" required placeholder='Enter Password' />
          {/* {renderErrorMessage("pass")} */}
        </div>
        <div className='bg-green-400 rounded-xl p-3'>
          <input type="submit" />
        </div>
      </form>
    </div>
  )
}

export default LoginForm