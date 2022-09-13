<template>
  <div>
    <div>
      <br>
      <h1>Global settings</h1><br>
    </div>
    <div style="color: black; float: left; margin-left: 100px">
      <h4>Required</h4><br>
      SPLIT <select>
      <option value="1">25</option>
      <option value="1">50</option>
      <option value="1">100</option>
    </select> meters<br><br>
      <h4 style="color: black">Optional</h4><br>
      HEAT INTERVAL <input type=number style="margin: 10px"> seconds<br>
      NUMBER OF LANES <input type=number style="margin: 10px"><br>
      NUMBER OF HEATS <input type=number style="margin: 10px"><br>
      NUMBER OF ATHLETES <input type=number style="margin: 10px"><br>
      DISTANCE <input type=number style="margin: 10px"> meters<br>
      STYLE <select>
      <option value="1">Freestyle</option>
      <option value="1">Butterfly</option>
      <option value="1">...</option>
    </select><br><br>
    </div>
    <div style="float:right ">
      <button type="button" style="margin: 50px; width: 150px; height: 150px" class="btn btn-dark">Create</button>
      <router-link to="/menu" style="margin-left: 50px;margin-right: 100px; width: 150px; height: 150px"
                   class="btn btn-outline-light" tag="button">Back to Menu
      </router-link>
    </div>

  </div>
</template>

<script>
export default {
  name: "SettingsView",
  data: function () {
    return {
      userId: sessionStorage.getItem('userId')
    }
  }
}
</script>

<style scoped>

</style>