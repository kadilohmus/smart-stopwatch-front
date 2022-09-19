<template>
  <div>
    <br>
    <h1>Athlete event settings</h1><br>
<!--        <div class="row">-->
<!--          <p class="text-center">{{ athleteEvent.strokeType }} {{ athleteEvent.athleteEventLength }}</p>-->
<!--        </div>-->
    <div class="container" style="float: right">
      <table class="table table-borderless" style="width: 60%">
        <thead>
        <tr>
          <th style="width: 10%" scope="col"></th>
          <th style="width: 10%" scope="col"></th>
          <th style="width: 10%" scope="col"></th>

        </tr>
        </thead>
        <tbody>
        <tr align="left">
          <td><p style="color: black; font-weight: bold">Athlete</p></td>
          <td><select class="rounded" style="width: 150px; border-color: white" v-model="selectedAthleteId">
            <option value="" disabled="true" selected="true">choose athlete</option>
            <option v-for=" athleteInfo in athleteInfos" :value="athleteInfo.athleteId">{{ athleteInfo.athleteName }}
            </option>
          </select></td>
          <td rowspan="3">
            <button type="button" style="margin: 5px" class="btn btn-dark" v-on:click="updateAthleteEvent">Update</button>
            <button type="button" style="margin: 5px" class="btn btn-dark" v-on:click="addNewAthlete">Create new athlete</button>
            <button type="button" style="margin: 5px" class="btn btn-outline-dark" v-on:click="cancelEditAthleteEvent">Cancel</button>
          </td>
        </tr>
        <tr align="left">
          <td><p style="color: black; font-weight: bold">Stroke</p></td>
          <td><select class="rounded" style="width: 150px; border-color: white" v-model="selectedStrokeTypeId">
            <option value="" disabled="true" selected="true">choose stroke</option>
            <option v-for=" stroke in strokeDtos" :value="stroke.id">{{ stroke.type }}</option>
          </select></td>
        </tr>
        <tr align="left">
          <td><p style="color: black; font-weight: bold">Distance</p></td>
          <td><input type="text" class="rounded" style="width: 60px; border-color: white" v-model="selectedEventLength"> meters</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div>

    </div>
  </div>
</template>
<script>
export default {
  name: 'AthleteSetupView',
  props: {
    athleteEvent: {}
  },
  data: function () {
    return {
      athleteId: Number(this.$route.query.athleteId),
      athleteEventId: Number(this.$route.query.athleteEventId),
      userId: sessionStorage.getItem('userId'),
      eventId: 2,
      selectedEventLength: 0,
      selectedAthleteId: '',
      selectedStrokeTypeId: '',
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
      athleteSetupRequest: {
        athleteEventId: Number(this.$route.query.athleteEventId),
        athleteId: Number(this.$route.query.athleteId),
        strokeId: 0,
        eventLength: 0
      },
      addAthleteRequest: {
        name: '',
        trainerUserId: ''
      },
      addAthleteResponse: {
        athleteId: 0,
        athleteName: ''
      }
    }
  },
  methods: {
    getAllAthletesDropdownInfo: function () {
      this.$http.get("/setup/all-athlete", {
            params: {
              userId: this.userId
            }
          }
      ).then(response => {
        this.athleteInfos = response.data
        if (this.athleteId == 9) {
          this.selectedAthleteId = 2
        }
        console.log('oleme siin')
      }).catch(error => {
        console.log(error)
      })
    },
    getAllStrokesDropdownInfo: function () {
      this.$http.get("/setup/stroke")
          .then(response => {
            this.strokeDtos = response.data
          }).catch(error => {
        console.log(error)
      })
    },
    updateAthleteEvent: function () {

      this.$http.patch("/setup/athlete-event", this.athleteSetupRequest
      ).then(response => {
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    },
    cancelEditAthleteEvent: function () {
      this.$router.push('/event')
      
    },
    addNewAthlete: function () {
      this.$http.post("/setup/athlete",null, {
            params: {
              name: '',
              trainerUserId: sessionStorage.getItem('userId')
            }
          }
      ).then(response => {
        this.addAthleteResponse = response.data
      }).catch(error => {
        console.log(error)
      })
    }
  },
  mounted() {
    this.getAllStrokesDropdownInfo()
    this.getAllAthletesDropdownInfo()
  }
}
</script>