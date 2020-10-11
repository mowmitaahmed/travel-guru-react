import React, { useContext, useEffect } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import Header from '../Header/Header';
import Fb from '../../images/Icon/fb.png';
import Google from '../../images/Icon/google.png';
import './Login.css';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { selectedPlaceContext } from '../../App';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../firebase/firebase.config';
// import { forgotPassword, handleSignInFb, handleSignInGoogle, handleSubmit, initializeLoginFramework } from '../firebase/firebaseManager';

const Login = () => {
    if (!firebase.app.length) {
        firebase.initializeApp(firebaseConfig);
    }
    // Private Route code
    const history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    // Use Context
    const [selectedPlaceCon, setSelectedPlaceCon, destination, setDestinstion, user, setUser] = useContext(selectedPlaceContext);

    // React Hook Form
    const {register, errors} = useForm();
    const onSubmit =(data) => {
        console.log(data);
    }

    const handleBlur = (e) => {
        const newUserInfo = {...user};
        newUserInfo[e.target.name] = e.target.value;
        setUser(newUserInfo);
    }

 // Google Sign In
const handleSignInGoogle = () => {
    const providerGoogle = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(providerGoogle)
    .then( result => {
        console.log(result);
        const {displayName, photoURL, email} = result.user;
        const signedInUser = {
            isSignedIn: true,
            name: displayName,
            email: email,
            photo: photoURL
        }
        setUser(signedInUser);
        history.replace(from);
      }).catch(error => {
        var errorMessage = error.message;
        console.log(errorMessage);
      });
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
            // history.push("/profile");
            history.replace(from);
          })
          .catch(error => {
            var errorMessage = error.message;
            console.log('Error Message:',errorMessage);
          });
    }
// Normal Login
const handleSubmit = (e) => {
    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(res => {
            const newUserInfo = {...user};
            newUserInfo.isSignedIn = true;
            newUserInfo.error = '';
            newUserInfo.success = true;
            setUser(newUserInfo);
            // useEffect(() => {
            //     setUser(newUserInfo);
            //   }, []);
            setUser(newUserInfo);  
            // console.log('NewUserInfo: ',user);
            history.replace(from);
        })
        .catch(error =>{
            const newUserInfo = {...user};
            newUserInfo.isSignedIn = false;
            newUserInfo.error = error.message;
            setUser(newUserInfo);
          });
          e.preventDefault();
    }


// Reset Password
const forgotPassword = (email) => {
    var auth = firebase.auth();
    auth.sendPasswordResetEmail(email)
   .then(res => {
        const resetPass = {...user};
        resetPass.resetPassword = "Please check your mail!!";
        setUser(resetPass);
    }).catch(error => {
        console.log('Error Message: ', error.message);
    });
}

    return (
        <div className="loginPage">
            <Header></Header>
            <Container className="formContent">
                <Row>
                    <Col md={4}></Col>
                    <Col md={4}>
                        <Form onSubmit={handleSubmit} className="loginForm">
                            <h5>Login</h5>
                            <Form.Group controlId="formGroupEmail">
                                <Form.Control onBlur={handleBlur} name="email" type="email" placeholder="Enter email" ref={register({required:true})} />
                                {errors.email && <p style={{color: 'red'}}>Email is required</p>}
                            </Form.Group>
                            <Form.Group controlId="formGroupPassword">
                                <Form.Control onBlur={handleBlur} name="password" type="password" placeholder="Password" ref={register({required:true})} />
                                {errors.password && <p style={{color: 'red'}}>Password is required</p>}
                            </Form.Group>

                            <Form.Row id="formGridCheckbox" className="mb-3">
                               <Form.Check className="float-left mr-auto checkbox_input" type="checkbox" label="Remember me" />
                               <a href="#" className="float-right text-warning textDecoration" onClick={() => forgotPassword(user.email)}>Forgot Password</a>
                            </Form.Row>
                            {
                                user.resetPassword && <p className="text-center text-success">{user.resetPassword}</p>
                            }
                            <Button style={{width: '100%'}} variant="warning" type="submit">Login</Button>
                            <p className="text-center mt-3 mb-3">Don't have an account?<Link to="/registration"><span className="text-warning textDecoration">Create an account</span></Link></p>
                        </Form>
                        <p className="text-center text-danger">{user.error}</p>
                        {/* {
                            user.success && <p className="text-center text-success">User created successfully!</p>
                        } */}
                        <p className="mt-3 mb-3" style={{textAlign:'center'}}>---------------Or---------------</p>
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

export default Login;