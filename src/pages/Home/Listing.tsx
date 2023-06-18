import React from 'react'

function Listing() {
  const items: Array<string> = ['obj1', 'obj2', 'obj3', 'obj4', 'obj5', 'obj6']
  return (
    <div className=' p-2 grid place-items-center '>
      <div className=' grid grid-cols-3 justify-between w-3/5 h-screen space-x-2 space-y-2'>
        {items.map((item) => <p className='bg-blue-200 border rounded-xl shadow-lg hover:scale-90'>{item}</p>)}
      </div>
    </div>
  )
}

export default Listing