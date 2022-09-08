<template>
  <div v-if="successMessage.length > 0" class="alert alert-success" role="alert">
    {{successMessage}}
  </div>
</template>
<script>
export default {
  name: 'AlertSuccess',
  props: {
    successMessage: ''
  }
}
</script>
