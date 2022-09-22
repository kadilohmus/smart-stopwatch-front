<template>
  <div>
    <br><br><h1>{{athleteName}}</h1><br><br>
    <p>Choose stroke:</p>
    <StrokeTable/>
    <br><router-link to="/search" style="margin: 25px" class="btn btn-outline-light" tag="button">Back to Search
    </router-link>
  </div>
</template>

<script>
import StrokeTable from "@/components/athlete/StrokeTable";
export default {
  name: "AthleteView",
  components: {StrokeTable},
  data: function () {
    return {
      athleteName: String(this.$route.query.athleteName),
      athleteId: String(this.$route.query.athleteId)
    }
  }
}
</script>