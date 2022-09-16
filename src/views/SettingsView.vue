<template>
  <div>
    <div>
      <br>
      <h1 style="color: black">Global settings</h1><br><br>
      <AlertError :errorMessage="errorMessage"/>
    </div>
    <div class="container" style="float: right">
      <table class="table table-borderless" style="width: 70%">
        <thead>
        <tr>
          <th style="width: 20%" scope="col"></th>
          <th style="width: 30%" scope="col"></th>
          <th style="width: 10%" scope="col"></th>
        </tr>
        </thead>
        <tbody>
        <tr align="left">
          <td ><p style="color: black; font-weight: bold">Pool split</p></td>
          <td ><select class="rounded" style="width: 90px; border-color: white"
                      v-model="settingRequest.splitLengthId">
<!--            <option value="" selected="true" disabled>meters</option>-->
            <option v-for=" split in splitDto" :value="split.id">{{ split.meters }}</option>
          </select> meters</td>
          <td rowspan="7"><button type="button" style="margin-bottom: 10px; width: 150px; height: 150px" class="btn btn-dark" v-on:click="createGlobalSettings">Create event
          </button>
            <br><router-link to="/menu" style="margin-top: 10px; width: 150px; height: 150px" class="btn btn-outline-light" tag="button">Back to Menu
          </router-link></td>
        </tr>
        <tr align="left">
          <td><p style="color: black; font-weight: bold">Distance</p></td>
          <td><input type=number class="rounded" style="width: 60px; border-color: white"
                     v-model="settingRequest.eventLength"> meters<br></td>
        </tr>
        <tr align="left">
          <td><p style="color: black; font-weight: bold">Stroke</p></td>
          <td><select class="rounded" style="width: 150px; border-color: white"
                      v-model="settingRequest.strokeId">
<!--            <option value="" disabled="true" selected="true">choose stroke</option>-->
            <option v-for=" stroke in strokeDto" :value="stroke.id">{{ stroke.type }}</option>
          </select></td>
        </tr>
        <tr align="left">
          <td><p style="color: black; font-weight: bold">Number of athletes</p></td>
          <td><input type=number class="rounded" style="width: 60px; border-color: white"
                     v-model="settingRequest.numberOfAthletes"></td>
        </tr>
        <tr align="left">
          <td><p style="color: black; font-weight: bold">Number of lanes</p></td>
          <td><input type=number class="rounded" style="width: 60px; border-color: white"
                     v-model="settingRequest.numberOfLanes"></td>
        </tr>
        <tr align="left">
          <td><p style="color: black; font-weight: bold">Number of heats</p></td>
          <td><input type=number class="rounded" style="width: 60px; border-color: white"
                     v-model="settingRequest.numberOfHeats"></td>
        </tr>
<!--        <tr align="left">-->
<!--          <td><p style="color: black; font-weight: bold">Heat interval</p></td>-->
<!--          <td><input type=number class="rounded" style="width: 60px; border-color: white"-->
<!--                     v-model="settingRequest.heatIntervalSeconds"> seconds-->
<!--          </td>-->
<!--        </tr>-->
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>

import AlertError from "@/components/alerts/AlertError";

export default {


  name: "SettingsView",
  components: {AlertError},
  data: function () {
    return {
      errorMessage: '',
      allFieldsAreFilled: false,
      splitDto: [],
      strokeDto: [],
      userId: sessionStorage.getItem('userId'),
      settingRequest: {
        userId: sessionStorage.getItem('userId'),
        splitLengthId: '',
        // heatIntervalSeconds: '',
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
        this.$http.post("/event/global/settings", this.settingRequest
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
      this.$http.get("/event/global/splits")
          .then(response => {
            this.splitDto = response.data
          }).catch(error => {
        console.log(error)
      })
    },
    findAllStrokes: function () {
      this.$http.get("/event/global/strokes")
          .then(response => {
            this.strokeDto = response.data
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
          // input.heatIntervalSeconds !== ''
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