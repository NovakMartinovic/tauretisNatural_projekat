<template>
  <div id="nav">
    <b-navbar sticky style="background-color: #0dcaf0">
      <b-navbar-brand href="#">
        <router-link to="/">LOGO</router-link>
      </b-navbar-brand>
      <b-nav-item>
        <router-link to="/login">Login</router-link>
      </b-nav-item>
      <b-nav-item>
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
<!--        <b-nav-item>-->
<!--          <router-link to="/korpa">KORPA</router-link>-->
<!--        </b-nav-item>-->
        <b-nav-item v-if="admin">
          <router-link to="/admin_panel">EDIT KORISNIKE</router-link>
        </b-nav-item>
        <b-nav-item v-if="login">
          <b-button variant="danger" @click="goLogout()">LOGOUT {{user}}</b-button>
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <router-view/>
  </div>
</template>

<script>
  export default {
  name: "NavBar",

  methods: {

    goLogout: function () {
      localStorage.removeItem('auth')
      localStorage.removeItem('user')
      localStorage.removeItem('user_id')
      localStorage.removeItem('is_admin')

      this.$router.push({ path: `/login` })
    },
    jeUlogovan: function () {
      this.login = !!localStorage.getItem('auth');
      // if(localStorage.getItem('auth')){
      //   this.login = true
      // }else {
      //   this.login = false
      // }
    },
    jeAdmin: function () {
      this.admin = parseInt(localStorage.getItem('is_admin')) === 1;
      // if(parseInt(localStorage.getItem('is_admin')) === 1){
      //   this.admin = true
      // }else {
      //   this.admin = false
      // }
    }
  },
  data() {
    return{
      login: false,
      admin: false,
      user: localStorage.getItem('user')

    }
  },
  mounted : function ()
  {
    this.jeUlogovan()
    this.jeAdmin()
  }
}
</script>

<style scoped>

</style>