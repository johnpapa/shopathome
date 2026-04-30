<script lang="ts">
  let { provider = '' }: { provider?: string } = $props();

  function goAuth() {
    const { pathname } = window.location;
    const redirect = `post_login_redirect_uri=${pathname}`;
    const url = `/.auth/login/${provider}?${redirect}`;
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
  {provider}
</div>
