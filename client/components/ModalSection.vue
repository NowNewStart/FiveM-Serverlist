<template>
    <section class="modal-card-body">
      <h4 class="title is-4">{{ removeSpecialCharacters(serverinfo.Data.hostname) }}</h4>
      <div class="columns">
        <div class="column">
          <h4 class="title is-4">Players</h4>
          <p v-if="serverinfo.Data.clients == 0">No players on the server.</p>
          <table class="table" v-if="serverinfo.Data.clients != 0">
            <tr v-for="player in serverinfo.Data.players"><td>{{ player.name }}</td></tr>
          </table>
        </div>
        <div class="column">
          <h4 class="title is-4">Serverinfo</h4>
            <table class="table">
              <tr>
                <td>Current players</td>
                <td>{{ serverinfo.Data.clients }}</td>
              </tr>
              <tr>
                <td>Maximum players</td>
                <td>{{ serverinfo.Data.svMaxclients }}</td>
              </tr>
              <tr>
                <td>Game type</td>
                <td>{{ serverinfo.Data.gametype }}</td>
              </tr>
              <tr>
                <td>Map name</td>
                <td>{{ serverinfo.Data.mapname }}</td>
              </tr>
              <tr>
                <td>Server IP</td>
                <td><a :href="'fivem://connect/' + serverinfo.EndPoint">{{ serverinfo.EndPoint }}</a></td>
              </tr>
            </table>
        </div>
      </div>
  </section>
</template>
<script>
export default {
  methods: {
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
    }
  },
  props: ['serverinfo']
}
</script>
