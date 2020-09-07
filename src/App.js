import React, { useState } from "react";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link, useHistory } from "react-router-dom";
import "./App.css";
import Routes from "./Routes";
import { AppContext } from "./libs/contextLib";


function App() {
    const history = useHistory();
    const [isAuthenticated, userHasAuthenticated] = useState(false);
    function handleLogout() {
        userHasAuthenticated(false);
        history.push('/login');
      }
      
    return (
        <div className="App container">
            <Navbar fluid collapseOnSelect>
                <Navbar.Header>
                <Navbar.Brand>
                    <Link to="/">Smart Brain</Link>
                </Navbar.Brand>
                <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                <Nav pullRight>
                    {isAuthenticated
                        ? <NavItem onClick={handleLogout}>Logout</NavItem>
                        : <>
                            <LinkContainer to="/signup">
                                <NavItem>Signup</NavItem>
                            </LinkContainer>
                            <LinkContainer to="/login">
                                <NavItem>Login</NavItem>
                            </LinkContainer>
                            </>
                    }
                </Nav>
                </Navbar.Collapse>
            </Navbar>
            <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
                <Routes />
            </AppContext.Provider>
        </div>
    );
}
      
export default App;
