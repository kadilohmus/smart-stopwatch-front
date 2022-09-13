<template>
  <div>
    <AlertError :errorMessage="alertError"/>
    <AlertWarning :warningMessage="alertWarning"/>
    <br>
    <h1>Search athlete</h1><br>
    <input type="text" style="margin: 5px" placeholder="Name" v-model="name"><br><br>
    <router-link to="/menu" style="margin: 25px" class="btn btn-outline-light" tag="button">Back to Menu</router-link>
    <button type="button" style="margin: 5px" class="btn btn-dark" v-on:click="findAthleteByName">Search</button>

  </div>
</template>

<script>
import AlertError from "@/components/alerts/AlertError";
import AlertWarning from "@/components/alerts/AlertWarning";

export default {
  name: "SearchView",
  components: {AlertError, AlertWarning},
  data: function () {
    return {
      name: '',
      alertError: '',
      alertWarning: ''
    }
  },
  methods: {
    findAthleteByName: function () {
      this.alertError = ''
      this.alertWarning = ''

      if (this.name.length === 0) {
        this.alertError = 'Search field is empty, please enter a name!';
      } else {
        this.$http.get("/search", {
              params: {
                name: this.name
              }
            }
        ).then(response => {
          console.log(response)
        }).catch(error => {
          this.alertError = error.response.data.detail
        });
      }
    }
  }
}
</script>

<style scoped>

</style>