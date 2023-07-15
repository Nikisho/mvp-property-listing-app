import React, { useState } from 'react'

interface FormData {
  propertyType: string;
}
interface PropertyTypeFormProps extends FormData {
  updateFields: (fields: Partial<FormData>) => void;
}

const PropertyTypeForm: React.FC<PropertyTypeFormProps> = ({ propertyType, updateFields }) => {
  const [selectFlat, setSelectFlat] = useState(false);
  const [selectHouse, setSelectHouse] = useState(false);

  function clickFlat(e: React.MouseEvent) {
    e.preventDefault();
    if (selectHouse) {
      setSelectHouse(false);
    }
    setSelectFlat(true);
    updateFields({propertyType: "Flat"})
  };

  function clickHouse(e: React.MouseEvent) {
    e.preventDefault();
    if (selectFlat) {
      setSelectFlat(false);
    }
    setSelectHouse(true);
    updateFields({propertyType: "House"})

  };
  return (
    <>
      <div className='flex justify-center'>
        <div className='text-lg font-semibold'>What type of property are you advertising?</div>
      </div>
      <div className='flex flex-col h-full justify-center items-center text-lg font-bold'>
        <div className='flex space-x-3 h-1/3 w-1/2 justify-center'>
          <button className={`p-4 rounded-lg bg-blue-300 w-1/2 hover:animate-pulse ${selectFlat && 'bg-blue-500 hover:animate-none'}`  }
          onClick={clickFlat}
          >
            Flat
          </button>
          <button className={`p-4 rounded-lg bg-blue-300 w-1/2 hover:animate-pulse ${selectHouse && 'bg-blue-500 hover:animate-none'}`  }
            onClick={clickHouse}>
            House
          </button>
        </div>

      </div>
    </>

  )
}

export default PropertyTypeForm