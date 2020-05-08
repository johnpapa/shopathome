import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = (props) => (
  <nav className="column is-2 menu">
    <p className="menu-label">Menu</p>
    <ul className="menu-list">
      <NavLink to="/home" activeClassName="active-link">
        Home
      </NavLink>
      <NavLink to="/products" activeClassName="active-link">
        Products
      </NavLink>
    </ul>
    {props.children}
  </nav>
);

export default NavBar;
