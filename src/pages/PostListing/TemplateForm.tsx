import React, { useState } from 'react'

const TemplateForm = () => {
    const [petsAllowed, setPetsAllowed] = useState<boolean>();
    return (
        <>
            <div className='flex justify-center'>
                <div className='text-lg font-semibold'>Specify who the property is suitable for</div>
            </div>
            <div>
                <p>Are pets allowed?</p>
                <div className='flex items-center py-2'>
                    <button className={` w-10 border   ${petsAllowed && 'bg-sky-500'}`}
                        onClick={() => setPetsAllowed(true)}
                        type="button"
                    >Yes</button>
                    <button className={` w-10 border   ${!petsAllowed && 'bg-sky-500'}`}
                        onClick={() => setPetsAllowed(false)}
                        type="button"
                    >No</button>
                </div>
            </div>
            <div>
                Are pets allowed?
            </div>
        </>
    )
}

export default TemplateForm