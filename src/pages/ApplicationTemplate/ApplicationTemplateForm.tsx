import React, { useEffect, useState } from 'react';
import { Header } from '../../components';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { supabase } from '../../../supabase';
import { useNavigate, useParams } from 'react-router-dom';
import convertUrlsToJSON from '../../utils/convertUrlsToJSON';
import { currencyFormatter } from '../../utils/currencyFormat';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../context/navSlice';

interface PropertyDataProps {
    ad_title: string;
    price_pcm: number;
    pm_user_id: number;
    address: {
        label: string;
    };
    image_arr: string[];
};

const ApplicationTemplateForm = () => {

    const [forApplicantOnly, setForApplicantOnly] = useState<boolean>(true);
    const [lengthOfStay, setLengthOfStay] = useState<number>(6);
    const [parkingRequired, setParkingRequired] = useState<boolean>(false);
    const [salaryRange, setSalaryRange] = useState<string|null>(null);
    const [budget, setBudget] = useState<string | null>(null);
    const [startDate, setStartDate] = useState(new Date());
    const { property_id } = useParams();
    const [roomData, setRoomData] = useState<PropertyDataProps>();
    const [employmentStatus, setEmploymentStatus] = useState<string| null>(null);
    const [hasPets, setHasPets] = useState<boolean>(false);
    const currentUser = useSelector(selectCurrentUser);
    
    const fetchPropertyData = async () => {

        const { data, error } = await supabase
            .from('listed_properties')
            .select('address, price_pcm, image_arr, ad_title,pm_user_id')
            .eq('property_id', property_id);

        if (data) setRoomData(data![0]);
        if (error) {
            console.error(error.message);
        }
    };

    const handleSubmit = async (e: React.MouseEvent) => {
        e.preventDefault();
        if (!employmentStatus) {
            alert('Select your employment status');
            return;
        };
        if (!salaryRange) {
            alert('Select your salary range');
            return;
        };
        if (!budget) {
            alert('Please specify a budget');
            return;
        };
        const { error } = await supabase
        .from('tenancy_applications')
        .insert(
            {
                property_id: property_id,
                pm_user_id: roomData?.pm_user_id,
                tenant_id: currentUser.technicalKey,
                length_of_stay: lengthOfStay,
                parking_required: parkingRequired,
                budget: budget,
                start_date: startDate,
                employment_status: employmentStatus,
                salary_range: salaryRange,
                pets: hasPets,
                just_for_applicant: forApplicantOnly
            }
        );
        if (error) console.error(error.message);
    };

    useEffect(() => {
        fetchPropertyData();
    }, []);

    return (
        <>
            <Header />
            <div className='flex justify-center'>
                <form className='p-3 rounded-xl shadow-lg space-y-3
                                w-full 
                                xl:w-1/2 '>

                    <div className='border-b py-2'>
                        <p className='text-xl font-semibold '>Application form</p>
                        <div className='flex p-2 my-2 space-y-2 rounded-lg shadow-lg border'>
                            {roomData?.image_arr[0] && (
                                <img
                                    src={convertUrlsToJSON(roomData?.image_arr[0]!)}
                                    className='w-1/3 rounded-lg'
                                />
                            )
                            }
                            <div>
                                <p className='mx-2'>
                                    {roomData?.address.label}
                                </p>
                                <p className='mx-2'>
                                    {roomData?.ad_title}
                                </p>
                                <p className='mx-2'>
                                    {currencyFormatter('currency', 'GBP').format(roomData?.price_pcm!)} pcm
                                </p>
                            </div>

                        </div>
                    </div>
                    <div className='space-y-3'>

                        <p>
                            When are you planning to move in?
                        </p>
                        <DatePicker className='p-2 border' selected={startDate} onChange={(date) => setStartDate(date as Date)} />
                    </div>
                    <div className='space-y-3'>
                        <p>
                            What is employment status?
                        </p>
                        <div className='grid place-items-start'>
                            <div className='grid grid-cols-2 lg:grid-cols-3 '>
                                <button className={` w-36 border p-1   ${employmentStatus === 'full time' && 'bg-sky-500'}`}
                                    onClick={() => setEmploymentStatus('full time')}
                                    type="button"
                                > Full time</button>
                                <button className={` w-36 border p-1   ${employmentStatus === 'part time' && 'bg-sky-500'}`}
                                    onClick={() => setEmploymentStatus('part time')}
                                    type="button"
                                >Part time</button>
                                <button className={` w-36 border p-1   ${employmentStatus === 'zero hours' && 'bg-sky-500'}`}
                                    onClick={() => setEmploymentStatus('zero hours')}
                                    type="button"
                                >Zero hours</button>
                                <button className={` w-36 border p-1  ${employmentStatus === 'unemployed' && 'bg-sky-500'}`}
                                    onClick={() => setEmploymentStatus('unemployed')}
                                    type="button"
                                >Unemployed</button>
                                <button className={` w-36 border p-1  ${employmentStatus === 'student' && 'bg-sky-500'}`}
                                    onClick={() => setEmploymentStatus('student')}
                                    type="button"
                                >Student</button>
                            </div>
                        </div>
                    </div>
                    <div className='space-y-3'>

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
                    <div className='space-y-3'>

                        <p>
                            Do you have any pets?
                        </p>
                        <div className='flex items-center py-2'>
                            <button className={` w-10 border   ${hasPets && 'bg-sky-500'}`}
                                onClick={() => setHasPets(true)}
                                type="button"
                            >Yes</button>
                            <button className={` w-10 border   ${!hasPets && 'bg-sky-500'}`}
                                onClick={() => setHasPets(false)}
                                type="button"
                            >No</button>
                        </div>
                    </div>
                    <div className='space-y-3'>

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
                    <div className='space-y-3'>
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
                    <div className='space-y-3'>
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
                    <div className='space-y-3'>
                        <p>
                            What is your budget?
                        </p>
                        <input
                            className='p-2 border'
                            type='number'
                            placeholder='Ex: 850'
                            value={budget as string}
                            onChange={e => setBudget(e.target.value)}
                            required
                        />
                    </div>
                    <div className='flex justify-end '>
                        <button 
                            type='submit'
                            onClick={handleSubmit}
                            className='p-2 rounded-sm bg-blue-400 text-white font-semibold hover:scale-90 transition duration-500'>
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default ApplicationTemplateForm