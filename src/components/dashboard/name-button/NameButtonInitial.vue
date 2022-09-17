<template>
  <div>
    <button type="button" style="margin: 5px" class="btn btn-success btn-lg name-button-initial" v-on:click="splitClick(athleteEvent)">
      {{ athleteEvent.athleteName }}
    </button>
    <font-awesome-icon icon="fa-solid fa-pen-to-square" v-on:click="editAthleteEvent(athleteEvent)"/>
  </div>
</template>
<script>
export default {
  name: 'NameButtonInitial',
  props: {
    athleteEvent: {}
  },
  methods: {
    splitClick: function () {
      this.$emit('splitClickEvent')
    },
    editAthleteEvent: function () {
      this.$emit('editClickEvent')
    }
  }
}
</script>