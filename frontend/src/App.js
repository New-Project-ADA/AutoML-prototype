import './App.css';
import React, { Component } from "react";
import Modal from "./Components/Modal";
import axios from 'axios';
import Input from "./Pages/Input"
import Login from './Pages/Login';
import Monitor from "./Pages/Monitor"
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
// create a class that extends the component
class App extends Component {
 
  // add a constructor to take props
  constructor(props) {
    super(props);
    
    };
  
 
  // Add componentDidMount()

  
  // Start by visual effects to viewer
  render() {
    return (
      <Router>
        {/* <Navibar/> */}
        <Routes>
            {/* <Route exact path='/' element={<UserMap url={"backend-cae2kit7uq-as.a.run.app"}/>} /> */}
            <Route path='/input' element={<Input/>} />
            {/* <Route path='/admin-map' element={<AdminMap url={"backend-cae2kit7uq-as.a.run.app"}/>} /> */}
            <Route path='/login' element={<Login/>} />
            <Route path='/monitor' element={<Monitor/>} />
        </Routes>
        </Router>
    );
  }
}
export default App;
