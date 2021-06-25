import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { register } from "../actions/userActions";

const RegisterScreen = ({ location, history }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [pincode, setPincode] = useState("");
    const [city, setCity] = useState("");
    const [geoState, setGeoState] = useState("");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();

    const userRegister = useSelector((state) => state.userRegister);

    const { loading, error, userInfo } = userRegister;

    const userLogin = useSelector((state) => state.userLogin);

    const redirect = location.search ? location.search.split("=")[1] : "/";

    useEffect(() => {
        // redirect to home if user is already logged in
        if (userInfo || userLogin.userInfo) {
            history.push(redirect);
        }
    }, [history, userInfo, redirect, userLogin]);

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage("Passwords do not match");
        } else {
            dispatch(
                register(
                    name,
                    email,
                    password,
                    pincode,
                    geoState,
                    city,
                    contactNumber
                )
            );
        }
    };

    return (
        <FormContainer>
            <h1>Sign Up</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type='name'
                        placeholder='Enter name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='contact'>
                    <Form.Label>ContactNumber</Form.Label>
                    <Form.Control
                        type='number'
                        placeholder='Enter contact Number'
                        value={contactNumber}
                        onChange={(e) => setContactNumber(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='pincode'>
                    <Form.Label>Pincode</Form.Label>
                    <Form.Control
                        placeholder='Enter pincode'
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='city'>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        placeholder='Enter city'
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='geoState'>
                    <Form.Label>State</Form.Label>
                    <Form.Control
                        placeholder='Enter state'
                        value={geoState}
                        onChange={(e) => setGeoState(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Confirm password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Register
                </Button>
            </Form>

            <Row className='py-3'>
                <Col>
                    Have an Account?{" "}
                    <Link
                        to={
                            redirect
                                ? `/signin?redirect=${redirect}`
                                : "/signin"
                        }
                    >
                        Sign In
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    );
};

export default RegisterScreen;
