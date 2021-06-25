import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";

function App() {
    return (
        <Router>
            <Header />
            <main className='py-3'>
                <Container>
                    <Route path='/' component={HomeScreen} exact />
                    <Route path='/signin' component={LoginScreen} />
                    <Route path='/product/:slugid' component={ProductScreen} />
                    {/* question mark makes it optional */}
                    <Route path='/cart/:slugid?' component={CartScreen} />
                </Container>
            </main>
            <Footer />
        </Router>
    );
}

export default App;
