import React, { useState } from 'react';

const useInput = (initialValue) => {
    const [state, setstate] = useState(initialValue);
    const handleChange = (event) => {
        setstate({ ...state, [event.target.name]: event.target.value })
    }
    return {
        state,
        setstate,
        reset: () => setstate(initialValue),
        bind: {
            onChange: handleChange,
            className: 'input'
        }
    }
}
export default useInput;