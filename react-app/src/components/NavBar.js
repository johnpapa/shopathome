import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

function CurrentRoute(props) {
  const { provider } = props;
  let location = useLocation();
  // const url = `/login/${provider}?post_login_redirect_uri=www.shophome.dev/products`;
  const redirect = `post_login_redirect_uri = ${window.location.host}${location.pathname}`;
  const url = `/.auth/login/${provider}?${redirect}`;

  return <a href={url}>{provider}</a>;
}

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
              <CurrentRoute provider="twitter"></CurrentRoute>
              <CurrentRoute provider="github"></CurrentRoute>
              <CurrentRoute provider="facebook"></CurrentRoute>
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
