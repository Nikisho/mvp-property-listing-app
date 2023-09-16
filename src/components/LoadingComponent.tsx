import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface LoadingComponentProps {
    page: string;
};

const LoadingComponent:React.FC<LoadingComponentProps> =  ({page}) => {
    
    const navigation = useNavigate();
    const delay = (ms: any )=> new Promise(res => setTimeout(res, ms));
    const navigateHomePage = async () => {
        await delay(2000);
        navigation(`/${page}`);
    }
    useEffect(() => {
        navigateHomePage();
    },[])
    return (
        <div className=" grid place-items-center h-screen bg-green-200">
            <div className="">
                <div className="w-20 h-20 border-b-2 border-gray-900 rounded-full animate-spin"></div>
            </div>
        </div>
    )
}

export default LoadingComponent