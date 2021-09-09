<template>
  <div class="register" >
    <form style="width: 30%;" class="offset-4">
      <h3>Login screen</h3>

      <div class="form-group">
        <label>username</label>
        <input type="username" class="form-control form-control-lg" />
      </div>

      <div class="form-group">
        <label>Password</label>
        <input type="password" class="form-control form-control-lg" />
      </div>

      <button type="submit" class="btn btn-dark btn-lg btn-block">Login</button>
    </form>
  </div>
</template>


<script>

export default {
  name: "Login"
}
</script>

<style scoped>

</style>