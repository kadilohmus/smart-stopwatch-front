<template>
  <div>
    <h2>Time</h2>
      <span class="time">{{ time }}</span>
  </div>
</template>

<script>

export default {
  name: "Stopper",
  props: {
    heatRow: Object
  },
  data: function () {
    return {
      time: '0:00.000',
      timeBegan: null,
      started: null
    }
  },
  methods: {
    start: function () {
      this.timeBegan = new Date(this.heatRow.heatStartTimeMilliseconds);
      this.started = setInterval(this.clockRunning, 10);
    },
    clockRunning: function () {
      // time is calculated below
      var currentTime = new Date()
          , timeElapsed = new Date(currentTime - this.timeBegan)
          , hour = timeElapsed.getUTCHours()
          , min = timeElapsed.getUTCMinutes()
          , sec = timeElapsed.getUTCSeconds()
          , ms = timeElapsed.getUTCMilliseconds();

      // time is formatted below
      this.time =
          // stopper 'hour' prefix is commented out
          // remove comment "//" to enable hours
          // this.zeroPrefix(hour, 1) + ":" +
          this.zeroPrefix(min, 2) + ":" +
          this.zeroPrefix(sec, 2) + "." +
          this.zeroPrefix(ms, 2);
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
    if (this.heatRow.hasStarted) {
      this.start();
    }
  }
}
</script>