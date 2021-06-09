import React, { useEffect, useState, useContext } from 'react';
import useFetch from '../../../hooks/useFetch';
import './ProjectsAdministration.css';
import Btn from '../../UI/Btn';
import PopinConfirm from '../../UI/PopinConfirm';
import { Link, useHistory } from 'react-router-dom';
import NavigationAdmin from '../../Administration/Nav/NavigationAdmin';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { BsFillTrashFill } from 'react-icons/bs';
import { MdModeEdit } from 'react-icons/md';
import { RootContext } from '../../../Context/RootContext';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
export default function ProjectsAdministration() {
    const {
        authBody,
    } = useContext(RootContext);
    const [projects, setprojects] = useState();
    const [fetchData, setFetchData] = useState(true);
    const [isLoading, setisLoading] = useState(true);
    const [elementToDelete, setelementToDelete] = useState()
    const { response, error } = useFetch(fetchData, '/projects', 'get',);
    let history = useHistory();
    // useEffect(() => {
    //     axios.get('/projectMain')
    //         .then(res => {
    //             console.log(res.data);
    //         })
    //         .catch(error => {

    //         })
    // }, []);
    const getTheProjects = () => {
        if (fetchData) {
            setFetchData(false);
            setisLoading(true);
        }
    }
    useEffect(() => {
        if (fetchData) {
            getTheProjects();
        }
    }, [fetchData])
    useEffect(() => {
        setprojects(response);
        setisLoading(false);
    }, [response]);
    const GoToNewProject = () => {
        history.push("/project/new");
    }
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
    if (!projects) {
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
                            timeout={3000} //3 secs
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
                {elementToDelete &&
                    <PopinConfirm
                        cancel={() => setelementToDelete()}
                        title={`Voullez vous vraiment supprimer ${elementToDelete.name} ?`}
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
                <h1>Liste des projets</h1>
                <div className="btn-create">
                    <Btn
                        message='Créer un projet'
                        onClickFunction={() => GoToNewProject()} />
                </div>
                <div className="container-projects">
                    <Toaster />
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
                    {projects && projects.map(project =>
                        <div className="project" key={project._id}>
                            <Link className='lien'
                                to={{
                                    pathname: "/project/" + project._id,
                                    state: {
                                        idProject: project._id
                                    }
                                }}>
                                <h2>{project.name}</h2>
                            </Link>
                            <p>{project.description}</p>
                            <div className='projects'>
                                <span>
                                    <Link className='lien'
                                        to={{
                                            pathname: "/project/" + project._id,
                                            state: {
                                                idProject: project._id
                                            }
                                        }}>
                                        <div className=""> <MdModeEdit /></div>
                                    </Link>
                                </span>
                                <span className="delete-item" onClick={() => setelementToDelete(project)}>
                                    <BsFillTrashFill />
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div >
    )
}
