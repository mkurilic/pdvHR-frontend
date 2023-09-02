<template>
    <app-nav-bar />
    <div class="addBuyer">
      <div class="col-sm-10">
        <h1 class="unos">Unos novog kupca</h1>
          <div class="card border-info mb-3">
              <div class="card-body">                 
                  <form @submit.prevent="PostBuyer">
                      <div class="container">
                          <label for="oib">OIB: </label>
                          <input v-model="oib" type="text" class="box" id="oib" required>
                          <label for="buyerName">Naziv kupca: </label>
                          <input v-model="buyerName" type="text" class="box" id="buyerName"  required>
                          <label for="address">Adresa: </label>
                          <input v-model="address" type="text" class="box" id="address" required>
                          <label for="city">Grad: </label>
                          <input v-model="city" type="text" class="box" id="city"  required>
                          <label for="konto">Konto kupca: </label>
                          <input v-model="konto" type="text" class="box" id="konto"  required>
                      </div> 
                      <div v-if="oib.length != 11" class="alert alert-danger" role="alert">Ispravan OIB sadrži 11 znamenki!</div>              
                      <div v-else class="text-center">
                          <button type="submit" class="button is-xl is-dark">Unesi kupca</button>
                      </div> 
                  </form>                              
              </div>
            </div>
          </div>
        </div>
  </template>


<script>
import SomeClientNavBar from '@/components/partials/SomeClientNavBar.vue';
import { Buyers, Auth } from '@/services';

export default {
  name: 'addBuyer',
    data() {
        return {
            auth: Auth.state,
            errorMessage: '',
            oib: '',
            buyerName: '',
            address: '',
            city: '',
            konto: '',
        }
    },
    methods: {
        async PostBuyer() {
          let newBuyer = {
            clientId: localStorage.getItem('clientId'),
            oib: this.oib,
            buyerName: this.buyerName,
            address: this.address,
            city: this.city,
            konto: this.konto
          };
          try {
            await Buyers.add(newBuyer);
          } catch (e) {
                console.error("Greška prilikom slanja posta ", e);
          } finally {
                alert("Uspješno dodan kupac!");
                this.$router.push({ name: 'buyers'});

          }
        }

    },
    components: {
        'app-nav-bar':SomeClientNavBar
    },
}
</script>


<style lang ="scss">
.container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 1em;
    text-align: right;
    padding: 20px;
}
.select-new {
    width: 50%;
    height: 40px;
}
.box {
    width: 50%;
    height: 15px;
}

.unos{
    font-size: 40px;
    text-align: center;
}

</style>