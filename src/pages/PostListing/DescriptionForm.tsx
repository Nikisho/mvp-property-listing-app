import React from 'react'

interface FormData {
	roomDescription: string;
	adTitle: string;
};

interface DescriptionFormProps extends FormData {
	updateFields: (fields: Partial<FormData>) => void;
};

const DescriptionForm: React.FC<DescriptionFormProps> = ({
	roomDescription,
	adTitle,
	updateFields
}) => {
	return (
		<>
			<div className='flex justify-center h-full'>
				<div className='flex flex-col text-lg space-y-2 p-4 w-full 
								xl:p-1'>
					<div>
						Title
					</div>
					<textarea placeholder="Enter a title for your ad"
						className="rounded-lg p-2 border h-1/4 text-sm "
						name='adTitle'
						id='adTitle'
						value={adTitle}
						onChange={e => updateFields({ adTitle: e.target.value })}
					/>
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