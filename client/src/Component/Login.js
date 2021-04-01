import React, { useContext } from 'react';
import Auth from './Auth/Auth';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useHistory } from "react-router-dom";
import { RootContext } from '../Context/RootContext';
export default function Login() {
    let history = useHistory();
    const {
        setAuthenticated,
        setAuthBody
    } = useContext(RootContext)
    const submitLogin = (event, state, next) => {
        event.preventDefault();
        const toastId = toast.loading('Chargement ...');
        axios.post(`/login`, state)
            .then(res => {
                setAuthenticated(true);
                setAuthBody(res.data)
                setTimeout(() => {
                    toast.dismiss(toastId);
                    toast.success('Connexion réussie!', {
                        icon: '🥳',
                        // https://react-hot-toast.com/docs/toast
                    });
                }, 500);
                next();
                setTimeout(() => {
                    history.push("/dashboard");
                }, 700);
            })
            .catch(error => {
                console.log(error);
                setAuthenticated(false);
                console.log({ ...state })
                setTimeout(() => {
                    toast.dismiss(toastId);
                    toast.error('Une erreur est survenue !', { icon: '☹️' });
                }, 500);
            })
        // toast.promise(myPromise, {
        //     loading: 'Loading',
        //     success: 'Got the data',
        //     error: 'Error when fetching',
        // });
    }
    return (
        <div>
            <h1>Connexion au compte</h1>
            <Toaster />
            <Auth handleSubmit={submitLogin} />
        </div>
    )
}
