import { Header } from '../../components'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';

const AboutPage = () => {
	return (
		<>
			<Header />
			<div className='p-2  grid place-items-center' >
				<div className=' space-y-4 border w-full md:w-full lg:w-1/2 xl:w-1/2 p-3 shadow-lg rounded-xl '>
					<div className='text-xl font-semibold'>What is it?</div>
					<p className=''>
						I was a renter for over 5 years and I always felt like there needed to be more transparency between property managers and 
						tenants. That's when I thought about Propzy, a platform where landlords and tenants can leave reviews. The end goal
						is to have a data driven platform to help users make better informed decisions when choosing a place to live or a tenant. 

					</p>
					<div className='text-xl font-semibold'>What stops people from leaving bad reviews without a valid reason?</div>
					<p className=''>
						It is true that relationships between tenants and property managers can sometime be a little tense. Which could lead to unfair
						negative reviews in some cases. However, every negative review will be monitored and the reviewer will need to provide evidence
						for the review such as pictures, snapshots of conversations or emails.
					</p>

					<div className='text-xl font-semibold'>Contact</div>
					<p className='items-center '>
						<MailOutlineIcon />  firebasicstest@gmail.com
					</p>
					<p className=''>
						<PhoneIcon /> +44 7939 500121
					</p>
				</div>
			</div>
		</>
	)
}

export default AboutPage