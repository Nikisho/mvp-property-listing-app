import { Grow } from "@mui/material"
import SigninForm from "./SigninForm"

function SigninPage() {
	return (
		<Grow timeout={ 1000 } in>
			<div>
				<SigninForm />
			</div>
		</Grow>
	)
}

export default SigninPage