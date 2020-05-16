<script>
export default {
  name: 'ListHeader',
  props: {
    title: {
      type: String,
      default: () => '',
    },
    routePath: {
      type: String,
      default: () => '',
    },
    showAdd: {
      type: Boolean,
      default: () => true,
    },
  },
  methods: {
    handleAdd() {
      this.$emit('add');
    },
    handleRefresh() {
      this.$emit('refresh');
    },
  },
};
</script>

<template>
  <div class="content-title-group">
    <router-link :to="routePath">
      <h2 class="title">{{ title }}</h2>
    </router-link>
    <button
      v-if="showAdd"
      class="button add-button"
      @click="handleAdd"
      aria-label="add"
    >
      <i class="fas fa-plus" aria-hidden="true"></i>
    </button>
    <button
      class="button refresh-button"
      @click="handleRefresh"
      aria-label="refresh"
    >
      <i class="fas fa-sync" aria-hidden="true"></i>
    </button>
  </div>
</template>
