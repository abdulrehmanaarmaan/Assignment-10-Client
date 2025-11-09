import React, { useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { useEffect } from 'react';
import app from '../firebase/firebase.init';
import toast from 'react-hot-toast';

const auth = getAuth(app)

const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [loader, setLoader] = useState(true);
    const [error, setError] = useState('');

    const loginToast = 'Successfully logged in';

    const register = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const googleLogin = () => {
        return signInWithPopup(auth, provider)
            .then(res => {
                setUser(res.user)
                toast.success(loginToast)
                console.log(res.user)
            })
            .catch(error => {
                toast.error(error.message)
                setError(error.message)
                console.log(error)
            })
    }

    const logout = () => {
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoader(false)
        })

        return () => {
            unsubscribe()
        }
    }, [])

    const authInfo = { user, setUser, loader, register, googleLogin, logout, error, setError, login, loginToast };

    return (
        <div>
            <AuthContext value={authInfo}>{children}</AuthContext>
        </div>
    )
};

export default AuthProvider;