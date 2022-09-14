<template>
  <div>
    <div>
      <br>
      <h1>Global settings</h1><br>
    </div>
    <section style="color: black; float: left; margin-left: 100px">
      <h3>Required</h3><br>

      SPLIT <select style="margin: 10px; width: 60px; border-color: white; border-radius: 7px" v-model="settingRequest.splitLengthId">
      <option value="1">25</option>
      <option value="2">50</option>
      <option value="3">100</option>
    </select> meters<br><br>
      <h3 style="color: black">Optional</h3><br>
      HEAT INTERVAL <input type=number style="margin: 10px; width: 60px; border-color: white; border-radius: 7px" v-model="settingRequest.heatIntervalSeconds"> seconds<br>
      NUMBER OF LANES <input type=number style="margin: 10px; width: 60px; border-color: white; border-radius: 7px" v-model="settingRequest.numberOfLanes"><br>
      NUMBER OF HEATS <input type=number style="margin: 10px; width: 60px; border-color: white; border-radius: 7px" v-model="settingRequest.numberOfHeats"><br>
      NUMBER OF ATHLETES <input type=number style="margin: 10px; width: 60px; border-color: white; border-radius: 7px" v-model="settingRequest.numberOfAthletes"><br>
      DISTANCE <input type=number style="margin: 10px; width: 60px; border-color: white; border-radius: 7px" v-model="settingRequest.eventLength"> meters<br>
      STROKE <select style="margin: 10px; width: 120px; border-color: white; border-radius: 7px" v-model="settingRequest.strokeId">
      <option value="1">Freestyle</option>
      <option value="1">Butterfly</option>
      <option value="1">...</option>
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
        id: 0
      },
      userId: sessionStorage.getItem('userId')
    }
  },
  methods: {
    createGlobalSettings: function () {

      this.$http.post("/event/global/settings", this.settingRequest
      ).then(response => {
        this.settingResponse = response.data
        console.log('EVENT ID ON' + this.settingResponse.eventId)
        sessionStorage.setItem('eventId', this.settingResponse.id)
        this.$router.push({name: 'eventRoute'})
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    }
  },
  mounted() {
    // todo: siit kutsud välja meetodi mis käivitab get /event/global/settings teenuse
    //  responsest saad kätte listid splitDtos ja strokeDtos, mille abil saad kokku panna dünaamilised split ja stroke dropdownid
    this.createGlobalSettings()
  }
}
</script>

<style scoped>

</style>