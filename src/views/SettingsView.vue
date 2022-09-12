<template>
  <div>
    <br>
    <h1>Global settings</h1><br>

    <h3>Required</h3><br>
    SPLIT <select>
    <option value="1">25</option>
    <option value="1">50</option>
    <option value="1">100</option>
  </select> meters<br><br>

    <h3>Optional</h3><br>
    HEAT INTERVAL <input type=number> seconds<br><br>
    NUMBER OF LANES <input type=number><br><br>
    NUMBER OF HEATS <input type=number><br><br>
    NUMBER OF ATHLETES <input type=number><br><br>
    DISTANCE <input type=number> meters<br><br>
    STYLE <select>
    <option value="1">Freestyle</option>
    <option value="1">Butterfly</option>
    <option value="1">...</option>
  </select><br><br>
    <router-link to="/menu" style="margin: 25px" class="btn btn-outline-light" tag="button">Back to Menu</router-link>
    <button type="button" style="margin: 25px" class="btn btn-dark">Create</button>


  </div>
</template>

<script>
export default {
  name: "SettingsView"
}
</script>

<style scoped>

</style>