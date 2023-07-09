import React, { useState } from 'react';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
interface GallaryProps {
	images: Array<string>;
}
const Gallary: React.FC<GallaryProps> = ({ images }) => {

	const [currentIndex, setCurrentIndex] = useState(0);
	const prevSlide = () => {
		if (currentIndex === 0) {
			setCurrentIndex(images.length - 1);
		} else {
			setCurrentIndex(currentIndex - 1);
		}
	};
	const nextSlide = () => {
		if (currentIndex === images.length - 1) {
			setCurrentIndex(0);
		} else {
			setCurrentIndex(currentIndex + 1);
		}
	}
	return (
		<div className='h-60 bg-gray-300
						md:w-1/2 md:h-auto
						lg:w-1/2 lg:h-auto
						xl:w-1/2 xl:h-auto
						2xl:w-1/3 2xl:h-auto'>
			<div
				style={{ backgroundImage: 
							`url(${	images[currentIndex]})`, 
									backgroundSize: 'contain' , 
									backgroundRepeat: 'no-repeat',
									backgroundPosition: 'center'
						}}
				className='flex h-full  duration-500'
			>
				<div className='flex flex-col justify-center w-full '>
					<div className=' flex justify-between hover:visible '>
						<button onClick={prevSlide}>
							<ChevronLeftIcon
								sx={{ fontSize: 50 }}
								style={{ color: 'white' }}
							/>
						</button>
						<button onClick={nextSlide}>
							<ChevronRightIcon
								sx={{ fontSize: 50 }}
								style={{ color: 'white' }}
							/>
						</button>
					</div>

				</div>
			</div>

		</div>
	)
}

export default Gallary;