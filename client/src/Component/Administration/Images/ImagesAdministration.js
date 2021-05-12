import React, { useEffect, useState, useContext } from 'react';
import NavigationAdmin from '../../Administration/Nav/NavigationAdmin';
import axios from 'axios';
import useFetch from '../../../hooks/useFetch';
import { RootContext } from '../../../Context/RootContext';
import toast, { Toaster } from 'react-hot-toast';
import Btn from '../../UI/Btn';
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
    const [arrayOfElements, setArrayOfElements] = useState([]);
    const [isLoading, setisLoading] = useState(true);
    const { response, error } = useFetch(fetchData, `${process.env.REACT_APP_SECRET}/private/images?token=${authBody.token}`, 'get',);
    useEffect(() => {
        if (response) {
            setisLoading(false)
            setArrayOfElements(response)
            setFetchData(false)
        }
    }, [response]);


    return (
        <div className="container">
            <NavigationAdmin />
            <div className="container-admin">
                <h1>Gestion des images</h1>
                {modalIsOppen &&
                    <UploadContainer
                        modalIsOppen={modalIsOppen}
                        setFetchData={(e) => setFetchData(e)}
                        setModalIsOppen={(e) => setModalIsOppen(e)}
                    />
                }
                <Btn
                    message='Ajouter des images'
                    onClickFunction={() => setModalIsOppen(true)} />
                <div className={classes.containerImages}>
                    {arrayOfElements && arrayOfElements.map(img =>
                        <ImageItem key={img.asset_id} image={img} />
                    )}
                </div>
            </div>
        </div>
    )
}
