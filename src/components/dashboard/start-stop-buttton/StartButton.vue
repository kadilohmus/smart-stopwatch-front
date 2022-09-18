<template>
  <div>
    <button type="button" style="margin: 5px" class="btn btn-light" v-on:click="startHeatClick">
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
  methods: {
    startHeatClick: function () {
      alert("START heat event ")
      this.$http.post("/event", null, {
            params: {
              eventId: this.eventId,
              heatNumber: heatRow.heatNumber
            }
          }
      ).then(response => {
        this.$emit('startHeatClickEvent')
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>