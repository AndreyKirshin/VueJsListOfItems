<template>
  <li>
    <div>{{ item.name }}</div>
    <button
      v-on:click="onClick"
    >{{ buttonText }}</button>
  </li>
</template>
<script>
  import { mapMutations } from 'vuex';
  export default {
    name: 'Item',
    props: ['item', 'buttonText'],
    methods: {
      ...mapMutations(['updateSelection', 'updateHistory']),
      onClick() {
        this.updateSelection({
          id: this.$props.item.id,
          selected: !this.$props.item.selected,
          date: Date.now()
        });
        this.updateHistory({
          id: this.$props.item.id,
          name: this.$props.item.name,
          selected: !this.$props.item.selected,
          date: Date.now()
        });
      }
    }
  }
</script>
<style scoped>
  li {
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 5px;
    display: flex;
    justify-content: space-between;
  }
</style>