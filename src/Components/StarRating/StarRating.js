import React from 'react';

const StarRating = ({ average_rating }) => {
    // Calculate the number of full stars and half stars
    const fullStars = Math.floor(average_rating);
    const hasHalfStar = average_rating - fullStars >= 0.5;

    // Array to hold the star SVGs
    const starsArray = [];

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
        starsArray.push(
            <svg key={i} width="18" height="17" viewBox="0 0 18 17" fill="#FFA800" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 0L11.0206 6.21885H17.5595L12.2694 10.0623L14.2901 16.2812L9 12.4377L3.70993 16.2812L5.73056 10.0623L0.440492 6.21885H6.97937L9 0Z" />
            </svg>
        );
    }

    // Add half star if applicable
    if (hasHalfStar) {
        starsArray.push(
            <svg key={starsArray.length} width="18" height="17" viewBox="0 0 18 17" fill="#FFA800" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 0L11.0206 6.21885H17.5595L12.2694 10.0623L14.2901 16.2812L9 12.4377L3.70993 16.2812L5.73056 10.0623L0.440492 6.21885H6.97937L9 0Z" />
            </svg>
        );
    }

    // Add empty stars to complete the rating
    while (starsArray.length < 5) {
        starsArray.push(
            <svg key={starsArray.length} width="18" height="17" viewBox="0 0 18 17" fill="#D1D5DB" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 0L11.0206 6.21885H17.5595L12.2694 10.0623L14.2901 16.2812L9 12.4377L3.70993 16.2812L5.73056 10.0623L0.440492 6.21885H6.97937L9 0Z" />
            </svg>
        );
    }

    return <div className="flex">{starsArray}</div>;
};

export default StarRating;
