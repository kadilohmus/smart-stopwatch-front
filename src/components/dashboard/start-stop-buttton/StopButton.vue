<template>
  <div>
    <button type="button" style="width: 150px; margin-top:50px" class="btn btn-dark" v-on:click="stopHeatClick">
      {{ heatRow.heatButtonStatus }}
    </button>
  </div>
</template>
<script>
export default {
  name: 'StopButton',
  props: {
    heatRow: {}
  },
  data: function () {
    return {
      stopRequest: {
        eventId: 0,
        heatNumber: 0
      }
    }
  },
  methods: {
    stopHeatClick: function () {
      this.stopRequest.eventId = this.heatRow.eventId
      this.stopRequest.heatNumber = this.heatRow.heatNumber
      this.$http.patch("/stopper/stop", this.stopRequest
      ).then(response => {
        this.$emit('stopHeatClickEvent')
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>