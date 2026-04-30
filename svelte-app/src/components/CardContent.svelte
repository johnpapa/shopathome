<script lang="ts">
  let { name = '', description = '' }: { name?: string; description?: string } = $props();
</script>

<div class="card-content">
  <div class="content">
    <div class="name">{name}</div>
    <div class="description">{description}</div>
  </div>
</div>
