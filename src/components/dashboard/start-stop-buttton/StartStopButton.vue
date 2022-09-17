<template>
  <div class="col">

    <div v-if="!heatRow.hasStarted">
      <StartButton :heat-row="heatRow" @startHeatClickEvent="startHeatClick"/>
    </div>
    <div v-else>
      <StopButton :heat-row="heatRow" @stopHeatClickEvent="stopHeatClick"/>
    </div>

  </div>
</template>
<script>
import StartButton from "@/components/dashboard/start-stop-buttton/StartButton";
import StopButton from "@/components/dashboard/start-stop-buttton/StopButton";

export default {
  name: 'StartStopButton',
  components: {StartButton, StopButton},
  props: {
    heatRow: {}
  },
  methods: {
    startHeatClick: function (heatRow) {
      this.$emit('startHeatClickEvent', heatRow)
    },
    stopHeatClick: function (heatRow) {
      this.$emit('stopHeatClickEvent', heatRow)
    }
  }
}
</script>