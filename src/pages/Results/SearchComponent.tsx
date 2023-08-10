import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import { useNavigate, useParams } from 'react-router-dom';

const SearchComponent = () => {
    // const {lat, lng, radius, min_price, max_price, min_room, max_room} = useParams();
    const { lat, lng, radius, min_price, location, min_room } = useParams();
    const navigate = useNavigate();
    const [queriedParams, setQueriedParams] = useState({
        min_bedrooms: min_room,
        max_bedrooms: 'Any',
        radius: radius,
        location: location,
        min_price: min_price,
        max_price: 'No max',
        lat: lat,
        lng: lng
    });

    const changeHandler = (e: { target: { name: string; value: string; }; }) => {
        setQueriedParams({ ...queriedParams, [e.target.name]: e.target.value })
    };
    const queryLocation = async (selectedAddress: any) => {

        geocodeByAddress(selectedAddress?.label)
        .then(results => getLatLng(results[0]))
        .then(({ lat, lng }) => (
                setQueriedParams((state: any) => ({
                    ...state,
                    lat: lat,
                    lng: lng,
                    location: selectedAddress.label
                }))
            )
        )
    };
    const handleClick = (e: React.MouseEvent) => {
        navigate(`/results/${queriedParams.lat}/${queriedParams.lng}/${queriedParams.location}/${queriedParams.radius}/${queriedParams.min_price}/${queriedParams.max_price}/${queriedParams.min_bedrooms}/${queriedParams.min_bedrooms}`)
    };

    return (
        <>
            {/* search bar */}
            {/* <div className='hidden w-1/3 h-18 bg-white md:flex flex-row p-3 px-2 shadow-lg rounded-md space-x-2 flex justify-between'> */}
            <div className='p-3'>

                <div className=' w-auto h-24 items-center bg-white md:flex flex-row p-3 px-2 shadow-lg rounded-md space-x-1 flex '>

                    <div className=' px-2 flex-col w-1/5 font-semibold flex justify-center'>
                        <div>Location</div>
                        <GooglePlacesAutocomplete
                            apiKey={import.meta.env.VITE_GOOGLE_MAPS_APIKEY}
                            apiOptions={{ language: 'en', region: 'UK' }}
                            selectProps={{
                                onChange: (e) => queryLocation(e),
                            }}
                            debounce={500}
                        />
                    </div>
                    <div className=' px-2 flex-col w-1/4 font-semibold flex justify-center'>

                        <div className='flex space-x-1 '>
                            <div className=''>

                                <div>Min Bedroom  </div>
                                <input className='p-2 border w-full'
                                    type='number'
                                    name="min_bedrooms" id='min_bedrooms' onChange={changeHandler}
                                    placeholder='Any'
                                    value={queriedParams.min_bedrooms}

                                />
                            </div>
                            <div className=''>

                                <div>Max Bedroom </div>
                                <input className='p-2 border w-full'
                                    type='number'
                                    name="max_bedrooms" id='max_bedrooms' onChange={changeHandler}
                                    placeholder='No max'
                                    value={queriedParams.max_bedrooms}

                                />
                            </div>

                        </div>
                    </div>
                    <div className=' px-2 flex-col w-1/6 font-semibold flex justify-center'>
                        <div>Radius (Miles)</div>
                        <input className='p-2 border'
                            type='number'
                            name="radius" id='radius' onChange={changeHandler}
                            placeholder='Any'
                            value={queriedParams.radius}

                        />
                    </div>
                    <div className=' px-2 flex-col w-1/4 font-semibold flex justify-center'>

                        <div className='flex space-x-1 '>
                            <div className=''>

                                <div>Min price (£) </div>
                                <input className='p-2 border w-full'
                                    type='number'
                                    name="min_price" id='min_price' onChange={changeHandler}
                                    placeholder='Any'
                                    value={queriedParams.min_price}

                                />
                            </div>
                            <div className=''>

                                <div>Max price (£) </div>
                                <input className='p-2 border w-full'
                                    type='number'
                                    name="max_price" id='max_price' onChange={changeHandler}
                                    placeholder='No max'
                                    value={queriedParams.max_price}

                                />
                            </div>

                        </div>
                    </div>

                    <button className='p-3 bg-blue-400 w-1/6 font-semibold text-white hover:bg-blue-500 flex rounded-md justify-center'
                        onClick={handleClick}
                    >Search
                    </button>

                </div>
            </div>
        </>
    )
}

export default SearchComponent