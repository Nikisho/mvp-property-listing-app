import React from 'react'

interface FormData {
	roomDescription: string;
};

interface DescriptionFormProps extends FormData {
	updateFields: (fields: Partial<FormData>) => void;
};

const DescriptionForm: React.FC<DescriptionFormProps> = ({
	roomDescription,
	updateFields
}) => {
	return (
		<>
			<div className='flex justify-center h-full'>
				<div className='flex flex-col text-lg space-y-2 p-4 w-full 
								xl:p-1'>
					<div>
						Description
					</div>
					<textarea placeholder="Add a description"
						className="rounded-xl p-2 border h-full text-sm "
						name='roomDescription'
						id='roomDescription'
						value={roomDescription}
						onChange={e => updateFields({ roomDescription: e.target.value })}
					/>
				</div>
			</div>
		</>
	)
}

export default DescriptionForm