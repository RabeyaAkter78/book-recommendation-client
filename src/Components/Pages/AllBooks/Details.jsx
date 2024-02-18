import { useState } from "react";
import Rating from "react-rating";
import { useLoaderData } from "react-router-dom";

const Details = () => {
    const data = useLoaderData();
    console.log(data);
    const [rating, setRating] = useState(0);
    
    
    

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    return (
        <div className="card lg:card-side bg-base-100 shadow-xl">
            <figure><img src={data.book_image} alt="Album" /></figure>
            <div className="card-body">
                <h2 className="card-title">Book Name:  {data.title}</h2>
                <p>{data.description}</p>
                <p>Author: {data.author}</p>
                <p>Genre: {data.genre}</p>
                <p>Publication Date: {data.publication_date}</p>
                <div className="card-actions justify-end">
                    <Rating
                        rating={rating}
                        changeRating={handleRatingChange}
                        widgetRatedColors="gold"
                        widgetDimensions="30px"
                        widgetSpacings="5px"
                    />
                    <button className="btn btn-primary">Submit Rating</button>
                </div>
            </div>
        </div>
    );
};

export default Details;