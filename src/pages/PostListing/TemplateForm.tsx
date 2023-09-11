import React, { useEffect, useState } from 'react'
import DatePicker from "react-datepicker";

interface FormData {

    petsAllowed: boolean;
    employmentStatus: string[];
    startDate: Date;
    gender: string[] | null;
}

interface TemplateFormProps extends FormData {
    updateFields: (fields: Partial<FormData>) => void;
};

const TemplateForm: React.FC<TemplateFormProps> = ({
    petsAllowed,
    employmentStatus,
    startDate,
    gender,
    updateFields

}) => {

    const [suitableFor, setSuitableFor] = useState({

        petsAllowed: petsAllowed,
        startDate: startDate,
        employmentStatus: employmentStatus,
        gender: gender,
    })
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>, bool: boolean | string) => {
        setSuitableFor({ ...suitableFor, [(e.target as HTMLInputElement).name]: bool })
    };
    function updateEmploymentStatus(employment: string): void {
        let arr = employmentStatus;
        if (suitableFor.employmentStatus.includes(employment)) {
            let index = suitableFor.employmentStatus.indexOf(employment)
            arr.splice(index, 1);
        } else {
            arr.push(employment);
        }
        setSuitableFor({ ...suitableFor, employmentStatus: arr });
        return;
    };
    function updateGender(selectedGender: string): void {
        let arr = gender;
        if ((suitableFor.gender as string[]).includes(selectedGender)) {
            let index = (suitableFor.gender as string[]).indexOf(selectedGender)
            arr.splice(index, 1);
        } else {
            arr.push(selectedGender);
        }
        setSuitableFor({ ...suitableFor, gender: arr });
        return;
    };

    useEffect(() => {
        updateFields({
            ...suitableFor,
        })
    }, [suitableFor]);
    return (
        <>
            <div className='flex justify-center'>
                <div className='text-lg font-semibold'>Specify who the property is suitable for</div>
            </div>
            <div className='space-y-3'>
                <p>
                    Available from?
                </p>
                <DatePicker className='p-2 border' selected={startDate} onChange={(date) => setSuitableFor({ ...suitableFor, startDate: date as Date })} />
            </div>
            <div>
                <p>Are pets allowed?</p>
                <div className='flex items-center py-2'>
                    <button className={` w-10 p-1 border   ${petsAllowed && 'bg-sky-500'}`}
                        onClick={(e) => handleClick(e, true)}
                        type="button"
                        name='petsAllowed'
                    >Yes</button>
                    <button className={` w-10 border p-1  ${!petsAllowed && 'bg-sky-500'}`}
                        onClick={(e) => handleClick(e, false)}
                        type="button"
                        name='petsAllowed'
                    >No</button>
                </div>
            </div>
            <div className='space-y-3'>
                <p>
                    Accepted employment types
                </p>
                <div className='grid place-items-start'>
                    <div className='grid grid-cols-2 lg:grid-cols-3 '>
                        <button className={` w-36 border p-1   ${employmentStatus.includes('full time') && 'bg-sky-500'}`}
                            onClick={() => updateEmploymentStatus('full time')}
                            type="button"
                        > Full time</button>
                        <button className={` w-36 border p-1   ${employmentStatus.includes('part time') && 'bg-sky-500'}`}
                            onClick={() => updateEmploymentStatus('part time')}
                            type="button"
                        >Part time</button>
                        <button className={` w-36 border p-1   ${employmentStatus.includes('zero hours') && 'bg-sky-500'}`}
                            onClick={() => updateEmploymentStatus('zero hours')}
                            type="button"
                        >Zero hours</button>
                        <button className={` w-36 border p-1  ${employmentStatus.includes('unemployed') && 'bg-sky-500'}`}
                            onClick={() => updateEmploymentStatus('unemployed')}
                            type="button"
                        >Unemployed</button>
                        <button className={` w-36 border p-1  ${employmentStatus.includes('student') && 'bg-sky-500'}`}
                            onClick={() => updateEmploymentStatus('student')}
                            type="button"
                        >Student</button>
                    </div>
                </div>
            </div>
            <div>
                <p>Suitable for</p>
                <div className='flex items-center py-2'>
                    <button className={` w-16  border p-1  ${suitableFor.gender?.includes('male') && 'bg-sky-500'}`}
                        onClick={() => updateGender('male')}
                        type="button"
                        name='gender'
                    >Male</button>
                    <button className={` w-16 p-1 border   ${suitableFor.gender?.includes('female') && 'bg-sky-500'}`}
                        onClick={() => updateGender('female')}
                        type="button"
                        name='gender'
                    >Female</button>
                </div>
            </div>
        </>
    )
}

export default TemplateForm