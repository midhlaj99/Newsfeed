import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
// import { useHistory ,useLocation } from 'react-router-dom';

import { loadProgressBar } from 'axios-progress-bar'
import 'axios-progress-bar/dist/nprogress.css'

import Header from "./Components/Header"
import Home from "./Components/Home"
import DetailNews from "./Components/SingleNews"

function App() {
  // const history = useHistory()

  // let location =history.location
  
  loadProgressBar()
  
  return (
    <div className="main">
        <div className='firsthead'>
          <Header/>
        </div>

        <div className='second_home'>
          <Router>
            <Route exact path='/'>
                <Home/>
            </Route>
            <Route path='/details:lng?'>
                <DetailNews/>
            </Route>
          </Router>
        </div>
    </div>
  );
}

export default App;
