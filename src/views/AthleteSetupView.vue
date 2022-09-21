<template>
  <div>
    <br><br>
    <h1>Athlete event settings</h1><br><br>
    <div class="container" style="float: right">
      <table class="table table-borderless" style="width: 65%">
        <thead>
        <tr>
          <th style="width: 10%" scope="col"></th>
          <th style="width: 10%" scope="col"></th>
          <th style="width: 10%" scope="col"></th>

        </tr>
        </thead>
        <tbody>
        <tr align="left">
          <td><p style="color: white; font-weight: bold">Athlete</p></td>
          <td>
            <select class="rounded" style="width: 150px; border-color: white" v-model="athleteSetupRequest.athleteId">
            <option value="" disabled="true" selected="true">choose athlete</option>
            <option v-for=" athleteInfo in athleteInfos" :value="athleteInfo.athleteId">{{ athleteInfo.athleteName }}
            </option>
          </select>
          </td>
          <td rowspan="3">
            <button type="button" style="margin: 5px" class="btn btn-outline-light" v-on:click="updateAthleteEvent">Update</button>
            <button type="button" style="margin: 5px" class="btn btn-outline-light" v-on:click="toggleDisplayAddAthleteTable">Create new athlete</button>
            <button type="button" style="margin: 5px" class="btn btn-outline-danger" v-on:click="cancelEditAthleteEvent">Cancel</button>
          </td>
        </tr>
        <tr align="left">
          <td><p style="color: white; font-weight: bold">Stroke</p></td>
          <td><select class="rounded" style="width: 150px; border-color: white" v-model="athleteSetupRequest.strokeId">
            <option value="" disabled="true" selected="true">choose stroke</option>
            <option v-for=" stroke in strokeDtos" :value="stroke.id">{{ stroke.type }}</option>
          </select></td>
        </tr>
        <tr align="left">
          <td><p style="color: white; font-weight: bold">Distance</p></td>
          <td><input type="number" class="rounded" style="width: 60px; border-color: white" v-model="athleteSetupRequest.eventLength"><a style="color: white"> meters</a></td>
        </tr>
        </tbody>
      </table>
      <br><br>
    </div>
    <br>
    <div class="container" style="float: right" v-if="divDisplayAddAthleteTable">

      <table class="table table-borderless" style="width: 65%">
        <thead>
        <tr>
          <th style="width: 10%" scope="col"></th>
          <th style="width: 10%" scope="col"><h2 style="color: white">Create new athlete</h2></th>
          <th style="width: 10%" scope="col"></th>
        </tr>
        <br>
        </thead>
        <tbody>
        <tr align="left" >
          <td><p style="color: white; font-weight: bold">Name</p></td>
          <td><input type="text" class="rounded" style="width: 160px; border-color: white" v-model="addAthleteRequest.name"></td>
          <td>
            <button type="button" style="margin: 5px" class="btn btn-outline-light" v-on:click="createNewAthlete">Create</button>
            </td>
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
      userId: sessionStorage.getItem('userId'),
      eventId: sessionStorage.getItem('eventId'),
      divDisplayAddAthleteTable: false,
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
        strokeId: Number(this.$route.query.strokeId),
        eventLength: Number(this.$route.query.eventLength)
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
        this.selectedAthleteId = this.athleteSetupRequest.athleteId
      }).catch(error => {
        console.log(error)
      })
    },
    getAllStrokesDropdownInfo: function () {
      this.$http.get("/setup/stroke")
          .then(response => {
            this.strokeDtos = response.data
            this.selectedStrokeTypeId = this.athleteSetupRequest.strokeId
          }).catch(error => {
        console.log(error)
      })
    },
    updateAthleteEvent: function () {
      this.$http.patch("/setup/athlete-event", this.athleteSetupRequest
      ).then(response => {
        this.$router.push('/event')
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    },
    cancelEditAthleteEvent: function () {
      this.$router.push('/event')
    },
    createNewAthlete: function () {
      this.$http.post("/setup/athlete",null, {
            params: {
              name: this.addAthleteRequest.name,
              trainerUserId: sessionStorage.getItem('userId')
            }
          }
      ).then(response => {
        this.getAllAthletesDropdownInfo()
        this.athleteSetupRequest.athleteId = response.data.athleteId
        this.toggleDisplayAddAthleteTable()

      }).catch(error => {
        console.log(error)
      })
    },
    toggleDisplayAddAthleteTable: function () {
      this.divDisplayAddAthleteTable = !this.divDisplayAddAthleteTable
    }
  },
  mounted() {
    this.getAllStrokesDropdownInfo()
    this.getAllAthletesDropdownInfo()
  }
}
</script>