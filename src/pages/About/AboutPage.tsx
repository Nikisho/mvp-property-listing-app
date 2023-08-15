import { Header } from '../../components'

const AboutPage = () => {
  return (
    <>
      <Header />
      <div className='p-2  grid place-items-center' >
        <div className=' space-y-4 border w-full md:w-full lg:w-1/2 xl:w-1/2 p-3 shadow-lg rounded-xl '>
          <div className='text-xl font-semibold'>What is it?</div>
            <p className=''>
              Long story short, I've been renting for over 7 years and after being treated very poorly by some landlords I decided that it was enough!
              I am tired of signing leases without knowing what I am getting myself into. So I thought, how about a property listing platform where
              tenants can review their landlords? Ultimately I want to make the renting experience more transparent for both renters and property managers.
            </p>
            <p></p>
        </div>
      </div>
    </>
  )
}

export default AboutPage