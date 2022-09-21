<template>
  <div>
    <button type="button" style="margin: 5px" class="btn btn-success btn-lg name-button-started" v-on:click="splitClick">

      <span>{{ athleteEvent.athleteName }}</span>
      <br>
      <span>{{ athleteEvent.lastSplitTime }}</span>
    </button>
    <font-awesome-icon icon="fa-solid fa-arrow-rotate-left" v-on:click="undoClick"/>
  </div>
</template>
<script>
export default {
  name: 'NameButtonStarted',
  props: {
    athleteEvent: {}
  },
  methods: {
    splitClick: function () {
      this.$http.post("/stopper/split", null, {
        params: {
          athleteEventId: this.athleteEvent.athleteEventId
        }
          }
      ).then(response => {
        this.$emit('splitClickEvent')
      }).catch(error => {
        console.log(error)
      })
    },
    undoClick: function () {
      this.$http.patch("/stopper/undo",null, {
            params: {
              athleteEventId: this.athleteEvent.athleteEventId
            }
          }
      ).then(response => {
        this.$emit('undoClickEvent')
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>