<script>
export default {
  name: 'App-Modal',
  props: {
    message: {
      type: String,
      default: () => '',
    },
    isOpen: {
      type: Boolean,
      default: () => false,
    },
  },
  methods: {
    onNo() {
      this.$emit('handle-no');
    },
    onYes() {
      this.$emit('handle-yes');
    },
  },
};
</script>

<template>
  <div id="modal" class="modal" :class="{ 'is-active': isOpen }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Confirm</p>
      </header>
      <section class="modal-card-body">{{ message }}</section>
      <footer class="modal-card-foot">
        <button class="button modal-no" @click="onNo" type="button">No</button>
        <button
          class="button is-primary modal-yes"
          @click="onYes"
          type="button"
        >
          Yes
        </button>
      </footer>
    </div>
  </div>
</template>
