import React from "react";
import { Navbar, Container, Nav } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link,useHistory } from 'react-router-dom'
import './Header.css'

function Header({setAdm,setCnt}) {
    const history = useHistory()
    function logout() {
        localStorage.clear();
        setAdm(null);
        setCnt(null);
        history.push("/");
    }


    return (
        <div>
            <Navbar bg="light" variant="light">
                <Container>
                    <Navbar.Brand>Covid Portal</Navbar.Brand>
                    <Nav className="justify-content-end nav_bar_wrapper">
                        <Link to="/" >Home</Link>
                        {
                            localStorage.getItem("admin") ?
                                <>
                                    <Link to='/adminAddCen'>Add-Center</Link>
                                    <Link to='/adminListCen'>All-Centers</Link>
                                    <Link to='/adminAddAdm'>Add-Admin</Link>
                                </>
                                : localStorage.getItem("centerLoggedin")
                                    ?
                                    <>
                                        <Link to='/checkD1'>Check-D1</Link>
                                        <Link to='/checkD2'>Check-D2</Link>
                                    </>
                                    :
                                    <Link to='/search'>Get-Vaccine</Link>
                        }
                        <Link to="/tracker">Covid-Tracker</Link>
                        {
                            localStorage.getItem("admin") ||  localStorage.getItem("centerLoggedin") ?
                                <Nav.Item className="logut-span" onClick={logout}>Logout</Nav.Item>
                                :
                                <Link to="/centerlogin">Center-Login</Link>
                        }
                    </Nav>
                </Container>
            </Navbar>
        </div>
    )
}

export default Header;