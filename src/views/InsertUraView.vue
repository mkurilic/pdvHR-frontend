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
            <label class="item" for="r12">R1-R2 </label>
            <label class="item" for="date">Nadnevak: </label>
            <input v-model="date" type="date" class="box" id="date"  required>        
        </div>
        <div class="grid-supplier">
            <label class="item" for="supplier">Dobavljač: </label>
            <select v-model="supplier" class="selection">
                <option  @click="updateValues(supplier)" :key="supplier.id" v-for="supplier in suppliers">
                    {{ supplier.supplierName }}
                </option>
            </select>
            <label class="item" for="oib">OIB: </label>
            <input v-model="oib" type="text" class="box" id="oib"  required>
            <label class="item" for="address">Adresa: </label>
            <input v-model="address" type="text" class="box" id="address"  required>
            <label class="item" for="city">Grad: </label>
            <input v-model="city" type="text" class="box" id="city"  required>                   
        </div>  
        <hr class="hr1" />
        <div class="grid-ura">
            <label class="item i1">Prolazne stavke</label>
            <input v-model="zeroPDV" type="number" step="0.01" class="box" @keydown.tab="update()">
            <label class="item i1">Porezna osnovica 5%</label>
            <input v-model="five" type="number" step="0.01" class="box"  @keydown.tab="update()">
            <label class="item i3">Može se odbiti 5%</label>
            <input v-model="fiveCan" type="number" step="0.01" class="box"  @keydown.tab="update()">
            <label class="item i3">Ne može se odbiti 5%</label>
            <input v-model="fiveCannot" type="number" step="0.01" class="box"  @keydown.tab="update()">
            <label class="item i1">Porezna osnovica 13%</label>
            <input v-model="thirteen" type="number" step="0.01" class="box"  @keydown.tab="update()">
            <label class="item i3">Može se odbiti 13%</label>
            <input v-model="thirteenCan" type="number" step="0.01" class="box"  @keydown.tab="update()">
            <label class="item i3">Ne može se odbiti 13%</label>
            <input v-model="thirteenCannot" type="number" step="0.01" class="box"  @keydown.tab="update()">
            <label class="item i1">Porezna osnovica 25%</label>
            <input v-model="twentyfive" type="number" step="0.01" class="box"  @keydown.tab="update()">
            <label class="item i3">Može se odbiti 25%</label>
            <input v-model="twentyfiveCan" type="number" step="0.01" class="box"  @keydown.tab="update()">
            <label class="item i3">Ne može se odbiti 25%</label>
            <input v-model="twentyfiveCannot" type="number" step="0.01" class="box"  @keydown.tab="update()">
            <label class="item i1">Iznos računa s porezom</label>
            <input v-model="total" type="number" step="0.01" class="box"  @keydown.tab="update()">
        </div>
        <hr class="hr1" />
        <button type="submit" class="button is-xl is-dark">Unesi račun</button>
        </form> 
    </div>
</template>

<script>
import SomeClientNavBar from '@/components/partials/SomeClientNavBar.vue';
import moment from 'moment'; 
import { Suppliers, Ura } from '@/services';

export default {
  
  name: 'InsertUraView',
  data() {
    return{
        suppliers: [],
        rbr: '',
        rac: '',
        date: new Date().toISOString().split('T')[0],
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
    },
  components: {
      'app-nav-bar':SomeClientNavBar
  },
  methods: {
    moment: function () {
        return moment();
  }, 
    updateValues(supplier) {
        this.oib = supplier.oib;
        this.address = supplier.address;
        this.city = supplier.city;
    },
    update() {
        this.fiveCan = (this.five * 0.05).toFixed(2);
        this.thirteenCan = (this.thirteen * 0.13).toFixed(2);
        this.twentyfiveCan = (this.twentyfive * 0.25).toFixed(2);
        let total = 0;
        let myList = [this.zeroPDV, this.five, this.fiveCan, this.fiveCannot,
                  this.thirteen, this.thirteenCan, this.thirteenCannot,
                  this.twentyfive, this.twentyfiveCan, this.twentyfiveCannot]
        for (let i = 0; i < myList.length; i++) {
            if (myList[i] !== null) {
                total += parseFloat(myList[i]);
            }
        }
        this.total = total.toFixed(2);
        
    },    
    async fetchData() {
        this.suppliers = await Suppliers.getSuppliers(localStorage.getItem('clientId'));
        let uraList = await Ura.getAll(localStorage.getItem('clientId'));
        this.rbr = uraList.length + 1;
    }, 

    async PostUra() {
          let newUra = {
            clientId: localStorage.getItem('clientId'),
            rbr: this.rbr,
            rac: this.rac,
            date: this.date,
            supplier: this.supplier,
            oib: this.oib,
            address: this.address,
            city: this.city,
            zeroPDV:this.zeroPDV,
            five: this.five,
            fiveCan:this.fiveCan,
            fiveCannot:this.fiveCannot,
            thirteen:this.thirteen,
            thirteenCan:this.thirteenCan,
            thirteenCannot:this.thirteenCannot,
            twentyfive:this.twentyfive,
            twentyfiveCan:this.twentyfiveCan,
            twentyfiveCannot:this.twentyfiveCannot,
            total:this.total,
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