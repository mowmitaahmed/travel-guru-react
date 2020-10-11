import React, { createContext, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './components/Home/Home';
import Book from './components/Book/Book';
import Profile from './components/Profile/Profile';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import * as firebase from "firebase/app";
import "firebase/auth";
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const selectedPlaceContext = createContext();

function App() {
   const [user, setUser] = useState({
      isSignedIn: false,
      name: '',
      email: '',
      photo: '',
      password: '',
      confirmPassword: '',
      checkbox: '',
      error: '',
      success: false,
      resetPassword: ''
   })
   const[selectedPlaceCon, setSelectedPlaceCon] = useState({
      name: "Cox's bazar",
      description: "Cox's Bazar is a city, fishing port, tourism centre and district headquarters in southeastern Bangladesh. It is famous mostly for its long natural sandy beach, and it ..."
  });
  const [destination, setDestinstion] = useState({
   origin: "Dhaka",
   destination: "Cox's Bazar"
});
  return (
     <selectedPlaceContext.Provider value={[selectedPlaceCon, setSelectedPlaceCon, destination, setDestinstion, user, setUser]} >
      <Router>
         <Switch>
            <Route path="/home">
               <Home></Home>
            </Route>
            <Route exact path="/">
               <Home></Home>
            </Route>
            <Route path="/book">
               <Book></Book>
            </Route>
            <Route path="/login">
               <Login></Login>
            </Route>
            <Route path="/registration">
               <Registration></Registration>
            </Route>
            <PrivateRoute path="/profile">
               <Profile></Profile>
            </PrivateRoute>
            {/* <Route path="/profile/:hotelPlace">
               <Profile></Profile>
            </Route> */}
         </Switch>
      </Router>
     </selectedPlaceContext.Provider>
  );
}

export default App;
