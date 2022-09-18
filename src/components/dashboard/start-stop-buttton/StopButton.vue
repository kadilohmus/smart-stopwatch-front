<template>
  <div>
    <button type="button" style="margin: 5px" class="btn btn-dark" v-on:click="stopHeatClick">
      {{ heatRow.heatButtonStatus }}
    </button>
  </div>
</template>
<script>
export default {
  name: 'StopButton',
  props: {
    heatRow: {},
    startClick: {}
  },
  methods: {
    stopHeatClick: function () {
      // see meetod on vaja ära implementeerida, kui back'is on teenus valmis!!!!!
      alert("STOP heat event ")
      // only then success response (then blokk)
      this.$emit('stopHeatClickEvent')
    }
  }
}
</script>