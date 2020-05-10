import React from 'react';

export function AuthLogin(props) {
  const { provider } = props;

  function goAuth() {
    const { host, pathname } = window.location;
    const redirect = `post_login_redirect_uri=${host}${pathname}`;
    const url = `/.auth/login/${provider}?${redirect}`;
    window.location.href = url;
  }

  return (
    <div className="auth-link" onClick={goAuth}>
      {provider}
    </div>
  );
}
