<template>
  <div>

    <!-- todo: (TIITEL JA BACK TO SETTINGS NUPP) -->
    <DashboardHeader/>


    <!-- todo: (HALL KAST) -->
    <div class="container p-3 mb-2 bg-secondary text-white" v-if="divDisplayMainTable">

      <!-- todo: (LOOPIME RIDASID) -->
      <div class="row" v-for="heatRow in stopperDashboard.heatRows" :key="heatRow.uuid">

        <StartStopButton :heat-row="heatRow"
                         @startHeatClickEvent="getDashboardInfo"
                         @stopHeatClickEvent="getDashboardInfo"
        />

        <!-- todo: (NIMELISED NUPUD) -->
        <div class="col" v-for="athleteEvent in heatRow.athleteEvents">
          <NameButton :athlete-event="athleteEvent"
                      @splitClickEvent="getDashboardInfo"
                      @undoClickEvent="getDashboardInfo"
          />
          <AthleteSettings :athlete-event="athleteEvent"/>
        </div>

        <!-- todo: (TIME) STOPPER -->
        <Stopper :heat-row="heatRow"/>
      </div>
    </div>
    <div>
    <router-link to="/global-settings" style="margin: 30px" class="btn btn-outline-light" tag="button">Back to
      Settings
    </router-link>
  </div>
  </div>

</template>

<script>
import Stopper from "@/components/dashboard/stopper/Stopper";
import NameButton from "@/components/dashboard/name-button/NameButton";
import StartStopButton from "@/components/dashboard/start-stop-buttton/StartStopButton";
import DashboardHeader from "@/views/DashboardHeader";
import AthleteSettings from "@/components/dashboard/name-button/AthleteSettings";

export default {
  name: "EventView",
  components: {AthleteSettings, DashboardHeader, StartStopButton, NameButton, Stopper},

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
            eventId: 0,
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

    getDashboardInfo: function () {
      this.$http.get("/stopper/dashboard", {
            params: {
              eventId: this.eventId
            }
          }
      ).then(response => {
        this.stopperDashboard = response.data
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    }
  },
  mounted() {
    this.getDashboardInfo()
  }
}
</script>

