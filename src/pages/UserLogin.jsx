import React, { useState } from 'react';
import { use } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { NavLink, useLocation, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import useLoader from '../hooks/useLoader';
import Loader from '../components/Loader';

const UserLogin = () => {

    const { loading, startLoading, stopLoading } = useLoader();

    const { axiosPublic, login, googleLogin, loginToast, setUser } = use(AuthContext);

    const [error, setError] = useState('');

    const navigate = useNavigate();
    const location = useLocation();

    const handleLogin = event => {
        startLoading()
        event.preventDefault()

        const email = event.target.email.value;
        const password = event.target.password.value;

        login(email, password)
            .then(res => {
                toast.success(loginToast)
                navigate(location?.state || '/')
                stopLoading()
                console.log(res.user)
            })
            .catch(error => {
                stopLoading()
                setError(error.message)
                toast.error(error.message)
                console.log(error)
            })
    }

    const handleGoogleLogin = () => {
        googleLogin()
            .then(res => {
                setUser(res.user)
                toast.success(loginToast)
                navigate(location?.state || '/')
                console.log(res.user)

                const newUser = {
                    displayName: res.user.displayName,
                    email: res.user.email,
                    photoURL: res.user.photoURL
                }

                axiosPublic.post('/users', newUser)
                    .then(res => {
                        console.log(res.data)
                    })
                    .catch(error => {
                        console.log(error)
                    })
            })
            .catch(error => {
                toast.error(error.message)
                setError(error.message)
                console.log(error)
            })
    }

    if (loading) return <Loader></Loader>

    return (
        <div className='px-4'>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 m-auto form">
                <div className="card-body gap-0">
                    <h1 className='text-3xl font-semibold text-gray-800 tracking-tight mb-4 text-center route-title'>Login</h1>
                    <form onSubmit={handleLogin}>
                        <fieldset className="fieldset gap-0">
                            <div>
                                <label className="label mb-1">Email</label>
                                <input type="email" className="input w-full mb-4" placeholder="Email" name='email' required />
                            </div>
                            <div>
                                <label className="label mb-1">Password</label>
                                <input type="password" className="input w-full" placeholder="Password" name='password' required />
                            </div>
                            {/* <div><a className="link link-hover mt-7">Forgot password?</a></div> */}
                            <button className="btn btn-neutral mt-6 form-btn">Login</button>
                        </fieldset>
                    </form>
                    <button onClick={handleGoogleLogin} className="btn bg-white text-black border-[#e5e5e5] form-btn mt-3">
                        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853"
                                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4"
                                    d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                        Login with Google
                    </button>
                    <p className='text-center mt-2'>Don't have an account? <NavLink to='/user-registration' className='hover:cursor-pointer hover:text-blue-700 hover:underline hover:font-bold navigate'>Register</NavLink></p>
                </div>
                {error && <p className='text-center text-red-700 max-w-[90%] mx-auto mb-6'>{error}</p>}
            </div>
        </div >
    );
};

export default UserLogin;