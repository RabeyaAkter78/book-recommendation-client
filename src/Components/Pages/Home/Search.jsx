import { useEffect, useRef, useState } from "react";

const Search = () => {
    

    const searchRef = useRef(null);
    const [searchResults, setSearchResults] = useState([]);
    const [searchPerformed, setSearchPerformed] = useState(false);
    useEffect(() => {
        fetch(`http://localhost:5000/books?search=${searchRef.current.value}`)
            .then(res => res.json())
            .then(data => setSearchResults(data))
            .catch(error => console.error('Error fetching data:', error));

    }, [searchResults]); 
    const handleSearch = () => {
        const searchTerm = searchRef.current.value;
        setSearchResults([]); 


      if (searchTerm.trim() !== '') { // Check if search term is not empty or whitespace
            fetch(`http://localhost:5000/books?search=${searchTerm}`)
                .then(res => res.json())
                .then(data => {
                    setSearchResults(data);
                    setSearchPerformed(true);
                    searchRef.current.value = ''; // Reset the input field
                })
                .catch(error => console.error('Error fetching data:', error));
        } else {
            setSearchPerformed(false);
        }
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
                {searchPerformed ? (
                    searchResults !== null ? (
                        searchResults.length > 0 ? (
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
                        )
                    ) : (
                        <p>No search results found.</p>
                    )
                ) : (
                    <p className="text-center font-bold">Search here to see results.</p>
                )}
            </div>
        </div>
    );
};

export default Search;