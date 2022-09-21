<template>
  <div>
    <div v-if="">
      <FindAthleteByNameForm title="Find Athlete" @athleteResultSuccess="updateAthleteFromResult"/>
      <!-- LEITUD atleedid-->
      <div v-if="athletes.length > 0">
        <AthleteTable :athletes="athletes" title="Athletes"/>
      </div>
    </div>
  </div>
</template>

<script>
import FindAthleteByNameForm from "@/components/athlete/FindAthleteByNameForm";
import AthleteTable from "@/components/athlete/AthleteTable";

export default {
  name: "SearchView",
  components: {AthleteTable, FindAthleteByNameForm},
  data: function () {
    return {
      name: '',
      athlete: {},
      athletes: []
    }
  },
  methods: {
    updateAthleteFromResult: function (athleteResult) {
      this.athletes = athleteResult
    }
  }
}
</script>

<style scoped>

</style>
