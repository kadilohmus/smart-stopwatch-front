<template>
  <div>

    <div style="float: right">
      <router-link to="/settings" style="margin: 30px" class="btn btn-outline-light" tag="button">Back to Settings
      </router-link>
      <br>
    </div>
    <br>


    <h1 class="text-center">Event</h1><br>

    <div class="container p-3 mb-2 bg-secondary text-white" v-if="divDisplayMainTable">
      <!-- todo: (ÜKS RIDA) -->
      <div class="row" v-for="heatRow in stopperDashboard.heatRows" :key="heatRow.uuid">

        <!-- todo: (START/STOP) -->
        <div class="col">
          <button type="button" style="margin: 5px" class="btn btn-dark" v-on:click="startStopAction(heatRow)">
            {{ heatRow.heatButtonStatus }}
          </button>
        </div>

        <!-- todo: (NAMED BUTTONS) -->
        <div class="col" v-for="athleteEvent in heatRow.athleteEvents">
          <div class="row">
            <NameButton :athlete-event="athleteEvent"
                        @splitClickEvent="splitClick(athleteEvent)"
                        @editClickEvent="editClick(athleteEvent)"
                        @undoClickEvent="undoClickEvent(athleteEvent)"
            />
          </div>
          <div class="row">
            <p class="text-center">{{ athleteEvent.strokeType }} {{ athleteEvent.athleteEventLength }}</p>
          </div>
        </div>

        <!-- todo: (TIME) STOPPER -->
        <div class="col">
          <Stopper :heat-row="heatRow"/>
        </div>

        <!-- todo: (HEAT) ATHLETE EVENT DETAILS -->
        <!--        <div class="col">-->
        <!--          <h3 style="color: black">Heat {{ heatRow.heatNumber }}</h3>-->

        <!--          <div v-for="athleteEvent in heatRow.athleteEvents">-->
        <!--            {{ athleteEvent.athleteName }} {{ athleteEvent.strokeType }} {{ athleteEvent.athleteEventLength }}-->
        <!--            <font-awesome-icon icon="fa-solid fa-pen-to-square" v-on:click="editAthleteEvent(athleteEvent)"/>-->
        <!--          </div>-->
        <!--        </div>-->
      </div>
    </div>


    <!-- todo: EDIT ATHLETE EVENT FORM -->
    <div v-if="divDisplayEditAthleteEvent">
      <select v-model="selectedAthleteId">
        <option value="" disabled="true" selected="true">choose stroke</option>
        <option v-for=" athleteInfo in athleteInfos" :value="athleteInfo.athleteId">{{
            athleteInfo.athleteName
          }}
        </option>
      </select>
      <select class="rounded" style="width: 150px; border-color: white"
              v-model="selectedStrokeTypeId">
        <option value="" disabled="true" selected="true">choose stroke</option>
        <option v-for=" stroke in strokeDtos" :value="stroke.id">{{ stroke.type }}</option>
      </select>
      <input type="text" placeholder="meters" v-model="selectedEventLength">
      <br>
      <button type="button" style="margin: 5px" class="btn btn-dark" v-on:click="cancelEditAthleteEvent">
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
import Stopper from "@/components/dashboard/stopper/Stopper";
import NameButton from "@/components/dashboard/name-button/NameButton";

export default {
  name: "EventView",
  components: {NameButton, Stopper},

  data: function () {
    return {
      divDisplayMainTable: true,
      divDisplayEditAthleteEvent: false,
      divDisplayDefaultAthleteOption: false,
      eventId: sessionStorage.getItem('eventId'),
      selectedEventLength: 0,
      selectedAthleteId: 0,
      selectedStrokeTypeId: 0,
      athleteInfos: [
        {
          athleteId: 0,
          athleteName: ''
        }
      ],
      strokeDtos: [
        {
          id: 0,
          type: ''
        }
      ],
      stopperDashboard: {
        numberOfLanes: 0,
        heatRows: [
          {
            uuid: '',
            heatNumber: 0,
            hasStarted: false,
            hasFinished: false,
            heatButtonStatus: '',
            heatStartTimeMilliseconds: 0,
            athleteEvents: [
              {
                athleteId: 0,
                athleteEventId: 0,
                athleteEventLength: 0,
                athleteName: '',
                strokeId: 0,
                strokeType: '',
                hasStarted: true,
                startTime: '',
                lastSplitTime: '',
                lastSplitLength: 0,
                hasFinished: true,
                finishTime: ''
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
        this.stopperDashboard = response.data
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
    splitClick: function (athleteEvent) {
      alert("SPLIT CLICK EVENT " + athleteEvent.athleteName)
      this.$http.post("/event", null, {
            params: {
              athleteEventId: athleteEvent.athleteEventId
            }
          }
      ).then(response => {
        this.getEventInfo()
      }).catch(error => {
        console.log(error)
      })
    },
    editClick: function (athleteEvent) {
      alert("EDIT CLICK EVENT " + athleteEvent.athleteName)

      this.divDisplayMainTable = false
      this.divDisplayEditAthleteEvent = true
      this.selectedStrokeTypeId = athleteEvent.strokeId
      this.selectedEventLength = athleteEvent.athleteEventLength
      this.selectedAthleteId = athleteEvent.athleteId

      if (athleteEvent.athleteId == null) {
        this.selectedAthleteId = ''
        this.divDisplayDefaultAthleteOption = true
      }
    },
    undoClickEvent: function (athleteEvent) {
      alert("EDIT UNDO CLICK EVENT " + athleteEvent.athleteName)
    },
    cancelEditAthleteEvent: function () {
      this.divDisplayMainTable = true
      this.divDisplayEditAthleteEvent = false

    },
    findAllStrokes: function () {
      this.$http.get("/setup/stroke")
          .then(response => {
            this.strokeDtos = response.data
          }).catch(error => {
        console.log(error)
      })
    },
    findAllAthletes: function () {
      this.$http.get("/setup/all-athlete", {
            params: {
              userId: 1
            }
          }
      ).then(response => {
        this.athleteInfos = response.data
      }).catch(error => {
        console.log(error)
      })
    }
  },
  mounted() {
    this.getEventInfo()
    this.findAllStrokes()
    this.findAllAthletes()
  }
}
</script>

