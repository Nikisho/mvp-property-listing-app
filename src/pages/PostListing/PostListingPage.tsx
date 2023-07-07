import { useState, useRef } from 'react';
import Header from "../../components/Header/Header"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { auth  } from '../../../firebase';
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
	const changeHandler = (e: { target: { name: string; value: string; }; }) => {
		setAllValues({ ...allValues, [e.target.name]: e.target.value });
	};

	const [listedImages, setListedImages] = useState<any[string] | ArrayBuffer>([]);
	const filePickerRef = useRef<HTMLInputElement>(null);
	const [urlArray, setUrlArray] = useState<any[string] | ArrayBuffer>([]);
	const [imageFiles, setImageFiles] = useState<any[string] | ArrayBuffer>([]);

	const addListingImage = async (e: any) => {
		const reader = new FileReader();
		if (e.target.files[0]) {
			reader.readAsDataURL(e.target.files[0]);
			setImageFiles((file: any) => [...file, e.target.files[0]]);
		}
		reader.onload = (readerEvent) => {
			setListedImages((image: string) => [...image, readerEvent.target?.result!]);
		};
	};

	const uploadListing = async () => {
		if ((Object.values(allValues).includes("")) || (filePickerRef === null) || (!listedImages)) {
			alert("Please fill in all the required fields.")
			return;
		}
		const property_id = uuidv4(9);
		try {
			for (let i = 0; i < imageFiles.length; i++) {
				const { data, error } = await supabase
					.storage
					.from('listings')
					.upload(`/image_${i}`, imageFiles[i])
				if (error) {
					console.error(error);
				}
				if (data) {
					const { data }: any = supabase
						.storage
						.from('listings')
						.getPublicUrl(`${property_id}/image_${i}`);
					setUrlArray((url: string) => [...url, data])
				}
			};

			const { error } = await supabase
				.from('listed_properties')
				.insert({
					property_id: property_id,
					description: allValues.roomDescription,
					price_pcm: allValues.costOfRoom,
					address: allValues.address,
					number_of_bedrooms: allValues.numberOfRooms,
					number_of_bathrooms: allValues.numberOfBathrooms,
					// image_url: url,
					image_arr: urlArray,
					pm_user_id: user.uid,
				});
				if (error) {
					console.error(error)
				};
			setPostButtonClicked(true);
		} catch (err: any) {
			console.error(err);
		}
	}

	const submitListingInfo = async (e: React.MouseEvent) => {
		e.preventDefault();
		await uploadListing()
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
						<div className='flex justify-between w-full  p-2 h-31'>
							<div className='hover:scale-95 transition duration-700 flex h-8 space-x-3 px-2 shadow-lg rounded-xl border items-center' onClick={() => filePickerRef.current?.click()}>
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

							<button className='rounded-md px-3 py-2 bg-blue-300 hover:bg-blue-500 hover:shadow-lg ' type='submit' onClick={submitListingInfo}>
								Post ad
							</button>

						</div>


					</div>
					<div className=' p-3  '>
						<div className=' grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 '>

							{listedImages?.map((image: string) => (
								<div className='px-3 pb-2'>
									<img
										src={image as string}
										className='rounded-lg w-full h-full'
										alt=""
										height={50}
										width={70}
									/>
								</div>
							))
							}
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default PostListingPage