<template>
  <div id="app">
    <nav class="nav">
      <div class="nav-left">
        <a class="nav-item">
          FiveM
        </a>
      </div>
      <span class="nav-toggle" @click="toggleNav" :class="{ 'is-active': active }">
        <span></span>
        <span></span>
        <span></span>
      </span>

      <div class="nav-right nav-menu" :class="{ 'is-active': active }">
        <router-link class="nav-item" to="/">
          <i class="fa fa-users"></i> Players
        </router-link>
        <router-link class="nav-item" to="/hostname">
          <i class="fa fa-server"></i> Hostname
        </router-link>
        <a class="nav-item" href="https://github.com/NowNewStart/FiveM-Serverlist" target="_blank">
            <i class="fa fa-github"></i> GitHub
        </a>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      active: false
    }
  },
  methods: {
    toggleNav: function() {
      var self = this
      if(this.active) {
        this.active = false
      } else {
        this.active = true
      }
    }
  }
}
</script>
