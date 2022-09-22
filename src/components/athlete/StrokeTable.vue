<template>
  <div>
    <table class="search-table">
      <thead>
      <tr>
        <th scope="col"></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for=" stroke in strokeDtos" :value="stroke.id">
        <td class="search-table-text" v-on:click="toAthleteEventsView(stroke)">{{ stroke.type }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "StrokeTable",
  data: function () {
    return {
      athleteName: String(this.$route.query.athleteName),
      athleteId: String(this.$route.query.athleteId),
      strokeDtos: [
        {
          id: 0,
          type: ''
        }
      ]
    }
  },
  methods: {
    findAllStrokes: function () {
      this.$http.get("/setup/stroke")
          .then(response => {
            this.strokeDtos = response.data
          }).catch(error => {
        console.log(error)
      })
    },
    toAthleteEventsView: function (stroke) {
      sessionStorage.setItem('strokeType', stroke.type)
      this.$router.push({
        name: 'athleteEventsRoute',
        query: {
          athleteId: this.athleteId,
          athleteName: this.athleteName,
          strokeId: stroke.id
        }
      })
    }
  },
  mounted() {
    this.findAllStrokes()
  }
}
</script>