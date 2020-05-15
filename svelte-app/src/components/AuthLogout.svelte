<script>
  function goAuth() {
    const { pathname } = window.location;
    const redirect = `post_logout_redirect_uri=${pathname}`;
    const url = `/.auth/logout?${redirect}`;
    window.location.href = url;
  }
</script>

<div class="auth-link" on:click={goAuth}>Logout</div>
