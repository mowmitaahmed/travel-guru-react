import React from 'react';
import { Col } from 'react-bootstrap';
import Star from '../../images/Icon/star_1_.png';

const SingleHotel = (props) => {
    const {name, img, perNightPrice, totalPrice} = props.hotel
    return (
        <Col md={12}>
        <div className="singleHotel" style={{margin: '30px 0'}}>
            <img className="float-left" src={img} alt=""/>
            <div className="singleHotelDetails float-right">
                <h6>{name}</h6>
                <ul className="mr-auto">
                    <li>4 Guests</li>
                    <li>2 Bedrooms</li>
                    <li>2 Beds</li>
                    <li>2 Baths</li>
                </ul><br/>
                <p>Wif Air conditioning Kitchen</p>
                <p>Cancellation fexibility availiable</p>
                <ul className="mr-auto">
                    <li style={{marginRight: '0px', paddingRight: '3px'}}><img className="float-left" src={Star} alt="Star"/></li>
                    <li className="font-weight-bold"><span className="float-left">4.9(20)</span></li>
                    <li><span className="font-weight-bold">${perNightPrice}/</span>night</li>
                    <li>${totalPrice} total</li>
                </ul>
            </div>
        </div>
        </Col>
    );
};

export default SingleHotel;