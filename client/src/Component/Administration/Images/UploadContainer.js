import React, { useMemo, useEffect, useState, useContext } from "react";
import axios from 'axios';
import { useDropzone } from "react-dropzone";
import Progress from './Progress';
import Modal from '../../UI/Modal';
import Btn from '../../UI/Btn';
import { RootContext } from '../../../Context/RootContext';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import toast, { Toaster } from 'react-hot-toast';

export default function StyledDropzone({ modalIsOppen,
    setModalIsOppen, setFetchData }) {
    const {
        authBody,
    } = useContext(RootContext);
    const [fileInputState, setFileInputState] = useState('');
    const [previewSource, setPreviewSource] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    const [successMsg, setSuccessMsg] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [isLoading, setisLoading] = useState(false);
    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        previewFile(file);
        setSelectedFile(file);
        setFileInputState(e.target.value);
    };

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        };
    };

    const handleSubmitFile = (e) => {
        e.preventDefault();
        if (!selectedFile) return;
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = () => {
            setisLoading(true);
            uploadImage(reader.result);
        };
        reader.onerror = () => {
            console.error('AHHHHHHHH!!');
            setisLoading(false);
            setErrMsg('something went wrong!');
        };
    };

    const uploadImage = async (base64EncodedImage) => {
        try {
            await fetch(`/private/upload?token=${authBody.token}`, {
                method: 'POST',
                body: JSON.stringify({ data: base64EncodedImage }),
                headers: { 'Content-Type': 'application/json' },
            });
            setFileInputState('');
            setPreviewSource('');
            toast.success('Sauvegarde réussie!', {
                icon: '🥳',
                // https://react-hot-toast.com/docs/toast
            });
            setFetchData(true)
            setTimeout(() => {
                setisLoading(false);
                setModalIsOppen(false);
            }, 500);
        } catch (err) {
            console.error(err);
            setisLoading(false);

        }
    };
    return (
        <div className="container">
            <Modal
                isOpen={modalIsOppen}
                width="800"
                height="650"
                onClose={() => setModalIsOppen(false)}
            >
                <div className="modal_header has_border">
                    Uploader une nouvelle image
                </div>
                <div className="modal_body">
                    <Toaster />

                    <input
                        id="fileInput"
                        type="file"
                        name="image"
                        onChange={handleFileInputChange}
                        value={fileInputState}
                        className="form-input"
                    />

                    {previewSource && (
                        <img
                            src={previewSource}
                            alt="chosen"
                            style={{ height: '300px' }}
                        />
                    )}
                    <div className="container-btn-upload">
                        <Btn
                            onClickFunction={() => setModalIsOppen(false)}
                            message="Annuler"
                            color="warning"
                        />

                        {<Btn
                            onClickFunction={(e) => handleSubmitFile(e)}
                            message="Uploader une image"
                            color="success"
                        />
                        }
                    </div>
                    {isLoading &&
                        <div className='container-loader'>
                            <Loader
                                type="Oval"
                                color="#00BFFF"
                                height={100}
                                width={100}
                                timeout={100000} //3 secs
                            />
                        </div>
                    }
                </div>
            </Modal>

        </div>
    )
}


