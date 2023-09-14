import React from 'react'

interface SuitabilityComponentProps {
    employment_status_list: string[];
    gender: string[];
    start_date: Date;
    pets_allowed: boolean;
    min_length_of_stay: number
};

const SuitabilityComponent: React.FC<SuitabilityComponentProps> = ({
    employment_status_list,
    gender,
    start_date,
    pets_allowed,
    min_length_of_stay

}) => {
    return (
        <>
            <div className='space-y-5 p-3 rounded-xl shadow-lg'>
                <div className='text-xl font-semibold'>
                    Suitability
                </div>

                <div className='grid grid-cols-1  text-md
								lg:grid-cols-2 gap-2 '>
                    <div>
                        <p className='font-semibold'>
                            Availability
                        </p>
                        <p>{(start_date)?.toString()}</p>
                    </div>
                    <div>
                        <p className='font-semibold'>Minimum</p>
                        <p>{min_length_of_stay} months</p>
                    </div>
                    <div>
                        <p className='font-semibold'>Pets allowed</p>
                        {
                            pets_allowed ? 'Yes' : 'No'
                        }
                    </div>
                    <div>
                        <p className='font-semibold'>Employment status</p>
                        <div className='flex space-x-1'>
                            <dd>{employment_status_list?.join(", ")}</dd>
                        </div>
                    </div>
                    <div>
                        <p className='font-semibold'>Suitble for</p>
                        <div className='flex space-x-1'>
                            <dd>{gender?.join(", ")}</dd>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default SuitabilityComponent