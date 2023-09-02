<template>
    <app-nav-bar />
    <div class="ira">
        <div class="left">
            <h2> <b>POREZNI OBVEZNIK</b></h2>
            <h2>NAZIV: {{ client.clientName }}</h2>
            <h2>ADRESA: {{ client.city }}, {{ client.address }}</h2>
            <h2>ŠIFRA DJELATNOSTI: {{ client.code }}</h2>
            <h2>OIB: {{ client.oib }}</h2>

        </div>
        <h1 class="naslov">KNJIGA IZDANIH (IZLAZNIH) RAČUNA<br/>{{ getFormatedDate(dateFrom) }} - {{ getFormatedDate(dateTo) }}</h1>

        <table class="center" width="90%">
            <tr>
                <th rowspan="3">RED. BROJ</th>
                <th colspan="2">RAČUN</th>
                <th colspan="2">KUPAC (PRIMATELJ DOBRA ILI USLUGA)</th>
                <th class="rotated" rowspan="3">IZNOS (S PDV-om)</th>
                <th colspan="10">NE PODLIJEŽE OPOREZIVANJU I OSLOBOĐENO PDV-A</th>
                <th>0%</th>
                <th colspan="6">OPOREZIVO</th>
            </tr>
            <tr>
                <th class="rotated" rowspan="2">BROJ</th>
                <th class="rotated" rowspan="2">DATUM</th>
                <th rowspan="2">NAZIV - IME I PREZIME<br/>I SJEDIŠTE/ PREBIVALIŠTE<br/>ILI UOBIČAJENO BORAVIŠTE</th>
                <th rowspan="2">(PDV ID. BR./OIB)</th>
                <th class="rotated" rowspan="2">TUZEMNI<br/>PRIJENOS<br/>POREZNE OBVEZE</th>
                <th class="rotated" rowspan="2">ISPORUKE DOBARA<br/>U DRUGIM<br/>DRŽAVAMA<br/>ČLANICAMA</th>
                <th class="rotated" rowspan="2">ISPORUKE DOBARA<br/>UNUTAR EU</th>
                <th class="rotated" rowspan="2">OBAVLJENE USLUGE<br/>UNUTAR EU</th>
                <th class="rotated" rowspan="2">OBAVLJENE<br/>ISPORUKE<br/>OSOBAMA BEZ<br/>SJEDIŠTA U RH</th>
                <th class="rotated" rowspan="2">SASTAVLJANJE I<br/>POSTAVLJANJE<br/>DOBARA U<br/>DRUGOJ DRŽAVI<br/>ČLANICI</th>
                <th class="rotated" rowspan="2">ISPORUKE NPS<br/>U EU</th>
                <th class="rotated" rowspan="2">U TUZEMSTVU</th>
                <th class="rotated" rowspan="2">IZVOZNE ISPORUKE</th>
                <th class="rotated" rowspan="2">OSTALA OSLOBOĐENJA</th>
                <th class="rotated" rowspan="2">VRIJEDNOST ISPORUKE</th>
                <th colspan="2">5%</th>
                <th colspan="2">13%</th>
                <th colspan="2">25%</th>
            </tr>
            <tr>
                <th>OSNOVICA</th>
                <th>POREZ</th>
                <th>OSNOVICA</th>
                <th>POREZ</th>
                <th>OSNOVICA</th>
                <th>POREZ</th>
            </tr>
            <tr>
                <th v-for="n in 23" :key="n">{{ n }}</th>
            </tr>
            <tr :key="ira.id" v-for="ira in iraList">
                <td>{{ ira.rbr }}</td>
                <td>{{ ira.rac }}</td>
                <td>{{ getFormatedDate(ira.date) }}</td>
                <td>{{ ira.buyer.buyerName}}, {{ ira.buyer.address }}, {{ ira.buyer.city }}</td>
                <td>{{ ira.buyer.oib }}</td>
                <td align="right">{{ ira.total }}</td>
                <td align="right">{{ ira.tuzemniPrijenos }}</td>
                <td align="right">{{ ira.isporukeDC }}</td>
                <td align="right">{{ ira.isporukeEU }}</td>
                <td align="right">{{ ira.uslugeEU }}</td>
                <td align="right">{{ ira.bezSjedistaRH }}</td>
                <td align="right">{{ ira.dobraDC }}</td>
                <td align="right">{{ ira.npsEU }}</td>
                <td align="right">{{ ira.tuzemstvo }}</td>
                <td align="right">{{ ira.izvoz }}</td>
                <td align="right">{{ ira.ostalo }}</td>
                <td align="right">{{ ira.totalZero }}</td>
                <td align="right">{{ ira.five }}</td>
                <td align="right">{{ ira.fiveP }}</td>
                <td align="right">{{ ira.thirteen }}</td>
                <td align="right">{{ ira.thirteenP }}</td>
                <td align="right">{{ ira.twentyfive }}</td>
                <td align="right">{{ ira.twentyfiveP }}</td>
            </tr>
            <tr>
                <th colspan="5">UKUPNO</th>
                <th class="value" align="right" v-for="n in 18" :key="n">{{ parseFloat(total[n-1]).toFixed(2) }}</th>
            </tr>
        </table>
    </div>
