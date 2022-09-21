<template>
  <div>
    <br>
    <h2>{{ title }}</h2><br>

    <table class="table table-hover">
      <thead>
      <tr>
        <th scope="col">Athlete</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="athlete in athletes">
        <td v-on:click="toAthleteEventsTable(athlete)">{{ athlete.athleteName }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "AthleteTable",
  props: {
    athletes: {},
    title: String
  },
  methods: {
    toAthleteEventsTable: function (athlete) {
      sessionStorage.setItem('athleteName', athlete.athleteName)
      this.$router.push({name: 'athleteEventsRoute', query: {athleteId: athlete.athleteId}})
    },
  }

}
</script>
