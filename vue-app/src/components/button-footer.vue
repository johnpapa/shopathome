<script>
import { toRefs } from 'vue';

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
    },
    iconClasses: {
      type: String,
      default: () => '',
    },
  },
  setup(props, context) {
    const { item } = toRefs(props);

    function handleClick() {
      context.emit('clicked', item);
    }

    return { handleClick };
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
  >
    <i :class="iconClasses"></i>
    <span>{{ label }}</span>
  </button>
</template>
