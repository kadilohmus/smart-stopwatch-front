<template>
  <div>
    <div>
      <FindAthleteByNameForm @athleteResultSuccess="updateAthleteFromResult"/>
      <div v-if="athlete.athleteName.length > 0">
        <AthleteTable title="Found" :athlete="athlete"/>
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
      athlete: {
        athleteId: 0,
        athleteName: ''
      }
    }
  },
  methods: {
    updateAthleteFromResult: function (athleteResult) {
      this.athlete = athleteResult
    }
  }
}
</script>