<template>
  <div>
    <div>
      <table class="search-table">
        <thead>
        <tr>
          <!--        <th scope="col">Date</th>-->
          <th scope="col">Distance</th>
          <th scope="col">Time</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="athleteEvent in athleteEventDtos">
          <!--        <td class="search-table-text">{{ athleteEvent.? }}</td>-->
          <td class="search-table-text" v-on:click="toAthleteEventSplitView(athleteEvent)">
            {{ athleteEvent.athleteEventLength }}m
          </td>
          <td class="search-table-text" v-on:click="toAthleteEventSplitView(athleteEvent)">
            {{ athleteEvent.distanceCoveredTimeMilliseconds }}
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
  name: "AthleteEventsByStrokeIdTable",
  data: function () {
    return {
      athleteName: String(this.$route.query.athleteName),
      athleteId: String(this.$route.query.athleteId),
      strokeId: String(this.$route.query.strokeId),
      athleteEventDtos: [
        {
          athleteId: 0,
          athleteEventId: 0,
          athleteEventLength: 0,
          athleteName: '',
          strokeId: 0,
          strokeType: '',
          hasStarted: true,
          startTimeMilliseconds: 0,
          finishTimeMilliseconds: 0,
          distanceCoveredTimeMilliseconds: 0,
          lastSplitCount: 0,
          distanceCovered: 0,
          hasFinished: true,
          laneNumber: 0,
          heatNumber: 0
        }
      ]
    }
  },
  methods: {
    findAthleteEventsByStrokeId: function () {
      this.$http.get("/report/athlete/stroke/event", {
            params: {
              strokeId: this.strokeId,
              athleteId: this.athleteId
            }
          }
      ).then(response => {
        this.athleteEventDtos = response.data
      }).catch(error => {
        console.log(error)
      })
    },
    toAthleteEventSplitView: function (athleteEvent) {
      let splitLength = athleteEvent.athleteEventLength / athleteEvent.lastSplitCount
      sessionStorage.setItem('splitLength', splitLength)
      sessionStorage.setItem('distance', athleteEvent.athleteEventLength)
      this.$router.push({name: 'athleteEventSplitRoute',
        query: {
          athleteEventId: athleteEvent.athleteEventId,
          athleteName: this.athleteName
        }})
    },
    findSplitLength: function () {
    }
  },
  mounted() {
    this.findAthleteEventsByStrokeId()
  }
}
</script>
