import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllBooks = () => {
    const [books, setBooks] = useState([]);
    // const [selectedBook, setSelectedBook] = useState(null);
    useEffect(() => {
        fetch('http://localhost:5000/books')
            .then(res => res.json())
            .then(data => {
                setBooks(data),
                    console.log(data);
            })

    }, [])

    // const handleModal = (book) => {
    //     setSelectedBook(book);
    //     console.log(book);
    // }

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-3 py-5 gap-12">
                {books.map(book => (
                    <div key={book._id}>
                        <div className="card w-96 bg-base-100 shadow-xl">
                            <figure className="px-10 pt-10">
                                <img src={book.book_image} alt="Shoes" className="rounded-xl" />
                            </figure>
                            <div className="card-body items-center text-center">
                                <h2 className="card-title">Name: {book.title}</h2>
                                <p>Author: {book.author}</p>
                                <p>Genre: {book.genre}</p>
                                <div className="card-actions">
                                    <Link to={`/details/${book._id}`}>
                                        <button className="btn btn-primary m-4">View Details</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllBooks;