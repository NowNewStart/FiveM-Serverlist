<template>
  <p class="serverlist">
    <table class="table">
      <thead>
        <tr>
          <td>Server Name</td>
          <td>Players online</td>
          <td>Maximum players</td>
          <td>IP</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="server in serverdata">
          <td>{{ server.Data.hostname }}</td>
          <td>{{ server.Data.clients }}</td>
          <td>{{ server.Data.svMaxclients }}</td>
          <td><a :href="'fivem://connect/' + server.EndPoint">{{ server.EndPoint }}</a></td>
        </tr>
      </tbody>
  </p>
</template>

<script>
import axios from 'axios';
export default {
  props: ['sorting'],
  data: () => {
    return {
      serverdata: ''
    }
  },
  methods: {
    reloadServerlistByHostname: function() {
      var self = this;
      axios.get('http://runtime.fivem.net/servers').then(function (response) {
        self.serverdata = response['data'].sort(function (a,b) {
          if(a.Data.hostname < b.Data.hostname) return -1
          if(a.Data.hostname > b.Data.hostname) return 1
          return 0
        })
      })
    },
    reloadServerlistByPlayers: function() {
      var self = this;
      axios.get('http://runtime.fivem.net/servers').then(function (response) {
        self.serverdata = response['data'].sort(function (a,b) {
          if(a.Data.players.length < b.Data.players.length) return 1
          if(a.Data.players.length > b.Data.players.length) return -1
          return 0
        })
      })
    }
  },
  mounted () {
    if(this.sorting == 'players') {
      this.reloadServerlistByPlayers()
    } else {
      this.reloadServerlistByHostname()
    }
  }
}
</script>
