<template>
  <div v-if="warningMessage.length > 0" class="alert alert-warning" role="alert">
    {{warningMessage}}
  </div>
</template>
<script>
export default {
  name: 'AlertWarning',
  props: {
    warningMessage: ''
  }
}
</script>
