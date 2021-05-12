import React, { useEffect, useState } from 'react';
import useFetch from '../../../hooks/useFetch';
import './ProjectsAdministration.css';
import Btn from '../../UI/Btn';
import { Link, useHistory } from 'react-router-dom';
import NavigationAdmin from '../../Administration/Nav/NavigationAdmin';

export default function ProjectsAdministration() {
    const [projects, setprojects] = useState([]);
    const [fetchData, setFetchData] = useState(true);
    const { response, error } = useFetch(fetchData, `${process.env.REACT_APP_SECRET}/projects`, 'get',);
    let history = useHistory();
    const getTheProjects = () => {
        if (fetchData) {
            setFetchData(false);
        }
    }
    useEffect(() => {
        if (fetchData) {
            getTheProjects();
        }
    }, [fetchData])
    useEffect(() => {
        setprojects(response);
    }, [response]);
    const GoToNewProject = () => {
        history.push("/project/new");
    }
    return (
        <div className="container">
            <NavigationAdmin />
            <div className="container-admin">
                <h1>Liste projets</h1>
                <Btn
                    message='Créer un projet'
                    onClickFunction={() => GoToNewProject()} />
                <div className="container-projects">
                    {projects && projects.map(project =>
                        <div className="project" key={project._id}>
                            <h1>{project.name}</h1>
                            <p>{project.description}</p>
                            <Link className='lien'
                                to={{
                                    pathname: "/project/" + project._id,
                                    state: {
                                        idProject: project._id
                                    }
                                }}>
                                <div className=""> Editer {project.name}</div>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div >
    )
}
