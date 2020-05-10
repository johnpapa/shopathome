<script>
  export let provider = '';

  function goAuth() {
    const { host, pathname } = window.location;
    const redirect = `post_login_redirect_uri=${host}${pathname}`;
    const url = `/.auth/login/${provider}?${redirect}`;
    window.location.href = url;
  }
</script>

<div class="auth-link" on:click={goAuth}>{provider}</div>
