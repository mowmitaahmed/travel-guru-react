import React, { useContext } from 'react';
import { Card, Col } from 'react-bootstrap';
import { selectedPlaceContext } from '../../App';


const PlaceCard = (props) => {
    const [selectedPlaceCon, setSelectedPlaceCon] = useContext(selectedPlaceContext);
    const {id, name, description, img} = props.place;

    // Selected place handle
    const handleSelectPlace = () => {
            const selectedPlaceNow = {
                name: name,
                description: description,
                id: id
            }
            setSelectedPlaceCon(selectedPlaceNow);
        }
    return (
        <Col md={12} onClick={handleSelectPlace} className="item">
            <Card className="homeCard">
                <Card.Img variant="top" src={img} />
                <Card.ImgOverlay>
                    <Card.Title>{name}</Card.Title>
                </Card.ImgOverlay>
            </Card> 
        </Col>
    );
};

export default PlaceCard;