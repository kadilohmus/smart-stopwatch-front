<template>
  <div>
    <button type="button" style="margin: 5px" class="btn btn-success btn-lg name-button-initial" v-on:click="editAthleteEvent(athleteEvent)">
      {{ athleteEvent.athleteName }}
    </button>
  </div>
</template>
<script>
export default {
  name: 'NameButtonInitial',
  props: {
    athleteEvent: {}
  },
  methods: {
    // todo: vajab implementeerimist
    editAthleteEvent: function () {
      // push to view, kus saab kasutaja andmeid muuta
    }
  }
}
</script>