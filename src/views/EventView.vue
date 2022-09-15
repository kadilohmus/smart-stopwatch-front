<template>
  <div>
    <div>
      <br>
      <h1>Event</h1>
      <h5 style="color: black">Event id: {{ eventId }}</h5><br><br>
    </div>
    <section style="color: black; float: left; margin-left: 50px">
      <div v-for="heatRow in eventInfoResponse.heatRows">
        <button type="button" style="margin: 25px" class="btn btn-dark" v-on:click="startStopAction(heatRow)">{{heatRow.heatStatus}}</button>
        <div v-for="athleteEvent in heatRow.athleteEvents">
          <button type="button" style="margin: 25px" class="btn btn-success btn-lg" >{{athleteEvent.athleteName}}</button>
        </div>
        <br>
      </div>
      <br>
    </section>

    <section style="color: black; float: right; margin-right: 400px">
      <div v-for="heatRow in eventInfoResponse.heatRows">
        <h5 style="color: darkred">Heat {{heatRow.heatNumber}}</h5>
      <div v-for="athleteEvent in heatRow.athleteEvents">

      </div>
      </div>

      NAME <br>
      NAME <br>
      NAME <br>
      <h5 style="color: darkred">Heat 2</h5>
      NAME <br>
      NAME <br>
      NAME <br>
      <h5 style="color: darkred">Heat 3</h5>
      NAME <br>
      NAME <br>
      NAME <br>
      <h5 style="color: darkred">Heat 4</h5>
      NAME <br>
      NAME <br>
      NAME <br>
    </section>
    <section class="border border; container" style="float: top; border-radius: 50px; width: 200px; height: 380px">
      <h2 style="margin: 20px">0:00.00</h2><br>
      <h2 style="margin: 20px">0:00.00</h2><br>
      <h2 style="margin: 20px">0:00.00</h2><br>
      <h2 style="margin: 20px">0:00.00</h2><br>
    </section>
  </div>
</template>

<script>
export default {
  name: "EventView",
  data: function () {
    return {
      eventId: sessionStorage.getItem('eventId'),
      eventInfoResponse: {
        heatRows: [
          {
            heatNumber: 0,
            hasStarted: false,
            heatStatus: "Start",
            heatStartTimeStamp: '',
            athleteEvents: [
              {
                athleteId: 0,
                athleteEventId: 1,
                athleteName: '',
                startTime: '',
                finishTime: '',
                heatNumber: 0,
                laneNumber: 0,
                eventLength: 0,
                strokeId: 0,
                splitLength: 0,
                splitCounter: 0
              }
            ]
          }
        ]
      }
    }
  },
  methods: {
    getEventInfo: function () {
      this.$http.get("/event/id", {
            params: {
              eventId: 1
            }
          }
      ).then(response => {
        this.eventInfoResponse = response.data
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    },
    startStopAction: function (heatRow) {
      console.log('OLEN SIIN')
    // todo: võib olla start event või stopp event
      if (heatRow.hasStarted) {
        // todo: reset stop teenus
      } else {
        this.startHeat(heatRow.heatNumber)
      }

    },

    startHeat: function (heatNumber) {
      this.$http.post("/event", null, {
        params: {
          eventId: this.eventId,
          heatNumber: heatNumber

        }
          }
      ).then(response => {
        this.getEventInfo()
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    }
  },
  mounted() {
    this.getEventInfo()
  }
}
</script>

<style scoped>

</style>