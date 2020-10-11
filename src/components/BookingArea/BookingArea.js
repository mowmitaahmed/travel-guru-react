import React, { useContext} from 'react';
import './BookingArea.css';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { selectedPlaceContext } from '../../App';
import { useForm } from 'react-hook-form';

const BookingArea = () => {
    const history = useHistory();
    const [selectedPlaceCon, setSelectedPlaceCon, destination, setDestinstion] = useContext(selectedPlaceContext);
    // React Hook Form
    const {register, handleSubmit, errors} = useForm();
    const onSubmit = (data) => {
        const bookingData ={
            ...data
        }
        setDestinstion(bookingData);
        history.push("/profile");
    }
    return (
        <div>
            <Container className="homeContent">
                <Row>
                    <Col md={5} className="selectedPlaceDetail"> 
                        <h1>{selectedPlaceCon.name}</h1>
                        <p>{selectedPlaceCon.description}</p>
                    </Col>
                    <Col md={7}>
                        <Container>
                            <Row>
                                <Col md={3}></Col>
                                <Col md={9} className="bookingForm">
                                    <Form onSubmit={handleSubmit(onSubmit)}>
                                        <Form.Row>
                                            <Form.Group as={Col} controlId="formGridState">
                                                <Form.Label className="text-secondary">Origin</Form.Label>
                                                <Form.Control className="text-dark" name="origin" as="select" defaultValue="Dhaka" ref={register({required:true})}>
                                                    <option value="Dhaka">Dhaka</option>
                                                    <option value="Cox's Bazar">Cox's Bazar</option>
                                                    <option value="SAJEK VALLEY">Sajek</option>
                                                    <option value="Sreemongol">Sreemongol</option>
                                                    <option value="Sundarban">Sundarban</option>
                                                </Form.Control>
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row>
                                            <Form.Group as={Col} controlId="formGridState">
                                                <Form.Label className="text-secondary">Destination</Form.Label>
                                                <Form.Control className="text-dark" name="destination" as="select" defaultValue={selectedPlaceCon.name} ref={register({required:true})} >
                                                    <option value="Cox's Bazar">Cox's Bazar</option>
                                                    <option value="SAJEK VALLEY">Sajek Valley</option>
                                                    <option value="Sreemongol">Sreemongol</option>
                                                    <option value="Sundarban">Sundarban</option>
                                                </Form.Control>
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row>
                                            <Form.Group as={Col} controlId="formGridState">
                                                <Form.Label className="text-secondary">From</Form.Label>
                                                <input name="from" type="date" ref={register({required:true})}></input>
                                                {errors.from && <p style={{color: 'red'}}>Date is required</p>}
                                            </Form.Group>
                                            <Form.Group as={Col} controlId="formGridState">
                                                <Form.Label className="text-secondary">To</Form.Label>
                                                <input name="to" type="date" ref={register({required:true})}></input>
                                                {errors.to && <p style={{color: 'red'}}>Date is required</p>}
                                            </Form.Group>
                                        </Form.Row>

                                        <Button className="mr-auto" variant="warning" type="submit">Start Booking</Button>
                                    </Form>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default BookingArea;