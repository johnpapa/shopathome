import React from 'react';

export function AuthLogin(props) {
  const { provider } = props;

  let host = window.location.host;
  let pathname;
  let redirect;
  let url;

  function goAuth() {
    pathname = window.location.pathname;
    redirect = `post_login_redirect_uri=${host}${pathname}`;
    url = `/.auth/login/${provider}?${redirect}`;
    window.location.href = url;
  }

  return (
    <div className="auth-link" onClick={goAuth}>
      {provider}
    </div>
  );
}
