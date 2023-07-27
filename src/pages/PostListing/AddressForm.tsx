import React from 'react'
interface FormData {
    address: string;
};

interface AddressFormProps extends FormData {
    updateFields: (fields: Partial<FormData>) => void;
}
const AddressForm: React.FC<AddressFormProps> = ({ address, updateFields }) => {

    return (
        <>
            <div className='flex justify-center'>
                <div className='text-lg font-semibold'>What is the town and postcode?</div>
            </div>
            <div className='flex flex-col h-full justify-center items-center text-lg font-bold'>
                <div className='flex space-x-3 w-1/2 justify-center'>
                    <input className='p-3 rounded-xl border shadow-lg'
                        value={address}
                        onChange={e => updateFields({ address: e.target.value })}
                        required={true}
                    />
                </div>
            </div>
        </>
    )
}

export default AddressForm