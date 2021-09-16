<template>
  <div class="login" >
    <form style="width: 30%;" class="offset-4">
      <h3>Login screen</h3>

      <div class="form-group">
        <label>username</label>
        <!--        <input type="username" class="form-control form-control-lg" />-->
        <b-input v-model="new_username" class="mb-2 mr-sm-2 mb-sm-0" placeholder="username"></b-input>
      </div>


      <div class="form-group">
        <label>Password</label>
        <!--        <input type="password" class="form-control form-control-lg" />-->

        <b-input type="password" v-model="new_password" placeholder="password"></b-input>
      </div>
      <b-row >
        <b-button variant="primary" size="lg" @click="trylogin_user()">Login</b-button>

<!--        <b-check class="offset-1" @change="switchAdmin"> ADMIN? </b-check>-->
      </b-row>


    </form>
  </div>
</template>

<script>

import { mapActions } from 'vuex';

export default {
  name: "Login",
  props: {
    username: {
      type: String,
      default: ''
    },
    password: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      new_username: '',
      new_password: '',
      msg: ''
    }
  },
  mounted: function () {
    this.new_username = this.username;
    this.new_password = this.password;
  },

  methods: {
    ...mapActions(['login_user']),
    switchAdmin: function (){

    },
    trylogin_user: function (){
      const user = JSON.stringify({username: this.new_username, password: this.new_password});
      this.login_user(user)

      setTimeout(function(){

        if(localStorage.getItem('auth') != null){

          window.location = '/'
        }
      }, 1200)

    },
  }
}
</script>

<style scoped>

</style>