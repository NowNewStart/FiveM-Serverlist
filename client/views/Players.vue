<template>
  <div class="page">
    <serverlist sorting="players"></serverlist>
  </div>
</template>

<script>
import serverlist from '../components/Serverlist.vue'

export default {
  components: {
    serverlist
  }
}
</script>
