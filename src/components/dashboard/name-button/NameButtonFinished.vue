<template>
  <div>
    <button type="button" style="margin: 5px" class="btn btn-danger btn-lg name-button-finished">
      {{ athleteEvent.athleteName }}
    </button>
    <font-awesome-icon icon="fa-solid fa-arrow-rotate-left" v-on:click="undoClick(athleteEvent)"/>
  </div>
</template>
<script>
export default {
  name: 'NameButtonFinished',
  props: {
    athleteEvent: {}
  },
  methods: {
    // see meetod on vaja ära implementeerida
    // PATCH /stopper/undo
    undoClick: function () {
      alert("UNDO click event " + this.athleteEvent.athleteName)

      // peale õnnelikku responset saata välja emit event
      this.$emit('undoClickEvent')
    }
  }
}
</script>