<template>
    <app-nav-bar />
    <div class="ira">
            <h1 class="unos">Unos izlaznih računa</h1>
            <h2>Današnji datum: {{ moment().format('D.M.YYYY.') }}</h2>

        <form @submit.prevent="PostIra">
        <div class="grid-info">
            <label class="item" for="rbr">Redni broj: </label>
            <input class="box" v-model="rbr" type="text" id="rbr" readonly>
            <label class="item" for="rac">Račun: </label>
            <input v-model="rac" type="text" class="box" id="rac"  required>
            <label class="item" for="date">Nadnevak: </label>
            <input v-model="selectedDate" type="date" class="box" id="date" @input="formatDate" required>        
        </div>
        <div class="grid-buyer">
            <label class="item" for="buyer">Kupac: </label>
            <VueMultiselect
                v-model="buyer"
                :options="buyers"
                placeholder="Odaberi kupca"
                label="buyerName"
                track-by="buyerName"
                @update:model-value="updateValues(buyer)"
            >
            <template #noResult>
                <router-link to="/buyers/add">Dodajte novog kupca</router-link>
            </template>
            <template #noOptions>
                <router-link to="/buyers/add">Dodajte novog kupca</router-link>
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
        <div class="grid-ira">
            <label class="item i1">Iznos (s PDV-om)</label>
            <input v-model="total" type="number" step="0.01" class="box" readonly>
            <label class="item i1">TUZEMNI PRIJENOS POREZNE OBVEZE</label>
            <input v-model="tuzemniPrijenos" type="number" step="0.01" class="box" @keydown.tab="update()" >
            <label class="item ">ISPORUKE DOBARA U DRUGIM DRŽAVAMA ČLANICAMA</label>
            <input v-model="isporukeDC" type="number" step="0.01" class="box" @keydown.tab="update()" >
            <label class="item">ISPORUKE DOBARA UNUTAR EU</label>
            <input v-model="isporukeEU" type="number" step="0.01" class="box" @keydown.tab="update()" >
            <label class="item">OBAVLJENE USLUGE UNUTAR EU</label>
            <input v-model="uslugeEU" type="number" step="0.01" class="box" @keydown.tab="update()" >
            <label class="item">OBAVLJENE ISPORUKE OSOBAMA BEZ SJEDIŠTA U RH</label>
            <input v-model="bezSjedistaRH" type="number" step="0.01" class="box" @keydown.tab="update()" >
            <label class="item">SASTAVLJANJE I POSTAVLJANJE DOBARA U DRUGOJ DRŽAVI ČLANICI</label>
            <input v-model="dobraDC" type="number" step="0.01" class="box" @keydown.tab="update()" >
            <label class="item">ISPORUKE NPS U EU</label>
            <input v-model="npsEU" type="number" step="0.01" class="box" @keydown.tab="update()" >
            <label class="item">U TUZEMSTVU</label>
            <input v-model="tuzemstvo" type="number" step="0.01" class="box" @keydown.tab="update()" >
            <label class="item">IZVOZNE ISPORUKE</label>
            <input v-model="izvoz" type="number" step="0.01" class="box" @keydown.tab="update()" >
            <label class="item">OSTALA OSLOBOĐENJA</label>
            <input v-model="ostalo" type="number" step="0.01" class="box" @keydown.tab="update()" >
        </div>
        <hr class="hr1" />
        <div class="grid-ira ira2">
            <label class="item">Osnovica 5%</label>
            <input v-model="five" type="number" step="0.01" class="box"  @keydown.tab="updateFive()">
            <label class="item">Porez 5%</label>
            <input v-model="fiveP" type="number" step="0.01" class="box"  @keydown.tab="update()">
            <label class="item">Osnovica 13%</label>
            <input v-model="thirteen" type="number" step="0.01" class="box"  @keydown.tab="updateThirteen()">
            <label class="item">Porez 13%</label>
            <input v-model="thirteenP" type="number" step="0.01" class="box"  @keydown.tab="update()">
            <label class="item">Osnovica 25%</label>
            <input v-model="twentyfive" type="number" step="0.01" class="box"  @keydown.tab="updateTwentyfive()">
            <label class="item">Porez 25%</label>
            <input v-model="twentyfiveP" type="number" step="0.01" class="box"  @keydown.tab="update()">
        </div>
        <button type="submit" class="button is-xl is-dark">Unesi račun</button>
        </form> 
    </div>
</template>

<script>
import SomeClientNavBar from '@/components/partials/SomeClientNavBar.vue';
import moment from 'moment'; 
import VueMultiselect from 'vue-multiselect' ;
import { Buyers, Ira } from '@/services';

