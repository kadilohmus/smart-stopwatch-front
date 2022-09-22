<template>
  <div>
    <div>
      <br><br>
      <h1>Global settings</h1><br><br>
      <AlertError :errorMessage="errorMessage"/>
    </div>
    <div class="container" style="float: right">
      <table class="table table-borderless" style="width: 80%">
        <thead>
        <tr>
          <th style="width: 20%" scope="col"></th>
          <th style="width: 30%" scope="col"></th>
          <th style="width: 10%" scope="col"></th>
        </tr>
        </thead>
        <tbody>
        <tr align="left">
          <td><p style="color: white; font-weight: bold">Split length</p></td>
          <td><select class="rounded" style="width: 90px; border-color: white"
                      v-model="settingRequest.splitLengthId">
            <option v-for=" split in splitDtos" :value="split.id">{{ split.meters }}</option>
          </select><a style="color: white"> meters</a></td>
          <td rowspan="7"><button type="button" style="margin-bottom: 10px; width: 150px; height: 150px" class="btn btn-outline-light" v-on:click="createGlobalSettings">Create event
          </button>
            <br><router-link to="/menu" style="margin-top: 10px; width: 150px; height: 150px" class="btn btn-outline-danger" tag="button">Back to Menu
          </router-link></td>
        </tr>
        <tr align="left">
          <td><p style="color: white; font-weight: bold">Distance</p></td>
          <td><input type=number class="rounded" style="width: 60px; border-color: white"
                     v-model="settingRequest.eventLength"><a style="color: white"> meters</a><br></td>
        </tr>
        <tr align="left">
          <td><p style="color: white; font-weight: bold">Stroke</p></td>
          <td><select class="rounded" style="width: 150px; border-color: white"
                      v-model="settingRequest.strokeId">
            <option v-for=" stroke in strokeDtos" :value="stroke.id">{{ stroke.type }}</option>
          </select></td>
        </tr>
        <tr align="left">
          <td><p style="color: white; font-weight: bold">Number of athletes</p></td>
          <td><input type=number class="rounded" style="width: 60px; border-color: white"
                     v-model="settingRequest.numberOfAthletes"></td>
        </tr>
        <tr align="left">
          <td><p style="color: white; font-weight: bold">Number of lanes</p></td>
          <td><input type=number class="rounded" style="width: 60px; border-color: white"
                     v-model="settingRequest.numberOfLanes"></td>
        </tr>
        <tr align="left">
          <td><p style="color: white; font-weight: bold">Number of heats</p></td>
          <td><input type=number class="rounded" style="width: 60px; border-color: white"
                     v-model="settingRequest.numberOfHeats"></td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import AlertError from "@/components/alerts/AlertError";

export default {
  name: "GlobalSettingsView",
  components: {AlertError},
  data: function () {
    return {
      errorMessage: '',
      allFieldsAreFilled: false,
      splitDtos: [
        {
          id: 0,
          meters: ''
        }
      ],
      strokeDtos: [
        {
          id: 0,
          type: ''
        }
      ],
      userId: sessionStorage.getItem('userId'),
      settingRequest: {
        userId: sessionStorage.getItem('userId'),
        splitLengthId: '',
        numberOfLanes: '',
        numberOfHeats: '',
        numberOfAthletes: '',
        eventLength: '',
        strokeId: ''
      },
      settingResponse: {
        eventId: 0,
      },
    }
  },
  methods: {
    createGlobalSettings: function () {
      this.errorMessage = ''
      this.validateIfAllFieldsAreFilled()
      if (!this.allFieldsAreFilled) {
        this.errorMessage = 'All fields are required!'
      } else {
        this.$http.post("/setup/event", this.settingRequest
        ).then(response => {
          this.settingResponse = response.data
          sessionStorage.setItem('eventId', this.settingResponse.eventId)
          this.$router.push({name: 'eventRoute'})
        }).catch(error => {
          console.log(error)
        })
      }
    },
    findAllSplits: function () {
      this.$http.get("/setup/split")
          .then(response => {
            this.splitDtos = response.data
          }).catch(error => {
        console.log(error)
      })
    },
    findAllStrokes: function () {
      this.$http.get("/setup/stroke")
          .then(response => {
            this.strokeDtos = response.data
          }).catch(error => {
        console.log(error)
      })
    },
    validateIfAllFieldsAreFilled: function () {
      let input = this.settingRequest
      this.allFieldsAreFilled = input.splitLengthId !== '' &&
          input.eventLength !== '' &&
          input.strokeId !== '' &&
          input.numberOfAthletes !== '' &&
          input.numberOfLanes !== '' &&
          input.numberOfHeats !== ''
    }
  },
  mounted() {
    this.findAllSplits()
    this.findAllStrokes()
  }
}
</script>

<style scoped>

</style>