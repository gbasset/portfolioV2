import React, { useEffect, useState, useContext } from 'react';
import NavigationAdmin from '../../Administration/Nav/NavigationAdmin';
import useFetch from '../../../hooks/useFetch';
import { RootContext } from '../../../Context/RootContext';
import CardItem from './CardItem';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Btn from '../../UI/Btn';
import Modal from '../../UI/Modal';
import Inputchange from '../../UI/InputChange';
import useInput from '../../../hooks/useInput';
export default function LanguagesTagsManager() {
    const {
        authBody,
    } = useContext(RootContext);
    const [modalIsOppen, setModalIsOppen] = useState(false);

    const [fetchData, setFetchData] = useState(true);
    const [selectedElements, setselectedElements] = useState('languages')
    const { response, error } = useFetch(fetchData, `/private/${selectedElements}?token=${authBody.token}`, 'get',);
    const [arrayOfElements, setArrayOfElements] = useState([]);
    const { state, setstate, bind } = useInput({
        vale: '',
        label: ''
    });
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
    function closeTheModale() {
        setstate({
            vale: '',
            label: ''
        });
        setModalIsOppen(false)
    }
    const registerANewModel = (elem) => {
        axios.post(`/private/${selectedElements}/?token=${authBody.token}`, elem)
            .then(res => {
                setTimeout(() => {
                    setModalIsOppen(false);
                    setFetchData(true);
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
    const deleteElement = (elem, next) => {
        axios.delete(`/private/${selectedElements}/${elem._id}/?token=${authBody.token}`)
            .then(res => {
                setTimeout(() => {
                    next(false);
                    setFetchData(true);
                    toast.success('Suppression réussie!', {
                        icon: '🥳',
                        // https://react-hot-toast.com/docs/toast
                    });
                }, 500);
            })
            .catch(error => {
                toast.error('Une erreur est survenue pendant la suppression', { icon: '☹️' });
            })
    }

    return (
        <div className="container">
            <NavigationAdmin />
            <Modal
                isOpen={modalIsOppen}
                width="500"
                height="350"
                onClose={() => setModalIsOppen(false)}
            >
                <div className="modal_header has_border">
                    Créer un nouvel élément pour la liste des {selectedElements}
                </div>
                <div className="modal_body">
                    <Inputchange
                        name='value'
                        label="Value"
                        width='50%'
                        value={state.value}
                        onChangeFunction={bind.onChange}
                    />
                    <Inputchange
                        name='label'
                        label="Label"
                        width='50%'
                        value={state.label}
                        onChangeFunction={bind.onChange}
                    />
                </div>
                <div className=" modal_footer modal_footer_center ">
                    <Btn
                        onClickFunction={closeTheModale}
                        message="Annuler"
                        color="alert"
                    />
                    <Btn
                        onClickFunction={(e) => registerANewModel(state)}
                        message="Créer"
                    />
                </div>
            </Modal>
            <div className="container-admin">
                <Toaster />
                <h1>Gestion des languages et des tags</h1>
                <div>
                    <div> <button onClick={() => changeSelectedElement('languages')}>Languages</button></div>
                    <div> <button onClick={() => changeSelectedElement('tags')}>Tags</button></div>
                </div>
                <Btn
                    message={`Ajouter`}
                    onClickFunction={() => setModalIsOppen(true)} />
                <section>
                    {arrayOfElements && arrayOfElements.map(el =>
                        <CardItem key={el._id}
                            item={el}
                            natureOfElement={selectedElements}
                            registerChange={(elem, next) => registerChange(elem, next)}
                            deleteElement={(elem, next) => deleteElement(elem, next)}
                        />
                    )}
                </section>
            </div>
        </div>
    )
}
