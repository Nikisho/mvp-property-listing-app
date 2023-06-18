import React from 'react'

function ListingCard({listing}: any) {

  return (
    <div  className='m-6 bg-blue-200 border rounded-xl shadow-lg hover:scale-90 p-2'>
        {listing}
    </div>
  )
}

export default ListingCard