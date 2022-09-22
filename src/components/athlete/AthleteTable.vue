<template>
  <div>
    <br><br>
    <h2>{{ title }}</h2><br>

    <table class="search-table">
      <thead>
      <tr>
        <th scope="col"></th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td v-on:click="toAthleteView(athlete)" class="search-table-text">{{ athlete.athleteName }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "AthleteTable",
  props: {
    title: String,
    athlete: {}
  },
  data: function () {
    return {

    }
  },
  methods: {
    toAthleteView: function (athlete) {
      this.$router.push({name: 'athleteRoute',
        query: {
        athleteId: athlete.athleteId,
          athleteName: athlete.athleteName
      }})
    }
  }

}
</script>
