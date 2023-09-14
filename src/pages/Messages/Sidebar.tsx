import React, { useEffect, useState } from 'react'
import { supabase } from '../../../supabase'
import { useDispatch, useSelector } from 'react-redux';
import { selectTenancyApplications, setTenancyApplications } from '../../context/navSlice';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

interface applicantProps {
    name: string;
    image_url: string;
    user_id: number;
};

const Sidebar = () => {
    const dispatch = useDispatch();
    const tenancyApplications = useSelector(selectTenancyApplications);

    //Redux object is read-only so here I am using the spread
    //syntax to copy the array into an editable array.
    let tenancyApplicationsEditable = [...tenancyApplications];
    const [applicants, setApplicants] = useState<applicantProps[]>();

    //Making an array of the ids of each applicants. Here is have to filter the
    //Array of objects (applications) tenancyApplications to extract the ids.
    let applicantsId: number[] = tenancyApplications.map((applicant: { tenant_id: number }) => applicant.tenant_id);
    applicantsId = [...new Set(applicantsId)];

    
    const handleClick = (id: number) => {
        const objIndex = tenancyApplications.findIndex(((applicant: { tenant_id: number }) => applicant.tenant_id === id));
        tenancyApplicationsEditable[objIndex] = {
            isRead: true,
            tenant_id: tenancyApplications[objIndex].tenant_id,
        };
        dispatch(setTenancyApplications(tenancyApplicationsEditable))
    };

    //Returns the application in the array that matches the applicant id passed
    //as a parameter
    function filterApplicationArrayRedux(id: number): boolean {
        const application = tenancyApplications.filter((application: { tenant_id: number }) => {
            return application.tenant_id === id;
        });
        return application[0].isRead;
    };

    const fetchApplicantsData = async () => {
        const { data, error } = await supabase
            .from('users')
            .select('name, image_url, user_id')
            .in('user_id', applicantsId)
        if (error) console.error(error.message);
        setApplicants(data!)
    };

    useEffect(() => {
        fetchApplicantsData();
    }, []);

    return (
        <>
            <div className='w-1/3 border-r  '>
                {
                    applicants?.map((applicant) => (
                        <div className={`flex p-2 h-20 border-b border hover:bg-gray-100 items-center justify-between`} key={applicant.user_id} onClick={() => handleClick(applicant.user_id)}>
                            <div className='flex space-x-5 items-center'>
                                <div>
                                    {
                                        applicant.image_url ?
                                            <img
                                                src={applicant.image_url}
                                                className='rounded-full h-10 w-10'
                                            />
                                            :
                                            <AccountCircleIcon
                                                sx={{ fontSize: 45 }}
                                                className='hover:opacity-20'
                                            />
                                    }
                                </div>
                                <div className='text-lg'>
                                    {applicant.name}
                                </div>
                            </div>
                            {!filterApplicationArrayRedux(applicant.user_id) && (
                                <div className=' p-1 justify-end bg-red-600 rounded-full animate-pulse '>

                                </div>
                            )
                            }
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default Sidebar