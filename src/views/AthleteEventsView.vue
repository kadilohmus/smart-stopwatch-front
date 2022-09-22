<template>
  <div>
    <br><br><h1>{{athleteName}}</h1><br><br>
  </div>
</template>

<script>
export default {
  name: "AthleteEventsView",
  data: function () {
    return {
      athleteName: String(this.$route.query.athleteName)
    }
  }
}
</script>

<style scoped>

</style>