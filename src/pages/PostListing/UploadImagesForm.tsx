import React, { useEffect, useRef, useState } from 'react'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

interface FormData {
    ImageFiles: File[];
    ImageFilesURL: string[];
};
interface UploadImagesFormProps extends FormData {
    updateFields: (fields: Partial<FormData>) => void;
}

const UploadImagesForm: React.FC<UploadImagesFormProps> = ({

    ImageFilesURL,
    ImageFiles,
    updateFields

}) => {

    const [ArrayOfImageURLs, setArrayOfImageURLs] = useState<string[]>(ImageFilesURL);
    const filePickerRef = useRef<HTMLInputElement>(null);
    const [ArrayOfImageFiles, setArrayOfImageFiles] = useState<Array<File>>(ImageFiles);
    const [maxNumberOfPicturesReached, setMaxNumberOfPicturesReached] = useState<boolean>(false);
    const maxNumberOfPicturesAllowed: number = 9;

    const addListingImage = async (e: any) => {
        const reader = new FileReader();
        if (ArrayOfImageURLs.length === maxNumberOfPicturesAllowed - 1) {
            setMaxNumberOfPicturesReached(true);
            return;
        }
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
            setArrayOfImageFiles((ArrayOfImageFiles: File[]) => [...ArrayOfImageFiles, e.target.files[0]],

            );
        }
        reader.onload = (readerEvent) => {
            setArrayOfImageURLs((ArrayOfImageURLs: any[]) => [...ArrayOfImageURLs, readerEvent.target?.result!]);
            // COULDNT FIGURE OUT TYPE FOR IMAGE? STRING SURELY..
        };
    };

    useEffect(() => {
        updateFields({
            ImageFiles: ArrayOfImageFiles,
            ImageFilesURL: ArrayOfImageURLs
        });
    }, [ArrayOfImageFiles, ArrayOfImageURLs]);
    
    return (

        <div className='md:h-full  p-3 rounded-xl'>
            <div className='flex space-x-4 items-center justify-between py-3'>
                <div className='flex justify-between w-full  p-2 h-31'>
                    <button type="button" className={`
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
            <div className=''>
                <div className='    grid grid-cols-1
                                    sm:grid-cols-2 
                                    md:grid-cols-5 
                                    lg:grid-cols-5 '>

                    {ArrayOfImageURLs?.map((image: string) => (
                        <div className='px-1 pb-2 max-h-36'>
                            <img
                                src={image as string}
                                className='rounded-lg w-full h-24'
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
    )
}

export default UploadImagesForm