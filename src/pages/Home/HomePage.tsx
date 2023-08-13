import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-google-places-autocomplete"
import { Header } from "../../components"
import { useNavigate } from "react-router-dom"

const HomePage = () => {
    const navigate = useNavigate();
    const defaultRadius = 10;
    const defaultMinPrice = 0;
    const defaultMaxPrice = 999999;
    const defaultMinRoom = 1;
    const defaultMaxRoom = 99;
    const image_url = "src/assets/homepage-background.jpg"
    const queryLocation = async (selectedAddress: any) => {

        geocodeByAddress(selectedAddress?.label)
            .then(results => getLatLng(results[0]))
            .then(({ lat, lng }) => (
                navigate(`/results/${lat}/${lng}/${selectedAddress?.label}/${defaultRadius}/${defaultMinPrice}/${defaultMaxPrice}/${defaultMinRoom}/${defaultMaxRoom}`)
            )
            );
    };
    return (
        <>
            <Header />
            {/*  main page*/}
            {/* "C:\Users\User\Downloads\roommatetest.jpg" */}
            <div style={{
                backgroundImage: `url(${image_url})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center'
            }}
            className="h-screen"
            >

                <div className="p-5 bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 p-4 text-lg border rounded-xl shadow-lg h-1/7"

                >
                    <div className="py-5 text-xl font-semibold">Find your dream property now</div>

                    <GooglePlacesAutocomplete
                        apiKey={import.meta.env.VITE_GOOGLE_MAPS_APIKEY}
                        apiOptions={{ language: 'en', region: 'UK' }}
                        selectProps={{
                            placeholder: 'Area or postcode',
                            onChange: selectedAddress => queryLocation(selectedAddress)
                        }}
                    />

                </div>
            </div>
        </>
    )
}

export default HomePage