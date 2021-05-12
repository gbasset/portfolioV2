import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { RootContext } from '../../../Context/RootContext';
import NavigationAdmin from '../../Administration/Nav/NavigationAdmin';
import useFetch from '../../../hooks/useFetch';
import { useParams } from "react-router-dom";
import Inputchange from '../../UI/InputChange';
import TextAreaCustom from '../../UI/TextAreaCustom';
import './Project.css';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Btn from '../../UI/Btn';
import toast, { Toaster } from 'react-hot-toast';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { SingleDatePicker } from 'react-dates';
import moment from 'moment';
import Modal from '../../UI/Modal';
import { v4 as uuidv4 } from 'uuid';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
export default function Project() {
    let { id } = useParams();
    const animatedComponents = makeAnimated();
    const [focusedInput, setFocusedInput] = useState({ calendarFocused: false })
    const {
        authBody,
    } = useContext(RootContext);
    const listDevices = [
        { value: "desktop", label: "desktop" },
        { value: "mobile", label: "mobile" },
    ]
    const [fetchData, setFetchData] = useState(false);
    const [isNew, setIsNew] = useState(false);
    const [projectData, setprojectData] = useState();
    const [languages, setLanguages] = useState();
    const [defaultSelect, setDefaultSelect] = useState();
    const [defaultSelectLanguages, setDefaultSelectLanguages] = useState();
    const [tags, setTags] = useState();
    const [defaultSelectTags, setDefaultSelectTags] = useState();
    const [createdAt, setCreatedAt] = useState(moment());
    const { response, error } = useFetch(fetchData, `${process.env.REACT_APP_SECRET}/project/${id}`, 'get',);
    const [modalIsOppen, setModalIsOppen] = useState(false);
    const [currentLink, setCurrentLink] = useState({
        name: '',
        url: ''
    });
    const [isLoading, setisLoading] = useState(false);
    const getLanguages = () => {
        axios.get(`${process.env.REACT_APP_SECRET}/private/languages?token=${authBody.token}`)
            .then(res => {
                setLanguages(res.data);
            })
            .catch(error => {
                toast.error('Une erreur est survenue pendant la récupération des languages', { icon: '☹️' });
            })
    }
    const getTags = () => {
        axios.get(`${process.env.REACT_APP_SECRET}/private/tags?token=${authBody.token}`)
            .then(res => {
                setTags(res.data);
            })
            .catch(error => {
                toast.error('Une erreur est survenue pendant la récupération des tags', { icon: '☹️' });
            })
    }
    useEffect(() => {
        getLanguages();
        getTags();
    }, [])
    console.log("projectData", projectData);
    useEffect(() => {
        if (id !== 'new') {
            setFetchData(true);
            setisLoading(true);
        } else {
            setprojectData({
                devices: [
                    "desktop"
                ],
                language: [
                ],
                tags: [
                ],
                isMainProject: false,
                links: [
                ],
                name: "",
                description: "",
                images: [
                ],
                imageHome: {

                },
                year: moment(),
            })
            setIsNew(true);
        }
    }, [id])

    useEffect(() => {
        if (response) {
            setDefaultSelect(response[0].devices.map(val =>
                ({ value: val, label: val })))
            setDefaultSelectLanguages(response[0].language.map(val =>
                ({ value: val, label: val })))
            setDefaultSelectTags(response[0].tags.map(val =>
                ({ value: val, label: val })));
            setCreatedAt(moment(response[0].year))
            setprojectData(response[0]);
            setisLoading(false)
            setFetchData(false);
        }
    }, [response]);

    const handleChange = (event) => {
        setprojectData({ ...projectData, [event.target.name]: event.target.value })
    }
    const handleChangeLink = (event) => {
        const link = { ...currentLink }
        link[event.target.name] = event.target.value
        setCurrentLink(link)
    }

    const handleSelectChange = (e) => {
        let newValue = e && e.map(elem => elem.value)
        setDefaultSelect(e)
        setprojectData({ ...projectData, devices: newValue })
    }

    const handleSelectChangeLanguages = (e) => {
        let newValue = e && e.map(elem => elem.value)
        setDefaultSelectLanguages(e)
        setprojectData({ ...projectData, language: newValue })
    }
    const handleSelectChangeTags = (e) => {
        let newValue = e && e.map(elem => elem.value)
        setDefaultSelectTags(e)
        setprojectData({ ...projectData, tags: newValue })
    }
    const saveProject = () => {
        setisLoading(true);
        axios.patch(`${process.env.REACT_APP_SECRET}/private/project/${id}/?token=${authBody.token}`, projectData)
            .then(res => {
                setTimeout(() => {
                    toast.success('Sauvegarde réussie!', {
                        icon: '🥳',
                        // https://react-hot-toast.com/docs/toast
                    });
                    setisLoading(false);
                }, 500);
            })
            .catch(error => {
                setisLoading(false);
                toast.error('Une erreur est survenue pendant la sauvegarde', { icon: '☹️' });
            })
    }
    const createProject = () => {
        setisLoading(true);
        axios.post(`${process.env.REACT_APP_SECRET}/private/projects/?token=${authBody.token}`, projectData)
            .then(res => {
                setTimeout(() => {
                    toast.success('Sauvegarde réussie!', {
                        icon: '🥳',
                        // https://react-hot-toast.com/docs/toast
                    });
                    setisLoading(false);
                }, 500);
            })
            .catch(error => {
                setisLoading(false);
                toast.error('Une erreur est survenue pendant la création', { icon: '☹️' });
            })
    }

    const onFocusChange = ({ focused }) => {
        setFocusedInput(() => ({ calendarFocused: focused }))
    };
    const onDateChange = (createdAt) => {
        setCreatedAt(() => (createdAt))
        setprojectData({ ...projectData, year: createdAt })
    }
    const oppenLinkEdit = (link) => {
        setModalIsOppen(true)
        if (link) {
            setCurrentLink(link)
        } else {
            setCurrentLink({
                name: '',
                url: '',
                id: uuidv4()
            })
        }
    }

    const addLinkToCurrentProject = () => {
        if (!currentLink._id) {
            let linkToChange = projectData.links.find(el => el.id === currentLink.id);
            if (!linkToChange) {
                let projectCurrentData = { ...projectData };
                const newLink = { ...currentLink };
                projectCurrentData.links.push(newLink);
                setprojectData(projectCurrentData);
                setModalIsOppen(false);
            } else {
                linkToChange = currentLink;
                const newArrayOfLinks = projectData.links.filter(el => el.id !== currentLink.id);
                setprojectData({ ...projectData, links: [...newArrayOfLinks, linkToChange] });
                setModalIsOppen(false);
            }
        } else {
            let linkToChange = currentLink;
            const newArrayOfLinks = projectData.links.filter(el => el._id !== currentLink._id);
            setprojectData({ ...projectData, links: [...newArrayOfLinks, linkToChange] });
            setModalIsOppen(false);
        }
    }
    console.log("isLoading", isLoading);
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
                    Ajouter un lien au projet {projectData && projectData.name}
                </div>
                <div className="modal_body">
                    <Inputchange
                        name='name'
                        label="Type"
                        width='50%'
                        value={currentLink.name}
                        onChangeFunction={handleChangeLink}
                    />
                    <Inputchange
                        name='url'
                        label="Url"
                        width='50%'
                        value={currentLink.url}
                        onChangeFunction={handleChangeLink}
                    />
                </div>
                <div className=" modal_footer modal_footer_center ">
                    <Btn
                        onClickFunction={() => setModalIsOppen(false)}
                        message="Annuler"
                        color="alert"
                    />
                    <Btn
                        onClickFunction={() => addLinkToCurrentProject()}
                        message="Ok"
                    />
                </div>
            </Modal>
            <div className="container-admin">
                <Toaster />
                {isLoading &&
                    <div className='container-loader'>
                        <Loader
                            type="Oval"
                            color="#00BFFF"
                            height={100}
                            width={100}
                            timeout={100} //3 secs
                        />
                    </div>
                }
                <div className="container-project">
                    <h1>Page d'édition du projet {projectData && projectData.name}</h1>
                    <label>Dates de l'événement</label>
                    <SingleDatePicker
                        date={createdAt} // momentPropTypes.momentObj or null,
                        id="your_unique_id"
                        numberOfMonths={1}
                        displayFormat='DD/MM/YYYY'
                        focused={focusedInput.calendarFocused}
                        onFocusChange={onFocusChange}
                        onDateChange={onDateChange}
                        isOutsideRange={() => false}
                    />
                    <Inputchange
                        name='name'
                        label="Nom du projet"
                        width='50%'
                        value={projectData && projectData.name}
                        onChangeFunction={handleChange}
                    />

                    <div className="container-select-devices">
                        <label>Devices</label>
                        <Select
                            closeMenuOnSelect={true}
                            value={defaultSelect && defaultSelect}
                            components={animatedComponents}
                            menuPortalTarget={document.body}
                            styles={{ menuPortal: base => ({ ...base, zIndex: 10000 }) }}
                            menuPosition={"fixed"}
                            isMulti
                            options={listDevices}
                            placeholder={"Selectionner des devices"}
                            onChange={handleSelectChange}
                        />
                    </div>
                    <div className="container-select-devices">
                        <label>Languages</label>
                        <Select
                            closeMenuOnSelect={true}
                            value={defaultSelectLanguages && defaultSelectLanguages}
                            components={animatedComponents}
                            menuPortalTarget={document.body}
                            styles={{ menuPortal: base => ({ ...base, zIndex: 10000 }) }}
                            menuPosition={"fixed"}
                            isMulti
                            options={languages && languages}
                            placeholder={"Selectionner des languages"}
                            onChange={handleSelectChangeLanguages}
                        />
                    </div>
                    <div className="container-select-devices">
                        <label>Tags</label>
                        <Select
                            closeMenuOnSelect={true}
                            value={defaultSelectTags && defaultSelectTags}
                            components={animatedComponents}
                            menuPortalTarget={document.body}
                            styles={{ menuPortal: base => ({ ...base, zIndex: 10000 }) }}
                            menuPosition={"fixed"}
                            isMulti
                            options={tags && tags}
                            placeholder={"Selectionner des tags"}
                            onChange={handleSelectChangeTags}
                        />
                    </div>
                    <div>
                        <label htmlFor="liens">Liens</label> <span onClick={() => oppenLinkEdit()}>Add</span>
                        <ul>
                            {projectData && projectData.links.map(link =>
                                <li key={link._id} onClick={() => oppenLinkEdit(link)}>{link.url}</li>
                            )}
                        </ul>
                    </div>
                    <TextAreaCustom
                        name='description'
                        label="Description"
                        value={projectData && projectData.description}
                        onChangeFunction={handleChange}
                    />
                    <Btn
                        message="Valider"
                        onClickFunction={!isNew ? saveProject : createProject}
                    />
                </div>
            </div>
        </div>
    )
}
