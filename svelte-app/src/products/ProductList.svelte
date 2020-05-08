<script>
  import { createEventDispatcher } from 'svelte';
  import { ButtonFooter, CardContent } from '../components';

  const dispatch = createEventDispatcher();
  export let products = [];
  export let errorMessage = undefined;

  function deleteProduct(product) {
    dispatch('deleted', product);
  }

  function selectProduct(product) {
    dispatch('selected', product);
  }

  const deleteOptions = {
    className: 'delete-item',
    label: 'Delete',
    iconClasses: 'fas fa-trash',
  };

  const editOptions = {
    className: 'edit-item',
    label: 'Edit',
    iconClasses: 'fas fa-edit',
  };
</script>

<div>
  {#if errorMessage}
    <div>{errorMessage}</div>
  {/if}
  {#if !products.length && !errorMessage}
    <div>Loading data ...</div>
  {/if}
  <ul class="list">
    {#each products as { id, name, description }, i (id)}
      <li role="presentation">
        <div class="card">
          <CardContent {name} {description} />
          <footer class="card-footer">
            <ButtonFooter
              {...deleteOptions}
              dataId={id}
              dataIndex={i}
              item={products[i]}
              on:clicked={deleteProduct(products[i])} />
            <ButtonFooter
              {...editOptions}
              dataId={id}
              dataIndex={i}
              item={products[i]}
              on:clicked={selectProduct(products[i])} />
          </footer>
        </div>
      </li>
    {/each}
  </ul>
</div>
