<script lang="ts">
  function goAuth() {
    const { pathname } = window.location;
    const redirect = `post_logout_redirect_uri=${pathname}`;
    const url = `/.auth/logout?${redirect}`;
    window.location.href = url;
  }
</script>

<div
  class="auth-link"
  role="button"
  tabindex="0"
  onclick={goAuth}
  onkeypress={goAuth}
>
  Logout
</div>
