<template>
  <div>
    <button type="button" style="margin: 5px" class="btn btn-success btn-lg name-button-started" v-on:click="splitClick">
      {{ athleteEvent.athleteName }}
    </button>
    <font-awesome-icon icon="fa-solid fa-arrow-rotate-left" v-on:click="undoClick"/>
  </div>
</template>
<script>
export default {
  name: 'NameButtonStarted',
  props: {
    athleteEvent: {}
  },
  methods: {
    // see meetod on vaja ära implementeerida
    // POST /stopper/split
    splitClick: function () {
      alert("SPLIT click event " + this.athleteEvent.athleteName)

      // peale õnnelikku responset saata välja emit event
      this.$emit('splitClickEvent')
    },

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