<script>
  import './styles.scss';
  import { Router, Link, Route } from 'svelte-routing';
  import Home from './Home.svelte';
  import Products from './products/Products.svelte';
  import Discounts from './Discounts.svelte';

  import { HeaderBar, NavBar, PageNotFound, Redirect } from './components';

  export let url = '';
</script>

<HeaderBar />
<div class="section columns">
  <Router {url}>
    <NavBar />
    <main class="column">
      <div>
        <Route path="/">
          <Redirect path="/home" />
        </Route>
        <Route path="/home" component={Home} />
        <Route path="/products" component={Products} />
        <Route path="/discounts" component={Discounts} />
        <Route path="**" component={PageNotFound} />
      </div>
    </main>
  </Router>
</div>
