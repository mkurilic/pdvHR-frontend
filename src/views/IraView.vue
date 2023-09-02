<template>
    <app-nav-bar />
    <form @submit.prevent="GetBookIra" id="form">
        <div class="center-container">
            <label class="text">Odaberite vrstu razdoblja oporezivanja: </label>
            <select class="large-select" v-model="selectedOption">
                <option value="month">Mjesečno</option>
                <option value="three-months">Tromjesečno</option>
            </select>
        </div>

        <div class="center-container" v-if="selectedOption === 'month'">
            <month-picker
                lang="hr"
                v-model="selectedMonth"
                id="monthPicker"
                @change="getDate"
            />
        </div>
  
      <div class="center-container" v-else-if="selectedOption === 'three-months'">
        <label class="text">Odaberite tromjesečje: </label>
        <select class="large-select" v-model="selectedMonths">
            <option value="first">Siječanj - Ožujak</option>
            <option value="second">Travanj - Lipanj</option>
            <option value="third">Srpanj - Rujan</option>
            <option value="fourth">Listopad - Prosinac</option>
      </select>
      </div>
        <div class="center-container" v-if="selectedOption !== null">
            <button type="submit" class="button is-dark">Pretraži</button>
        </div>

    </form>
  </template>
  

<script>
import SomeClientNavBar from '@/components/partials/SomeClientNavBar.vue';
import { MonthPicker } from 'vue-month-picker';
  
  export default {
    components: {
      MonthPicker,
      'app-nav-bar':SomeClientNavBar
    },
    watch: {
        selectedOption() {
      // Reset the other variables to null when selectedOption changes
            this.selectedMonth = null;
            this.selectedMonths = null;
    },
  },
    methods: {
        getDate (date) {
            this.date = date
            this.selectedMonth = 'selected'
        },
        getThreeMonths() {
            switch (this.selectedMonths) {
                case 'first':
                    this.date.from = new Date('2023-01-01T00:00:00');
                    this.date.to = new Date('2023-04-01T00:00:00');
                    break;
                case 'second':
                    this.date.from = new Date('2023-04-01T00:00:00');
                    this.date.to = new Date('2023-07-01T00:00:00');
                    break;
                case 'third':
                    this.date.from = new Date('2023-07-01T00:00:00');
                    this.date.to = new Date('2023-10-01T00:00:00');
                    break;
                case 'fourth':
                    this.date.from = new Date('2023-10-01T00:00:00');
                    this.date.to = new Date('2024-01-01T00:00:00');
                    break;
                default:
                    this.date.from = null;
                    this.date.to = null;
                    break;
      }
        },
        async GetBookIra() {
            if (this.selectedMonth === null) {
                this.getThreeMonths()
            } 
            let dateFrom = this.date.from;
            let dateTo = this.date.to;            
            
            this.$router.push({
                name: 'iraPreview',
                query: {
                    dateFrom: dateFrom,
                    dateTo: dateTo
                }},
                );
        }
    },
    data() {
      return {
        selectedOption: null,
        selectedMonth: null,
        selectedMonths: null,
        date: {
            from: null,
            to: null,
            month: null
        }
      };
    },
  };
  </script>

<style>
.center-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
}
.large-select {
    width: 300px;
    padding: 10px;
    font-size: 16px;
}
.text{
    padding: 10px;
    font-size: 16px; 
}
.button{
    width: fit-content;
}
</style>