<template>
      <div class="cp-side-padding cp-tb-padding" 
     > 
      <div class="cp-card cp-side-padding cp-tb-padding long-shadow">
        <div class="feature-icon">
          <slot></slot>
        </div>
        
      <p class="feature-rate">{{feature.rate}}</p>
      <p class="feature-rate-count">{{feature.count}}</p>
      </div>

    </div>
</template>

<script>
  export default {
    props: {
 
      feature: {
        default: {}
      },

    },
  }
</script>

<style scoped>

</style>