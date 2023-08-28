import { Fade } from "@mui/material"
import SigninForm from "./SigninForm"

function SigninPage() {
	return (
		<Fade timeout={ 1500 } in>
			<div>
				<SigninForm />
			</div>
		</Fade>
	)
}

export default SigninPage