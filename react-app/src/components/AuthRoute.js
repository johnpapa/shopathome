import React from 'react';
import { useLocation } from 'react-router-dom';

export function AuthRoute(props) {
  const { provider } = props;
  let location = useLocation();
  // const url = `/login/${provider}?post_login_redirect_uri=www.shophome.dev/products`;
  const redirect = `post_login_redirect_uri=${window.location.host}${location.pathname}`;
  const url = `/.auth/login/${provider}?${redirect}`;

  return <a href={url}>{provider}</a>;
}
