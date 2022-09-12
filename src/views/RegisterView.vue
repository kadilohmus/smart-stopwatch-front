<template>
  <div>
    <AlertError :errorMessage="errorMessage"/>
    <br><h1>Create an account</h1><br>
    <input type="text" style="margin: 5px" placeholder="Username" v-model="userRequest.userName"><br>
    <input type="password" style="margin: 5px" placeholder="Password" v-model="userRequest.password"><br>
    <input type="password" style="margin: 5px" placeholder="Re-type password" v-model="userRequest.password"><br><br>
    <button type="button" style="margin: 5px" class="btn btn-dark" v-on:click="registerNewUser">Create</button><br><br>
    <router-link to="/" style="color: white">Already have an account? Log in!</router-link>
  </div>
</template>

<script>
import AlertSuccess from "@/components/alerts/AlertSuccess";
import AlertError from "@/components/alerts/AlertError";

export default {
  name: 'RegisterView',
  components: {AlertSuccess,AlertError},
  data: function () {
    return {
      errorMessage: '',
      userRequest: {
        userName: '',
        password: ''
      }
    }
  },
  methods: {
    registerNewUser: function () {

      // todo: kas parool ja retype kattuvad
      //  kui ei kattu, siis tee error alert (parool ja re-type ei kattu)

      this.$http.post("/register/user", this.userRequest
      ).then(response => {

        // todo: liigu menu lehele

      }).catch(error => {
        // todo: kui tagastatakse viga, siis tee alert (nt kasutajanimi on juba kasutusel)
      })
    },

  }
}
</script>
