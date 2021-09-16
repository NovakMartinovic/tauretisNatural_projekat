<template>

  <div class="proizvodi">
    <h1>Proizvodi i korpa: {{cena_korpe()}} $ </h1>
    <hr>
    <div style="height: 4rem">trenutna korpa: </div>
<!--    <div style="height: 4rem; white-space: pre;">{{trenutna_korpa()}} </div>-->
    <li v-for="item in trenutna_korpa()" :key="item">
      {{ item }}
    </li>
    <hr>
    <b-button variant="primary" @click="kupi()">KUPI</b-button>
    <div style="height: 4rem"></div>
    <!--    <div style="height: 4rem">{{proizvodi}}</div>-->

    <div class="tabela_proizvoda">
      <b-table
          sticky-header="100%"
          :items="resi(proizvodi)"
          :fields="fields"
          head-variant="light"
      >
        <template v-slot:cell(action)="row">
          <b-button variant="danger" @click="dodajUKorpu(row.item.id)">dodaj u korpu</b-button>
        </template>
      </b-table>
    </div>


  </div>
</template>

<script>
// @ is an alias to /src

import { mapState, mapActions } from 'vuex';
let local_korpa = {}

export default {
  name: "Proizvodi",
  computed: {
    ...mapState(['proizvodi','korpa'])
  },
  data() {
    return {

      fields: [
        { key: 'action'},
        { key: 'cena' },
        { key: 'ime' },
        { key: 'opis' },

        // { z: localStorage.getItem('user_id') },
  ]
    }
  },

  methods: {
    ...mapActions(['load_proizvodi']),
    dodajUKorpu: function (id){
      id -= 1
      // ako korpa nije inicijalizovana, inicijalizuj je
      if (!Object.keys(local_korpa).length){
        for(let p in this.proizvodi){
          local_korpa[p] = {id: (this.proizvodi)[p]['id'], cena: 0, kolicina: 0}
        }
        // console.log(local_korpa)
      }
      local_korpa[id] = {id: id, cena: (local_korpa[id].kolicina + 1) * (this.proizvodi[id]).cena, kolicina: local_korpa[id].kolicina + 1}
      // console.log(local_korpa)

      this.$forceUpdate();
    },
    resi: function (proizvod){
      return proizvod;
    },
    cena_korpe: function (){
      let suma = 0
      for(let p in local_korpa){
        suma += local_korpa[p].cena
      }
      return suma
    },
    trenutna_korpa: function (){
      let ispis = []
      for(let p in local_korpa){
        if(local_korpa[p].kolicina){
          let ispis1 = local_korpa[p].kolicina + " komada | " + (this.proizvodi[p])["ime"]
          ispis.push(ispis1)
        }
        // console.log(ispis)
      }

      return ispis
    },
    kupi: function (){
      alert("Baza se pita da li ima na stanju sve iz korpe ")
    }
  },

  mounted: function() {

    this.load_proizvodi();

  }
}

</script>
