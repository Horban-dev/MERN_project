import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {Button, Form} from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { saveShippingAdress } from '../actions/cartActions';
import { useNavigate } from 'react-router-dom';
import CheckoutStep from '../components/CheckoutStep';

const ShippingScreen = () => {
    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart
    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAdress({address, city, postalCode, country}))
        navigate("/payment");
    }
    return (
        <FormContainer>
            <CheckoutStep step1 step2/>
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='address'>
                    <Form.Label>Address Address</Form.Label>
                    <Form.Control
                        type='address'
                        placeholder='Enter adress'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='city'>
                    <Form.Label>City Address</Form.Label>
                    <Form.Control
                        type='city'
                        placeholder='Enter city'
                        value={city}
                        onChange={(e) => setCity(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='postalCode'>
                    <Form.Label>Postal code</Form.Label>
                    <Form.Control
                        type='postalCode'
                        placeholder='Enter postalCode'
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='country'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        type='country'
                        placeholder='Enter country'
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}></Form.Control>
                </Form.Group>
                <Button style={{marginTop: '20px'}} type='submit' variant='primary'>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    );
};

export default ShippingScreen;
