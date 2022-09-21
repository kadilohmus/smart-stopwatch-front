<template>
  <div>
    <div v-if="divDisplayFindAthletes">
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
      divDisplayFindAthletes: true,
      divDisplayAthletesTable: true,
      name: '',
      athlete: {},
      athletes: []
    }
  },
  methods: {
    updateAthleteFromResult: function (athleteResult) {
      this.athletes = athleteResult
    },
    displayFindAthletes: function () {
      this.athletes = []
      this.divDisplayFindAthletes = true
    }
  }
}
</script>

<style scoped>

</style>
