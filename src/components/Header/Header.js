import React, { useContext } from 'react';
import {Col, Row, Button, Container, Form, FormControl, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { selectedPlaceContext } from '../../App';
import logo from '../../images/Logo.png';
import './Header.css';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../firebase/firebase.config';
import profilePhoto from '../../images/Sajek.png';


const Header = (props) => {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
     }
    const [selectedPlaceCon, setSelectedPlaceCon, destination, setDestinstion, user, setUser] = useContext(selectedPlaceContext);
    console.log('User: ', user);
    // Sign Out Function
    const handleSignOut = () => {
        firebase.auth().signOut().then(function() {
            const signOutUser = {
              isSignedIn: false,
              email: '',
              name: '',
              photo: ''
            }
            setUser(signOutUser);
          }).catch(function(error) {
          });
    }
    return (
        <div>
        <Container>
          <Row>
            <Col md={12} xs={12}>
                <Navbar>
                    <Navbar.Brand href="#home">
                        <Link to="/home"><img className="logo" src={logo} alt="Travel Guru"/></Link>
                    </Navbar.Brand>
                    <Form className="mr-auto searchInput" inline>
                        <FormControl type="text" placeholder="Search Your Destination" className="mr-sm-2 searchForm" />
                    </Form>
                    <Nav className="float-left topMenu" style={{color: 'white'}}>
                        <Nav.Link href="#news">News</Nav.Link>
                        <Nav.Link href="#destination">Destination</Nav.Link>
                        <Nav.Link href="#blog">Blog</Nav.Link>
                        <Nav.Link href="#contact">Contact</Nav.Link>
                        {
                            user.isSignedIn && <Nav.Link href="#" style={{fontWeight: '700'}}><Link to="/profile">{user.name}</Link></Nav.Link>
                        }
                        {
                            user.isSignedIn && <Nav.Link href="#"> {user.photo ? <img src={user.photo} style={{width: '40px', height: '40px', borderRadius: '50%'}}/> : <img src={profilePhoto} style={{width: '40px', height: '40px', borderRadius: '50%'}}/>} </Nav.Link>
                        }
                    </Nav>
                    {
                        user.isSignedIn ? <Link to="/login"><Button onClick={handleSignOut} variant="warning" className="loginButton ml-3">Log Out</Button></Link> : <Link to="/login"><Button variant="warning" className="loginButton ml-5">Login</Button></Link>
                    }
                    
                </Navbar>
            </Col>
          </Row>
        </Container>
        </div>
    );
};

export default Header;