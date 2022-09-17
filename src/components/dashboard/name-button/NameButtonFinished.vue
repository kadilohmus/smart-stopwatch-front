<template>
  <div>
    <button type="button" style="margin: 5px" class="btn btn-danger btn-lg name-button-finished">
      {{ athleteEvent.athleteName }}
    </button>
    <font-awesome-icon icon="fa-solid fa-arrow-rotate-left" v-on:click="undoAthleteEvent(athleteEvent)"/>
  </div>
</template>
<script>
export default {
  name: 'NameButtonFinished',
  props: {
    athleteEvent: {}
  },
  methods: {
    undoAthleteEvent: function () {
      this.$emit('undoClickEvent')
    }
  }
}
</script>