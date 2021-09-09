<template>
  <div id="nav">
    <b-navbar sticky style="background-color: #0dcaf0">
      <b-navbar-brand href="#">
        <router-link to="/">OVDE STOJI LOGO ( HOME )</router-link>
      </b-navbar-brand>
      <b-nav-item>
        <router-link to="/login">Login</router-link>
      </b-nav-item><b-nav-item>
        <router-link to="/register">Register</router-link>
      </b-nav-item>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item>
          <router-link to="/aboutUs">O NAMA</router-link>
        </b-nav-item>
        <b-nav-item>
          <router-link to="/proizvodi">PROIZVODI</router-link>
        </b-nav-item>
        <b-nav-item>
          <router-link to="/nauci">NAUCI</router-link>
        </b-nav-item>
        <b-nav-item>
          <router-link to="/kontakt">KONTAKT</router-link>
        </b-nav-item>
        <b-nav-item>
          <router-link to="/korpa">KORPA</router-link>
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <router-view/>
  </div>
</template>

<script>
export default {
name: "NavBar"
}
</script>

<style scoped>

</style>