import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { supabase } from '../../../supabase';

interface pmDetailsProps {
    name: string;
    email: string;
    user_id: string;
};

function ProfilePage() {
    const [pmDetails, setPmDetails] = useState<pmDetailsProps>();
    const { user_id } = useParams();
    console.log(user_id);
    const getPropManagerDetails = async (pm_user_id: string) => {
        try {
            const { data, error } = await supabase
                .from('users')
                .select()
                .eq('user_id',`${pm_user_id}`);
            setPmDetails(data![0]);
        } catch (error: any) {
            console.error(error.message);
        }
    };
    useEffect(() => {
        getPropManagerDetails(user_id as string);
    },[]);

    return (
        <>
            <Header />
            <div>
                {pmDetails?.email}
            </div>
        </>
    )
}

export default ProfilePage