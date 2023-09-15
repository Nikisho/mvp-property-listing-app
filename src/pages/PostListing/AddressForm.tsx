import React, { useEffect, useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import { Option } from 'react-google-places-autocomplete/build/types';

interface FormData {
    address: Option | null;
};
interface AddressFormProps extends FormData {
    updateFields: (fields: Partial<FormData>) => void;
}

const AddressForm: React.FC<AddressFormProps> = ({ address, updateFields }) => {
    const [value, setValue] = useState<Option | null>(address);
    const updateAddressObject = async (selectedAddress: any) => {
        setValue(selectedAddress);
        geocodeByAddress(selectedAddress?.label)
        .then(results => getLatLng(results[0]))
        .then(({ lat, lng }) => (
                setValue( (state: any) => ({
                    ...state,
                    coordinates: {lat,lng}
                }))
            )
        );
    }

    useEffect(() => { 
        updateFields({ address: value as Option });
    }, [value]);

    return (
        <>
            <div className='flex justify-center'>
                <div className='text-lg font-semibold'>What is the town and postcode?</div>
            </div>
            <div className='flex flex-col h-full justify-center items-center text-lg font-bold'>
                <div className='flex space-x-3 justify-center
                                w-full
                                md:w-1/2
                                xl:w-1/2
                                '
                >
                    <div className='p-3 rounded-xl border shadow-lg w-full text-sm'>

                        <GooglePlacesAutocomplete
                            apiKey={import.meta.env.VITE_GOOGLE_MAPS_APIKEY}
                            apiOptions={{ language: 'en', region: 'UK' }}
                            selectProps={{
                                value,
                                onChange: e => updateAddressObject(e),
                            }}
                            debounce={500}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddressForm