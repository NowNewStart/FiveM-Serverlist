<template>
  <p class="serverlist">
    <span class="columns">
      <span class="column" style="margin-left: 10px">
        <span class="block">
          <a class="button is-primary" @click="filterOutRP">Filter out RP servers</a>
          <a class="button is-primary" @click="filterOutFrenchies">Filter out French servers</a>
          <a class="button is-danger" @click="resetList">Reset Serverlist</a>
          <input v-model="searchfield" type="text" @input="search($event)" placeholder="Search for server" class="input" style="margin-top: 20px">
        </span>
      </span>
    </span>
    <table class="table" >
      <thead>
        <tr>
          <td><i @click="sortByHostname(true)" class="fa fa-arrow-up"></i> Server Name <i @click="sortByHostname(false)" class="fa fa-arrow-down"></i> </td>
          <td><i @click="sortByPlayers(true)" class="fa fa-arrow-up"></i> Players online <i @click="sortByPlayers(false)" class="fa fa-arrow-down"></i> </td>
          <td>Maximum players</td>
          <td>IP</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="server in serverdata" >
          <td @click="showModal(server)">{{ removeSpecialCharacters(server.Data.hostname) }}</td>
          <td>{{ server.Data.clients }}</td>
          <td>{{ server.Data.svMaxclients }}</td>
          <td><a :href="'fivem://connect/' + server.EndPoint">{{ server.EndPoint }}</a></td>
        </tr>
      </tbody>
    </table>
    <div class="modal" v-if="modalInfo != ''" :class="{ 'is-active' : modalInfo != ''}" transition="zoom">
      <div class="modal-background"></div>
      <div class="modal-card">
        <ModalSection :serverinfo="modalInfo"></ModalSection>
        <footer class="modal-card-foot">
          <a class="button" @click="closeModal">Close</a>
        </footer>
      </div>
    </div>
  </p>
</template>

<script>
import axios from 'axios';
import ModalSection from './ModalSection.vue';

export default {
  components: {
    ModalSection
  },
  data: () => {
    return {
      serverdata: {},
      modalShow: false,
      modalInfo: '',
      searchfield: ''
    }
  },
  methods: {
    fetch: function() {
      var self = this;
      axios.get('http://runtime.fivem.net/servers').then(function (response) {
        self.serverdata = response['data'];
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
      return hostname.toString().replace(/\^1/g,"")
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
    showModal: function (server) {
      this.modalShow = true
      this.modalInfo = server
    },
    closeModal: function () {
      this.modalShow = false;
      this.modalInfo = ''
    },
    sortByHostname: function(sorting) {
        if(!sorting) {
          this.serverdata.sort(function (a,b) {
            if(a.Data.hostname < b.Data.hostname) return -1;
            if(a.Data.hostname > b.Data.hostname) return 1;
            return 0;
          })
        } else {
          this.serverdata.sort(function (a,b) {
            if(a.Data.hostname < b.Data.hostname) return 1;
            if(a.Data.hostname > b.Data.hostname) return -1;
            return 0;
          })
        }

    },
    sortByPlayers: function(sorting) {
        if(!sorting) {
          this.serverdata.sort(function (a,b) {
            if(a.Data.clients < b.Data.clients) return -1;
            if(a.Data.clients > b.Data.clients) return 1;
            return 0;
          })
        } else {
          this.serverdata.sort(function (a,b) {
            if(a.Data.clients < b.Data.clients) return 1;
            if(a.Data.clients > b.Data.clients) return -1;
            return 0;
          })
        }
     },
     resetList: function() {
      this.fetch(),
      this.sortByPlayers()
     },
     search: function(ev) {
      this.fetch()
      this.sortByPlayers(true)
      this.serverdata = this.serverdata.filter(function(server) {
        var hostname = server.Data.hostname.toString().toLowerCase()
        return (hostname.indexOf(ev.target._value) > -1)
      })
     }
  },
  mounted () {
    this.fetch()
    this.sortByPlayers(true)
  }
}
</script>
