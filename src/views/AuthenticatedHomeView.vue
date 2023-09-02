<template>
    <app-nav-bar />
    <div class="authhome">
      <section class="hero is-dark">
        <div class="hero-body">
            <h1 class="title">Pozdrav {{username}}!</h1>
            <h2 class="subtitle">Započnite s radom...</h2>
            <div class="button-block">
                <router-link to="/clients">
                    <button class="button is-xl is-dark">Moji klijenti</button>
                </router-link>
            </div>
        </div>
      </section>
    </div>
  </template>
  
  <script>
  import NavBar from '@/components/partials/NavBar.vue';

  export default {
    
    data() {
        return {
            username: localStorage.getItem('username'),
        };
  },name: 'AuthenticatedHomeView',
    components: {
        'app-nav-bar':NavBar
    },
  }
  </script>
  
  
  <style lang="scss" scoped>

  .hero-body {
    text-align: center;
    background-image: url('/src/assets/pdvHR.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 500px;
  }
  .title {
    text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.6);
    padding: 40px 0 20px 0;
    font-size: 60px;
  }
  .subtitle {
    text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.7);
    font-size: 30px;
  }
  .button-block {
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    position: absolute;
    .button {
      margin-right: 50px;
      padding-left: 50px;
      padding-right: 50px;
    }
  }
  .is-xl {
    font-size: 1.7rem;
  }
</style>

  