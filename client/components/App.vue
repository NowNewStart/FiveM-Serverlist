<template>
  <div id="app">
    <nav class="nav">
      <div class="nav-left">
        <a class="nav-item">
          FiveM
        </a>
      </div>
      <span class="nav-toggle">
        <span></span>
        <span></span>
        <span></span>
      </span>

      <div class="nav-right nav-menu">
        <router-link class="nav-item" to="/">
          <i class="fa fa-users"></i> Players
        </router-link>
        <router-link class="nav-item" to="/hostname">
          <i class="fa fa-server"></i> Hostname
        </router-link>
        <a class="nav-item">
            <i class="fa fa-github"></i> GitHub
        </a>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>
