<template>
  <div>
    <button type="button" style="margin: 5px" class="btn btn-danger btn-lg name-button-finished">
      <span>{{ athleteEvent.athleteName }}</span>
      <br>
      <span class="name-button-started-time">{{ distanceCoveredTime }}</span>
      <br>
      <span>{{ distanceCoveredLength }}m</span>
    </button>
    <font-awesome-icon icon="fa-solid fa-arrow-rotate-left" v-on:click="undoClick(athleteEvent)"/>
  </div>
</template>
<script>
export default {
  name: 'NameButtonFinished',
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
    // see meetod on vaja ära implementeerida
    // PATCH /stopper/undo
    undoClick: function () {
      alert("UNDO click event " + this.athleteEvent.athleteName)

      // peale õnnelikku responset saata välja emit event
      this.$emit('undoClickEvent')
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