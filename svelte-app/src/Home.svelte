<script>
  import { Router, Link, Route } from 'svelte-routing';
</script>

<div class="content-container">
  <div class="content-title-group">
    <h2 class="title">Shop at Home</h2>
    <p>
      Manage your shopping list! Become a preferred customer and gain access to
      discount codes, too.
    </p>
    <p>Log in to start enjoying your benefits.</p>
    <br />
    <div class="button-group">
      <button class="button" aria-label="My List" tabindex="0">
        <Link to="/products">
          <i class="fas fa-clipboard-list" />
          My List
        </Link>
      </button>
      <button class="button" aria-label="My Discounts">
        <Link to="/discounts">
          <i class="fas fa-money-bill-alt" />
          My Discounts
        </Link>
      </button>
      <button class="button" aria-label="My Discounts">
        <a
          href="https://github.com/johnpapa/shopathome"
          target="_blank"
          rel="noopener noreferrer">
          <i class="fab fa-github" />
          Code in GitHub
        </a>
      </button>
    </div>
  </div>
</div>
