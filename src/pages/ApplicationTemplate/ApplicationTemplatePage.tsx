import { Grow } from "@mui/material"
import ApplicationTemplateForm from "./ApplicationTemplateForm"

const ApplicationTemplatePage = () => {
    return (
        <>
            <Grow in timeout={2000}>
                <div>
                    <ApplicationTemplateForm />

                </div>
            </Grow>
        </>
    )
}

export default ApplicationTemplatePage