import React, { useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { useEffect } from 'react';
import app from '../firebase/firebase.init';
import useAxiosPublic from '../hooks/UseAxiosPublic';

const auth = getAuth(app)

const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [loader, setLoader] = useState(true);

    const loginToast = 'Successfully logged in';

    const axiosPublic = useAxiosPublic();

    const register = (email, password) => {
        setLoader(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const login = (email, password) => {
        setLoader(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const googleLogin = () => {
        setLoader(true)
        return signInWithPopup(auth, provider)
    }

    const logout = () => {
        return signOut(auth)
    }

    const updateUser = updatedUser => {
        return updateProfile(auth.currentUser, updatedUser)
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

    const authInfo = { user, setUser, loader, register, googleLogin, logout, login, loginToast, updateUser, axiosPublic, setLoader };

    return (
        <div>
            <AuthContext value={authInfo}>{children}</AuthContext>
        </div>
    )
};

export default AuthProvider;