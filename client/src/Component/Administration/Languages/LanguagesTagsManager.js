import React, { useEffect, useState, useContext } from 'react';
import NavigationAdmin from '../../Administration/Nav/NavigationAdmin';
import useFetch from '../../../hooks/useFetch';
import { RootContext } from '../../../Context/RootContext';
export default function LanguagesTagsManager() {
    const {
        authBody,
    } = useContext(RootContext);
    console.log(authBody);
    const [fetchData, setFetchData] = useState(true);
    const { response, error } = useFetch(fetchData, `/private/languages?token=${authBody.token}`, 'get',);
    return (
        <div className="container">
            <NavigationAdmin />
            <div className="container-admin">
                <h1>Languages</h1>
            </div>
        </div>
    )
}
