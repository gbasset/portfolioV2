import React, { useEffect, useState, useContext } from 'react';
import NavigationAdmin from '../../Administration/Nav/NavigationAdmin';
import axios from 'axios';
import useFetch from '../../../hooks/useFetch';
import { RootContext } from '../../../Context/RootContext';
import toast, { Toaster } from 'react-hot-toast';
import Btn from '../../UI/Btn';
import PopinConfirm from '../../UI/PopinConfirm';
import Modal from '../../UI/Modal';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import ImageItem from './ImageItem';
import classes from './ImagesAdministration.module.css';
import UploadContainer from './UploadContainer'
export default function ImagesAdministration() {
    const {
        authBody,
    } = useContext(RootContext);
    const [modalIsOppen, setModalIsOppen] = useState(false);
    const [fetchData, setFetchData] = useState(true);
    const [arrayOfElements, setArrayOfElements] = useState();
    const [isLoading, setisLoading] = useState(true);
    const [elementToDelete, setelementToDelete] = useState()

    const { response, error } = useFetch(fetchData, `/private/images?token=${authBody.token}`, 'get',);
    useEffect(() => {
        if (response) {
            setisLoading(false)
            setArrayOfElements(response)
            setFetchData(false)
        }
    }, [response]);
    const deleteElement = (elem) => {
        setisLoading(true);
        axios.delete(`/private/project/${elem._id}/?token=${authBody.token}`)
            .then(res => {
                setTimeout(() => {
                    setelementToDelete();
                    setFetchData(true);
                    toast.success('Suppression réussie!', {
                        icon: '🥳',
                        // https://react-hot-toast.com/docs/toast
                    });
                }, 500);
            })
            .catch(error => {
                setisLoading(false);
                toast.error('Une erreur est survenue pendant la suppression', { icon: '☹️' });
            })
    }
    if (!arrayOfElements) {
        return (
            <div className="container">
                <NavigationAdmin />
                <div className="container-admin">
                    <div className='container-loader'>
                        <Loader
                            type="Oval"
                            color="#00BFFF"
                            height={100}
                            width={100}
                            timeout={10000} //3 secs
                        />
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className="container">
            <NavigationAdmin />
            <div className="container-admin">
                <h1>Gestion des images</h1>
                {elementToDelete &&
                    <PopinConfirm
                        cancel={() => setelementToDelete()}
                        title={`Voullez vous vraiment supprimer ${elementToDelete.filename} ?`}
                    >
                        <div className="btnCenter">
                            <Btn
                                onClickFunction={(e) => { setelementToDelete() }}
                                message="Annuler"
                                color="alert"
                                style="primary"
                            />
                            <Btn
                                onClickFunction={() => { deleteElement(elementToDelete) }}
                                message="Supprimer"
                                color="success"
                                style="outline"
                            />
                        </div>
                    </PopinConfirm>
                }
                {modalIsOppen &&
                    <UploadContainer
                        modalIsOppen={modalIsOppen}
                        setFetchData={(e) => setFetchData(e)}
                        setModalIsOppen={(e) => setModalIsOppen(e)}
                    />
                }
                <div className={classes.btnAddImg}>
                    <Btn
                        message='Ajouter des images'
                        onClickFunction={() => setModalIsOppen(true)} />
                </div>
                <div className={classes.containerImages}>
                    <>
                        <Toaster />
                        {arrayOfElements && arrayOfElements.map(img =>
                            <ImageItem key={img.asset_id} image={img} setelementToDelete={(e) => setelementToDelete(e)} />
                        )}
                    </>
                    {isLoading &&
                        <div className='container-loader'>
                            <Loader
                                type="Oval"
                                color="#00BFFF"
                                height={100}
                                width={100}
                                timeout={10000} //3 secs
                            />
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
