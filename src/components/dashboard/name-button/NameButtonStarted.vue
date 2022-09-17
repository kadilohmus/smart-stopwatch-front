<template>
  <div>
    <button type="button" style="margin: 5px" class="btn btn-success btn-lg name-button-started">
      {{ athleteEvent.athleteName }}
    </button>
    <font-awesome-icon icon="fa-solid fa-arrow-rotate-left"/>
  </div>
</template>
<script>
export default {
  name: 'NameButtonStarted',
  props: {
    athleteEvent: {}
  }
}
</script>