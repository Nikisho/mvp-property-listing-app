import React from 'react'

interface SuitabilityComponentProps {
    employment_status_list: string[];
    gender: string[];
    startDate: Date;
    petsAllowed: boolean;
};

const SuitabilityComponent: React.FC<SuitabilityComponentProps> = ({
    employment_status_list,
    gender,
    startDate,
    petsAllowed,
}) => {
    return (
        <>
            <div className='space-y-5 p-3 rounded-xl shadow-lg'>
                <div className='text-xl font-semibold'>
                    Suitability
                </div>
            </div>

        </>
    )
}

export default SuitabilityComponent