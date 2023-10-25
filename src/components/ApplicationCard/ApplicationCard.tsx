import React from 'react';
import camelCaseToTextCase from '../../utils/camelCaseToTitleCase';
import { currencyFormatter } from '../../utils/currencyFormat';

interface ApplicationCardProps {
    gender: string;
    employmentStatus: string;
    startDate: Date;
    lengthOfStay: number;
    parking: boolean;
    pets: boolean;
    salaryRange: string;
    budget: number;
}

export const ApplicationCard: React.FC<ApplicationCardProps> = ({
    gender,
    employmentStatus,
    startDate,
    lengthOfStay,
    parking,
    pets,
    salaryRange,
    budget,
}) => {
    return (
        <div className='shadow-lg rounded-xl w-full bg-white p-4 space-y-2'>
            <p className='text-lg font-semibold'>Application Details</p>
            <div className='grid grid-cols-1 gap-y-4 
                            lg:grid-cols-2 
                            xl:grid-cols-3'>
                <div>
                <p className='text-sm'>Sex</p>

                    {(gender && camelCaseToTextCase(gender))}
                </div>
                <div>
                <p className='text-sm'>Employment status</p>
                    {(employmentStatus && camelCaseToTextCase(employmentStatus))}
                </div>
                <div>
                <p className='text-sm'>Ideal move-in date</p>

                    {startDate?.toString()}
                </div>
                <div>
                    <p className='text-sm'>Length of stay</p>
                    {lengthOfStay} months
                </div>
                <div>
                <p className='text-sm'>Requires parking</p>

                    {parking === true ? 'Yes' : 'No'}
                </div>
                <div>
                <p className='text-sm'>Has pets</p>

                    {pets === true ? 'Yes' : 'No'}
                </div>
                <div>
                <p className='text-sm'>Salary range</p>
                    £{salaryRange}
                </div>
                <div>
                <p className='text-sm'>Maximum budget</p>
                    {currencyFormatter('currency', 'GBP').format(budget)}
                </div>
            </div>
        </div>
    )
}
