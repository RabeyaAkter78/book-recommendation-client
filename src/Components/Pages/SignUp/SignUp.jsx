import { useContext, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProviders";
import { Form, Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { app } from "../../../firebase.config";


const auth = getAuth(app)
const SignUp = () => {
    const { createUser, updateUserData } = useContext(AuthContext);

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('')

    const handleRegister = event => {
        event.preventDefault();
        setSuccess('');
        const form = event.target;
        const name = form.name.value;
        const photo = form.photo.value;
        const email = form.email.value;
        const password = form.password.value;

        console.log(name, photo, email, password);

        if (password.length < 6) {
            setError(' Password should be at least 6 characters');
            return;
        }

        createUser(email, password)
            .then(() => {
                updateUserData(name, photo)
                    .then(() => {
                    })
                    .catch(err => console.log(err.message));

            })
            .catch(err => setError(err?.message))

    }
    


    return (
        <div className=' w-25 mx-auto m-5 p-3'>
            <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">SignUp!</h1>

                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form className="card-body" onSubmit={handleRegister}>
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
                                <button className="btn btn-primary">SignUp</button>
                            </div>
                            <div className="items-center justify-center ">
                                Already have an Account? Please<Link className='' to={'/login'}>Login</Link>
                            </div>
                        </form>
                        

                    </div>
                </div>
            </div>

        </div>
        </div>
    );
};
export default SignUp;