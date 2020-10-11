import React, { useContext, useState } from 'react';
import place from '../fakeData/place'
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import './Home.css'
import PlaceCard from '../PlaceCard/PlaceCard';
import { selectedPlaceContext } from '../../App';
import OwlCarousel from 'react-owl-carousel';
import '../../../node_modules/owl.carousel/dist/assets/owl.carousel.css';
import '../../../node_modules/owl.carousel/dist/assets/owl.theme.default.css';
import { FontAwesomeIcon } from '../../../node_modules/@fortawesome/react-fontawesome/index'
import { faArrowRight } from '../../../node_modules/@fortawesome/free-solid-svg-icons/index'

const Home = () => {
    const [places, setPlaces] = useState(place); 
    const [selectedPlaceCon, setSelectedPlaceCon, destination, setDestinstion, user, setUser] = useContext(selectedPlaceContext);
    const handleSelectedPlaceBooking = () => {
        const selectedPlaceNow = {
            name: selectedPlaceCon.name,
            description: selectedPlaceCon.description
        }
        setSelectedPlaceCon(selectedPlaceNow);
    }
    return (
        <div className="App homePage">
            <div id="color-overlay">
            </div>
            <Header></Header>
            <Container className="homeContent">
                <Row>
                    <Col md={4} className="selectedPlaceDetail"> 
                       
                        <h1>{selectedPlaceCon.name}</h1>
                        <p>{selectedPlaceCon.description}</p>
                        <Link to="/book"><Button className="mt-3" variant="warning" onClick={handleSelectedPlaceBooking}>Booking<FontAwesomeIcon className="ml-2" icon={faArrowRight} /></Button></Link>
                    </Col>
                    <Col md={8}>
                        <Container>
                            <Row>
                            <OwlCarousel className="owl-theme" nav dots="false">
                                {
                                    places.map(pl => <PlaceCard key={pl.id} place ={pl}></PlaceCard>)
                                }
                                </OwlCarousel> 
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Home;