import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getBreweryDetails, getReviews, addReview, deleteReview } from '../api';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';
import '../styles/BreweryDetails.css';

function BreweryDetails() {
    const [brewery, setBrewery] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({ rating: '', description: '' });
    const { id } = useParams();

    useEffect(() => {
        const fetchBreweryAndReviews = async () => {
            try {
                const [breweryResponse, reviewsResponse] = await Promise.all([
                    getBreweryDetails(id),
                    getReviews(id)
                ]);
                setBrewery(breweryResponse.data);
                setReviews(reviewsResponse.data);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };
        fetchBreweryAndReviews();
    }, [id]);

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await addReview({ ...newReview, postId: id, userName: localStorage.getItem('username') }, token);

            const newReviewData = response.data.review;

            setReviews([...reviews, newReviewData]);
            setNewReview({ rating: '', description: '' });
        } catch (error) {
            console.error('Error submitting review', error);
        }
    };

    const handleReviewDelete = async (reviewId) => {
        try {
            const token = localStorage.getItem('token');
            await deleteReview(reviewId, token);
            const updatedReviews = reviews.filter(review => review.id !== reviewId);
            setReviews(updatedReviews);
        } catch (error) {
            console.error('Error deleting review', error);
        }
    };

    const StarRating = ({ rating }) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<BsStarFill key={i} />);
        }

        if (hasHalfStar) {
            stars.push(<BsStarHalf key={fullStars} />);
        }

        const emptyStars = 5 - stars.length;
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<BsStar key={fullStars + i} />);
        }

        return <div className="star-rating">{stars}</div>;
    };

    if (!brewery) return <div>Loading...</div>;

    return (
        <div className="brewery-details-container">
            <h1>{brewery.name}</h1>
            <p>Address: {brewery.street}, {brewery.city}, {brewery.state}, {brewery.postal_code}</p>
            <p>Phone: {brewery.phone}</p>
            <p>Website: <a href={brewery.website_url} target="_blank" rel="noopener noreferrer">{brewery.website_url}</a></p>
            <p>Type: {brewery.brewery_type}</p>

            <h2>Reviews</h2>
            <div className="reviews-container">
                {reviews.map(review => (
                    <div key={review.id} className="review-item">
                        <StarRating rating={review.rating} />
                        <p>{review.description}</p>
                        <p>By: {review.userName}</p>
                        <button onClick={() => handleReviewDelete(review.id)}>Delete</button>
                    </div>
                ))}
            </div>

            <div className="review-form">
                <h3>Add a Review</h3>
                <form onSubmit={handleReviewSubmit}>
                    <select
                        value={newReview.rating}
                        onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
                        required
                    >
                        <option value="">Select Rating</option>
                        {[1, 2, 3, 4, 5].map(num => (
                            <option key={num} value={num}>{num}</option>
                        ))}
                    </select>
                    <textarea
                        value={newReview.description}
                        onChange={(e) => setNewReview({ ...newReview, description: e.target.value })}
                        placeholder="Review description"
                        required
                    />
                    <button type="submit">Submit Review</button>
                </form>
            </div>
        </div>
    );
}

export default BreweryDetails;
