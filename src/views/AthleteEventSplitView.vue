<template>
  <div>
    <br><br><h1>{{athleteName}}</h1><br><br>
    <h4>{{strokeType}} {{distance}}</h4>
    <div>
      <table class="search-table">
        <thead>
        <tr>
          <th scope="col">Distance</th>
          <th scope="col">Split times ({{splitLength}}m)</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="split in splitDtos">
          <td class="search-table-text">{{ split.length }}m
          </td>
          <td class="search-table-text">{{ split.time }}
          </td>
        </tr>
        </tbody>
      </table>
      <span>TOTAL TIME {{totalTime}}</span>
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
      totalTime: sessionStorage.getItem('totalTime'),
      athleteName: String(this.$route.query.athleteName),
      athleteEventId: String(this.$route.query.athleteEventId),
      splitDtos: [
        {
          start: '',
          end: '',
          time: '',
          length: ''
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

        for (let i = 0; i < this.splitDtos.length; i++) {
          this.splitDtos[i].time = this.createSplitTime(this.splitDtos[i])
          this.splitDtos[i].length = (i + 1) * this.splitLength
        }

      }).catch(error => {
        console.log(error)
      })
    },
    createSplitTime: function (split) {
      var timeElapsed = new Date(split.end - split.start);

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
    this.findSplitsByAthleteEventId()
    this.createSplitTime()
  }
}
</script>

<style scoped>

</style>