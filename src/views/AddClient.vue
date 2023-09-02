<template>
    <app-nav-bar />
    <div class="addClient">
      <div class="col-sm-10">
        <h1 class="unos">Unos novog klijenta</h1>
          <div class="card border-info mb-3">
              <div class="card-body">                 
                  <form @submit.prevent="PostClient">
                      <div class="container">
                          <label for="oib">OIB: </label>
                          <input v-model="oib" type="text" class="box" id="oib" required>
                          <label for="clientName">Naziv klijenta: </label>
                          <input v-model="clientName" type="text" class="box" id="clientName"  required>
                          <label for="address">Adresa: </label>
                          <input v-model="address" type="text" class="box" id="address" required>
                          <label for="city">Grad: </label>
                          <input v-model="city" type="text" class="box" id="city"  required>
                          <label for="r12">Način obračuna: </label>
                          <select v-model="r12" class="select-new" name="r12" id="r12">
                            <option value="r1">R1</option>
                            <option value="r2">R2</option>
                          </select>
                          <label for="code">Šifra djelatnosti: </label>
                          <input v-model="code" type="text" class="box" id="code"  required>
                          <label for="office">Porezna uprava: </label>
                          <input v-model="office" type="text" class="box" id="office"  required>
                      </div> 
                      <div v-if="oib.length != 11" class="alert alert-danger" role="alert">Ispravan OIB sadrži 11 znamenki!</div>              
                      <div v-else>
                          <button type="submit" class="button is-dark">Unesi klijenta</button>
                      </div> 
                  </form>                              
              </div>
            </div>
          </div>
        </div>
  </template>


<script>
import NavBar from '@/components/partials/NavBar.vue';
import { Clients, Auth } from '@/services';

export default {
  name: 'addClient',
    data() {
        return {
            auth: Auth.state,
            errorMessage: '',
            oib: '',
            clientName: '',
            address: '',
            city: '',
            r12: '',
            code: '',
            office: ''
        }
    },
    methods: {
        async PostClient() {
          let newClient = {
            username: this.auth.username,
            oib: this.oib,
            clientName: this.clientName,
            address: this.address,
            city: this.city,
            r12: this.r12,
            code: this.code,
            office: this.office

          };
          try {
            await Clients.add(newClient);
          } catch (e) {
                console.error("Greška prilikom slanja posta ", e);
          } finally {
                alert("Uspješno dodan klijent!");
                this.$router.push({ name: 'clients'});
          }
        }

    },
    components: {
        'app-nav-bar':NavBar
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