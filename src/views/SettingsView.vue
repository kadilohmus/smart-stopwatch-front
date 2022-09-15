<template>
  <div>
    <div>
      <br>
      <h1>Global settings</h1><br>
    </div>
    <section style="color: black; float: left; margin-left: 100px">
      <h3>Required</h3><br>

      SPLIT <select style="margin: 10px; width: 90px; border-color: white; border-radius: 7px" v-model="settingRequest.splitLengthId">
      <option value="" selected="true" disabled>meters</option>
      <option v-for=" split in splitDto" :value="split.id">{{split.meters}}</option>
    </select><br><br>
      <h3 style="color: black">Optional</h3><br>
      HEAT INTERVAL <input type=number style="margin: 10px; width: 60px; border-color: white; border-radius: 7px" v-model="settingRequest.heatIntervalSeconds"> seconds<br>
      NUMBER OF LANES <input type=number style="margin: 10px; width: 60px; border-color: white; border-radius: 7px" v-model="settingRequest.numberOfLanes"><br>
      NUMBER OF HEATS <input type=number style="margin: 10px; width: 60px; border-color: white; border-radius: 7px" v-model="settingRequest.numberOfHeats"><br>
      NUMBER OF ATHLETES <input type=number style="margin: 10px; width: 60px; border-color: white; border-radius: 7px" v-model="settingRequest.numberOfAthletes"><br>
      DISTANCE <input type=number style="margin: 10px; width: 60px; border-color: white; border-radius: 7px" v-model="settingRequest.eventLength"> meters<br>
      STROKE <select style="margin: 10px; width: 150px; border-color: white; border-radius: 7px" v-model="settingRequest.strokeId">
      <option value="" disabled="true" selected="true">choose stroke</option>
      <option v-for=" stroke in strokeDto" :value="stroke.id">{{stroke.type}}</option>
    </select><br><br>
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
    {{settingRequest}}
  </div>
</template>

<script>
export default {
  name: "SettingsView",
  data: function () {
    return {
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

      this.$http.post("/event/global/settings", this.settingRequest
      ).then(response => {
        this.settingResponse = response.data
        sessionStorage.setItem('eventId', this.settingResponse.id)
        this.$router.push({name: 'eventRoute'})
      }).catch(error => {
        console.log(error)
      })
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