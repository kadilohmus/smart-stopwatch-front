<template>
  <div>
    <br><br><h1>{{athleteName}}</h1><br><br>
    <h4>{{strokeType}} {{distance}}</h4>
    <div>
      <table class="search-table">
        <thead>
        <tr>
          <th scope="col">Split times ({{splitLength}}m)</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="split in splitDtos">
          <td class="search-table-text">{{ split.end }}
          </td>
        </tr>
        </tbody>
      </table>
      <br><router-link to="/search" style="margin: 25px" class="btn btn-outline-light" tag="button">Back to Search
    </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "AthleteEventSplitView",
  data: function () {
    return {
      splitLength: sessionStorage.getItem('splitLength'),
      distance: sessionStorage.getItem('distance'),
      strokeType: sessionStorage.getItem('strokeType'),
      athleteName: String(this.$route.query.athleteName),
      athleteEventId: String(this.$route.query.athleteEventId),
      splitDtos: [
        {
          start: '',
          end: ''
        }
      ]
    }
  },
  methods: {
    findSplitsByAthleteEventId: function () {
      this.$http.get("/report/athlete/event/splits", {
            params: {
              athleteEventId: this.athleteEventId
            }
          }
      ).then(response => {
        this.splitDtos = response.data
      }).catch(error => {
        console.log(error)
      })
    }
  },
  mounted() {
    this.findSplitsByAthleteEventId()
  }
}
</script>

<style scoped>

</style>