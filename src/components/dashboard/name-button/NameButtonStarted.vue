<template>
  <div>
    <button type="button" style="margin: 5px" class="btn btn-success btn-lg name-button-started"
            v-on:click="splitClick">
        <span>{{ athleteEvent.athleteName }}</span>
        <br>

      <div v-if="distanceCoveredTime != ''">
        <span class="name-button-started-time">{{ distanceCoveredTime }}</span>
        <br>
      </div>
      <div v-if="distanceCoveredTime != ''">
        <span>{{ distanceCoveredLength }}m</span>
      </div>
    </button>
    <font-awesome-icon icon="fa-solid fa-arrow-rotate-left" v-on:click="undoClick"/>
  </div>
</template>
<script>

export default {
  name: 'NameButtonStarted',
  props: {
    athleteEvent: {}
  },
  data: function () {
    return {
      distanceCoveredTime: '',
      distanceCoveredLength: ''
    }
  },
  methods: {
    splitClick: function () {
      this.$http.post("/stopper/split", null, {
            params: {
              athleteEventId: this.athleteEvent.athleteEventId
            }
          }
      ).then(response => {

        this.$emit('splitClickEvent')
      }).catch(error => {
        console.log(error)
      })
    },
    undoClick: function () {
      this.$http.patch("/stopper/undo", null, {
            params: {
              athleteEventId: this.athleteEvent.athleteEventId
            }
          }
      ).then(response => {
        this.$emit('undoClickEvent')
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    },
    createDistanceCoveredLength: function () {
      if (this.athleteEvent.lastSplitCount > 0) {
        this.distanceCoveredLength = this.athleteEvent.distanceCovered
      }
    },

    createDistanceCoveredTime: function () {
      if (this.athleteEvent.lastSplitCount > 0) {
        var timeElapsed = new Date(this.athleteEvent.distanceCoveredTimeMilliseconds - this.athleteEvent.startTimeMilliseconds);

        var min = timeElapsed.getUTCMinutes()
        var sec = timeElapsed.getUTCSeconds()
        var ms = timeElapsed.getUTCMilliseconds();

        this.distanceCoveredTime =
            // stopper 'hour' prefix is commented out
            // remove comment "//" to enable hours
            // this.zeroPrefix(hour, 1) + ":" +
            this.zeroPrefix(min, 2) + ":" +
            this.zeroPrefix(sec, 2) + "." +
            this.zeroPrefix(ms, 2);
      }
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
    this.createDistanceCoveredTime()
    this.createDistanceCoveredLength()
  }
}
</script>