<template>
  <div>
    <div>
      <br>
      <h1>Global settings</h1><br>
    </div>
    <section style="color: black; float: left; margin-left: 100px">
      <h3>Required</h3><br>
      <AlertError :errorMessage="errorMessage"/>
      POOL SPLIT <select class="rounded" style="margin: 10px; width: 90px; border-color: white"
                         v-model="settingRequest.splitLengthId">
      <option value="" selected="true" disabled>meters</option>
      <option v-for=" split in splitDto" :value="split.id">{{ split.meters }}</option>
    </select><br>
      DISTANCE <input type=number class="rounded" style="margin: 10px; width: 60px; border-color: white"
                      v-model="settingRequest.eventLength"> meters<br>
      STROKE <select class="rounded" style="margin: 10px; width: 150px; border-color: white"
                     v-model="settingRequest.strokeId">
      <option value="" disabled="true" selected="true">choose stroke</option>
      <option v-for=" stroke in strokeDto" :value="stroke.id">{{ stroke.type }}</option>
    </select><br>
      NUMBER OF ATHLETES <input type=number class="rounded" style="margin: 10px; width: 60px; border-color: white"
                                v-model="settingRequest.numberOfAthletes"><br>
      NUMBER OF LANES <input type=number class="rounded" style="margin: 10px; width: 60px; border-color: white"
                             v-model="settingRequest.numberOfLanes"><br>
      NUMBER OF HEATS <input type=number class="rounded" style="margin: 10px; width: 60px; border-color: white"
                             v-model="settingRequest.numberOfHeats"><br>
      HEAT INTERVAL <input type=number class="rounded" style="margin: 10px; width: 60px; border-color: white"
                           v-model="settingRequest.heatIntervalSeconds"> seconds<br>
    </section>
    <aside>
      <button type="button" style="margin: 50px; width: 150px; height: 150px" class="btn btn-dark"
              v-on:click="createGlobalSettings">Create event
      </button>
      <router-link to="/menu" style="margin: 50px; width: 150px; height: 150px"
                   class="btn btn-outline-light" tag="button">Back to Menu
      </router-link>
    </aside>

    <br><br>
    {{ settingRequest }}
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
        heatIntervalSeconds: '',
        numberOfLanes: '',
        numberOfHeats: '',
        numberOfAthletes: '',
        eventLength: '',
        strokeId: ''
      },
      settingResponse: {
        id: 0,
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
          sessionStorage.setItem('eventId', this.settingResponse.id)
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
          input.eventLength  !== ''  &&
          input.strokeId  !== ''  &&
          input.numberOfAthletes  !== ''  &&
          input.numberOfLanes  !== ''  &&
          input.numberOfHeats  !== ''  &&
          input.heatIntervalSeconds  !== ''
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