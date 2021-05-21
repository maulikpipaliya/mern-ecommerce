import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";

const Header = () => {
  return (
    <header>
      <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>ENJOYY Thread And Jari</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='mr-auto'>
              <Nav.Link href='#features'>Contact</Nav.Link>
              <Nav.Link href='#pricing'>Visit Us</Nav.Link>
              <NavDropdown
                title='Product Categories'
                id='collasible-nav-dropdown'
              >
                <NavDropdown.Item href='#action/3.1'>
                  Embroidery Thread
                </NavDropdown.Item>
                <NavDropdown.Item href='#action/3.2'>
                  Embroidery Jari
                </NavDropdown.Item>

                <NavDropdown.Divider />
                <NavDropdown.Item href='#action/3.4'>
                  Bobbin Thread
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <LinkContainer to='/cart'>
                <Nav.Link href='#carts'>
                  {/* <i className="fa fa-shopping-cart"></i> */}
                  Cart
                </Nav.Link>
              </LinkContainer>

              <LinkContainer to='/signin'>
                <Nav.Link eventKey={2} href='#signin'>
                  {/* <i className="fa fa-sign-in-alt" ></i> */}
                  Sign In
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
