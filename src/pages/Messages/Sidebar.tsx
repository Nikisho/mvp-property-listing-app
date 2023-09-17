import { useEffect, useState } from 'react'
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
    const [applicants, setApplicants] = useState<applicantProps[]>();

    //Had an issue where when I fetched the object from redux
    //It was not updated in the store yet. So returned an empty array.
    //So I am using useEffect to rerender the component when the object
    //gets updated in the store. 
    const tenancyApplicationsReduxObject = useSelector(selectTenancyApplications);
    const [tenancyApplications, setTenancyApplicationsState] = useState(tenancyApplicationsReduxObject);
    //Making an array of the ids of each applicants. Here is have to filter the
    //Array of objects (applications) tenancyApplications to extract the ids.
    let tenancyApplicationsEditable = [...tenancyApplications];
    let applicantsId: number[] = tenancyApplicationsEditable?.map((applicant: { tenant_id: number }) => applicant.tenant_id);

    const handleClick = (id: number) => {
        const objIndex = tenancyApplications.findIndex(((applicant: { tenant_id: number }) => applicant.tenant_id === id));
        tenancyApplicationsEditable[objIndex] = {
            isRead: true,
            tenant_id: tenancyApplicationsEditable[objIndex].tenant_id,
        };
        dispatch(setTenancyApplications(tenancyApplicationsEditable))
    };

    //Returns the application in the array that matches the applicant id passed
    //as a parameter
    function isApplicationRead(id: number): boolean {
        const application = tenancyApplicationsEditable.filter((application: { tenant_id: number }) => {
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
        setTenancyApplicationsState(tenancyApplicationsReduxObject);
    }, [tenancyApplicationsReduxObject]);

    return (
        <>
            <div className='w-1/3 border-r  '>
                { 
                    applicants?.map((applicant) => (
                        <div className={`flex p-2 h-20 border-b border hover:bg-gray-100 items-center justify-between px-5`} key={applicant.user_id} onClick={() => handleClick(applicant.user_id)}>
                            <div className='flex space-x-5 items-center '>
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
                            {!isApplicationRead(applicant.user_id) && (
                                <div className=' p-1.5 justify-end bg-red-600 rounded-full animate-bounce '>

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