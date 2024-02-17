import { useEffect, useRef, useState } from "react";

const Home = () => {
    // const searchRef = useRef(null);
    // const [search, setSearch] = useState('');

    // useEffect(() => {
    //     fetch(`http://localhost:5000/books?search=${search}`)
    //         .then(res => res.json())
    //         .then(data => { setSearch(data) })


    // }, [search])
    // const handleSearch = () => {
    //     const searchTerm = searchRef.current.value;
    //     console.log(searchTerm);
    //     setSearch(searchTerm);
    // }

    const searchRef = useRef(null);
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/books?search=${searchRef.current.value}`)
            .then(res => res.json())
            .then(data => setSearchResults(data))
            .catch(error => console.error('Error fetching data:', error));

    }, [searchResults]); 
    const handleSearch = () => {
        const searchTerm = searchRef.current.value;
        setSearchResults([]); 
        fetch(`http://localhost:5000/books?search=${searchTerm}`)
            .then(res => res.json())
            .then(data => {
                setSearchResults(data),
                searchRef.current.value = '';
            })

            .catch(error => console.error('Error fetching data:', error));
    };


    return (
        <div>
            <div className="join flex justify-center items-center mb-5">
                <div>
                    <div>
                        <input ref={searchRef} className="input input-bordered join-item" placeholder="Search" />
                    </div>
                </div>

                <div className="indicator">
                    <button onClick={handleSearch} className="btn join-item">Search</button>
                </div>
            </div>
            <div>
                {searchResults.length > 0 ? (
                    <>
                        <h2>Search Results:</h2>
                        <ul>
                            {searchResults.map(book => (
                                <li key={book._id}>{book.title} by {book.author} (Genre: {book.genre})</li>
                            ))}
                        </ul>
                    </>
                ) : (
                    <p>No search results found.</p>
                )}
            </div>
        </div>
    );
};

export default Home;