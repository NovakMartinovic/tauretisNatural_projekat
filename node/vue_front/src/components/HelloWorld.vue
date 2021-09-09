<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div class="row-cols-12" >
      <div class="col-6">TEKST</div>
      <div class="col-6">TEKST</div>
    </div>
    <div class=""></div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
