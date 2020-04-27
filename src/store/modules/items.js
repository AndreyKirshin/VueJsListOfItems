

export default {
  state: {
    items: [],
    fetched: false,
    searchResults: []
  },
  actions: {
    async fetchItems(context) {
      const res = await fetch(
        'http://localhost:3000/items'
      );
      const items = await res.json();
      
      context.commit('updateItems', items);
      context.commit('updateFetchedFlag', true);
    },
  },
  mutations: {
    updateItems(state, items) {
      state.items = items.map(item => {
        item.selected = false
        return item;
      });
    },
    updateFetchedFlag(state, fetched) {
      state.fetched = fetched;
    },
    updateSelection(state, payload) {
      const { id, selected } = payload;
      state.items[id].selected = selected;
    },
    doSearch(state, searchString) {
      const lowCaseString = searchString.toLowerCase();
      const regex = new RegExp(lowCaseString, 'g')

      state.searchResults = state.items.reduce((prev, item) => {
        const { name, items, selected } = item;
        const isHitInName = name.toLowerCase().includes(lowCaseString);
        const isHitInChildren = items.find(child => child.name.toLowerCase().includes(lowCaseString))
        if (!selected && (isHitInName || isHitInChildren)) {
          let hits = 0;
          if (isHitInName) {
            hits += name.toLowerCase().match(regex).length;
          }
          if (isHitInChildren) {
            items.forEach(child => {
              if (child.name.toLowerCase().includes(lowCaseString)) {
                hits += child.name.toLowerCase().match(regex).length;
              }
            });
          }
          item.hits = hits;
          prev.push(item);
        }
        return prev;
      }, []).sort((a, b) => b.hits - a.hits)
    }
  },
  getters: {
    allItems(state) {
      return state.items;
    },
    unselectedItems(state) {
      return state.items.filter(item => !item.selected)
    },
    selectedItems(state) {
      return state.items.filter(item => item.selected)
    },
    fetched(state) {
      return state.fetched;
    },
    searchResults(state) {
      return state.searchResults;
    },
    unselectedSearchResults(state) {
      return state.searchResults.filter(item => !item.selected);
    },
  }
}