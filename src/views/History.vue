<template>
  <div class="history">
    <div id="nav">
      <router-link to="/">Home</router-link>
    </div>
    <h1>This is an history page</h1>
    <table>
      <tr>
        <th>Date/Time</th>
        <th>Id</th>
        <th>Name</th>
        <th>Action</th>
      </tr>
      <tr v-for="note in getHistory" :key="note.date">
        <td>{{ new Date(note.date).toLocaleString('ru') }}</td>
        <td>{{ note.id }}</td>
        <td>{{ note.name }}</td>
        <td>{{ note.action }}</td>
      </tr>
    </table>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex';
  export default {
    name: 'Histroy',
    computed: {
      ...mapGetters(['history', 'addHistory', 'delHistory']),
      getHistory: function() {
        const mode = (new URL(window.location)).searchParams.get('mode')
        if (mode === 'add') {
          return this.addHistory;
        } else if (mode === 'del') {
          return this.delHistory; 
        } else {
          return this.history;
        }
      }
    }
  }
</script>
<style scoped>
  .history {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
</style>