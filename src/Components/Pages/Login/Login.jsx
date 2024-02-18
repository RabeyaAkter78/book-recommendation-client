import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { app } from '../../../firebase.config';
import { AuthContext } from '../../../Providers/AuthProviders';


const auth = getAuth(app)
const Login = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const { signInUser } = useContext(AuthContext)
    const navigate = useNavigate();
    const location = useLocation();
    // console.log('login page location', location)
    const from = location.state?.from.pathname || '/';



    // const logout = () => {
    //     signOut(auth)
    // }

    // const emailUser = auth.currentUser();
    // if (emailUser !== null) {
    //     const displayName = emailUser.displayName;
    //     const photoURL = emailUser.photoURL;

    // }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, loggedInUser => {
            // console.log('loggedUser', loggedInUser);
            setUser(loggedInUser)
        })
        return () => {
            unsubscribe();
        }

    }, [])





    // login with email & password
    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        console.log(email, password);

        if (/((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])|(?=.*[\\d~!@#$%^&*\\(\\)_+\\{\\}\\[\\]\\?<>|_]).{6,50})/.test(password)) {
            setError('incorrect password');
            return;
        }

        signInUser(email, password)
            .then(result => {
                const loggedInUser = result.user;
                console.log(loggedInUser);
                navigate(from, { replace: true });
                setError('');
                form.reset();
                setSuccess('Successfully Login !');
                setUser(loggedInUser)
            })
            .catch(error => {
                console.log(error.message);
                setError(error.message);
            })

    }

    return (

        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>

                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form className="card-body" onSubmit={handleLogin}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name='name' placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                            </div>


                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>
                            <div className="items-center justify-center ">
                                Dont Have an Account? Please<Link className='' to={'/signUp'}> Register</Link>
                            </div>
                        </form>
                       

                    </div>
                </div>
            </div>
            {/* .................... */}

        </div>




    );
};

export default Login;
