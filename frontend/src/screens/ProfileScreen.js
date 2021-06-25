import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails, updateUserProfile } from "../actions/userActions";

const ProfileScreen = ({ location, history }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [contactNumber, setContactNumber] = useState("");
    const [pincode, setPincode] = useState("");
    const [city, setCity] = useState("");
    const [geoState, setGeoState] = useState("");

    const [message, setMessage] = useState(null);
    const dispatch = useDispatch();

    const userDetails = useSelector((state) => state.userDetails);
    console.log(
        "🚀 ~ file: ProfileScreen.js ~ line 23 ~ ProfileScreen ~ userDetails",
        userDetails
    );
    const { loading, error, user } = userDetails;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const { success } = userUpdateProfile;

    // console.log(user);
    useEffect(() => {
        if (!userInfo) {
            history.push("/signin");
        } else {
            console.log("printing user");
            console.log(user);
            if (Object.keys(user).length === 0) {
                console.log("dispatching");
                dispatch(getUserDetails("profile"));
            } else {
                console.log("not disptaching");
                setName(user.name);
                setEmail(user.email);
                setContactNumber(user.contact)
                setPincode(user.address.pincode)
                setCity(user.address.city)
                setGeoState(user.address.state)
            }
        }
    }, [dispatch, history, userInfo, user]);

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage("Passwords do not match");
        } else {
            dispatch(
                updateUserProfile({ id: user._id, name, email, password, city, geoState, pincode, contactNumber  })
            );
        }
    };

    return (
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>
                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {success && (
                    <Message variant='success'>Profile Updated</Message>
                )}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type='name'
                            placeholder='Enter name'
                            value={name || ""}
                            onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type='email'
                            placeholder='Enter email'
                            value={email || ""}
                            onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='contactNumber'>
                        <Form.Label>Contact</Form.Label>
                        <Form.Control
                            type='number'
                            placeholder='Enter contact Number'
                            value={contactNumber || ""}
                            onChange={(e) => setContactNumber(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='pincode'>
                        <Form.Label>Pincode</Form.Label>
                        <Form.Control
                            placeholder='Enter pincode'
                            value={pincode || ""}
                            onChange={(e) => setPincode(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='city'>
                        <Form.Label>City</Form.Label>
                        <Form.Control
                            placeholder='Enter city'
                            value={city || ""}
                            onChange={(e) => setCity(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='geoState'>
                        <Form.Label>State</Form.Label>
                        <Form.Control
                            placeholder='Enter state'
                            value={geoState || ""}
                            onChange={(e) => setGeoState(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='password'>
                        <Form.Label>Password </Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Enter password'
                            value={password || ""}
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
                        Update
                    </Button>
                </Form>
            </Col>
            <Col md={9}>
                <h2>My Orders</h2>
            </Col>
        </Row>
    );
};

export default ProfileScreen;
