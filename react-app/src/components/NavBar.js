import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

function NavBar(props) {
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    (async () => {
      setUserInfo(await getUserInfo());
    })();
  }, []);

  async function getUserInfo() {
    try {
      const response = await fetch('/.auth/me');
      const payload = await response.json();
      const { clientPrincipal } = payload;
      return clientPrincipal;
    } catch (error) {
      console.error('No profile could be found');
      return undefined;
    }
  }

  return (
    <div className="column is-2">
      <nav className="menu">
        <p className="menu-label">Menu</p>
        <ul className="menu-list">
          <NavLink to="/home" activeClassName="active-link">
            Home
          </NavLink>
          <NavLink to="/products" activeClassName="active-link">
            My List
          </NavLink>
          <NavLink to="/discounts" activeClassName="active-link">
            My Discounts
          </NavLink>
        </ul>
        {props.children}
      </nav>
      <nav className="menu auth">
        <p className="menu-label">Auth</p>
        <div className="menu-list auth">
          {!userInfo && (
            <div>
              <a href="/login/tw">Twitter</a>
              <a href="/login/gh">GitHub</a>
              <a href="/.auth/login/facebook">FaceBook</a>
            </div>
          )}
          {userInfo && (
            <div>
              <a href="/logout">Logout</a>
              <div className="user">
                <p>Welcome</p>
                <p>{userInfo && userInfo.userDetails}</p>
                <p>({userInfo && userInfo.identityProvider})</p>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
export default NavBar;
