<template>
  <div class="container">
    <b-modal :active.sync="isComponentModalActive" has-modal-card full-screen :can-cancel="false">
      <div class="modal-card" style="width: auto">
        <!-- <header class="modal-card-head">
                  <p class="modal-card-title">وارد کردن کد میز</p>
        </header>-->
        <section class="modal-card-body">
          <!-- <img src="@/assets/img/shape/icons/chair.png" alt=""> -->
          <b-field>
            <b-input
              class="cp-input cp-input-primary cp-input-grey cp-input-shadow"
              type="code"
              v-model="tableCode"
              icon="numeric"
              inputmode="numeric"
              placeholder="کد میز را وارد کنید"
            ></b-input>
          </b-field>
          <div class="buttons">
            <b-button
              :loading="globalLoading"
              @click="sendCode"
              class="checkCode-btn bcp-btn bcp-btn-large"
              expanded
              type="is-info"
            >ورود به میز</b-button>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button" type="button" @click="closeModal">بستن پنجره</button>
        </footer>
      </div>
    </b-modal>

    <div class="camera">
      <b-button @click="openCodeModal" class="enter-code-btn" type="is-info">وارد کردن کد میز</b-button>
    </div>

    <div class="landing white">
      <div id="user-img">
        <img :src="user.avatar" alt />
      </div>

      <h1 class="t-large">{{user.full_name}}</h1>
      <h4>
        موجودی:‌
        <span>{{user.wallet_amount | currency}} تومان</span>
      </h4>
      <div class="columns shortcut-btns is-mobile is-3-mobile">
        <div class="column">
          <nuxt-link to="/user/profile/wallet">
            <div id="charge-wallet-icon" class="has-background-white">
              <img :src="walletIcon" alt class="icon" />
              <p>افزایش موجودی</p>
            </div>
          </nuxt-link>
        </div>
        <div class="column">
          <!-- <nuxt-link to="/user/profile/wallet"> -->
          <div
            @click="sendCode"
            id="my-cafe-icon"
            class="has-background-white ripple-effect"
            anim="ripple"
          >
            <img :src="myCafe" alt class="icon" />
            <p>کافه‌های من</p>
          </div>
          <!-- </nuxt-link> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import userImg from '~/assets/img/user.jpg'
import walletIcon from '~/assets/img/shape/icons/wallet.png'
import myCafe from '~/assets/img/shape/icons/my-cafe-2.svg'
import Vue from 'vue'

export default {
  data() {
    return {
      userImg,
      walletIcon,
      myCafe,
      isComponentModalActive: false,
      tableCode: '846233316753'
    }
  },
  methods: {
    closeModal() {
      this.isComponentModalActive = false
    },
    openCodeModal() {
      this.isComponentModalActive = true
    },
    sendCode() {
      // u need to set the table too, for api link

      this.$axios
        .get('api/v1/table-token/' + this.tableCode + '/cafe-info/', {
          params: {},
          headers: { Authorization: 'Token ' + this.token }
        })
        .then(res => {
          // sets pk, avatar, name and table id
          this.$store.commit('cafe/setBasic', res.data.cafe)
          // execute the action for getting menu, detailed info, comments and posts
          this.$store.dispatch('cafe/retrieveMenu')
          this.$store.commit('setActiveTable', true)
          this.$store.commit('table/newPerson', this.user)
          res.data.table['token'] = res.data.token
          this.$store.commit('table/setToken', res.data.table)
          // connect to socket
          Vue.prototype.$connect()
          // attach token to table
          this.$store.commit('changeNavigation', 'currentCafe')
          this.isComponentModalActive = false
        })
        .catch(err => {
          if (err.response) {
            this.$buefy.toast.open({
              duration: 3000,
              message: `کد وارد شده نادرست است ${err.response.data}`,
              position: 'is-top',
              type: 'is-danger'
            })
          }
        })
    }
  },
  computed: {
    user() {
      return this.$store.state.user.user
    }
  },
  watch: {},
  mounted() {}
}
</script>

<style scoped lang="sass">
@import '~/assets/sass/variables.sass'




</style>