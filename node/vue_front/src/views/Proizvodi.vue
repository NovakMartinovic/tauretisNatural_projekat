<template>

  <div class="proizvodi">
    <h1>Proizvodi</h1>
    <div style="height: 4rem">asdasda</div>
    <div class="tabela_proizvoda">
      <b-table
          hover v-if="proizvodi.length"
          sticky-header="800px"
          :items="proizvodi"
          :fields="fields"
          head-variant="light"
      >
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
        { key: 'id' },
        { key: 'ime' },
        { key: 'opis' },
        { key: 'stanje' },
        { key: 'cena' },
      ]
    }
  },
  methods: {
    ...mapActions(['load_proizvodi']),

  },

  mounted: function() {
    this.load_proizvodi();

  }
}
</script>
