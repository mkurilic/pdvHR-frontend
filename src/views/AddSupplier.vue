<template>
    <app-nav-bar />
    <div class="addSupplier">
      <div class="col-sm-10">
        <h1 class="unos">Unos novog dobavljača</h1>
          <div class="card border-info mb-3">
              <div class="card-body">                 
                  <form @submit.prevent="PostSupplier">
                      <div class="container">
                          <label for="oib">OIB: </label>
                          <input v-model="oib" type="text" class="box" id="oib" required>
                          <label for="supplierName">Naziv dobavljača: </label>
                          <input v-model="supplierName" type="text" class="box" id="supplierName"  required>
                          <label for="address">Adresa: </label>
                          <input v-model="address" type="text" class="box" id="address" required>
                          <label for="city">Grad: </label>
                          <input v-model="city" type="text" class="box" id="city"  required>
                          <label for="r12">Način obračuna: </label>
                          <select v-model="r12" class="select-new" name="r12" id="r12">
                            <option value="r1">R1</option>
                            <option value="r2">R2</option>
                          </select>
                          <label for="konto">Konto dobavljača: </label>
                          <input v-model="konto" type="text" class="box" id="konto"  required>
                      </div> 
                      <div v-if="oib.length != 11" class="alert alert-danger" role="alert">Ispravan OIB sadrži 11 znamenki!</div>              
                      <div v-else class="text-center">
                          <button type="submit" class="button is-xl is-dark">Unesi dobavljača</button>
                      </div> 
                  </form>                              
              </div>
            </div>
          </div>
        </div>
  </template>


<script>
import SomeClientNavBar from '@/components/partials/SomeClientNavBar.vue';
import { Suppliers, Auth } from '@/services';

export default {
  name: 'addSupplier',
    data() {
        return {
            auth: Auth.state,
            errorMessage: '',
            oib: '',
            supplierName: '',
            address: '',
            city: '',
            r12: '',
            konto: '',
        }
    },
    methods: {
        async PostSupplier() {
          let newSupplier = {
            clientId: localStorage.getItem('clientId'),
            oib: this.oib,
            supplierName: this.supplierName,
            address: this.address,
            city: this.city,
            r12: this.r12,
            konto: this.konto
          };
          try {
            await Suppliers.add(newSupplier);
          } catch (e) {
                console.error("Greška prilikom slanja posta ", e);
          } finally {
                alert("Uspješno dodan dobavljač!");
                this.$router.push({ name: 'suppliers'});

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