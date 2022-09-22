<template>
  <div>
    <br><br><h1>{{athleteName}}</h1><br><br>
    <AthleteEventTable/>
  </div>
</template>

<script>
import AthleteEventTable from "@/components/athlete/AthleteEventTable";
export default {
  name: "AthleteEventsView",
  components: {AthleteEventTable},
  data: function () {
    return {
      athleteName: String(this.$route.query.athleteName),
      athleteId: String(this.$route.query.athleteId)

    }
  }
}
</script>

<style scoped>

</style>