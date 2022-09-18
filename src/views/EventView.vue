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


    <!-- todo: KOGU SEE JAMA OLEKS VAJA ERALDI VAATELE VIIA -->
    <!-- todo: EDIT ATHLETE EVENT FORM -->
<!--    <div v-if="divDisplayEditAthleteEvent">-->

<!--      <div>-->
<!--        <select v-model="selectedAthleteId">-->
<!--          <option value="" disabled="true" selected="true">choose stroke</option>-->
<!--          <option v-for=" athleteInfo in athleteInfos" :value="athleteInfo.athleteId">{{-->
<!--              athleteInfo.athleteName-->
<!--            }}-->
<!--          </option>-->
<!--        </select>-->
<!--      </div>-->

<!--      <select class="rounded" style="width: 150px; border-color: white"-->
<!--              v-model="selectedStrokeTypeId">-->
<!--        <option value="" disabled="true" selected="true">choose stroke</option>-->
<!--        <option v-for=" stroke in strokeDtos" :value="stroke.id">{{ stroke.type }}</option>-->
<!--      </select>-->
<!--      <input type="text" placeholder="meters" v-model="selectedEventLength">-->
<!--      <br>-->
<!--      <button type="button" style="margin: 5px" class="btn btn-dark" v-on:click="cancelEditAthleteEvent">-->
<!--        Cancel-->
<!--      </button>-->
<!--      <button type="button" style="margin: 5px" class="btn btn-dark">-->
<!--        Update-->
<!--      </button>-->
<!--      &lt;!&ndash;      todo: update meetod&ndash;&gt;-->
<!--      <button type="button" style="margin: 5px" class="btn btn-dark">-->
<!--        Create athlete-->
<!--      </button>-->
<!--    </div>-->
<!--    <br><br><br>-->


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
      eventId: 2,
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
    },



    // todo: SEE KÕIK ERALDI VAATESSE ÄRA VIIA
    // getAllStrokesDropdownInfo: function () {
    //   this.$http.get("/setup/stroke")
    //       .then(response => {
    //         this.strokeDtos = response.data
    //       }).catch(error => {
    //     console.log(error)
    //   })
    // },
    // getAllAthletesDropdownInfo: function () {
    //   this.$http.get("/setup/all-athlete", {
    //         params: {
    //           userId: 1
    //         }
    //       }
    //   ).then(response => {
    //     this.athleteInfos = response.data
    //   }).catch(error => {
    //     console.log(error)
    //   })
    // }


  },
  mounted() {
    this.getDashboardInfo()
  }
}
</script>

