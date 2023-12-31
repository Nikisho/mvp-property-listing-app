import React, { useState } from 'react'

interface FormData {
	propertyType: string;
}
interface PropertyTypeFormProps extends FormData {
	updateFields: (fields: Partial<FormData>) => void;
}

const PropertyTypeForm: React.FC<PropertyTypeFormProps> = ({ propertyType, updateFields }) => {
	const [selectedType, setSelectedType] = useState<string>(propertyType);

	function handleClick(e: React.MouseEvent, propertyType: string) {
		e.preventDefault();
		updateFields({propertyType: propertyType});
		setSelectedType(propertyType);
	};
	
	return (
		<>
			<div className='flex justify-center '>
				<div className='text-lg font-semibold'>What type of property are you advertising?</div>
			</div>
			<div className='flex flex-col h-full justify-center items-center text-lg font-bold '>
				<div className='flex space-x-3 justify-center
								w-full h-1/4
								xl:h-1/3 xl:w-1/2 
				'>
					<button className={`p-4 rounded-lg bg-blue-300 w-1/2  ${selectedType === 'Flat' && 'bg-blue-700 hover:animate-none'}`}
						onClick={(e) => handleClick(e,'Flat')}
					>
						Flat
					</button>
					<button className={`p-4 rounded-lg bg-blue-300 w-1/2 ${selectedType === 'House' && 'bg-blue-700 hover:animate-none'}`}
						onClick={(e) => handleClick(e,'House')}>
						House
					</button>
				</div>
			</div>
		</>

	)
}

export default PropertyTypeForm