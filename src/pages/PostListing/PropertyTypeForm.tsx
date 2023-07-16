import React, { useState } from 'react'

interface FormData {
	propertyType: string;
}
interface PropertyTypeFormProps extends FormData {
	updateFields: (fields: Partial<FormData>) => void;
}

const PropertyTypeForm: React.FC<PropertyTypeFormProps> = ({ propertyType, updateFields }) => {
	const [selectedType, setSelectedType] = useState<string>();
	function clickFlat(e: React.MouseEvent) {
		e.preventDefault();
		setSelectedType('Flat');
		updateFields({propertyType: selectedType})
	};

	function clickHouse(e: React.MouseEvent) {
		e.preventDefault();
		setSelectedType('House');
		updateFields({propertyType: selectedType})
	};

	propertyType = selectedType as string;

	return (
		<>
			<div className='flex justify-center'>
				<div className='text-lg font-semibold'>What type of property are you advertising?</div>
			</div>
			<div className='flex flex-col h-full justify-center items-center text-lg font-bold'>
				<div className='flex space-x-3 h-1/3 w-1/2 justify-center'>
					<button className={`p-4 rounded-lg bg-blue-300 w-1/2  ${selectedType === 'Flat' && 'bg-blue-700 hover:animate-none'}`}
						onClick={clickFlat}
					>
						Flat
					</button>
					<button className={`p-4 rounded-lg bg-blue-300 w-1/2 ${selectedType === 'House' && 'bg-blue-700 hover:animate-none'}`}
						onClick={clickHouse}>
						House
					</button>
				</div>
			</div>
		</>

	)
}

export default PropertyTypeForm