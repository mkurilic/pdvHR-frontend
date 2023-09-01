<template>
    <app-nav-bar />
    <div class="suppliers">
        <div class="naslov">
            <h4 class="cli">Lista dobavljača</h4>
        </div>
        <div class="btn-group">
        <button class="button" @click="openSupplier(supplier)" :key="supplier.id" v-for="supplier in mySuppliers">
            {{ supplier.supplierName }}
        </button>
    </div>
        <router-link to="/suppliers/add">
              <button class="button is-dark">Dodaj novog dobavljača</button>
          </router-link>
    </div>
</template>

<script>
import SomeClientNavBar from '@/components/partials/SomeClientNavBar.vue';
import { Suppliers, Auth } from '@/services';

export default {
    data(){
        return {
            mySuppliers: [],
            auth: Auth.state
        }
    },

    created() {
        this.fetchSuppliers()
    }, 
    methods: {
        async fetchSuppliers() {
            this.mySuppliers = await Suppliers.getSuppliers(localStorage.getItem('clientId'));
            console.log(this.mySuppliers)
        },
        openSupplier(supplier) {
            this.$router.push({path:`/suppliers/${supplier.id}`});
        }
    },
  
  name: 'SuppliersView',
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