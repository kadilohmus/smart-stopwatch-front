<template>
  <div class="row">
    <p class="text-center">{{ athleteEvent.strokeType }} {{ athleteEvent.athleteEventLength }}</p>
  </div>
</template>
<script>
export default {
  name: 'AthleteSettings',
  props: {
    athleteEvent: {}
  }
}
</script>