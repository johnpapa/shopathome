<script>
export default {
  name: 'ButtonFooter',
  props: {
    item: {
      type: Object,
      default() {},
    },
    className: {
      type: String,
      default: () => '',
    },
    label: {
      type: String,
      default: () => '',
    },
    dataIndex: {
      type: Number,
      default: () => null,
    },
    dataId: {
      type: Number,
      default: -1,
    },
    iconClasses: {
      type: String,
      default: () => '',
    },
  },
  methods: {
    handleClick() {
      this.$emit('clicked', this.item);
    },
  },
};
</script>

<template>
  <button
    class="link card-footer-item"
    :class="className"
    :aria-label="label"
    tabindex="0"
    @click="handleClick"
    :data-index="dataIndex"
    :data-id="dataId"
    type="button"
  >
    <i :class="iconClasses"></i>
    <span>{{ label }}</span>
  </button>
</template>
