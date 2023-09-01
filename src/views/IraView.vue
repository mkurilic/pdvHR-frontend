<template>
    <app-nav-bar />
    <div class="ira">
        <div class="naslov">
            <h4 class="unos">Unos Izlaznih Računa</h4>
        </div>   
    </div>
</template>

<script>
import SomeClientNavBar from '@/components/partials/SomeClientNavBar.vue';
export default {
  
  name: 'IraView',
  components: {
      'app-nav-bar':SomeClientNavBar
  },
}
</script>

<style lang="scss">
.ira{
    padding-top: 100px;
}
.card-header{
    color: black;
}
.naslov{
    background:rgb(255, 255, 255);
    max-width: 920px;
    margin: 20px auto;
    padding:  20px 30px;
    border-radius: 10px 120px 10px 10px;
    box-shadow: 10px 30px 50px rgba(0,0,0,0.1)
}
.unos{
    font-size: 40px;
    text-align: center;
}
</style>