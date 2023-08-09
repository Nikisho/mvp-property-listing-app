import React, { useState } from 'react'
import { useParams } from 'react-router-dom';

const SearchComponent = () => {
	// const {lat, lng, radius, min_price, max_price, min_room, max_room} = useParams();
    const [queriedParams, setQueriedParams] = useState({
        bedrooms: 'Any',
        radius: 'Any',
        location: 'London',
        price: 'Any'
    });

    const changeHandler = (e: { target: { name: string; value: string; }; }) => {
        setQueriedParams({ ...queriedParams, [e.target.name]: e.target.value })
    };
    console.log(queriedParams)
    return (
        <>
            {/* search bar */}
            {/* <div className='hidden w-1/3 h-18 bg-white md:flex flex-row p-3 px-3 shadow-lg rounded-md space-x-2 flex justify-between'> */}
            <div className='p-3'>

                <div className=' w-auto h-24 items-center bg-white md:flex flex-row p-3 px-3 shadow-lg rounded-md space-x-2 flex '>

                    <div className='space-y-3 px-3 flex-col w-1/4 font-semibold flex justify-center'>
                        <div>Location</div>
                        <input className='p-2 border' 
                            name="location" id='location' onChange={changeHandler}
                            placeholder='Area or Postcode'
                            
                        />
                    </div>
                    <div className='space-y-3 px-3 flex-col w-1/4 font-semibold flex justify-center'>
                        <div>Bedrooms</div>
                        <input className='p-2 border' 
                            type='number'
                            name="bedrooms" id='bedrooms' onChange={changeHandler}
                            placeholder='Any'
                        />
                    </div>                    
                    <div className='space-y-3 px-3 flex-col w-1/4 font-semibold flex justify-center'>
                        <div>Radius</div>
                        <input className='p-2 border' 
                            type='number'
                            name="radius" id='radius' onChange={changeHandler}
                            placeholder='Any'

                        />
                    </div>                    
                    <div className='space-y-3 px-3 flex-col w-1/4 font-semibold flex justify-center'>
                        <div>Price</div>
                        <input className='p-2 border' 
                            type='number'
                            name="price" id='price' onChange={changeHandler}
                            placeholder='Any'

                        />
                    </div>          

                    <button className='p-3 bg-blue-400 w-1/4 font-semibold text-white hover:bg-blue-500 flex rounded-md justify-center'>Search</button>

                </div>
            </div>
        </>
    )
}

export default SearchComponent