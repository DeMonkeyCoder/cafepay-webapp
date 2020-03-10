import Vue from 'vue'

Vue.mixin({
    computed: {
        cloading (){
            return this.$store.state.loading
        },
        hasActiveTable(){
          return this.$store.state.hasActiveTable
        },
        token() {
          return this.$store.state.token
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