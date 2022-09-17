<template>
  <div class="row">
    <div v-if="!athleteEvent.hasStarted && !athleteEvent.hasFinished">
      <NameButtonInitial :athlete-event="athleteEvent"
                         @splitClickEvent="splitClick"
                         @editClickEvent="editAthleteEvent"/>
    </div>
    <div v-else-if="athleteEvent.hasStarted && !athleteEvent.hasFinished">
      <NameButtonStarted :athlete-event="athleteEvent"
                         @splitClickEvent="splitClick"
                         @undoClickEvent="undoAthleteEvent"/>
    </div>
    <div v-else>
      <NameButtonFinished :athlete-event="athleteEvent"
                          @undoClickEvent="undoAthleteEvent"/>
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
    editAthleteEvent: function () {
      this.$emit('editClickEvent')
    },
    undoAthleteEvent: function () {
      this.$emit('undoClickEvent')
    }
  }
}
</script>
