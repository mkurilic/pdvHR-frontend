<template>
    <app-nav-bar />
    <div class="client">
        <div class="header">
            <h1 class="title">{{client.clientName}} </h1>
            <h2 class="subtitle">OIB: {{client.oib}} </h2>
            <h2 class="subtitle">{{client.address}}, {{ client.city }}</h2>
        </div>
        <div class="grid-container">
            <div class="item i1">
                <router-link to="/ura">
                    <button class="button">URA - unos knjige</button>
                </router-link>
            </div>
            <div class="item i3">
                <router-link to="/ira">
                    <button class="button">IRA - unos knjige</button>
                </router-link>
            </div>
            <div class="item i2">
                <router-link to="/login">
                    <button class="button">Obračun PDV obrasca</button>
                </router-link>
            </div>
            <div class="item i1">
                <router-link to="/ura">
                    <button class="button">Knjiga URA - ispis</button>
                </router-link>
            </div>
            <div class="item i3">
                <router-link to="/ura">
                    <button class="button">Knjiga IRA - ispis</button>
                </router-link>
            </div>
            <div class="item i1">
                <router-link to="/ira">
                    <button class="button">Plaćeni URA - ispis</button>
                </router-link>
            </div>
            <div class="item i3">
                <router-link to="/ira">
                    <button class="button">Plaćeni IRA - ispis</button>
                </router-link>
            </div>
            <div class="item i1">
                <router-link to="/ira">
                    <button class="button">Kartica dobavljača</button>
                </router-link>
            </div>
            <div class="item i3">
                <router-link to="/ira">
                    <button class="button">Kartica kupaca</button>
                </router-link>
            </div>
            <div class="item i1">
                <router-link to="/suppliers">
                    <button class="button">Dobavljači</button>
                </router-link>
            </div>
            <div class="item i3">
                <router-link to="/buyers">
                    <button class="button">Kupci</button>
                </router-link>
            </div>
            

        </div>

    </div>
</template>
  
  <script>
  import ClientNavBar from '@/components/partials/ClientNavBar.vue';
  import { Clients, Auth } from "@/services";
   
  export default {
    name: "ClientDetail",
    components: {
        'app-nav-bar':ClientNavBar
    },
    data(){
        return {
            client: [],
            auth: Auth.state
        }
    },
    created() {
        this.fetchClients()
    }, 
    methods: {
        async fetchClients() {
            this.client = await Clients.getOne(this.$route.params.id);
            console.log(this.client)
        },
}}
  </script>
  
  <style lang ="scss">
  .grid-container {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      padding: 20px;
  }

  .grid-item{
  padding: 30px;
  display: grid;
  place-items: center;
}

.button {
    cursor: pointer; 
    margin: 15px auto;
    width: 80%;
    display: block;
    font-size: 20px;
}

.i1{
	grid-column:1;
}

.i2{
	grid-column:2;
}

.i3 {
	grid-column:3;
}

  
  </style>
 