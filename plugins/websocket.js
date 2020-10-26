import Vue from 'vue'
import VueNativeSock from "vue-native-websocket";
import baseUrl from '~/plugins/baseUrl.js'

export default function ({
  store,
}) {
Vue.use(VueNativeSock, baseUrl.socketUrl, {
  connectManually: true,
  store: store, // connect to store
  reconnection: true, // (Boolean) whether to reconnect automatically (false)
  reconnectionAttempts: 5, // (Number) number of reconnection attempts before giving up (Infinity),
  reconnectionDelay: 3000 // (Number) how long to initially wait before attempting a new (1000)
});
}