<template>
    <app-nav-bar />
    <div class="ura">
        <div class="left">
            <h2> <b>POREZNI OBVEZNIK</b></h2>
            <h2>NAZIV: {{ client.clientName }}</h2>
            <h2>ADRESA: {{ client.city }}, {{ client.address }}</h2>
            <h2>ŠIFRA DJELATNOSTI: {{ client.code }}</h2>
            <h2>OIB: {{ client.oib }}</h2>

        </div>
        <h1 class="naslov">KNJIGA PRIMLJENIH (ULAZNIH) RAČUNA<br/>{{ getFormatedDate(dateFrom) }} - {{ getFormatedDate(dateTo) }}
        </h1>
        

        <table class="center" width="90%">
            <tr>
                <th rowspan="3">RED. BROJ</th>
                <th colspan="2">RAČUN</th>
                <th colspan="8">DOBAVLJAČ (ISPORUČITELJ DOBARA ILI USLUGA)</th>
                <th colspan="6">PRETPOREZ</th>
            </tr>
            <tr>
                <th rowspan="2">BROJ</th>
                <th rowspan="2">DATUM</th>
                <th rowspan="2">NAZIV - IME I PREZIME I SJEDIŠTE/PREBIVALIŠTE ILI UOBIČAJENO BORAVIŠTE</th>
                <th rowspan="2">(PDV ID. BR./OIB)</th>
                <th colspan="4">POREZNA OSNOVICA</th>
                <th rowspan="2">UKUPNI IZNOS RAČUNA S PDV-om </th>
                <th rowspan="2">UKUPNO </th>
                <th colspan="2">5%</th>
                <th colspan="2">13%</th>
                <th colspan="2">25%</th>
            </tr>
            <tr>
                <th>0%</th>
                <th>5%</th>
                <th>13%</th>
                <th>25%</th>
                <th>MOŽE SE ODBITI</th>
                <th>NE MOŽE SE ODBITI</th>
                <th>MOŽE SE ODBITI</th>
                <th>NE MOŽE SE ODBITI</th>
                <th>MOŽE SE ODBITI</th>
                <th>NE MOŽE SE ODBITI</th>
            </tr>
            <tr>
                <th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th>
                <th>7</th><th>8</th><th>9</th><th>10</th><th>11 (12+13+14+15+16+17)</th>
                <th>12</th><th>13</th><th>14</th><th>15</th><th>16</th><th>17</th>
            </tr>
            <tr :key="ura.id" v-for="ura in uraList">
                <td>{{ ura.rbr }}</td>
                <td>{{ ura.rac }}</td>
                <td>{{ getFormatedDate(ura.date) }}</td>
                <td>{{ ura.supplier.supplierName}}, {{ ura.supplier.address }}, {{ ura.supplier.city }}</td>
                <td>{{ ura.supplier.oib }}</td>
                <td align="right">{{ ura.zeroPDV }}</td>
                <td align="right">{{ ura.five }}</td>
                <td align="right">{{ ura.thirteen }}</td>
                <td align="right">{{ ura.twentyfive }}</td>
                <td align="right">{{ ura.total }}</td>
                <td align="right">{{ ura.totalPdv }}</td>
                <td align="right">{{ ura.fiveCan }}</td>
                <td align="right">{{ ura.fiveCannot }}</td>
                <td align="right">{{ ura.thirteenCan }}</td>
                <td align="right">{{ ura.thirteenCannot }}</td>
                <td align="right">{{ ura.twentyfiveCan }}</td>
                <td align="right">{{ ura.twentyfiveCannot }}</td>
            </tr>
        </table>
    </div>
</template>

<script>
import SomeClientNavBar from '@/components/partials/SomeClientNavBar.vue';
import moment from 'moment'; 
import { Clients, Ura } from '@/services';

export default {
  
  name: 'UraView',
  data() {
    return{
        uraList: [],
        client: [],
        dateFrom: null,
        dateTo: null
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
   
    async fetchData() {
        this.uraList = await Ura.getAllByDate(localStorage.getItem('clientId'), this.dateFrom, this.dateTo);
        this.client = await Clients.getOne(localStorage.getItem('clientId'))
    }
  }
}
</script>

<style lang="scss">

.table, th, td {
    border: 1px solid black;
    border-collapse: collapse;
    
}
.th, td {
    padding: 5px;
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