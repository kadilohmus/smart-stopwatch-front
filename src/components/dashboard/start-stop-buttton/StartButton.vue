<template>
  <div>
    <button type="button" style="width: 150px; margin-top:50px" class="btn btn-light" v-on:click="startHeatClick">
      {{ heatRow.heatButtonStatus }}
    </button>
  </div>
</template>
<script>
import StopButton from "@/components/dashboard/start-stop-buttton/StopButton";

export default {
  name: 'StartButton',
  components: {StopButton},
  props: {
    heatRow: {}
  },
  data: function () {
    return {
      eventId: sessionStorage.getItem('eventId'),
      heatStartRequest: {
        eventId: this.heatRow.eventId,
        heatNumber: this.heatRow.heatNumber
      }
    }
  },
  methods: {
    startHeatClick: function () {
      var athleteEvents = this.heatRow.athleteEvents
      var numberOfAthletesRequiredForStart = athleteEvents.length
      var athletesCounter = 0
      for (let i = 0; i < numberOfAthletesRequiredForStart; i++) {
        if (athleteEvents[i].athleteId != null) {
          athletesCounter++
        }
      }

      if (numberOfAthletesRequiredForStart != athletesCounter) {
        alert('Number of athletes required for start ' + numberOfAthletesRequiredForStart + ' but only ' + athletesCounter + ' have been assigned')
      } else {
        this.$http.post("/stopper/start", this.heatStartRequest
        ).then(response => {
          this.$emit('startHeatClickEvent')
        }).catch(error => {
          console.log(error)
        })
      }


    }
  }
}
</script>