import Vue from 'vue'

Vue.mixin({
    computed: {
        cloading (){
            return this.$store.state.loading
        }
    }
})