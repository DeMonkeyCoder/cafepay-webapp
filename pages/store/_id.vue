<template>
  <div>
  </div>
</template>

<script>
  export default {
    middleware({params, redirect}){
      console.log('prarams', params, redirect);
      redirect(`/user/home/?token=${params.id}`)
    }
  }
</script>

<style scoped>

</style>