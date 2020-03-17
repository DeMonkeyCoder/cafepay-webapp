import Vue from 'vue'

Vue.mixin({
    data() {
      return {
        cloading: false
      }
    },
    computed: {
        // cloading (){
        //     return this.$store.state.loading
        // },
        hasActiveTable(){
          return this.$store.state.hasActiveTable
        },
        token() {
          return this.$store.state.token
        }
    },
    methods: {
        toaster (massage, type , position) {
            this.$buefy.toast.open({
                duration: 3000,
                message: massage,
                position,
                type: type
            })
        }
    }
})