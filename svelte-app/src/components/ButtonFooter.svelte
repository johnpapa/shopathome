<script lang="ts">
  interface Props {
    item?: object;
    className?: string;
    label?: string;
    dataIndex?: number;
    dataId?: number;
    iconClasses?: string;
    onclicked?: (item: object | undefined) => void;
  }

  let {
    item = undefined,
    className = '',
    label = '',
    dataIndex = 0,
    dataId = 0,
    iconClasses = '',
    onclicked,
  }: Props = $props();

  function handleClick() {
    console.log(`button clicked ${JSON.stringify(item)}`);
    onclicked?.(item);
  }
</script>

<button
  class="link card-footer-item {className}"
  aria-label={label}
  tabindex="0"
  onclick={handleClick}
  data-index={dataIndex}
  data-id={dataId}
>
  <i class={iconClasses}></i>
  <span>{label}</span>
</button>
