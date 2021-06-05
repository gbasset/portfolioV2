import React, { useState, useEffect, useContext } from "react";
import { ContextProvider } from './Context/RootContext';
import { BrowserRouter as Router, useHistory, Route, Redirect, Switch } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import './App.css';


import ProtectedRoute from './Component/ProtectedRoute';
import Login from './Component/Login';
import News from './Component/Home/News';
import Home from './Component/Home/Home';
import Profile from './Component/Profile';
import Dashboard from './Component/Administration/Dashboard';
import Project from './Component/Administration/Projects/Project';
import LanguagesTagsManager from './Component/Administration/Languages/LanguagesTagsManager';
import ProjectsAdministration from './Component/Administration/Projects/ProjectsAdministration';
import ImagesAdministration from './Component/Administration/Images/ImagesAdministration';
function App() {
  const history = useHistory();
  const [projects, setProjects] = useState([])
  const [images, setImages] = useState([])
  const [imageActive, setImageActive] = useState(0)

  // useEffect(() => {
  //   axios.get(`/projects`)
  //     .then(res => {
  //       setProjects(res.data)
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     })
  // }, [])
  // useEffect(() => {
  //   axios.get(`/api/images`)
  //     .then(res => {
  //       setImages(res.data)
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     })
  // }, [])

  return (
    <Router history={history}>
      <ContextProvider>
        <Switch>
          <Route path="/home" component={Home} exact />
          <Route path="/news" component={News} exact />
          <Route path="/login" component={Login} exact />
          <ProtectedRoute exact path='/profile' component={Profile} />
          <ProtectedRoute exact path='/dashboard' component={Dashboard} mustBeAdmin={true} />
          <ProtectedRoute path='/dashboard/languages' component={LanguagesTagsManager} mustBeAdmin={true} />
          <ProtectedRoute path='/dashboard/projects' component={ProjectsAdministration} mustBeAdmin={true} />
          <ProtectedRoute path='/dashboard/images' component={ImagesAdministration} mustBeAdmin={true} />
          <Route exact path="/project/:id" component={Project} />
          <Redirect exact from="/" to="/login" />
        </Switch>
      </ContextProvider>

    </Router>
  );
}

export default App;
