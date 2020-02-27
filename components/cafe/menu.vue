<template>
  <div>
    <div class="category-list cp-tb-margin">
      <div class="category-item" v-for="(cat, index) in menu" :class="{'active-category':  (index == activeCategory)}" 
       @click="changeActiveCategory(index)"  :key="cat.category.pk">{{cat.category.title}}</div>
    </div>

    <div class="product-list">
      <div v-for="prod in activeProducts" :key="prod.pk" class="product-item">
        {{prod.name}}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      menu: {
        default: () => {
          return []
        }
      }
    },
    data() {
      return {
        key: 'value',
        activeCategory: 0
      }
    },
    methods: {
      changeActiveCategory(x) {
        
      },
    },
    computed: {
      activeProducts() {
        if(this.menu.length > 0) return this.menu[this.activeCategory].products 
      },
    },
    mounted(){

    }
  }
</script>

<style scoped lang="sass">

</style>