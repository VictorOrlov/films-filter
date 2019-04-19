import React from 'react';
import s from './Header.module.css';
import logo from '../../images/logo.png';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

const Header = () => (
  <Navbar 
    bg="dark" 
    variant="dark" 
    fixed="top" 
    expand="md"
    className={s.header}>
  
    <Navbar.Brand href="#home">
      <img
        src={logo}
        width="90"
        height="30"
        className="d-inline-block align-top"
        alt="React Bootstrap logo"
      />
    </Navbar.Brand>

    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
      <Nav>
        <Link className={s.navLinks} to="/">
          <Nav.Item>Фильмы</Nav.Item>
        </Link>
        <Link className={s.navLinks} to="/markers">
          <Nav.Item>Закладки</Nav.Item>
        </Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default Header;