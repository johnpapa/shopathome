import React from 'react';

export function AuthLogin(props) {
  const { provider } = props;

  function goAuth() {
    const { pathname } = window.location;
    const redirect = `post_login_redirect_uri=${pathname}`;
    const url = `/.auth/login/${provider}?${redirect}`;
    window.location.href = url;
  }

  return (
    <div className="auth-link" onClick={goAuth}>
      {provider}
    </div>
  );
}
