import React, { useEffect, useState } from 'react'
import camelCaseToTextCase from '../../utils/camelCaseToTitleCase';
interface FormData {
	livingRoom: boolean;
	wifi: boolean;
	parking: boolean;
	terraceOrBalcony: boolean;
	gardenOrPatio: boolean;
	disabledAccess: boolean;
	washingMachine: boolean;
	garage: boolean;
};

interface AmenitiesFormProps extends FormData {
	updateFields: (fields: Partial<FormData>) => void;
};

interface AmenityProps {
	amenityValue: boolean;
	amenity: string;
	title: string;
	handleClick: (e: React.MouseEvent<HTMLButtonElement>, bool: boolean) => void;
}
const AmenitiesComponent: React.FC<AmenityProps> = ({
	amenityValue,
	amenity,
	title,
	handleClick,
}) => {
	return (
		<div className='flex items-center space-x-4 justify-between'>
			<div>
				{title}
			</div>
			<div className='border flex justify-end items-center '>
				<button className={` w-10 border   ${amenityValue && 'bg-sky-500'}`}
					name={amenity}
					onClick={(e) => handleClick(e, true)}
					type="button"
				>Yes</button>
				<button className={` w-10 border   ${!amenityValue && 'bg-sky-500'}`}
					name={amenity}
					onClick={(e) => handleClick(e, false)}
					type="button"
				>No</button>
			</div>
		</div>
	);
};

const AmenitiesForm: React.FC<AmenitiesFormProps> = ({
	livingRoom,
	wifi,
	parking,
	terraceOrBalcony,
	gardenOrPatio,
	disabledAccess,
	washingMachine,
	garage,
	updateFields

}) => {

	const [amenities, setAmenities] = useState({
		livingRoom: livingRoom,
		wifi: wifi,
		parking: parking,
		terraceOrBalcony: terraceOrBalcony,
		gardenOrPatio: gardenOrPatio,
		disabledAccess: disabledAccess,
		washingMachine: washingMachine,
		garage: garage,
	});

	const handleClick = (e: React.MouseEvent<HTMLButtonElement>, bool: boolean) => {
		setAmenities({ ...amenities, [(e.target as HTMLInputElement).name]: bool })
	}

	useEffect(() => {
		updateFields({
			...amenities,
		  })
	}, [amenities]);
	console.log(amenities)
	return (
		<>
			<div className='flex justify-center'>
				<div className='flex flex-col h-full justify-center text-lg space-y-2 border p-4 rounded-xl shadow-lg '>
					{Object.keys(amenities)?.map((amenity) => (
						<AmenitiesComponent
							amenityValue={amenities[amenity as keyof FormData]}
							amenity={amenity}
							title={camelCaseToTextCase(amenity)}
							handleClick={handleClick}
						/>
					))}
				</div>
			</div>
		</>
	)
}
export default AmenitiesForm