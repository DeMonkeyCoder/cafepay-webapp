<template>
      <div class="cp-side-padding cp-tb-padding"> 
      <div class="cp-card cp-side-padding cp-tb-padding short-shadow">
        <div class="feature-icon">
          <slot></slot>
        </div>
      <p class="feature-title">{{feature.title}}</p>
      <p class="feature-rate">{{feature.rate}}</p>
      <p dir="rtl" class="feature-rate-count">{{feature.count | currency}}<span class="font-12">رای</span></p>
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