import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {Button, Form, Col} from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { savePaymentMethod } from '../actions/cartActions';
import { useNavigate } from 'react-router-dom';
import CheckoutStep from '../components/CheckoutStep';

const PaymentScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart
   
    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate("/placeorder");
    }

    if(!shippingAddress) {
        navigate("/shipping");
    }
    return (
        <FormContainer>
            <CheckoutStep step1 step2 step3/>
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>
                    <Col>
                        <Form.Check 
                            type='radio' 
                            label='PayPal or Credit Card' 
                            id='PayPal' 
                            name='paymentMethod' 
                            value='PayPal'
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></Form.Check>
                        <Form.Check 
                            type='radio' 
                            label='Stripe' 
                            id='Stripe' 
                            name='paymentMethod' 
                            value='Stripe'
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></Form.Check>  
                    </Col>
                </Form.Group>
                <Button style={{marginTop: '20px'}} type='submit' variant='primary'>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    );
};

export default PaymentScreen;
