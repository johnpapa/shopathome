<script>
  export let provider = '';
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
</script>

<div class="auth-link" on:click={goAuth}>{provider}</div>
