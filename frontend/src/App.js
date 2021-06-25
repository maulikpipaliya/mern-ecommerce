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

import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";

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
                    <Route path='/' component={HomeScreen} exact />
                </Container>
            </main>
            <Footer />
        </Router>
    );
}

export default App;
