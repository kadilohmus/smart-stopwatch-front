<template>
  <div class="row">
    <div v-if="!athleteEvent.hasStarted && !athleteEvent.hasFinished">
      <NameButtonInitial :athlete-event="athleteEvent"/>
    </div>
    <div v-else-if="athleteEvent.hasStarted && !athleteEvent.hasFinished">
      <NameButtonStarted :athlete-event="athleteEvent"
                         @splitClickEvent="splitClick"
                         @undoClickEvent="undoClick"
      />
    </div>
    <div v-else>
      <NameButtonFinished :athlete-event="athleteEvent"
                          @undoClickEvent="undoClick"/>
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
    undoClick: function () {
      this.$emit('undoClickEvent')
    }
  }
}
</script>
