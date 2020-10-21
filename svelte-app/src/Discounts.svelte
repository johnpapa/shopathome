<script lang="ts">
  import { ListHeader } from './components';

  import { onMount } from 'svelte';
  import { state, getDiscountsAction } from './store';

  export const location: Object = {};

  let errorMessage: string = '';
  let { discounts } = state;

  onMount(async () => await getDiscounts());

  async function getDiscounts() {
    errorMessage = '';
    try {
      await getDiscountsAction();
    } catch (error) {
      errorMessage = 'Unauthorized';
    }
  }
  let showAdd: boolean = false;
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
      {#each $discounts as { id, store, percentage, code }, _i (id)}
        <li role="presentation">
          <div class="card">
            <div class="card-content">
              <div class="content discount-grid">
                <span class="label">Store:</span>
                <span>{store}</span>
                <span class="label">Discount:</span>
                <span>{percentage}%</span>
                <span class="label">Code:</span>
                <span>{code}</span>
              </div>
            </div>
          </div>
        </li>
      {/each}
    </ul>
  </div>
</div>
