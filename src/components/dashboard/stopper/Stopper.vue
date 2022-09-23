<template>
  <div class="col" style="margin-top:50px">
    <span class="stopper-time" >{{ time }}</span>
  </div>
</template>

<script>

export default {
  name: "Stopper",
  props: {
    heatRow: {}
  },
  data: function () {
    return {
      time: '0:00.000',
      timeBegan: null,
      started: null
    }
  },
  methods: {
    startStopperWhenHeatStarted: function () {
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
    createTime: function () {
      if (this.heatRow.hasStarted && !this.heatRow.hasFinished) {
        this.startStopperWhenHeatStarted();
      } else if (this.heatRow.hasStarted && this.heatRow.hasFinished) {
        this.createTimeWhenFinished()
      } else {
        this.time = '0:00.000'
      }
    },
    createTimeWhenFinished: function f() {
      var timeElapsed = new Date(this.heatRow.heatFinishTimeMilliseconds - this.heatRow.heatStartTimeMilliseconds);
      var min = timeElapsed.getUTCMinutes()
      var sec = timeElapsed.getUTCSeconds()
      var ms = timeElapsed.getUTCMilliseconds();
      this.time = this.zeroPrefix(min, 2) + ":" + this.zeroPrefix(sec, 2) + "." + this.zeroPrefix(ms, 2);
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
    this.createTime()
  }
}
</script>