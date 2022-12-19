import React, { useContext, useState } from 'react';
import { RootContext } from '../../Context/RootContext';
import NavigationAdmin from './Nav/NavigationAdmin';
import ProjectsAdministration from './Projects/ProjectsAdministration';
import LanguagesTagsManager from './Languages/LanguagesTagsManager';
import ImagesAdministration from './Images/ImagesAdministration';
import { Route, Redirect, Routes, useHistory } from 'react-router-dom';
export default function Dashboard() {
    const {
        authenticated,
        setAuthenticated,
        authBody,
        setAuthBody
    } = useContext(RootContext);



    return (
        <div style={{ display: 'flex' }}>
            <NavigationAdmin
                setAuthenticated={(e) => setAuthenticated(e)}
                authBody={authBody}
            />
            <div>

            </div>
        </div>
    )
}
