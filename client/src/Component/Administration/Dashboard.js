import React, { useContext, useState } from 'react';
import { RootContext } from '../../Context/RootContext';
import NavigationAdmin from './NavigationAdmin';
import ProjectsAdministration from './ProjectsAdministration';
import LanguagesTagsManager from './LanguagesTagsManager';
import ImagesAdministration from './ImagesAdministration';
export default function Dashboard() {
    const {
        authenticated,
        setAuthenticated,
        authBody,
        setAuthBody
    } = useContext(RootContext);
    const [activeLink, setActiveLink] = useState(1)
    return (
        <div style={{ display: 'flex' }}>
            <NavigationAdmin
                setAuthenticated={(e) => setAuthenticated(e)}
                authBody={authBody}
                setActiveLink={(e) => setActiveLink(e)}
                activeLink={activeLink}
            />
            <div>
                {activeLink === 1 &&
                    <>
                        <h1> Gestion des projets</h1>
                        <div className="">
                            <ProjectsAdministration />
                        </div>
                    </>
                }
                {activeLink === 2 &&
                    <>
                        <h1> Gestion des languages</h1>
                        <div className="">
                            <LanguagesTagsManager />
                        </div>
                    </>
                }
                {activeLink === 3 &&
                    <>
                        <h1> Gestion des images</h1>
                        <div className="">
                            <ImagesAdministration />
                        </div>
                    </>
                }
            </div>
        </div>
    )
}
