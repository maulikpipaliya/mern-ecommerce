import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingScreen from "./screens/ShippingScreen";
import UserListScreen from "./screens/UserListScreen";

import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";

function App() {
    return (
        <Router>
            <Header />
            <main className='py-3'>
                <Container>
                    <Route path='/signin' component={LoginScreen} />
                    <Route path='/register' component={RegisterScreen} />
                    <Route path='/product/:slugid' component={ProductScreen} />
                    {/* question mark makes it optional */}
                    <Route path='/cart/:slugid?' component={CartScreen} />
                    <Route path='/profile' component={ProfileScreen} />
                    <Route path='/shipping' component={ShippingScreen} />
                    <Route path='/placeorder' component={PlaceOrderScreen} />
                    <Route path='/order/:id' component={OrderScreen} />
                    <Route path='/admin/userlist' component={UserListScreen} />
                    <Route
                        path='/admin/user/:id/edit'
                        component={UserEditScreen}
                    />
                    <Route
                        path='/admin/productlist'
                        component={ProductListScreen}
                    />
                    <Route
                        path='/admin/product/:id/edit'
                        component={ProductEditScreen}
                    />
                    <Route
                        path='/admin/orderlist'
                        component={OrderListScreen}
                    />
                    <Route path='/' component={HomeScreen} exact />
                </Container>
            </main>
            <Footer />
        </Router>
    );
}

export default App;
