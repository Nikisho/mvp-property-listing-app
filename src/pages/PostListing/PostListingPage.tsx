import { useState, useRef } from 'react';
import Header from "../../components/Header/Header"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { ref, getDownloadURL, uploadBytesResumable, uploadString } from "firebase/storage";
import { app, auth, storage } from '../../../firebase';
import { uuidv4 } from '../../utils/uuidv4';
import { User } from 'firebase/auth';
import LoadingComponent from '../../components/LoadingComponent';
import { supabase } from '../../../supabase';

const PostListingPage = () => {
	const user: User = auth.currentUser!;
	const [postButtonClicked, setPostButtonClicked] = useState(false);
	const [allValues, setAllValues] = useState({
		address: '',
		numberOfRooms: '',
		numberOfBathrooms: '',
		costOfRoom: '',
		roomDescription: ''
	});

	const [listingImage, seListingImage] = useState<string | ArrayBuffer>();
	const filePickerRef = useRef<HTMLInputElement>(null);
	const changeHandler = (e: { target: { name: string; value: string; }; }) => {
		setAllValues({ ...allValues, [e.target.name]: e.target.value })
	};

	const addListingImage = (e: any) => {
		const reader = new FileReader();
		if (e.target.files[0]) {
			reader.readAsDataURL(e.target.files[0]);
		}
		reader.onload = (readerEvent) => {
			seListingImage(readerEvent.target?.result!);
		};
	};

	const uploadListingImage = async () => {

		if ((Object.values(allValues).includes("")) || (filePickerRef === null) || (!listingImage)) {
			alert("Please fill in all the required fields.")
			return;
		}

		const property_id = uuidv4(9);
		const storageRef = ref(storage, `listings/${property_id}`);
		const uploadTask = uploadString(storageRef, listingImage as string, 'data_url');
		const uploadTaskBytes = uploadBytesResumable(storageRef, listingImage as ArrayBuffer);

		uploadTaskBytes.on(
			'state_changed',
			null,
			(error) => console.error(error),
			async () => {
				try {
					const url = await getDownloadURL(ref(storage, `listings/${property_id}`));
					const { error } = await supabase
						.from('listed_properties')
						.insert({
							property_id: property_id,
							description: allValues.roomDescription,
							price_pcm: allValues.costOfRoom,
							address: allValues.address,
							number_of_bedrooms: allValues.numberOfRooms,
							number_of_bathrooms: allValues.numberOfBathrooms,
							image_url: url,
							pm_user_id: user.uid,
						})
					setPostButtonClicked(true);
				} catch (err: any) {
					console.error(err);
				}
			}
		)
	}

	const submitListingInfo = async (e: React.MouseEvent) => {
		e.preventDefault();
		await uploadListingImage();
	};

	if (postButtonClicked) {
		return (

			<LoadingComponent />
		)
	}

	return (
		<>
			<Header />

			<div className="p-10 flex flex-col md:flex-row md:space-x-4 min-w-fit">

				{/* {Property Info} */}
				<div className="flex flex-col md:w-1/2 rounded-xl shadow-lg p-3 space-y-4">
					<div className="text-xl font-semibold">Information about the property</div>
					<div className="space-x-2 text-lg flex justify-between">
						<div>Address:</div>
						<input type="text"
							placeholder="Enter a location"
							className="rounded-xl p-2 border "
							name='address'
							id='address'
							onChange={changeHandler}
						/>
					</div>

					<div className="space-x-2 text-lg flex justify-between">
						<div> Number of rooms </div>
						<input type="number"
							placeholder="Enter a number"
							className="rounded-xl p-2 border"
							name='numberOfRooms'
							id='numberOfRooms'
							onChange={changeHandler}
						/>
					</div>

					<div className="space-x-2 text-lg flex justify-between">
						<div> Number of bathrooms </div>
						<input type="number"
							placeholder="Enter a number"
							className="rounded-xl p-2 border "
							name='numberOfBathrooms'
							id='numberOfBathrooms'
							onChange={changeHandler}
						/>
					</div>

					<div className="space-x-2 text-lg flex justify-between">
						<div> Cost of room </div>
						<input type="number"
							placeholder="Enter a price"
							className="rounded-xl p-2 border "
							name='costOfRoom'
							id='costOfRoom'
							onChange={changeHandler}
						/>
					</div>
					<div className="text-lg flex flex-col">
						<div> Description  </div>
						<textarea placeholder="Add a brief description"
							className="rounded-xl p-2 border h-28 "
							name='roomDescription'
							id='roomDescription'
							onChange={changeHandler}
						/>
					</div>
				</div>

				{/* {Prop Picture} */}
				<div className='md:w-1/2 shadow-lg p-3 rounded-xl'>
					<div className='flex space-x-4 items-center justify-between py-3'>
						<div className='hover:scale-95 transition duration-700 flex space-x-3 px-2 shadow-lg rounded-full border items-center ' onClick={() => filePickerRef.current?.click()}>
							<CloudUploadIcon
								fontSize='large'
							/>
							<input ref={filePickerRef}
								onChange={addListingImage}
								type="file"
								accept="image/png, image/jpeg"
								hidden
							/>
							<div className='font-semibold'>add photo</div>
						</div>

						<button className='rounded-full px-3 py-2 bg-blue-300 hover:bg-blue-500 hover:shadow-lg ' type='submit' onClick={submitListingInfo}>
							Post ad
						</button>
					</div>

					{listingImage &&
						<div className='px-3 flex items-center'>
							<img
								src={listingImage as string}
								className='object-contain w-full rounded-xl'
								alt=""
								height={50}
								width={70}
							/>
						</div>
					}
				</div>
			</div>
		</>
	)
}

export default PostListingPage