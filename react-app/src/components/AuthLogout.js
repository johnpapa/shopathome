import React from 'react';

export function AuthLogout() {
  function goAuth() {
    const { host, pathname } = window.location;
    const redirect = `post_logout_redirect_uri=${host}${pathname}`;
    const url = `/.auth/logout?${redirect}`;
    window.location.href = url;
  }

  return (
    <div className="auth-link" onClick={goAuth}>
      Logout
    </div>
  );
}
