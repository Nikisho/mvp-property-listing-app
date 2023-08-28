import { Fade } from "@mui/material";
import { Header } from "../../components"
import HomeForm from "./HomeForm";

const HomePage = () => {
    return (
        <>
            <Header />
            <Fade in timeout={2000}>
                <div>
                    <HomeForm />
                </div>
            </Fade>
        </>
    )
}

export default HomePage