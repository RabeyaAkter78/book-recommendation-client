import { useLoaderData } from "react-router-dom";

const Details = () => {
    const data = useLoaderData()
    console.log(data);

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
                    <button className="btn btn-primary">Rating</button>
                </div>
            </div>
        </div>
    );
};

export default Details;