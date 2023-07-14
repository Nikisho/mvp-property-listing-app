import React from 'react'
import { useMultistepForm } from '../../hooks/useMultiStepForm'
import { Header } from '../../components'
import PropertyTypeForm from './PropertyTypeForm'


const PostlistingPageNew = () => {
    const {
        steps,
        currentStepIndex,
        step
    } = useMultistepForm(
        [
           
            <div>test</div>,
            <PropertyTypeForm />,
        ]);
        console.log(currentStepIndex)
    return (
        <>
            <Header />
            <div className='flex justify-center'>
                <div className='bg-gray-200 w-1/2  rounded-xl shadow-lg hover:border hover:border-blue-200'>
                    {step}
                </div>
            </div>
        </>
    )
}

export default PostlistingPageNew