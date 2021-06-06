import React, { useContext } from 'react';
import Auth from './Auth/Auth';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useHistory } from "react-router-dom";
import { RootContext } from '../Context/RootContext';
import './Login.css';
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
                setTimeout(() => {
                    history.push("/dashboard/projects");
                    next();
                }, 1300);
            })
            .catch(error => {
                console.log(error);
                setAuthenticated(false);
                setTimeout(() => {
                    toast.dismiss(toastId);
                    toast.error('Une erreur est survenue pendant la tentative de connexion', { icon: '☹️' });
                }, 500);
            })
    }
    return (
        <div className="container-login">
            <Toaster />
            <Auth handleSubmit={submitLogin} />
        </div>
    )
}
