<template>
    <app-nav-bar />
    <div class="clients">
        <div class="naslov">
            <h4 class="cli">Moji klijenti</h4>
        </div>
        <div class="btn-group">
        <button class="button" @click="openClient(client)" :key="client.id" v-for="client in myClients">
            {{ client.clientName }}
        </button>
    </div>
        <router-link to="/clients/add">
              <button class="button is-dark">Dodaj novog klijenta</button>
          </router-link>
    </div>
</template>

<script>
import NavBar from '@/components/partials/NavBar.vue';
import { Clients, Auth } from '@/services';

export default {
    data(){
        return {
            myClients: [],
            auth: Auth.state
        }
    },

    created() {
        this.fetchClients()
    }, 
    methods: {
        async fetchClients() {
            this.myClients = await Clients.getClients(this.auth.username);
        },
        openClient(client) {
            localStorage.setItem('clientId', client.id);
            localStorage.setItem('clientName', client.clientName);
            this.$router.push({path:`/clients/${client.id}`});
        }
    },
  
  name: 'ClientsView',
  components: {
      'app-nav-bar':NavBar
  },
}
</script>

<style lang="scss">

.naslov{
    background:rgb(255, 255, 255);
    max-width: 920px;
    margin: 20px auto;
    padding:  20px 30px;
}
.cli{
    font-size: 40px;
    text-align: center;
}
.btn-group {
    padding: 20px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);

}
.btn-group button {
    cursor: pointer; 
    margin: 15px auto;
    width: 80%;
    display: block;
    font-size: 20px;
}

</style>