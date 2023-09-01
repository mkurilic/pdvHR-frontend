<template>
  <nav class="navbar container" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" v-if="!auth.authenticated" href="/">
        <strong class="is-size-4">pdvHR</strong>
      </a>
      <a class="navbar-item" v-if="auth.authenticated" href="/home">
        <strong class="is-size-4">pdvHR</strong>
      </a>
      <a
        role="button"
        class="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div id="navbar" class="navbar-menu">
      <div class="navbar-start">
        <router-link v-if="auth.authenticated" to="/clients" class="navbar-item">Klijenti</router-link>
          
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <router-link v-if="!auth.authenticated" to="/login" class="navbar-item">Prijava</router-link>
          <router-link v-if="!auth.authenticated" to="/registration" class="navbar-item">Registracija</router-link>
          <a v-if="auth.authenticated" @click="logout" class="nav-link" href="/">Odjava</a>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
import {Auth} from '@/services'
  export default {
    data() {
      return {
        auth: Auth.state
      };
    },
    methods: {
      logout() {
        Auth.logout();
        this.$router.go();
      }
  },
    name: 'NavBar',
  };
</script>
<style lang="scss" scoped>
  nav {
    margin-top: 25px;
    margin-bottom: 30px;
    a {
      font-weight: bold;
      color: #2c3e50;
      &.router-link-exact-active {
        color: #00d66b;
      }
    }
  }
</style>