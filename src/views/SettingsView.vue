<template>
  <div>
    <div>
      <br>
      <h1>Global settings</h1><br>
    </div>
    <section style="color: black; float: left; margin-left: 100px">
      <h4>Required</h4><br>
      SPLIT <select>
      <option value="1">25</option>
      <option value="2">50</option>
      <option value="3">100</option>
    </select> meters<br><br>
      <h4 style="color: black">Optional</h4><br>
      HEAT INTERVAL <input type=number style="margin: 10px" v-model="settingRequest.heatIntervalSeconds"> seconds<br>
      NUMBER OF LANES <input type=number style="margin: 10px" v-model="settingRequest.numberOfLanes"><br>
      NUMBER OF HEATS <input type=number style="margin: 10px" v-model="settingRequest.numberOfHeats"><br>
      NUMBER OF ATHLETES <input type=number style="margin: 10px" v-model="settingRequest.numberOfAthletes"><br>
      DISTANCE <input type=number style="margin: 10px" v-model="settingRequest.eventLength"> meters<br>
      STYLE <select>
      <option value="1">Freestyle</option>
      <option value="1">Butterfly</option>
      <option value="1">...</option>
    </select><br><br>
    </section>
    <aside>
      <button type="button" style="margin: 50px; width: 150px; height: 150px" class="btn btn-dark"
              v-on:click="createGlobalSettings">Create
      </button>
      <router-link to="/menu" style="margin-left: 50px;margin-right: 100px; width: 150px; height: 150px"
                   class="btn btn-outline-light" tag="button">Back to Menu
      </router-link>
    </aside>

  </div>
</template>

<script>
export default {
  name: "SettingsView",
  data: function () {
    return {
      settingRequest: {
        strokeId: '',
        eventLength: '',
        splitLengthId: '',
        numberOfAthletes: '',
        numberOfHeats: '',
        numberOfLanes: '',
        heatIntervalSeconds: ''
      },
      settingResponse: {
        eventId: 0
      },
      userId: sessionStorage.getItem('userId')
    }
  },
  methods: {
    createGlobalSettings: function () {

      this.$http.post("/event/global/settings", this.settingRequest
      ).then(response => {
        this.settingResponse = response.data
        sessionStorage.setItem('eventId', this.settingResponse.eventId)

        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>

</style>