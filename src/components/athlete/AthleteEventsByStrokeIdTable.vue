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
            {{ athleteEvent.time }}
          </td>
        </tr>
        </tbody>
      </table>
      <br>
      <router-link to="/search" style="margin: 25px" class="btn btn-outline-light" tag="button">Back to Search
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
          heatNumber: 0,
          time: ''
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
        for (let i = 0; i < this.athleteEventDtos.length; i++) {
          this.athleteEventDtos[i].time = this.createStartedToFinishedTime(this.athleteEventDtos[i])
        }
      }).catch(error => {
        console.log(error)
      })
    },
    toAthleteEventSplitView: function (athleteEvent) {
      let splitLength = athleteEvent.athleteEventLength / athleteEvent.lastSplitCount
      sessionStorage.setItem('splitLength', splitLength)
      sessionStorage.setItem('distance', athleteEvent.athleteEventLength)
      this.$router.push({
        name: 'athleteEventSplitRoute',
        query: {
          athleteEventId: athleteEvent.athleteEventId,
          athleteName: this.athleteName
        }
      })
    },
    findSplitLength: function () {
    },
    createStartedToFinishedTime: function (athleteEvent) {
        var timeElapsed = new Date(athleteEvent.finishTimeMilliseconds - athleteEvent.startTimeMilliseconds);

        var min = timeElapsed.getUTCMinutes()
        var sec = timeElapsed.getUTCSeconds()
        var ms = timeElapsed.getUTCMilliseconds();

        var time =
            // stopper 'hour' prefix is commented out
            // remove comment "//" to enable hours
            // this.zeroPrefix(hour, 1) + ":" +
            this.zeroPrefix(min, 2) + ":" +
            this.zeroPrefix(sec, 2) + "." +
            this.zeroPrefix(ms, 2);
        return time;

    },

    zeroPrefix: function (num, digit) {
      var zero = '';
      for (var i = 0; i < digit; i++) {
        zero += '0';
      }
      return (zero + num).slice(-digit);
    }
  },
  mounted() {
    this.findAthleteEventsByStrokeId()
    this.createStartedToFinishedTime()
  }
}
</script>
