import React, { use, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import { NavLink, useLocation, useNavigate } from 'react-router';
import useLoader from '../hooks/useLoader';
import Loader from '../components/Loader';
import axios from 'axios';


const UserRegistration = () => {
    const { loading, startLoading, stopLoading } = useLoader();

    const { axiosPublic, googleLogin, setUser, register, loginToast, updateUser } = use(AuthContext);

    const [error, setError] = useState('');

    const location = useLocation();
    console.log(location)

    const navigate = useNavigate();

    const registorErrorMessage = 'The email you provided is already in use.';

    const handleRegister = async event => {
        startLoading()
        event.preventDefault()

        // const name = event.target.name.value;
        const name = event.target.name.value;
        const email = event.target.email.value;
        const profileImage = event.target.profileImage.files[0];
        const password = event.target.password.value;

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

        if (!passwordRegex.test(password)) {
            stopLoading()
            setError('Your password must contain at least six characters, including at least one uppercase and one lowercase letter.')
            return;
        }

        const form = new FormData();
        form.append('image', profileImage)
        const image_API_URL = `https://api.imgbb.com/1/upload?expiration=600&key=${import.meta.env.VITE_image_host_key}`;

        let imageURL;

        await axios.post(image_API_URL, form)
            .then(res => {
                console.log(res?.data)
                imageURL = res?.data?.data?.display_url;
            }
            )
            .catch(err => {
                console.log(err)
                stopLoading()
                toast.error('Failed to upload image')
            })

        await register(email, password)
            .then(res => {
                updateUser({ ...res.user, displayName: name, photoURL: imageURL })
                    .then(() => {
                        setUser({ ...res.user, displayName: name, photoURL: imageURL })
                        stopLoading()
                    })
                    .catch(error => {
                        console.log(error)
                        stopLoading()
                    })

                toast.success('Successfully registered')
                navigate(location?.state || '/')
                console.log(res.user)

                const newUser = {
                    displayName: name,
                    email: email,
                    photoURL: imageURL
                }

                axiosPublic.post('/users', newUser)
                    .then(res => {
                        console.log(res.data)
                        stopLoading()
                    })
                    .catch(error => {
                        console.log(error)
                        stopLoading()
                    })
            })
            .catch(error => {
                stopLoading()
                toast.error(registorErrorMessage)
                setError(registorErrorMessage)
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

    if (loading) return <Loader></Loader>;

    return (
        <div className='px-4'>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 m-auto form">
                <div className="card-body gap-0">
                    <h1 className='text-3xl font-semibold text-gray-800 tracking-tight mb-4 text-center route-title'>Register</h1>
                    <form onSubmit={handleRegister}>
                        <fieldset className="fieldset gap-0">
                            <div>
                                <label className="label mb-1">Name</label>
                                <input type="text" className="input w-full mb-4" placeholder="Name" name='name' required />
                            </div>

                            <div>
                                <label className="label mb-1">Email</label>
                                <input type="email" className="input w-full mb-4" placeholder="Email" name='email' required />
                            </div>

                            <div>
                                <label className="label mb-1">Photo URL</label>
                                <input type="file" accept="image/*" className="file-input w-full mb-4" placeholder="Photo URL" name='profileImage' required />
                            </div>

                            <div>
                                <label className="label mb-1">Password</label>
                                <input type="password" className="input w-full" placeholder="Password" name='password' required />
                            </div>

                            <button className="btn btn-neutral form-btn mt-6">Register</button>
                        </fieldset>
                    </form>
                    <button onClick={handleGoogleLogin} className="btn bg-white text-black border-[#e5e5e5] form-btn mt-3">
                        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                        Login with Google
                    </button>

                    <p className='text-center mt-2'>Already have an account? <NavLink to='/user-login' className='hover:cursor-pointer hover:text-blue-700 hover:font-bold hover:underline'>Login</NavLink></p>
                </div>

                {error && <p className='text-center text-red-700 max-w-[90%] mx-auto mb-6'>{error}</p>}
            </div>
        </div >
    );
};

export default UserRegistration;