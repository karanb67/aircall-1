import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faUser, faTh, faCog } from '@fortawesome/free-solid-svg-icons'; // Replaced faKeypad with faTh

const BottomNav = () => {
  return (
    <Navbar fixed="bottom" bg="light" className="justify-content-around">
      <Nav>
        <Nav.Link href="#" className="text-center">
          <FontAwesomeIcon icon={faPhone} size="lg" />
          <br />
          Calls
        </Nav.Link>
        <Nav.Link href="#" className="text-center">
          <FontAwesomeIcon icon={faUser} size="lg" />
          <br />
          Contacts
        </Nav.Link>
        <Nav.Link href="#" className="text-center">
          <FontAwesomeIcon icon={faTh} size="lg" />
          <br />
          Keypad
        </Nav.Link>
        <Nav.Link href="#" className="text-center">
          <FontAwesomeIcon icon={faCog} size="lg" />
          <br />
          Settings
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default BottomNav;
