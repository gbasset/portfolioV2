import React, { useState, useEffect, useContext } from "react";
import { ContextProvider } from './Context/RootContext';
import { BrowserRouter as Router, useHistory, Route, Redirect, Switch } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import picture1 from './pictures/monde.jpg';
import picture2 from './pictures/foret.jpg';
import picture3 from './pictures/encoreautre.jpg';
import picture4 from './pictures/montagne.jpg';
import picture5 from './pictures/otremontagne.jpg';
import ProtectedRoute from './Component/ProtectedRoute';
import Login from './Component/Login';
import News from './Component/News';
import Home from './Component/Home';
import Profile from './Component/Profile';

function App() {
  const history = useHistory();
  const [projects, setProjects] = useState([])
  const [images, setImages] = useState([])
  const [imageActive, setImageActive] = useState(0)
  const [imagesToMap, setImagesToMap] = useState([
    {
      url: picture1,
      id: 0,
      name: "La nature est brute"
    },
    {
      url: picture2,
      id: 1,
      name: "La nature est lumineuse"
    },
    {
      url: picture3,
      id: 2,
      name: "La nature est sinueuse"
    },
    {
      url: picture4,
      id: 3,
      name: "La nature est profonde"
    },
    {
      url: picture5,
      id: 4,
      name: "La nature trace nos chemins"
    },
  ])
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
          {/* <div className="App">
          <div class="container">
          {imagesToMap.map(img =>
            <div className={imageActive === img.id ? "pannel active" : "pannel"}
            onClick={() => setImageActive(img.id)}
            style={{
              backgroundImage: "url(" + `${img.url}` + ")",
            }}>
            <button>See More</button>
            <h3> {img.name} </h3>
            </div>
            )}
            </div>
          </div> */}
        </Switch>
      </ContextProvider>
    </Router>
  );
}

export default App;
