<template>
    <app-nav-bar />
    <div class="ura">
            <h1 class="unos">Unos Ulaznih Računa</h1>
            <h2>Današnji datum: {{ moment().format('D.M.YYYY.') }}</h2>

        <form @submit.prevent="PostUra">
        <div class="grid-info">
            <label class="item" for="rbr">Redni broj: </label>
            <input class="box" v-model="rbr" type="text" id="rbr" required>
            <label class="item" for="rac">Račun: </label>
            <input v-model="rac" type="text" class="box" id="rac"  required>
            <label class="item">{{ r12.toLocaleUpperCase() }} </label>
            <label class="item" for="date">Nadnevak: </label>
            <input v-model="selectedDate" type="date" class="box" id="date" @input="formatDate" required>        
        </div>
        <div class="grid-supplier">
            <label class="item" for="supplier">Dobavljač: </label>
            <VueMultiselect
                v-model="supplier"
                :options="suppliers"
                placeholder="Odaberi dobavljača"
                label="supplierName"
                track-by="supplierName"
                @update:model-value="updateValues(supplier)"
            >
            <template #noResult>
                <router-link to="/suppliers/add">Dodajte novog dobavljača</router-link>
            </template>
            </VueMultiselect>

            <label class="item" for="oib">OIB: </label>
            <input v-model="oib" type="text" class="box" id="oib" readonly>
            <label class="item" for="address">Adresa: </label>
            <input v-model="address" type="text" class="box" id="address" readonly>
            <label class="item" for="city">Grad: </label>
            <input v-model="city" type="text" class="box" id="city" readonly>                   
        </div>  
        <hr class="hr1" />
        <div class="grid-ura">
            <label class="item i1">Prolazne stavke</label>
            <input v-model="zeroPDV" type="number" step="0.01" class="box" @keydown.tab="update()">
            <label class="item i1">Porezna osnovica 5%</label>
            <input v-model="five" type="number" step="0.01" class="box"  @keydown.tab="updateFive()">
            <label class="item i3">Može se odbiti 5%</label>
            <input v-model="fiveCan" type="number" step="0.01" class="box"  @keydown.tab="update()">
            <label class="item i3">Ne može se odbiti 5%</label>
            <input v-model="fiveCannot" type="number" step="0.01" class="box"  @keydown.tab="update()">
            <label class="item i1">Porezna osnovica 13%</label>
            <input v-model="thirteen" type="number" step="0.01" class="box"  @keydown.tab="updateThirteen()">
            <label class="item i3">Može se odbiti 13%</label>
            <input v-model="thirteenCan" type="number" step="0.01" class="box"  @keydown.tab="update()">
            <label class="item i3">Ne može se odbiti 13%</label>
            <input v-model="thirteenCannot" type="number" step="0.01" class="box"  @keydown.tab="update()">
            <label class="item i1">Porezna osnovica 25%</label>
            <input v-model="twentyfive" type="number" step="0.01" class="box"  @keydown.tab="updateTwentyfive()">
            <label class="item i3">Može se odbiti 25%</label>
            <input v-model="twentyfiveCan" type="number" step="0.01" class="box"  @keydown.tab="update()">
            <label class="item i3">Ne može se odbiti 25%</label>
            <input v-model="twentyfiveCannot" type="number" step="0.01" class="box"  @keydown.tab="update()">
            <label class="item i1">Iznos računa s porezom</label>
            <input v-model="total" type="number" step="0.01" class="box" readonly @keydown.tab="update()">
        </div>
        <hr class="hr1" />
        <button type="submit" class="button is-xl is-dark">Unesi račun</button>
        </form> 
    </div>
</template>

<script>
import SomeClientNavBar from '@/components/partials/SomeClientNavBar.vue';
import moment from 'moment'; 
import VueMultiselect from 'vue-multiselect' ;
import { Suppliers, Ura } from '@/services';

