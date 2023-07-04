import { Modal } from '@mui/material';
import { useState, useEffect } from "react";

interface ApplicationQuestionsProps {
}

const ApplicationQuestions: React.FC<ApplicationQuestionsProps> = () => {
    const handleClose = () => {};
    const [open, setOpen] = useState(true);

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div>test</div>
            </Modal>
        </div>
    )
}

export default ApplicationQuestions