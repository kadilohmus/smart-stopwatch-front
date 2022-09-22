<template>
  <div>

    <!-- todo: (TIITEL JA BACK TO SETTINGS NUPP) -->
    <DashboardHeader/>


    <!-- todo: (HALL KAST) -->
    <div class="dashboard-table">

      <!-- todo: (LOOPIME RIDASID) -->
      <div class="row" v-for="heatRow in stopperDashboard.heatRows" :key="heatRow.uuid">

        <StartStopButton :heat-row="heatRow"
                         @startHeatClickEvent="getDashboardInfo"
                         @stopHeatClickEvent="getDashboardInfo"
        />

        <!-- todo: (NIMELISED NUPUD) -->
        <div class="col" style="float: left; padding-top: 20px; padding-bottom: 10px; alignment: left" v-for="athleteEvent in heatRow.athleteEvents">
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
            hasStarted: true,
            hasFinished: true,
            heatButtonStatus: '',
            heatStartTimeMilliseconds: 0,
            heatFinishTimeMilliseconds: 0,
            athleteEvents: [
              {
                athleteId: 0,
                athleteEventId: 0,
                athleteEventLength: 0,
                athleteName: '',
                strokeId: 0,
                strokeType: '',
                hasStarted: true,
                startTimeMilliseconds: 0,
                finishTimeMilliseconds: 0,
                distanceCoveredTimeMilliseconds: 0,
                lastSplitCount: 0,
                distanceCovered: 0,
                hasFinished: true,
                laneNumber: 0,
                heatNumber: 0
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

