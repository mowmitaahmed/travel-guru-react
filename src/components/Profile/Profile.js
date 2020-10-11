import React, {useContext, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Header from '../Header/Header';
import './Profile.css';
import { selectedPlaceContext } from '../../App';
import hotel from '../fakeData/hotel'
import SingleHotel from '../SingleHotel/SingleHotel';
import { GoogleMap, LoadScript } from '@react-google-maps/api';


const Profile = () => {
    // Google Map
    const mapStyles = {        
        height: "100vh",
        width: "100%",
        borderRadius: '13px'
    };
      
      const defaultCenter = {
        lat: 41.3851, lng: 2.1734
      }
      
    const [hotels, setHotels] = useState(hotel);
    const [selectedPlaceCon, setSelectedPlaceCon, destination, setDestinstion] = useContext(selectedPlaceContext);
    const place = destination.destination;
    const remainingPlace = hotels.filter(item => item.place === place);
    useEffect(() => {
        setHotels(remainingPlace);
      }, []);
        return (
            <div className="profilePage">
                <Header></Header>
                <Container className="profileContent">
                    <Row>
                        <Col md={12}>
                            <p>252 stays Apr 13-17 3 guests</p>
                            <h5>Stay in {destination.destination}</h5>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={7}>
                            <Container>
                                <Row>
                                    {
                                        hotels.map(hotel => <SingleHotel key={hotel.id} hotel={hotel} ></SingleHotel>)
                                    }
                                </Row>
                            </Container>
                        </Col>
                        <Col md={5}>
                           <LoadScript ngoogleMapsApiKey='AIzaSyCyBnJ4TLedX4tF1BI58Wf_HA1sJE5qQCQ'>
                                <GoogleMap
                                mapContainerStyle={mapStyles}
                                zoom={13}
                                center={defaultCenter}
                                />
                           </LoadScript>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
};
export default Profile;