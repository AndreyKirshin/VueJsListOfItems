<template>
  <ul>
    <Item
      v-for="item of items"
      :key="item.id"
      v-bind:item="item"
      v-bind:button-text="buttonText"
    />
  </ul>
</template>
<script>
  import Item from './Item';

  export default {
    name: 'ItemList',
    props: ['items', 'buttonText'],
    components: {
      Item
    }
  }
</script>
<style scoped>
  ul {
    list-style: none;
  }
  .title {
    font-weight: bold;
    color: #2c3e50;
  }
</style>