import { Rating } from '@mui/material'
import React from 'react'

interface ReviewsComponentProps {
    reviews: ReviewsProps[];
};

interface ReviewsProps {
    name: string;
	review: string;
	reviewer_user_id: number;
	rating: number;
};

const ReviewsComponent:React.FC<ReviewsComponentProps> = ({
    reviews
}) => {
    if (!reviews) return (
        <div>
            <i>No reviews yet.</i>
        </div>
    )
    return (
        <>
            {
                reviews?.map((review) => (
                    <div className='flex flex-col space-y-2 p-3 rounded-xl shadow-lg border '>
                        <div className='text-xl font-bold'>{review.name}</div>
                        <Rating name="read-only" value={review.rating} readOnly />
                        <div className=''>
                            {review.review}
                        </div>
                    </div>

                ))

            }
        </>
    )
}

export default ReviewsComponent