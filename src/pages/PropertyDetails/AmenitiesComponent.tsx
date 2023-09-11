import React from 'react'
import ShowerIcon from '@mui/icons-material/Shower';
import BedIcon from '@mui/icons-material/Bed';
import WifiIcon from '@mui/icons-material/Wifi';
import ChairIcon from '@mui/icons-material/Chair';
import BalconyIcon from '@mui/icons-material/Balcony';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import AccessibleIcon from '@mui/icons-material/Accessible';
import DeckIcon from '@mui/icons-material/Deck';
import GarageIcon from '@mui/icons-material/Garage';
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';

interface AmenitiesComponentProps {
    property_id: number;
    description: string;
    image_url: string;
    price_pcm: number;
    create: number;
    address: string;
    ad_title: string;
    pm_user_id: string;
    number_of_bedrooms: string;
    number_of_bathrooms: string;
    image_arr: string
    wifi_included: boolean;
    bills_included: boolean;
    living_room: boolean;
    washing_machine: boolean;
    parking: boolean;
    disabled_access: boolean;
    garden_or_patio: boolean;
    terrace_or_balcony: boolean;
    garage: boolean;
    deposit: number;
};
interface AmenitiesProps {
	title: string;
	icon: any ;
	data: boolean
}
function Amenities({ data, title, icon }: AmenitiesProps) {
	if (!data) return <></>
	return (
		<div className='flex space-x-2 items-center'>
			{icon}
			<div>
				{title}
			</div>
		</div>
	)

}
const AmenitiesComponent: React.FC<AmenitiesComponentProps> = ({
    number_of_bedrooms,
    number_of_bathrooms,
    wifi_included,
    washing_machine,
    living_room,
    terrace_or_balcony,
    garden_or_patio,
    parking,
    disabled_access,
    garage,
}) => {
    return (
        <>
            <div className='space-y-5 p-3 rounded-xl shadow-lg'>
                <div className='text-xl font-semibold'>
                    Amenities
                </div>
                <div className='flex flex-col  text-lg
								lg:flex-row lg:space-x-6 '>

                    <div className='space-y-2  '>

                        <div className='flex space-x-2 items-center'>
                            <BedIcon
                            />
                            <div>Bedrooms: {number_of_bedrooms!}</div>
                        </div>
                        <div className='flex space-x-2 items-center'>
                            <ShowerIcon
                            />
                            <div>
                                Bathrooms: {number_of_bathrooms!}
                            </div>
                        </div>
                        <Amenities
                            data={wifi_included!}
                            title={'Wifi'}
                            icon={<WifiIcon />}
                        />
                        <Amenities
                            data={washing_machine!}
                            title={'Washing Machine'}
                            icon={<LocalLaundryServiceIcon />}
                        />
                        <Amenities
                            data={living_room!}
                            title={'Lounge'}
                            icon={<ChairIcon />}
                        />
                    </div>

                    <div className='space-y-2'>
                        <Amenities
                            data={terrace_or_balcony!}
                            title={'Terrace or Balcony'}
                            icon={<BalconyIcon />}
                        />
                        <Amenities
                            data={garden_or_patio!}
                            title={'Garden or Patio'}
                            icon={<DeckIcon />}
                        />
                        <Amenities
                            data={parking!}
                            title={'Parking'}
                            icon={<LocalParkingIcon />}
                        />
                        <Amenities
                            data={disabled_access!}
                            title={'Disabled Access'}
                            icon={<AccessibleIcon />}
                        />
                        <Amenities
                            data={garage!}
                            title={'Garage'}
                            icon={<GarageIcon />}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default AmenitiesComponent