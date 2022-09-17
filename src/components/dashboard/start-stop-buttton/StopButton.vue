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
      this.$emit('stopHeatClickEvent', this.heatRow)
    }
  }
}
</script>