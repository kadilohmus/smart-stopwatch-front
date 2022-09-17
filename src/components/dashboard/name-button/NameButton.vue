<template>
  <div>
    <div v-if="!athleteEvent.hasStarted && !athleteEvent.hasFinished">
      <NameButtonInitial @editClickEvent="editClick" @splitClickEvent="splitClick" :athlete-event="athleteEvent"/>
    </div>
    <div v-else-if="athleteEvent.hasStarted && !athleteEvent.hasFinished">
      <NameButtonStarted @splitClickEvent="splitClick" :athlete-event="athleteEvent"/>
    </div>
    <div v-else>
      <NameButtonFinished @splitClickEvent="splitClick" :athlete-event="athleteEvent"/>
    </div>
  </div>
</template>
<script>
import NameButtonInitial from "@/components/dashboard/name-button/NameButtonInitial";
import NameButtonStarted from "@/components/dashboard/name-button/NameButtonStarted";
import NameButtonFinished from "@/components/dashboard/name-button/NameButtonFinished";

export default {
  name: 'NameButton',
  components: {NameButtonFinished, NameButtonStarted, NameButtonInitial},
  props: {
    athleteEvent: {}
  },
  methods: {
    editClick: function () {
      this.$emit('editAthleteEvent')
    },
    splitClick: function () {
      this.$http.post("/some/path", null, {
            params: {
              athleteEventId: ''
            }
          }
      ).then(response => {
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>
