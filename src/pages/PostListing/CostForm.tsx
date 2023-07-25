import React, { useState } from 'react'
interface FormData {
	costOfRoom: string;
	deposit: string;
	billsIncluded: string;
};

interface CostFormProps extends FormData {
	updateFields: (fields: Partial<FormData>) => void;
};

const CostForm: React.FC<CostFormProps> = ({
	costOfRoom,
	deposit,
	billsIncluded,
	updateFields
}) => {
	const [selectedBillsIncluded, setSelectedBillsIncluded] = useState<string>(billsIncluded);

	const handleClick = (e: React.MouseEvent, AreTheBillsIncluded: string) => {
		e.preventDefault();
		updateFields({billsIncluded: AreTheBillsIncluded});
		setSelectedBillsIncluded(AreTheBillsIncluded);
	};

	return (
		<>
			<div>

			</div>
			<div className='flex justify-center'>

				<div className='flex flex-col h-full justify-center text-lg'>

					<div>
						<div>
							Price
						</div>
						<input
							className=" p-3 rounded-lg border h-10 shadow-lg  "
							type='number'
							value={costOfRoom}
							onChange={e => updateFields({ costOfRoom: e.target.value })}
							/>
					</div>
					<div>
						<div>
							Deposit
						</div>
						<input
							className=" p-3 rounded-lg border h-10 shadow-lg  "
							type='number'
							value={deposit}
							onChange={e => updateFields({ deposit: e.target.value })}
							/>
					</div>
					<div className=''>
						<div>
							Bills included
						</div>
						<div className='border flex justify-between items-center'>
							<button className={` h-10 border w-full  ${selectedBillsIncluded === 'Yes' && 'bg-sky-500'}`}	
									onClick={(e) => handleClick(e, 'Yes')}>Yes</button>
							<button className={` h-10 border w-full  ${selectedBillsIncluded === 'Some' && 'bg-sky-500'}`} 
									onClick={(e) => handleClick(e, 'Some')}>Some</button>
							<button className={` h-10 border w-full  ${selectedBillsIncluded === 'No' && 'bg-sky-500'}`} 
									onClick={(e) => handleClick(e, 'No')}>No</button>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default CostForm