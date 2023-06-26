import { useState, useRef } from 'react';
import Header from "../../components/Header"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { getStorage, ref, getDownloadURL, uploadBytesResumable, uploadString } from "firebase/storage";
import { app, storage } from '../../../firebase';
import { uuidv4 } from '../../utils/uuidv4';

const PostListingPage = () => {

  const [allValues, setAllValues] = useState({
    address: '',
    numberOfRooms: '',
    numberOfBathrooms: '',
    costOfRoom: '',
    roomDescription: ''
  });
  
  const [listingImage, seListingImage] = useState<string | ArrayBuffer>();
  const filePickerRef = useRef<HTMLInputElement>(null);
  const [ firestoreUid, setFirestoreUid ]= useState(null);
  const [ listingImageUrl, setListingImageUrl] = useState<string>();
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
    }
    ;
  };

  const uploadListingImage = async () => {

    const image_uuid = uuidv4();
    if (!listingImage) return;
    const storageRef = ref(storage, `listings/${image_uuid}`);
    const uploadTask = uploadString(storageRef, listingImage as string, 'data_url');
    const uploadTaskBytes = uploadBytesResumable(storageRef, listingImage as ArrayBuffer);
    uploadTaskBytes.on(
        'state_changed',
        null,
        (error) => console.error(error),
        async () => {
            await getDownloadURL(ref(storage, `listings/${image_uuid}`)).then((url) => {
                setListingImageUrl(url);
                setFirestoreUid(image_uuid);
                console.log(url)
            })
        }
    )
  }

  const postListing = async () => {
    
    if (Object.values(allValues).includes("") || filePickerRef === null) {
      return;
    }
    
    try {
      
      const response = await fetch("http://localhost:5000/listed_properties",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            "description": allValues.roomDescription,
            "price_pcm": allValues.costOfRoom,
            "address": allValues.address,
            "number_of_bedrooms": allValues.numberOfRooms,
            "number_of_bathrooms": allValues.numberOfBathrooms,
            "image_url" : listingImageUrl,
            "firestore_uid": firestoreUid
          })
        });
      console.log(response)
    } catch (err: any) {
      console.error(err.message);
    }
  };
  
  const submitListingInfo = async (e: React.MouseEvent) => {

      e.preventDefault();
      await uploadListingImage();
      await postListing();

  };

  return (
    <>
      <Header />

      <div className="p-10 flex flex-col md:flex-row md:space-x-4 min-w-fit">

        {/* {Property Info} */}
        <div className="flex flex-col md:w-1/2 rounded-xl shadow-lg p-3 space-y-4">
          <div className="text-xl font-semibold">Information about the property</div>
          <div className="space-x-2 text-lg flex justify-between">
            <text>Address:</text>
            <input type="text"
              placeholder="Enter a location"
              className="rounded-xl p-2 border "
              name='address'
              id='address'
              onChange={changeHandler}
            />
          </div>

          <div className="space-x-2 text-lg flex justify-between">
            <text> Number of rooms </text>
            <input type="number"
              placeholder="Enter a number"
              className="rounded-xl p-2 border"
              name='numberOfRooms'
              id='numberOfRooms'
              onChange={changeHandler}
            />
          </div>

          <div className="space-x-2 text-lg flex justify-between">
            <text> Number of bathrooms </text>
            <input type="number"
              placeholder="Enter a number"
              className="rounded-xl p-2 border "
              name='numberOfBathrooms'
              id='numberOfBathrooms'
              onChange={changeHandler}
            />
          </div>

          <div className="space-x-2 text-lg flex justify-between">
            <text> Cost of room </text>
            <input type="number"
              placeholder="Enter a price"
              className="rounded-xl p-2 border "
              name='costOfRoom'
              id='costOfRoom'
              onChange={changeHandler}
            />
          </div>
          <div className="text-lg flex flex-col">
            <text> Description  </text>
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
          <div className='flex space-x-4 p-3 items-center'>
            <div className='hover:scale-95' onClick={() => filePickerRef.current?.click()}>
              <AddCircleOutlineIcon
                fontSize='large'
              />
              <input ref={filePickerRef}
                onChange={addListingImage}
                type="file"
                accept="image/png, image/jpeg"
                hidden
              />
            </div>
            <text className='font-bold'>add photo</text>
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
          <div className='w-1/4 rounded-xl p-3 bg-blue-200' onClick={submitListingInfo}>
            {/* <button type='submit' onClick={postListing} /> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default PostListingPage