export default {
  
  name: 'InsertIraView',
  data() {
    return{
        buyers: [],
        rbr: '',
        rac: '',
        selectedDate: new Date().toISOString().split('T')[0],
        date: '',
        buyer: '',
        oib: '',
        address: '',
        city: '',
        total: (0.00).toFixed(2),
        totalZero: (0.00).toFixed(2),
        tuzemniPrijenos:  (0.00).toFixed(2),
        isporukeDC: (0.00).toFixed(2),
        isporukeEU: (0.00).toFixed(2),
        uslugeEU: (0.00).toFixed(2),
        bezSjedistaRH: (0.00).toFixed(2),
        dobraDC: (0.00).toFixed(2),
        npsEU: (0.00).toFixed(2),
        tuzemstvo: (0.00).toFixed(2),
        izvoz:(0.00).toFixed(2),
        ostalo: (0.00).toFixed(2),
        five: (0.00).toFixed(2),
        fiveP: (0.00).toFixed(2),
        thirteen: (0.00).toFixed(2),
        thirteenP: (0.00).toFixed(2),
        twentyfive: (0.00).toFixed(2),
        twentyfiveP: (0.00).toFixed(2),
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
    updateValues(buyer) {
        this.oib = buyer.oib;
        this.address = buyer.address;
        this.city = buyer.city;
    },
    updateFive() {
        this.fiveP = (this.five * 0.05).toFixed(2);
        this.update();
    },
    updateThirteen() {
        this.thirteenP= (this.thirteen * 0.13).toFixed(2);
        this.update();
    },
    updateTwentyfive() {
        this.twentyfiveP = (this.twentyfive * 0.25).toFixed(2);
        this.update()
    },
    update() {
        let totalZero = 0;
        let total = 0;

        let zeroPDV= [
            this.tuzemniPrijenos, this.isporukeDC, this.isporukeEU,
            this.uslugeEU, this.bezSjedistaRH, this.dobraDC, this.npsEU,
            this.tuzemstvo, this.izvoz, this.ostalo]

        let pdvValues = [
            this.five, this.fiveP, this.thirteen, 
            this.thirteenP, this.twentyfive, this.twentyfiveP]

        for (let i= 0; i < zeroPDV.length; i++) {
            totalZero += parseFloat(zeroPDV[i])
        }

        for (let i = 0; i < pdvValues.length; i++) {
            total += parseFloat(pdvValues[i]);
        }

        total += totalZero;
        this.totalZero = totalZero;
        this.total = total.toFixed(2);
    },    
    async fetchData() {
        this.buyers = await Buyers.getBuyers(localStorage.getItem('clientId'));
        let iraList = await Ira.getAll(localStorage.getItem('clientId'));
        this.rbr = iraList.length + 1;
    }, 

    async PostIra() {
          let newIra = {
            clientId: localStorage.getItem('clientId'),
            rbr: this.rbr,
            rac: this.rac,
            date: this.date,
            buyer: this.buyer,
            total: parseFloat(this.total).toFixed(2),
            totalZero: parseFloat(this.totalZero).toFixed(2),
            tuzemniPrijenos: parseFloat(this.tuzemniPrijenos).toFixed(2),
            isporukeDC: parseFloat(this.isporukeDC).toFixed(2),
            isporukeEU: parseFloat(this.isporukeEU).toFixed(2),
            uslugeEU:parseFloat( this.uslugeEU).toFixed(2),
            bezSjedistaRH: parseFloat(this.bezSjedistaRH).toFixed(2),
            dobraDC: parseFloat(this.dobraDC).toFixed(2),
            npsEU: parseFloat(this.npsEU).toFixed(2),
            tuzemstvo: parseFloat(this.tuzemstvo).toFixed(2),
            izvoz: parseFloat(this.izvoz).toFixed(2),
            ostalo: parseFloat(this.ostalo).toFixed(2),
            five: parseFloat(this.five).toFixed(2),
            fiveP: parseFloat(this.fiveP).toFixed(2),
            thirteen: parseFloat(this.thirteen).toFixed(2),
            thirteenP: parseFloat(this.thirteenP).toFixed(2),
            twentyfive: parseFloat(this.twentyfive).toFixed(2),
            twentyfiveP: parseFloat(this.twentyfiveP).toFixed(2)
          };
          try {
            await Ira.add(newIra);
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
.grid-buyer{
    display: grid;
    grid-template-columns: repeat(4, auto);
    padding: 20px auto;
    margin-left: 30%;
    margin-right: 30%;
}
.grid-ira{
    display: grid;
    grid-template-columns: repeat(4, auto);
    margin-left: 10%;
    margin-right: 10%;
}

.ira2{
    margin-left: 30%;
    margin-right: 30%;
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