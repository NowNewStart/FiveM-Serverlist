<template>
  <div class="page">
    <serverlist sorting="hostname"></serverlist>
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
