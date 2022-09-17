<template>
  <div>
    <button type="button" style="margin: 5px" class="btn btn-danger btn-lg name-button-finished">
      {{ athleteEvent.athleteName }}
    </button>
  </div>
</template>
<script>
export default {
  name: 'NameButtonFinished',
  props: {
    athleteEvent: {}
  }
}
</script>