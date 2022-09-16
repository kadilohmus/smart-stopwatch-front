<template>
  <div>
    <div style="float: right">
      <router-link to="/settings" style="margin: 30px" class="btn btn-outline-light" tag="button">Back to Settings
      </router-link>
      <br>
    </div>
    <br>
    <h1>Event</h1><br>

    <div class="container" v-if="divDisplayMainTable">
      <div class="row" v-for="heatRow in eventInfoResponse.heatRows">
        <div class="col">
          <button type="button" style="margin: 5px" class="btn btn-dark" v-on:click="startStopAction(heatRow)">
            {{ heatRow.heatStatus }}
          </button>
          <button type="button" style="margin: 5px" class="btn btn-success btn-lg"
                  v-for="athleteEvent in heatRow.athleteEvents">{{ athleteEvent.athleteName }}
          </button>
        </div>
        <div class="col">
          <h2>Time</h2>
        </div>
        <div class="col">
          <h3 style="color: black">Heat {{ heatRow.heatNumber }}</h3>
          <div v-for="athleteEvent in heatRow.athleteEvents">
            {{ athleteEvent.athleteName }} {{ athleteEvent.strokeType }} {{ athleteEvent.eventLength }}
            <button type="button" style="margin: 5px" class="btn btn-dark" v-on:click="editAthleteEvent(athleteEvent)">
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="divDisplayEditAthleteEvent">
      <select v-model="selectedAthleteId">

        <option value="" disabled="true" selected="true">choose swimmer</option>

        <option value="1">name1</option>
        <option value="2">name2</option>
      </select>
      <select class="rounded" style="width: 150px; border-color: white"
              v-model="selectedStrokeTypeId">
        <option value="" disabled="true" selected="true">choose stroke</option>
        <option v-for=" stroke in strokeDto" :value="stroke.id">{{ stroke.type }}</option>
      </select>
      <input type="text" placeholder="meters" v-model="selectedEventLength">
      <br>
      <button type="button" style="margin: 5px" class="btn btn-dark" v-on:click="cancelEditAtleteEvent">
        Cancel
      </button>
      <button type="button" style="margin: 5px" class="btn btn-dark">
        Update
      </button>
      <!--      todo: update meetod-->
      <button type="button" style="margin: 5px" class="btn btn-dark">
        Create athlete
      </button>
    </div>
    <br><br><br>


  </div>

</template>

<script>
export default {
  name: "EventView",
  components: {},

  data: function () {
    return {
      divDisplayMainTable: true,
      divDisplayEditAthleteEvent: false,
      divDisplayDefaultAthleteOption: false,
      eventId: sessionStorage.getItem('eventId'),
      selectedEventLength: 0,
      selectedAthleteId: 0,
      selectedStrokeTypeId: 0,
      strokeDto: [
        {
          id: 0,
          type: ''
        }
      ],
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
                athleteEventId: 0,
                athleteEventLength: 0,
                athleteName: 'string',
                strokeId: 0,
                strokeType: 'string',
                hasStarted: true,
                startTime: '2022-09-16T23:10:23.409Z',
                lastSplitTime: '2022-09-16T23:10:23.409Z',
                lastSplitLength: 0,
                hasFinished: true,
                finishTime: '2022-09-16T23:10:23.409Z'
              }
            ]
          }
        ]
      }
    }
  },
  methods: {
    getEventInfo: function () {
      this.$http.get("/stopper/dashboard", {
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
    },
    editAthleteEvent: function (athleteEvent) {
      this.divDisplayMainTable = false
      this.divDisplayEditAthleteEvent = true
      this.selectedStrokeTypeId = athleteEvent.strokeId
      this.selectedEventLength = athleteEvent.athleteEventLength

      if (athleteEvent.athleteId == null) {
        this.selectedAthleteId = ''
        this.divDisplayDefaultAthleteOption = true
      }
    },
    cancelEditAtleteEvent: function () {
      this.divDisplayMainTable = true
      this.divDisplayEditAthleteEvent = false

    },
    findAllStrokes: function () {
      this.$http.get("/setup/stroke")
          .then(response => {
            this.strokeDto = response.data
          }).catch(error => {
        console.log(error)
      })
    },
  },
  mounted() {
    this.getEventInfo()
    this.findAllStrokes()
  }
}
</script>

<style scoped>

</style>