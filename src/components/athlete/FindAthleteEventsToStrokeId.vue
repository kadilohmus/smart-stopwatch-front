<template>
  <div>
    <br><br>{{title}}<br><br>
  </div>
</template>

<script>
export default {
  name: "FindAthleteEventsToStrokeId",
  props: {
    title: String
  },
  data: function () {
    return {
      athleteName: String(this.$route.query.athleteName),
      athleteId: String(this.$route.query.athleteId),
      athleteEventDtos: [
        {
          athleteId: 0,
          athleteEventId: 0,
          athleteEventLength: 0,
          athleteName: '',
          strokeId: 0,
          strokeType: '',
          hasStarted: true,
          startTimeMilliseconds: 0,
          finishTimeMilliseconds: 0,
          distanceCoveredTimeMilliseconds: 0,
          lastSplitCount: 0,
          distanceCovered: 0,
          hasFinished: true,
          laneNumber: 0,
          heatNumber: 0
        }
      ]
    }
  },
  methods: {
    findAthleteEventsToStrokeId: function () {
      this.$http.get("/report/athlete/stroke/event", {
            params: {
              strokeId: this.someVariable,
              athleteId: this.athleteId
            }
          }
      ).then(response => {
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>

</style>