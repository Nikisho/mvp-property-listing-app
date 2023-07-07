// import React, { useState, useEffect } from 'react';
// import StarIcon from '@mui/icons-material/Star';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import { useNavigate } from 'react-router-dom';
// import { currencyFormatter } from '../../utils/currencyFormat';
// interface PropertyDetailsProps {
//     id: number;
//     title: string;
//     price_pcm: number;
//     description: string;
//     pm_name: string;
//     pm_image_url: string;
//     pm_user_id: string;
//     number_of_bedrooms: string;
//     number_of_bathrooms: string;
// }

// const PropertyDetails: React.FC<PropertyDetailsProps> = ({
//     title,
//     price_pcm,
//     description,
//     pm_name,
//     pm_image_url,
//     pm_user_id,
//     number_of_bedrooms,
//     number_of_bathrooms
// }) => {
//     const navigate = useNavigate();
//     const [applyButtonClicked, setApplyButtonClicked] = useState(false);
//     function handleClick() {
//         navigate(`/profilepage/${pm_user_id}`);
//     };
//     // const handleApplyButtonClick = () => {
//     //     setApplyButtonClicked(true);
//     // };
//     const handleApplyButtonClick: VoidFunction = () => {
//         const questionsLink: string = "https://docs.google.com/forms/d/e/1FAIpQLSdADoLJPZuPxUce3CnkwpBGa88fEDR1h7gnR86j1rPV5W5QCA/viewform?usp=sharing "
//         window.open(questionsLink, "_blank");
//     };
//     const handleCancelButtonClick = () => {
//         setApplyButtonClicked(false);
//     }; 
//     return (
//         <div className={styles['property-details']}>
//             <span className={styles['title']}>{title}</span>
//             <span className={styles['price']}>{currencyFormatter('currency','GBP').format(price_pcm)} pcm</span>
//             <p className={styles['description-wrapper']}>{description}</p>
//             <button className='flex space-x-5 p-4 items-center shadow-lg rounded-xl hover:opacity-80 my-2' onClick={handleClick}>
//                 {   
//                     (pm_image_url)? 
//                         <img 
//                             src={pm_image_url}
//                             className='rounded-full h-12'
//                         />
//                     :
//                     <AccountCircleIcon
//                         fontSize='large'
//                         className='hover:opacity-20'
//                     />
//                 }

//                 <div className='text-xl font-bold'>
//                     <text>{pm_name}</text>
//                     <div className='flex space-x-2'>
//                         {/* <text>4.5</text> */}
//                         <div>
//                         {/* <StarIcon
//                             fontSize='medium'
//                             color='secondary'
//                             className='mb-1'
//                         /> */}
//                         </div>
//                     </div>
//                 </div>
//             </button>
//             <div className={styles['btn-wrapper']}>
//                 <button onClick={handleApplyButtonClick} className={styles['btn']}>
//                     Apply for Property
//                 </button>
//                 <div className='font-semibold '>
//                     <div>
//                         Bedrooms: {number_of_bedrooms}
//                     </div>
//                     <div>
//                         Bathrooms: {number_of_bathrooms}
//                     </div>
//                 </div>
//             </div>
            
//             <div>
//                 {/* {Placeholder for more details} */}
//             </div>
//         </div>
//     )
// }

// export default PropertyDetails;