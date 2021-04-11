import React from 'react';
import Inputchange from '../UI/InputChange';
import useInput from '../../hooks/useInput';
import Btn from '../UI/Btn';
import './Auth.css'
export default function Auth({ handleSubmit }) {

    const { state, bind, reset } = useInput({
        email: '',
        password: ''
    });

    return (
        <form action="" onSubmit={(e) => handleSubmit(e, state, reset)} className="container-auth">
            <h1>Connexion au compte</h1>
            <div className="body-form">
                <Inputchange
                    name='email'
                    type="email"
                    label="Email"
                    value={state.email}
                    onChangeFunction={bind.onChange}
                />
                <Inputchange
                    type="password"
                    name='password'
                    label="Password"
                    value={state.password}
                    onChangeFunction={bind.onChange}
                />
            </div>
            <Btn
                message="Valider"
                onClickFunction={(e) => handleSubmit(e, state, reset)}
            />
        </form>
    )
}
