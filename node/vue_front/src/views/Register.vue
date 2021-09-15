<template>
  <div class="login" >
    <form style="width: 30%;" class="offset-4">
      <h3>Register screen</h3>

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
        <b-button variant="primary" size="lg" @click="add_new()">Register</b-button>

        <b-check class="offset-1" @change="switchAdmin"> ADMIN? </b-check>
      </b-row>


    </form>
  </div>
</template>

<script>

import { mapActions } from 'vuex';

export default {
  name: "Register",
  props: {
    username: {
      type: String,
      default: ''
    },
    password: {
      type: String,
      default: ''
    },
    is_admin: {
      type: Boolean,
      default: false
    }
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
    ...mapActions(['new_user']),
    switchAdmin: function (){
      this.is_admin = !(this.is_admin)
      alert(this.is_admin)
    },
    add_new: function() {


      if(this.new_username.length<5 || this.new_username.length>15) {
        this.msg="Username mora imati minimum 5 i maksimum 15 karaktera!";
        this.new_username = "";
        this.new_password = "";
        alert(this.msg)
        return;
      }

      if(this.new_password.length<1 || this.new_password.length>10) {
        this.msg="Pasword ne sme biti prazan! Maksimum broj karaktera je 10!";
        this.new_username = "";
        this.new_password = "";
        alert(this.msg)
        return;
      }


      const user = JSON.stringify({username: this.new_username, password: this.new_password, is_admin: this.is_admin});
      console.log(user)
      this.new_user(user);

      // this.$router.push({path: `login`})

    }
  }
}
</script>
<style scoped>

</style>