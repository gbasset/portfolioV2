import React, { useState, useEffect } from "react";
import axios from 'axios';

export default function useFetch(fetchData, url, verb, options) {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        if (!url) return;
        if (!fetchData) return;
        axios[verb](url, options)
            .then(res => {
                setResponse(res.data);
            })
            .catch(error => {
                setError(error.response.data)
            })
    }, [fetchData]);
    return { response, error };
};
