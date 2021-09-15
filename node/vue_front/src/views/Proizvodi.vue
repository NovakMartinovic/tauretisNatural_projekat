<template>

  <div class="proizvodi">
    <h1>Proizvodi</h1>
    <div style="height: 4rem">asdasda</div>
<!--    <div style="height: 4rem">{{proizvodi}}</div>-->

    <div class="tabela_proizvoda">
      <b-table
          sticky-header="800px"
          :items="proizvodi"
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

export default {
  name: "Proizvodi",
  computed: {
    ...mapState(['proizvodi'])
  },
  data() {
    return {

      fields: [
        { key: 'ime' },
        { key: 'opis' },
        { key: 'cena' },
        { key: 'action'},

        // { z: localStorage.getItem('user_id') },
  ]
    }
  },

  methods: {
    ...mapActions(['load_proizvodi']),
    dodajUKorpu: function (id){
      const proizvod = JSON.stringify({id: id});
      // console.log(proizvod)
      alert(proizvod)
    }
  },

  mounted: function() {

    this.load_proizvodi();

  }
}

</script>
