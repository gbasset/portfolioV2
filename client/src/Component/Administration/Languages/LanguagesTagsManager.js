import React, { useEffect, useState, useContext } from 'react';
import NavigationAdmin from '../../Administration/Nav/NavigationAdmin';
import useFetch from '../../../hooks/useFetch';
import { RootContext } from '../../../Context/RootContext';
import CardItem from './CardItem';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
export default function LanguagesTagsManager() {
    const {
        authBody,
    } = useContext(RootContext);

    const [fetchData, setFetchData] = useState(true);
    const [selectedElements, setselectedElements] = useState('languages')
    const { response, error } = useFetch(fetchData, `/private/${selectedElements}?token=${authBody.token}`, 'get',);
    const [arrayOfElements, setArrayOfElements] = useState([]);

    useEffect(() => {
        if (response) {
            console.log(response);
            setArrayOfElements(response)
            setFetchData(false)
        }
    }, [response]);

    function changeSelectedElement(el) {
        setselectedElements(el)
        setFetchData(true)
    }
    const registerChange = (elem, next) => {
        console.log(elem);
        axios.patch(`/private/${selectedElements}/${elem._id}/?token=${authBody.token}`, elem)
            .then(res => {
                setTimeout(() => {
                    next(false);
                    setFetchData(true)
                    toast.success('Sauvegarde réussie!', {
                        icon: '🥳',
                        // https://react-hot-toast.com/docs/toast
                    });
                }, 500);
            })
            .catch(error => {
                toast.error('Une erreur est survenue pendant la sauvegarde', { icon: '☹️' });
            })
    }
    return (
        <div className="container">
            <NavigationAdmin />
            <div className="container-admin">
                <Toaster />
                <h1>Gestion des languages et des tags</h1>
                <div>
                    <div> <button onClick={() => changeSelectedElement('languages')}>Languages</button></div>
                    <div> <button onClick={() => changeSelectedElement('tags')}>Tags</button></div>
                </div>
                <section>
                    {arrayOfElements && arrayOfElements.map(el =>
                        <CardItem key={el._id} item={el} natureOfElement={selectedElements} registerChange={(elem, next) => registerChange(elem, next)} />
                    )}
                </section>
            </div>
        </div>
    )
}
