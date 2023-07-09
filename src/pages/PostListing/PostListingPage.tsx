import { useState, useRef } from 'react';
import Header from "../../components/Header/Header"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { auth } from '../../../firebase';
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

	const [listedImages, setListedImages] = useState<Array<string>>([]);
	const filePickerRef = useRef<HTMLInputElement>(null);
	const [imageFiles, setImageFiles] = useState<Array<File>>([]);
	const [maxNumberOfPicturesReached, setMaxNumberOfPicturesReached] = useState<boolean>(false);

	const addListingImage = async (e: any) => {
		const reader = new FileReader();
		if (listedImages.length === 6) {
			setMaxNumberOfPicturesReached(true);
			return;
		}
		if (e.target.files[0]) {
			reader.readAsDataURL(e.target.files[0]);
			setImageFiles((file: File[]) => [...file, e.target.files[0]]);
		}
		reader.onload = (readerEvent) => {
			setListedImages((image: any[]) => [...image, readerEvent.target?.result!]);
			// COULDNT FIGURE OUT TYPE FOR IMAGE? STRING SURELY..
		};
	};

	const uploadListing = async () => {
		if ((Object.values(allValues).includes("")) || (filePickerRef === null) || (!listedImages)) {
			alert("Please fill in all the required fields.")
			return;
		}
		const property_id: string = uuidv4(9);
		let imageUrls: { publicUrl: string; }[] = [];

		try {
			for (let i = 0; i < imageFiles.length; i++) {
				const { data, error } = await supabase
					.storage
					.from('listings')
					.upload(`${property_id}/image_${i}`, imageFiles[i])
				if (error) {
					console.error(error);
				}
				if (data) {
					const { data } = supabase
						.storage
						.from('listings')
						.getPublicUrl(`${property_id}/image_${i}`);
					if (data) {
						imageUrls.push(data);
					}
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
					image_arr: imageUrls,
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
			<div className='flex flex-col 
							lg:flex-none lg:justify-none
							2xl:flex 2xl:flex-row 2xl:justify-center'>

				<div className="flex flex-col p-2
								md:flex-col 
								lg:flex-row xl:space-x-10 lg:p-10
								xl:flex-row xl:space-x-10 xl:p-10
								2xl:flex-row 2xl:space-x-10 2xl:w-2/3 ">
					{/* {Property Info} */}
					<div className="flex flex-col rounded-xl p-3 space-y-4
									md:w-1/2 md:shadow-lg  ">
						<div className="text-xl font-semibold">Information about the property</div>
						<div className=" text-lg flex flex-col 
										lg:justify-between lg:flex-row lg:space-x-2">
							<div>Address:</div>
							<input type="text"
								placeholder="Enter a location"
								className="rounded-xl p-2 border "
								name='address'
								id='address'
								onChange={changeHandler}
							/>
						</div>

						<div className="text-lg flex flex-col 
										lg:justify-between lg:flex-row lg:space-x-2">
							<div> Number of rooms </div>
							<input type="number"
								placeholder="Enter a number"
								className="rounded-xl p-2 border"
								name='numberOfRooms'
								id='numberOfRooms'
								onChange={changeHandler}
							/>
						</div>

						<div className="text-lg flex flex-col 
										lg:justify-between lg:flex-row lg:space-x-2">
							<div> Number of bathrooms </div>
							<input type="number"
								placeholder="Enter a number"
								className="rounded-xl p-2 border "
								name='numberOfBathrooms'
								id='numberOfBathrooms'
								onChange={changeHandler}
							/>
						</div>

						<div className="text-lg flex flex-col 
										lg:justify-between lg:flex-row lg:space-x-2">
							<div> Cost of room </div>
							<input type="number"
								placeholder="Enter a price"
								className="rounded-xl p-2 border "
								name='costOfRoom'
								id='costOfRoom'
								onChange={changeHandler}
							/>
						</div>
						<div className="text-lg flex flex-col space-y-2
										">
							<div> Description  </div>
							<textarea placeholder="Add a brief description"
								className="rounded-xl p-2 border h-28
											xl:h-60 xl:text-sm
											2xl:h-80 2xl:text-sm "
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
								<button className={`
										 flex h-8 space-x-3 px-2 shadow-lg rounded-xl border items-center
										${maxNumberOfPicturesReached ? 'opacity-50 cursor-not-allowed disabled:' : 'hover:scale-95 transition duration-700'}
									`}
									onClick={() => { maxNumberOfPicturesReached ? 'do nothing' : filePickerRef.current?.click() }}>
									<CloudUploadIcon
										fontSize='large'
									/>
									<input ref={filePickerRef}
										onChange={addListingImage}
										type="file"
										accept="image/png, image/jpeg"
										hidden
									/>
									<div className='font-semibold'>add a photo</div>

								</button>

								<button className='rounded-md px-3 py-2 bg-blue-300 hover:bg-blue-500 hover:shadow-lg ' type='submit' onClick={submitListingInfo}>
									Post ad
								</button>

							</div>
						</div>
						<div className=' p-3 '>
							<div className=' grid grid-cols-1 
										sm:grid-cols-2 
										md:grid-cols-3 
										lg:grid-cols-3 '>

								{listedImages?.map((image: string) => (
									<div className='px-3 pb-2 max-h-36'>
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
			</div>
		</>
	)
}

export default PostListingPage