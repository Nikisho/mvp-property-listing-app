import { useState } from 'react';
import { Header } from '../../components';
const ApplicationTemplateForm = () => {

    const [jobTitle, setJobTitle] = useState<string>('');
    const [forApplicantOnly, setForApplicantOnly] = useState<boolean>(true);
    const [lengthOfStay, setLengthOfStay] = useState<number>(3);
    const [parkingRequired, setParkingRequired] = useState<boolean>(true);
    const [salaryRange, setSalaryRange] = useState<string>();
    const [budget, setBudget] = useState<string>('500')
    console.log(forApplicantOnly);
    return (
        <>
            <Header />
            <div className='flex justify-center'>
                <div className='w-1/2 p-2 rounded-xl shadow-lg space-y-3'>

                    <div className='border-b py-2'>
                        <p className='text-xl font-semibold '>Application for room #</p>
                    </div>
                    <div>
                        When are you planning to move in?
                    </div>
                    <div>
                        <p>
                            What is your job title?
                        </p>
                        <input
                            className='p-2 border'
                            value={jobTitle}
                            onChange={e => setJobTitle(e.target.value)}
                        />
                    </div>
                    <div>
                        <p>
                            Is the property just for you?
                        </p>
                        <div className='flex items-center py-2'>
                            <button className={` w-10 border   ${forApplicantOnly && 'bg-sky-500'}`}
                                onClick={() => setForApplicantOnly(true)}
                                type="button"
                            >Yes</button>
                            <button className={` w-10 border   ${!forApplicantOnly && 'bg-sky-500'}`}
                                onClick={() => setForApplicantOnly(false)}
                                type="button"
                            >No</button>
                        </div>
                    </div>
                    <div>
                        <p>
                            How many months are you planning to stay?
                        </p>
                        <div className='flex items-center py-2'>
                            <button className={` w-12 border   ${lengthOfStay === 3 && 'bg-sky-500'}`}
                                onClick={() => setLengthOfStay(3)}
                                type="button"
                            >3 </button>
                            <button className={` w-12 border   ${lengthOfStay === 6 && 'bg-sky-500'}`}
                                onClick={() => setLengthOfStay(6)}
                                type="button"
                            >6 </button>
                            <button className={` w-12 border   ${lengthOfStay === 12 && 'bg-sky-500'}`}
                                onClick={() => setLengthOfStay(12)}
                                type="button"
                            >12</button>
                        </div>
                    </div>
                    <div>
                        <p>
                            Do you require parking?
                        </p>
                        <div className='flex items-center py-2'>
                            <button className={` w-10 border   ${parkingRequired && 'bg-sky-500'}`}
                                onClick={() => setParkingRequired(true)}
                                type="button"
                            >Yes</button>
                            <button className={` w-10 border   ${!parkingRequired && 'bg-sky-500'}`}
                                onClick={() => setParkingRequired(false)}
                                type="button"
                            >No</button>
                        </div>
                    </div>
                    <div>
                        <p>
                            What is your salary range?
                        </p>
                        <div className='flex flex-col py-2'>
                            <button className={` w-36 border p-1   ${salaryRange === '0-20000' && 'bg-sky-500'}`}
                                onClick={() => setSalaryRange('0-20000')}
                                type="button"
                            > Less than £20,000</button>
                            <button className={` w-36 border p-1   ${salaryRange === '20000-30000' && 'bg-sky-500'}`}
                                onClick={() => setSalaryRange('20000-30000')}
                                type="button"
                            >£20,001 - £30,000</button>
                            <button className={` w-36 border p-1   ${salaryRange === '30000-40000' && 'bg-sky-500'}`}
                                onClick={() => setSalaryRange('30000-40000')}
                                type="button"
                            >£30,001 - £40,000</button>
                            <button className={` w-36 border p-1  ${salaryRange === '40000<' && 'bg-sky-500'}`}
                                onClick={() => setSalaryRange('40000<')}
                                type="button"
                            >Over £40,000</button>
                        </div>
                    </div>
                    <div>
                        <p>
                            What is your budget?
                        </p>
                        <input
                            className='p-2 border'
                            type='number'
                            value={budget}
                            onChange={e => setBudget(e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ApplicationTemplateForm