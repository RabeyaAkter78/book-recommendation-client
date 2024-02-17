import AllBooks from "../AllBooks/AllBooks";
import Search from "./Search";

const Home = () => {
    return (
        <div>
            <Search></Search>
            <AllBooks></AllBooks>
        </div>
    );
};

export default Home;