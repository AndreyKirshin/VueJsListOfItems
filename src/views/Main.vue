<template>
  <div class="main-page">
        <div id="nav">
          <router-link to="/history">History</router-link> |
          <router-link to="/history?mode=add">Add-on History</router-link> |
          <router-link to="/history?mode=del">Delete History</router-link>
        </div>
        <div class="container">
          <div class="column">
            <h3>WHAT WE GOT</h3>
            <input
              type="text"
              placeholder="Type..."
              v-model="searchString"
              @input="onInputChange"
            >
            <ItemList 
              v-bind:items="getUnselectedItems"
              button-text="+"
            />
            <h3 v-if="searchString && !getUnselectedItems.length">NO RESULTS</h3>
          </div>
          <div class="column">
            <h3>WHAT WE SELECTED</h3>
            <ItemList
              v-bind:items="selectedItems"
              button-text="-"
            />
          </div>
        </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions, mapMutations } from 'vuex';
  import ItemList from '../components/ItemList';

  export default {
    name: 'Main',
    computed: {
      ...mapGetters(['unselectedItems', 'selectedItems','fetched', 'unselectedSearchResults']),
      getUnselectedItems: function() {
        return this.searchString ? this.unselectedSearchResults : this.unselectedItems;
      }
    },
    data() {
      return {
        searchString: ''
      }
    },
    methods: {
      ...mapActions(['fetchItems']),
      ...mapMutations(['doSearch']),
      onInputChange() {
        this.doSearch(this.searchString);
      }
    },
    mounted() {
      if (!this.fetched) {
        this.fetchItems();
      }
    },
    components: {
      ItemList
    }
  }
</script>
<style scoped>
.container {
  display: flex;
}
.column {
  width: 50%
}
</style>
