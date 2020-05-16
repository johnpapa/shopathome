<script>
  import { ListHeader } from './components';

  import { onMount } from 'svelte';
  import { state, getDiscountsAction } from './store';

  let errorMessage = undefined;
  let { discounts } = state;

  onMount(async () => await getDiscounts());

  async function getDiscounts() {
    errorMessage = undefined;
    try {
      await getDiscountsAction();
    } catch (error) {
      errorMessage = 'Unauthorized';
    }
  }
  let showAdd = false;
</script>

<div class="content-container">
  <ListHeader title="My Discounts" on:refresh={getDiscounts} {showAdd} />
  <div>
    {#if errorMessage}
      <div>{errorMessage}</div>
    {/if}
    {#if !$discounts.length && !errorMessage}
      <div>Loading data ...</div>
    {/if}
    <ul class="list">
      {#each $discounts as { id, store, percentage, code }, i (id)}
        <li role="presentation">
          <div class="card">
            <div class="card-content">
              <div class="content discount-grid">
                <label>Store:</label>
                <span>{store}</span>
                <label>Discount:</label>
                <span>{percentage}%</span>
                <label>Code:</label>
                <span>{code}</span>
              </div>
            </div>
          </div>
        </li>
      {/each}
    </ul>
  </div>
</div>