export default {
  
  name: 'InsertUraView',
  data() {
    return{
        suppliers: [],
        r12: '',
        rbr: '',
        rac: '',
        selectedDate: new Date().toISOString().split('T')[0],
        date: '',
        supplier: '',
        oib: '',
        address: '',
        city: '',
        zeroPDV: (0.00).toFixed(2),
        five:  (0.00).toFixed(2),
        fiveCan: (0.00).toFixed(2),
        fiveCannot: (0.00).toFixed(2),
        thirteen: (0.00).toFixed(2),
        thirteenCan: (0.00).toFixed(2),
        thirteenCannot: (0.00).toFixed(2),
        twentyfive: (0.00).toFixed(2),
        twentyfiveCan: (0.00).toFixed(2),
        twentyfiveCannot:(0.00).toFixed(2),
        total: (0.00).toFixed(2)
    }
  },
  created() {
        this.fetchData()
        this.formatDate()
    },
  components: {
      'app-nav-bar':SomeClientNavBar,
      VueMultiselect
  },
  methods: {
    moment: function () {
        return moment();
  }, 
  formatDate() {
        this.date = moment(this.selectedDate).format("YYYY-MM-DD");
    },
    updateValues(supplier) {
        this.oib = supplier.oib;
        this.address = supplier.address;
        this.city = supplier.city;
        this.r12 = supplier.r12;
    },
    updateFive() {
        this.fiveCan = (this.five * 0.05).toFixed(2);
        this.update();
    },
    updateThirteen() {
        this.thirteenCan = (this.thirteen * 0.13).toFixed(2);
        this.update();
    },
    updateTwentyfive() {
        this.twentyfiveCan = (this.twentyfive * 0.25).toFixed(2);
        this.update()
    },
    update() {
        let total = 0;
        let totalPdv = 0;
        let pdvList = [this.fiveCan, this.fiveCannot, this.thirteenCan, this.thirteenCannot, this.twentyfiveCan, this.twentyfiveCannot]
        let valueList = [this.zeroPDV, this.five, this.thirteen, this.twentyfive]

        for (let i = 0; i < pdvList.length; i++) {
            totalPdv += parseFloat(pdvList[i]);
        }
        for (let i = 0; i < valueList.length; i++) {
            total += parseFloat(valueList[i]);
        }
        total += totalPdv;

        this.total = total.toFixed(2);
        this.totalPdv = totalPdv;
    },    
    async fetchData() {
        this.suppliers = await Suppliers.getSuppliers(localStorage.getItem('clientId'));
        let uraList = await Ura.getAll(localStorage.getItem('clientId'));
        this.rbr = uraList.length + 1;
    }, 

    async PostUra() {
        this.updateFive()
        this.updateThirteen()
        this.updateTwentyfive()
        let newUra = {
            clientId: localStorage.getItem('clientId'),
            rbr: this.rbr,
            rac: this.rac,
            date: this.date,
            supplier: this.supplier,
            zeroPDV:parseFloat(this.zeroPDV).toFixed(2),
            five: parseFloat(this.five).toFixed(2),
            fiveCan:parseFloat(this.fiveCan).toFixed(2),
            fiveCannot:parseFloat(this.fiveCannot).toFixed(2),
            thirteen:parseFloat(this.thirteen).toFixed(2),
            thirteenCan:parseFloat(this.thirteenCan).toFixed(2),
            thirteenCannot:parseFloat(this.thirteenCannot).toFixed(2),
            twentyfive:parseFloat(this.twentyfive).toFixed(2),
            twentyfiveCan:parseFloat(this.twentyfiveCan).toFixed(2),
            twentyfiveCannot:parseFloat(this.twentyfiveCannot).toFixed(2),
            total:parseFloat(this.total).toFixed(2),
            totalPdv:parseFloat(this.totalPdv).toFixed(2),
          };
          try {
            await Ura.add(newUra);
          } catch (e) {
                console.error("Greška prilikom slanja posta ", e);
          } finally {
                alert("Uspješno unesen račun!");
                this.$router.go();
          }
        }
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>
<style lang="scss">

.unos{
    font-size: 20px;
    text-align: center;
}
.grid-info{
    display: grid;
    grid-template-columns: repeat(8, auto);
    padding: 20px;
}
.grid-supplier{
    display: grid;
    grid-template-columns: repeat(4, auto);
    padding: 20px auto;
    margin-left: 30%;
    margin-right: 30%;
}
.grid-ura{
    display: grid;
    grid-template-columns: repeat(4, auto);
    padding: 20px;
    margin-left: 20%;
    margin-right: 20%;

}
.selection{
    width: 100%;
    height: 40px;
}
.item{
    text-align: right;
    font-size: large;
    padding-right: 10px;
}
.box{
    width: fit-content;
}
.hr1 {
    border: 0;
    height: 3px;
    background: #095484;
    background-image: linear-gradient(to right, #ccc, #095484, #ccc);
}

.i1 {
    grid-column: 1;
}

.i3 {
    grid-column: 3;
}

</style>