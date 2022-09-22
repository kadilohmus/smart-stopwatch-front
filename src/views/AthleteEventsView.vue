<template>
  <div>
    <br><br><h1>{{athleteName}}</h1><br><br>
    <h4>{{strokeType}}</h4>
    <div>
      <AthleteEventsByStrokeIdTable/>
    </div>
  </div>
</template>

<script>
import AthleteEventsByStrokeIdTable from "@/components/athlete/AthleteEventsByStrokeIdTable";
export default {
  name: "AthleteEventsView",
  components: {AthleteEventsByStrokeIdTable},
  data: function () {
    return {
      athleteName: String(this.$route.query.athleteName),
      athleteId: String(this.$route.query.athleteId),
      strokeId: String(this.$route.query.strokeId),
      strokeType: sessionStorage.getItem('strokeType')

    }
  }
}
</script>

<style scoped>

</style>