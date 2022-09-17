<template>
  <div>

    <!-- todo: (TIITEL JA BACK TO SETTINGS NUPP) -->
    <DashboardHeader/>

    <!-- todo: (HALL KAST) -->
    <div class="container p-3 mb-2 bg-secondary text-white" v-if="divDisplayMainTable">

      <!-- todo: (LOOPIME RIDASID) -->
      <div class="row" v-for="heatRow in stopperDashboard.heatRows" :key="heatRow.uuid">

        <StartStopButton :heat-row="heatRow"
                         @startHeatClickEvent="startHeatClick(heatRow)"
                         @stopHeatClickEvent="stopHeatClick(heatRow)"

        />

        <!-- todo: (NIMELISED NUPUD) -->
        <div class="col" v-for="athleteEvent in heatRow.athleteEvents">
          <NameButton :athlete-event="athleteEvent"
                      @splitClickEvent="splitClick(athleteEvent)"
                      @editClickEvent="editAthleteEvent(athleteEvent)"
                      @undoClickEvent="undoClickEvent(athleteEvent)"
          />
          <AthleteSettings :athlete-event="athleteEvent"/>
        </div>

        <!-- todo: (TIME) STOPPER -->
        <Stopper :heat-row="heatRow"/>
      </div>
    </div>










    <!-- todo: KOGU SEE JAMA OLEKS VAJA ERALDI VAATELE VIIA -->
    <!-- todo: EDIT ATHLETE EVENT FORM -->
    <div v-if="divDisplayEditAthleteEvent">

      <div>
      <select v-model="selectedAthleteId">
        <option value="" disabled="true" selected="true">choose stroke</option>
        <option v-for=" athleteInfo in athleteInfos" :value="athleteInfo.athleteId">{{
            athleteInfo.athleteName
          }}
        </option>
      </select>
      </div>

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
import AthleteSettings from "@/views/AthleteSettings";
import StartStopButton from "@/components/dashboard/start-stop-buttton/StartStopButton";
import DashboardHeader from "@/views/DashboardHeader";

export default {
  name: "EventView",
  components: {DashboardHeader, StartStopButton, AthleteSettings, NameButton, Stopper},

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

    startHeatClick: function (heatRow) {
      alert("START heat event ")
      this.$http.post("/event", null, {
            params: {
              eventId: this.eventId,
              heatNumber: heatRow.heatNumber
            }
          }
      ).then(response => {
        this.getEventInfo()
      }).catch(error => {
        console.log(error)
      })
    },

    stopHeatClick: function (heatRow) {
      // see meetod on vaja ära implementeerida, kui back'is on teenus valmis
      alert("STOP heat event ")
    },

    splitClick: function (athleteEvent) {
      // see meetod on vaja ära implementeerida, kui back'is on teenus valmis
      alert("SPLIT click event " + athleteEvent.athleteName)
    },
    editAthleteEvent: function (athleteEvent) {
      // see meetod on vaja ära implementeerida, kui back'is on teenus valmis
      alert("EDIT athlete event " + athleteEvent.athleteName)
    },
    undoClickEvent: function (athleteEvent) {
      // see meetod on vaja ära implementeerida, kui back'is on teenus valmis
      alert("UNDO click event " + athleteEvent.athleteName)
    },










    // todo: SEE KÕIK ERALDI VAATESSE ÄRA VIIA
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

