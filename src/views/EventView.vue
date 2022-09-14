<template>
  <div>
  <h1>Event</h1>
    {{eventId}}
  </div>
</template>

<script>
export default {
  name: "EventView",
  data: function () {
    return {
      eventId: sessionStorage.getItem('eventId')
    }
  }
}
</script>

<style scoped>

</style>