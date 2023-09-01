<template>
    <app-nav-bar />
    <div class="buyers">
        <div class="naslov">
            <h4 class="cli">Lista kupaca</h4>
        </div>
        <div class="btn-group">
        <button class="button" @click="openBuyer(buyer)" :key="buyer.id" v-for="buyer in myBuyers">
            {{ buyer.buyerName }}
        </button>
    </div>
        <router-link to="/buyers/add">
              <button class="button is-dark">Dodaj novog kupca</button>
          </router-link>
    </div>
</template>

<script>
import SomeClientNavBar from '@/components/partials/SomeClientNavBar.vue';
import { Buyers, Auth } from '@/services';

export default {
    data(){
        return {
            myBuyers: [],
            auth: Auth.state
        }
    },

    created() {
        this.fetchBuyers()
    }, 
    methods: {
        async fetchBuyers() {
            this.myBuyers = await Buyers.getBuyers(localStorage.getItem('clientId'));
            console.log(this.myBuyers)
        },
        openBuyer(buyer) {
            this.$router.push({path:`/buyers/${buyer.id}`});
        }
    },
  
  name: 'BuyersView',
  components: {
      'app-nav-bar':SomeClientNavBar
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