</template>

<script>
import SomeClientNavBar from '@/components/partials/SomeClientNavBar.vue';
import moment from 'moment'; 
import { Clients, Ira } from '@/services';

export default {
  
  name: 'IraView',
  data() {
    return{
        iraList: [],
        client: [],
        dateFrom: null,
        dateTo: null,
        total: []
    }
  },
  created() {
    this.dateFrom = this.$route.query.dateFrom;
    this.dateTo = this.$route.query.dateTo;
    
    this.fetchData()
    let from = new Date(this.dateFrom);
    let to = new Date(this.dateTo)

    from.setDate(from.getDate()+1)
    this.dateFrom = from.toISOString().split('T')[0]
    this.dateTo = to.toISOString().split('T')[0]
    },
  components: {
      'app-nav-bar':SomeClientNavBar
  },
  methods: {
    getFormatedDate : function (date) {
        return moment(date, 'YYYY-MM-DD').format('DD.MM.YYYY.');
    },
    calculateTotals(){
        let total = new Array(18).fill(0)
        for (const ira of this.iraList) {
                total[0] +=  parseFloat(ira.total);
                total[1] +=  parseFloat(ira.tuzemniPrijenos);
                total[2] +=  parseFloat(ira.isporukeDC);
                total[3] +=  parseFloat(ira.isporukeEU);
                total[4] +=  parseFloat(ira.uslugeEU);
                total[5] +=  parseFloat(ira.bezSjedistaRH);
                total[6] +=  parseFloat(ira.dobraDC);
                total[7] +=  parseFloat(ira.npsEU);
                total[8] +=  parseFloat(ira.tuzemstvo);
                total[9] +=  parseFloat(ira.izvoz);
                total[10] +=  parseFloat(ira.ostalo);
                total[11] +=  parseFloat(ira.totalZero);
                total[12] +=  parseFloat(ira.five);
                total[13] +=  parseFloat(ira.fiveP);
                total[14] +=  parseFloat(ira.thirteen);
                total[15] +=  parseFloat(ira.thirteenP);
                total[16] +=  parseFloat(ira.twentyfive);
                total[17] +=  parseFloat(ira.twentyfiveP);
        }
        this.total = total;
    },
    async fetchData() {
        this.iraList = await Ira.getAllByDate(localStorage.getItem('clientId'), this.dateFrom, this.dateTo);
        this.client = await Clients.getOne(localStorage.getItem('clientId'))
        this.calculateTotals()
    }
  }
}
</script>

<style lang="scss">

.table, th, td {
    border: 1px solid black;
    border-collapse: collapse; 
    font-size: 12px;   
}
.th, td {
    padding: 5px;
}
.value{
    padding: 5px;
}
.rotated {
    writing-mode: tb-rl;
    transform: rotate(-180deg);
    padding: 10px;
}
.center {
  margin-left: auto;
  margin-right: auto;
}
.naslov{
    font-size: 20px;
    text-align: center;
}
.left{
    text-align: left;
    margin-left: 10%;
    font-size: 20px;
}
</style>