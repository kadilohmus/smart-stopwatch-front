<template>
  <div>
    <button type="button" style="margin: 5px" class="btn btn-success btn-lg name-button-started" v-on:click="splitClick(athleteEvent)">
      {{ athleteEvent.athleteName }}
    </button>
    <font-awesome-icon icon="fa-solid fa-arrow-rotate-left" v-on:click="undoAthleteEvent(athleteEvent)"/>
  </div>
</template>
<script>
export default {
  name: 'NameButtonStarted',
  props: {
    athleteEvent: {}
  },
  methods: {
    splitClick: function () {
      this.$emit('splitClickEvent')
    },
    undoAthleteEvent: function () {
      this.$emit('undoClickEvent')
    }
  }
}
</script>