import { Modal } from '@mui/material';
import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
interface ApplicationQuestionsProps {
    applyBtnClicked: boolean
    cancelBtnClicked: Function
}

const ApplicationQuestions: React.FC<ApplicationQuestionsProps> = ({applyBtnClicked, cancelBtnClicked }) => {
    
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
        cancelBtnClicked()
    };
    const handleOpen = (boolean: boolean) => setOpen(boolean);
    useEffect(() => {
        handleOpen(applyBtnClicked);
    });
    
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className='flex items-center justify-center'
            >
                <Box className='bg-white p-5 rounded-lg w-2/3 overflow-y-auto h-3/4 space-y-1'>
                    <div>
                        <div> 1. Do you have the Right to Rent in the UK?</div>
                        <input
                            className='flex w-full border p-2 '
                        />
                    </div>

                    <div>
                        <div> 2. Do you currently rent? </div>
                        <input
                            className='flex w-full border p-2'
                        />
                    </div>
                    <div>
                        <div> 3. Why are you looking for a new place to live? </div>
                        <input
                            className='flex w-full border p-2'
                        />
                    </div>
                    <div>
                        <div> 4. How soon are you looking to move into new place? </div>
                        <input
                            className='flex w-full border p-2'
                        />
                    </div>
                    <div>
                        <div> 5. How many tenants would be living with you </div>
                        <input
                            className='flex w-full border p-2'
                        />
                    </div>
                    <div>
                        <div> 6. What kind of work do you do? </div>
                        <input
                            className='flex w-full border p-2'
                        />
                    </div>
                    <div>
                        <div> 7. Do you currently rent? </div>
                        <input
                            className='flex w-full border p-2'
                        />
                    </div>
                    <div>
                        <div> 8. Have you ever had an eviction? </div>
                        <input
                            className='flex w-full border p-2'
                        />
                    </div>
                    <div>
                        <div> 9. Have you ever broken a rental agreement? </div>
                        <input
                            className='flex w-full border p-2'
                        />
                    </div>
                    <div>
                        <div> 10. Are you able to provide any references?</div>
                        <input
                            className='flex w-full border p-2'
                        />
                    </div>
                    <div>
                        <div> 11. Please describe any other issues we should know about.</div>
                        <input
                            className='flex w-full border p-2'
                        />
                    </div>
                    <div>
                        <div> 12. Do you have any questions for the landlord?</div>
                        <input
                            className='flex w-full border p-2'
                        />
                    </div>
                    <div className='flex justify-between'>
                        <button
                            className='p-3 bg-red-600 m-2 rounded-lg text-white px-6 hover:bg-red-900'
                            onClick={handleClose}
                        >
                            cancel
                        </button>
                        <button
                            className='p-3 bg-blue-600 m-2 rounded-lg text-white px-6 hover:bg-blue-900'
                        >
                            Submit
                        </button>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}

export default ApplicationQuestions
