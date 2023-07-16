import React, { useRef, useState } from 'react'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const UploadImagesForm = () => {
    const [listedImages, setListedImages] = useState<Array<string>>([]);
    const filePickerRef = useRef<HTMLInputElement>(null);
    const [imageFiles, setImageFiles] = useState<Array<File>>([]);
    const [maxNumberOfPicturesReached, setMaxNumberOfPicturesReached] = useState<boolean>(false);
    const maxNumberOfPicturesAllowed = 9;


    const addListingImage = async (e: any) => {
        const reader = new FileReader();
        if (listedImages.length === maxNumberOfPicturesAllowed - 1 ) {
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


    return (

        <div className='md:h-full  p-3 rounded-xl'>
            <div className='flex space-x-4 items-center justify-between py-3'>
                <div className='flex justify-between w-full  p-2 h-31'>
                    <button  type="button" className={`
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
                                height={25}
                                width={35}
                            />
                        </div>
                    ))
                    }
                </div>
            </div>
        </div>

    )
}

export default UploadImagesForm