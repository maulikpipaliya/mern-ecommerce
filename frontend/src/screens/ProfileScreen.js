import React, { useState, useEffect } from "react";
import { Table, Form, Button, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { listMyOrders } from "../actions/orderActions";

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

    const orderListMy = useSelector((state) => state.orderListMy);
    console.log("🚀 ~ file: ProfileScreen.js ~ line 38 ~ ProfileScreen ~ orderListMy", orderListMy)
    const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;
    

    console.log(orderListMy);
    useEffect(() => {
        if (!userInfo) {
            history.push("/signin");
        } else {
            console.log("printing user");
            console.log(user);
            if (Object.keys(user).length === 0) {
                console.log("dispatching");
                dispatch(getUserDetails("profile"));
                dispatch(listMyOrders());
            } else {
                console.log("not disptaching");
                setName(user.name);
                setEmail(user.email);
                setContactNumber(user.contact);
                setPincode(user.address.pincode);
                setCity(user.address.city);
                setGeoState(user.address.state);
            }
        }
    }, [dispatch, history, userInfo, user]);

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage("Passwords do not match");
        } else {
            dispatch(
                updateUserProfile({
                    id: user._id,
                    name,
                    email,
                    password,
                    city,
                    geoState,
                    pincode,
                    contactNumber,
                })
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
                {loadingOrders ? (
                    <Loader />
                ) : errorOrders ? (
                    <Message variant='danger'>{errorOrders}</Message>
                ) : (
                    <Table
                        striped
                        bordered
                        hover
                        responsive
                        className='table-sm'
                    >
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>PAID</th>
                                <th>DELIVERED</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt.substring(0, 10)}</td>
                                    <td>{order.totalPrice}</td>
                                    <td>
                                        {order.isPaid ? (
                                            order.paidAt.substring(0, 10)
                                        ) : (
                                            <i
                                                className='fas fa-times'
                                                style={{ color: "red" }}
                                            ></i>
                                        )}
                                    </td>
                                    <td>
                                        {order.isDelivered ? (
                                            order.deliveryDate.substring(0, 10)
                                        ) : (
                                            <i
                                                className='fas fa-times'
                                                style={{ color: "red" }}
                                            ></i>
                                        )}
                                    </td>
                                    <td>
                                        <LinkContainer
                                            to={`/order/${order._id}`}
                                        >
                                            <Button
                                                className='btn-sm'
                                                variant='light'
                                            >
                                                Details
                                            </Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Col>
        </Row>
    );
};

export default ProfileScreen;
