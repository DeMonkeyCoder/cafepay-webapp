<template>
  <div>
  </div>
</template>

<script>
  export default {
    middleware({params, redirect, store}){
      console.log('prarams', params, redirect);
      store.commit('cafe/changeStoreRedirect', true)
      redirect(`/user/home/?token=${params.id}`)

    }
  }
</script>

<style scoped>

</style>