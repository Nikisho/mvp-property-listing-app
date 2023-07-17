import React from 'react'

const NumberOfRoomsForm = () => {
    return (
        <>
            <div className='flex justify-center'>
                <div className='text-lg font-semibold'>Please specify the number of rooms</div>
            </div>

            <div className='flex flex-col h-full justify-center items-center text-lg font-semibold '>
                <div className='flex space-x-16 w-1/2 justify-center items-center shadow-lg rounded-lg p-1'>

                    <div>Bathrooms: </div>
                    <input type="number"
                        placeholder="0"
                        className=" p-2 border w-1/5 "
                        name='numberOfBathrooms'
                        id='numberOfBathrooms'
                    />
                </div>

                <div className='flex space-x-16 w-1/2 justify-center items-center shadow-lg rounded-lg p-1'>

                    <div>Bedrooms:  </div>
                    <input type="number"
                        placeholder=""
                        className=" p-2 border w-1/5 "
                        name='numberOfBathrooms'
                        id='numberOfBathrooms'
                    />
                </div>


            </div>
        </>
    )
}

export default NumberOfRoomsForm