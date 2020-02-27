import Vue from 'vue'

Vue.mixin({
    computed: {
        cloading (){
            return this.$store.state.loading
        },
        activeCafeFlag(){
          return this.$store.state.activeCafeFlag
        }
    },
    methods: {
        toaster (massage, type) {
            this.$buefy.toast.open({
                duration: 5000,
                message: massage,
                position: 'is-bottom',
                type: type
            })
        }
    }
})