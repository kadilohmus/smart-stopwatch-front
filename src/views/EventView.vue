<template>
  <div>
    <div>
      <br><h1>Event</h1>
      <h5 style="color: black">Event id: {{ eventId }}</h5><br><br>
    </div>
    <section style="color: black; float: left; margin-left: 50px">
      <button type="button" style="margin: 25px" class="btn btn-dark">Start</button>
      <button type="button" style="margin: 25px" class="btn btn-success btn-lg">NAME</button>
      <button type="button" style="margin: 25px" class="btn btn-success btn-lg">NAME</button>
      <button type="button" style="margin: 25px" class="btn btn-success btn-lg">NAME</button>
      <br>
      <button type="button" style="margin: 25px" class="btn btn-dark">Start</button>
      <button type="button" style="margin: 25px" class="btn btn-success btn-lg">NAME</button>
      <button type="button" style="margin: 25px" class="btn btn-success btn-lg">NAME</button>
      <button type="button" style="margin: 25px" class="btn btn-success btn-lg">NAME</button>
      <br>
      <button type="button" style="margin: 25px" class="btn btn-dark">Start</button>
      <button type="button" style="margin: 25px" class="btn btn-success btn-lg">NAME</button>
      <button type="button" style="margin: 25px" class="btn btn-success btn-lg">NAME</button>
      <button type="button" style="margin: 25px" class="btn btn-success btn-lg">NAME</button>
      <br>
      <button type="button" style="margin: 25px" class="btn btn-dark">Start</button>
      <button type="button" style="margin: 25px" class="btn btn-success btn-lg">NAME</button>
      <button type="button" style="margin: 25px" class="btn btn-success btn-lg">NAME</button>
      <button type="button" style="margin: 25px" class="btn btn-success btn-lg">NAME</button>
      <br>
    </section>
    <section style="color: black; float: right; margin-right: 400px">
      <h5 style="color: darkred">Heat 1</h5>
      NAME <br>
      NAME <br>
      NAME <br>
      <h5 style="color: darkred">Heat 2</h5>
      NAME <br>
      NAME <br>
      NAME <br>
      <h5 style="color: darkred">Heat 3</h5>
      NAME <br>
      NAME <br>
      NAME <br>
      <h5 style="color: darkred">Heat 4</h5>
      NAME <br>
      NAME <br>
      NAME <br>
    </section>
    <section class="border border; container" style="float: top; border-radius: 50px; width: 200px; height: 380px">
    <h2 style="margin: 20px">0:00.00</h2><br>
    <h2 style="margin: 20px">0:00.00</h2><br>
    <h2 style="margin: 20px">0:00.00</h2><br>
    <h2 style="margin: 20px">0:00.00</h2><br>
    </section>
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