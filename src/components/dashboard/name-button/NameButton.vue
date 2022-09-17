<template>
  <div>
    <div v-if="!athleteEvent.hasStarted && !athleteEvent.hasFinished">
      <NameButtonInitial :athlete-event="athleteEvent"
                         @splitClickEvent="splitClick(athleteEvent)"
                         @editClickEvent="editClick(athleteEvent)"/>
    </div>
    <div v-else-if="athleteEvent.hasStarted && !athleteEvent.hasFinished">
      <NameButtonStarted :athlete-event="athleteEvent"
                         @splitClickEvent="splitClick(athleteEvent)"
                         @undoClickEvent="undoAthleteEvent(athleteEvent)"/>
    </div>
    <div v-else>
      <NameButtonFinished :athlete-event="athleteEvent"
                          @undoClickEvent="undoAthleteEvent(athleteEvent)"/>
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
    splitClick: function () {
      this.$emit('splitClickEvent')
    },
    editClick: function () {
      this.$emit('editClickEvent')
    },
    undoAthleteEvent: function () {
      this.$emit('undoClickEvent')
    }
  }
}
</script>
