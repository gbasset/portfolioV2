import React from 'react';

import useInput from '../../hooks/useInput';

export default function Auth({ handleSubmit }) {

    const { state, bind, reset } = useInput({
        email: '',
        password: ''
    });

    return (
        <form action="" onSubmit={(e) => handleSubmit(e, state, reset)}>
            <input
                type="email"
                name="email"
                value={state.email}
                {...bind}
            />
            <input
                type="password"
                name="password"
                value={state.password}
                {...bind}
            />
            <button>Valider</button>
        </form>
    )
}
