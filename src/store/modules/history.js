export default {
  state: {
    history: []
  },
  mutations: {
    updateHistory(state, payload) {
      const { id, selected, date, name } = payload;
      state.history.push({
        id,
        name,
        date,
        action: selected ? 'removed' : 'added'
      })
    }
  },
  getters: {
    history(state) {
      return state.history;
    },
    addHistory(state) {
      return state.history.filter(note => note.action === 'added');
    },
    delHistory(state) {
      return state.history.filter(note => note.action === 'removed');
    }
  }
}