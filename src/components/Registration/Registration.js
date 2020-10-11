import React, { useContext, useRef } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link, useHistory, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Fb from '../../images/Icon/fb.png';
import Google from '../../images/Icon/google.png';
import './Registration.css'
import { useForm } from 'react-hook-form';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../firebase/firebase.config';
import { selectedPlaceContext } from '../../App';

const Registration = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
     }
    const history = useHistory();
    const [selectedPlaceCon, setSelectedPlaceCon, destination, setDestinstion, user, setUser] = useContext(selectedPlaceContext)

    // React Hook Form
    const {register,handleSubmit, errors, watch} = useForm();
    const password = useRef({});
    password.current = watch("password", "");
    const onSubmit = async data => {
        alert(JSON.stringify(data));
      };

    // Firebase Google
    const handleSignInGoogle = () => {
        const providerGoogle = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(providerGoogle)
        .then( result => {
            const {displayName, photoURL, email} = result.user;
            const signedInUser = {
                isSignedIn: true,
                name: displayName,
                email: email,
                photo: photoURL
            }
            setUser(signedInUser);
            history.push("/profile");
          }).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
          });
    }
    const handleBlur = (e) => {
        const newUserInfo = {...user};
        newUserInfo[e.target.name] = e.target.value;
        setUser(newUserInfo);
    }

    // sign UP
    const handleSubmitReg = (e) => {
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then(res =>{
            const newUserInfo = {...user};
            newUserInfo.isSignedIn = true;
            newUserInfo.error = '';
            newUserInfo.success = true;
            setUser(newUserInfo);
            history.push("/profile");
            return firebase.collection('users').doc(res.user.uid).set({
                name: user.name
            })
        })
        .catch(function(error) {
            const newUserInfo = {...user};
            newUserInfo.isSignedIn = false;
            newUserInfo.error = error.message;
            setUser(newUserInfo);
            console.log('Error message: ', user);
            });
        e.preventDefault();
    }

    // Firebase Fb 
    const handleSignInFb = () => {
        const providerfb = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(providerfb)
        .then(result => {
            const {displayName, photoURL, email} = result.user;
            const signedInUserFb = {
                isSignedIn: true,
                name: displayName,
                email: email ? email : 'exaple@gmail.com',
                photo: photoURL
            }
            setUser(signedInUserFb);
            history.push("/profile");
          })
          .catch(error => {
            var errorMessage = error.message;
            console.log('Error Message:',errorMessage);
          });
    }
    return (
        <div className="registrationPage">
            <Header></Header>
            <Container className="formContent">
                <Row>
                    <Col md={4}></Col>
                    <Col md={4}>
                        <Form className="loginForm" onSubmit={handleSubmitReg}>
                            <h5>Create an account</h5>
                            <Form.Group controlId="formGroupFirstName">
                               <Form.Control onBlur={handleBlur} name="name" type="text" placeholder="Name" ref={register({ required: true, maxLength: 20 })} />
                               {errors.firstName && <p style={{color: 'red'}}>First Name is required</p>}
                            </Form.Group>
                            <Form.Group controlId="formGroupEmail">
                                <Form.Control onBlur={handleBlur} name="email" type="email" placeholder="Enter email"  ref={register({required: "Required",pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,message: "invalid email address"}})} />
                               {errors.email && <p style={{color: 'red'}}>{errors.email.message}</p>}
                            </Form.Group>
                            <Form.Group controlId="formGroupPassword">
                                <Form.Control onBlur={handleBlur} name="password"type="password" placeholder="Password"  ref={register({required: "You must specify a password", minLength: {value: 8,message: "Password must have at least 8 characters"}})} />
                                {errors.password && <p style={{color: 'red'}}>{errors.password.message}</p>}
                            </Form.Group>
                            <Form.Group controlId="formGroupConfirmPassword">
                                <Form.Control onBlur={handleBlur} name="confirmPassword"type="password" placeholder="Confirm Password"  ref={register({validate: value => value === password.current || "The passwords do not match" })} />
                                {errors.confirmPassword && <p style={{color: 'red'}}>{errors.confirmPassword.message}</p>}
                            </Form.Group>
                            <Button onClick={handleSubmit(onSubmit)}  style={{width: '100%'}} variant="warning" type="submit">Create an account</Button>
                            <p className="text-center mt-3 mb-3">Already have an account?<Link to="/login"><span className="text-warning textDecoration">Login</span></Link></p>
                        </Form>
                        <p className="text-center text-danger">{user.error}</p>
                        {
                            user.success && <p className="text-center text-success">User created successfully!</p>
                        }
                        <p className=" mt-3 mb-3" style={{textAlign:'center'}}>---------------Or---------------</p>
                        <ul className="extraLogin">
                            <li onClick={handleSignInFb}><img src={Fb} alt="fb"/>Continue with Facebook</li>
                            <li onClick={handleSignInGoogle}><img src={Google} alt="google"/>Continue with Google</li>
                        </ul>
                    </Col>
                    <Col md={4}></Col>
                </Row>
            </Container>
        </div>
    );
};

export default Registration;