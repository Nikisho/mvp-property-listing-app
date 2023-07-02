import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Header from '../../components/Header';

interface pmDetailsProps {
    name: string;
    email: string;
    firebase_uid: string;
};

function ProfilePage() {
    const [pmDetails, setPmDetails] = useState<pmDetailsProps>();
    const { firebase_uid } = useParams();
    console.log(firebase_uid);
    const getPropManagerDetails = async (pm_firebase_uid: string) => {
        try {
            const response = await fetch(`http://localhost:5000/users/${pm_firebase_uid}`)
            const json_data = await response.json();
            setPmDetails(json_data);
        } catch (error: any) {
            console.error(error.message);
        }
    };
    useEffect(() => {
        getPropManagerDetails(firebase_uid as string);
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