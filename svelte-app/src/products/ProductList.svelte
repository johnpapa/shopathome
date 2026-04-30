<script lang="ts">
  import { ButtonFooter, CardContent } from '../components';
  import { Product } from '../models';

  interface Props {
    products?: Product[];
    errorMessage?: string;
    ondeleted?: (product: Product) => void;
    onselected?: (product: Product) => void;
  }

  let { products = [], errorMessage = '', ondeleted, onselected }: Props = $props();

  function deleteProduct(product: Product) {
    ondeleted?.(product);
  }

  function selectProduct(product: Product) {
    onselected?.(product);
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
              onclicked={() => deleteProduct(products[i])} />
            <ButtonFooter
              {...editOptions}
              dataId={id}
              dataIndex={i}
              item={products[i]}
              onclicked={() => selectProduct(products[i])} />
          </footer>
        </div>
      </li>
    {/each}
  </ul>
</div>
