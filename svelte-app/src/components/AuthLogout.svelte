<script>
  let host = window.location.host;
  let pathname;
  let redirect;
  let url;

  function goAuth() {
    pathname = window.location.pathname;
    redirect = `post_logout_redirect_uri=${host}${pathname}`;
    url = `/.auth/logout?${redirect}`;
    window.location.href = url;
  }
</script>

<div class="auth-link" on:click={goAuth}>Logout</div>
