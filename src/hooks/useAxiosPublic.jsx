import axios from 'axios';
import React from 'react';

const axiosInstancePublic = axios.create({
    baseURL: 'https://assignment10server-kappa.vercel.app'
})

const useAxiosPublic = () => {
    return axiosInstancePublic
};

export default useAxiosPublic;