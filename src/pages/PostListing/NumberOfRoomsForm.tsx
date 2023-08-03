import React from 'react'
interface FormData {
    numberOfRooms: string;
    numberOfBathrooms: string;
};

interface NumberOfRoomsFormProps extends FormData {
    updateFields: (fields: Partial<FormData>) => void;
}
const NumberOfRoomsForm: React.FC<NumberOfRoomsFormProps> = ({ numberOfRooms, numberOfBathrooms, updateFields }) => {
    return (
        <>
            <div className='flex justify-center'>
                <div className='text-lg font-semibold'>Please specify the number of rooms</div>
            </div>

            <div className='flex flex-col h-full justify-center items-center text-lg font-semibold '>

                <div className='flex space-x-16 xl:w-1/2 justify-center items-center shadow-lg rounded-lg p-1'>

                    <div>Bedrooms:  </div>
                    <input type="number"
                        min={1}
                        placeholder="1"
                        className=" p-2 border w-1/5 h-2/3 flex justify-end "
                        name='numberOfBathrooms'
                        id='numberOfBathrooms'
                        value={numberOfRooms}
                        onChange={e => updateFields({ numberOfRooms: e.target.value })}
                        required
                    />
                </div>

                <div className='flex space-x-16 xl:w-1/2  justify-center items-center shadow-lg rounded-lg p-1'>

                    <div>Bathrooms: </div>
                    <input type="number"
                        min={1}
                        placeholder="1"
                        className=" p-2 border w-1/5 h-2/3  "
                        name='numberOfBathrooms'
                        id='numberOfBathrooms'
                        value={numberOfBathrooms}
                        onChange={e => updateFields({ numberOfBathrooms: e.target.value })}
                        required
                    />
                </div>



            </div>
        </>
    )
}

export default NumberOfRoomsForm