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
      this.$emit('startHeatClickEvent', this.heatRow)
    }
  }
}
</script>