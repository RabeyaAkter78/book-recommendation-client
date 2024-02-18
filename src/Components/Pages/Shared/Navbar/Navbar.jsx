import { useContext } from "react";
import { AuthContext } from "../../../../Providers/AuthProviders";
import { Link } from "react-router-dom";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    console.log(user?.displayName);
    console.log(user);
    const handleLogout = () => {
        logout()
            .then()
            .catch(error => {
                console.log(error)
            })
    }




    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">Recommend Book</a>
            </div>
            <div className="flex-none gap-2">

                <div className="dropdown dropdown-end">
                    {user &&
                        <img style={{ height: '50px' }} title={user?.displayName} src={user?.photoURL} className="rounded-lg" />

                    }

                    {user ?
                        <button className='ms-3 btn btn-primary' onClick={handleLogout}>LogOut</button>
                        :
                        <Link to='/login'><button className="btn btn-primary">Login</button></Link>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;