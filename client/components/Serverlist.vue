<template>
  <p class="serverlist">
    <span class="columns">
      <span class="column" style="margin-left: 10px">
        <span class="block">
          <a class="button is-primary" @click="filterOutRP">Filter out RP servers</a>
          <a class="button is-primary" @click="filterOutFrenchies">Filter out French servers</a>
          <a class="button is-danger" @click="resetList">Reset Serverlist</a>
        </span>
      </span>
    </span>
    <table class="table">
      <thead>
        <tr>
          <td>Server Name filtered by {{ filtered_by }}</td>
          <td>Players online</td>
          <td>Maximum players</td>
          <td>IP</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="server in serverdata">
          <td>{{ removeSpecialCharacters(server.Data.hostname) }}</td>
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
      serverdata: '',
      filtered_by: 'active players'
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
      }).catch(function (error) {
        console.log(error)
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
      }).catch(function (error) {
        console.log(error)
      })
    },
    filterOutRP: function() {
      this.serverdata = this.serverdata.filter(function (server) {
        var hostname = server.Data.hostname.toLowerCase();
        return (hostname.indexOf('rp') === -1 && hostname.indexOf('roleplay') === -1 && hostname.indexOf('role play') === -1)
      })
    },
    filterOutFrenchies: function() {
      this.serverdata = this.serverdata.filter(function (server) {
        var hostname = server.Data.hostname.toLowerCase();
        return (hostname.indexOf('fr') === -1 && hostname.indexOf('french') === -1 && hostname.indexOf('france') === -1)
      })
    },
    removeSpecialCharacters: function(hostname) {
      return hostname.replace(/\^1/g,"")
                                    .replace(/\^2/g,"")
                                    .replace(/\^3/g,"")
                                    .replace(/\^4/g,"")
                                    .replace(/\^5/g,"")
                                    .replace(/\^6/g,"")
                                    .replace(/\^7/g,"")
                                    .replace(/\^8/g,"")
                                    .replace(/\^9/g,"")
                                    .replace(/\^0/g,"")
    },
    resetList: function() {
      if(this.sorting == 'players') {
        this.filtered_by = "active players"
        this.reloadServerlistByPlayers()
      } else {
        this.filtered_by = "Hostname"
        this.reloadServerlistByHostname()
      }
    }
  },
  mounted () {
    this.resetList()
  }
}
</script>
