<template>
  <div class="container">
     <b-modal :active.sync="isComponentModalActive"
            has-modal-card full-screen :can-cancel="false">
            <div class="modal-card" style="width: auto">
              <header class="modal-card-head">
                  <p class="modal-card-title">وارد کردن کد میز</p>
              </header>
              <section class="modal-card-body">
                  <b-field >
                      <b-input
                        type="code"
                        v-model="tableCode"
                        placeholder="کد میز را وارد کنید"
                        required>
                      </b-input>
                  </b-field>
            <div class="buttons">
              <b-button :loading="cloading" @click="sendCode" class="checkCode-btn" expanded type="is-info">ورود به میز</b-button>
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
      <img class="user-img" :src="user.avatar" alt="">
      <h1 class="t-large">{{user.full_name}}</h1>
      <h4>موجودی:‌<span>{{user.wallet_amount | currency}} تومان</span></h4>
      <div class="columns shortcut-btns is-mobile is-3-mobile">
        <div class="column ">
           <div class="has-background-white">
            <img :src="walletIcon" alt="" class="icon">
            <p>شارژ کیف پول</p>
          </div>
        </div>
        <div class="column">
          <div class="has-background-white">
            <img :src="walletIcon" alt="" class="icon">
            <p>شارژ کیف پول</p>
          </div>
        </div>

    </div>
    </div>
  </div>
</template>

<script>
import userImg from '~/assets/img//user.jpg'
import walletIcon from '~/assets/img//shape/icons/wallet.png'
  export default {
    data() {
      return {
        userImg,walletIcon,
        isComponentModalActive: false,
        tableCode: null
      }
    },
    methods: {
      closeModal(){
        this.isComponentModalActive = false
      },
      openCodeModal() {
        this.isComponentModalActive = true
      },
      sendCode(){

        let Cafe = {
          name: 'کافه هدایت',
          avatar: 'https://icoff.ee/cafe/wp-content/uploads/2014/10/6.-Hedayat-Cafe-Restaurant-%DA%A9%D8%A7%D9%81%D9%87-%D8%B1%D8%B3%D8%AA%D9%88%D8%B2%D8%A7%D9%86-%D9%87%D8%AF%D8%A7%DB%8C%D8%AA.jpg',
          rate: 4.4,
          table: 2,
          review: {

          },
          info: {

          },
          posts: {

          },
          products_by_category: [
            {
              name: 'پیتزاها',
              products: [
                {
                  rate: 4.2,
                  name: 'پیتزا پپرونی',
                  description: 'پیتزاست دیگه',
                  avatar: 'https://lh4.googleusercontent.com/proxy/ubZ6IWAy3eySrWktztEcMuvQmNQtuX_3jOze62Lscr5fXQaY_Ts4tH6r9ViqEm5ODiGZA58H4DUbD14SZ4Xqx1j2qwVjPUuN9bO5TEpOLrkctK5SCCoMx_CbIOTvB7TVaQNGhdrmXDVnRLER5F79Kna1OfgPV1htN_8Oq31hphmv9PRJnpk',
                  original_price: 38000,
                  discount: 0,
                  price: 38000
                },
                {
                  rate: 4.1,
                  name: 'پیتزا قارچ و گوشت',
                  description: 'پیتزاست دیگه',
                  avatar: 'https://freehotpizza.com/wp-content/uploads/2019/04/frame-square-01.jpg',
                  original_price: 45000,
                  discount: 0,
                  price: 45000
                },
                {
                  rate: 4.3,
                  name: 'پیتزا مخصوص',
                  description: 'پیتزاست دیگه',
                  avatar: 'https://media-cdn.tripadvisor.com/media/photo-s/0c/ac/c1/b8/tandoori-chicken-chorizo.jpg',
                  original_price: 49000,
                  discount: 0,
                  price: 49000
                },

                {
                  rate: 4.1,
                  name: 'ساندویچ هات داگ پنیری',
                  description: 'پیتزاست دیگه',
                  avatar: 'https://media-cdn.tripadvisor.com/media/photo-s/0c/ac/c1/b8/tandoori-chicken-chorizo.jpg',
                  original_price: 65000,
                  discount: 0,
                  price: 65000
                },
         
              ]
            },
            {
              name: 'برگرها',
              products: [
                {
                  rate: 3.9,
                  name: 'بیگ برگر',
                  description: '۲۴۰ گرم گوشت گوساله',
                  avatar: 'https://youngwomenshealth.org/wp-content/uploads/2014/02/fast-food.jpg',
                  original_price: 35000,
                  discount: 0,
                  price: 35000
                },
                {
                  rate: 3.6,
                  name: 'چیلی برگر',
                  description: 'همبرگر است دیگه',
                  avatar: 'https://images2.minutemediacdn.com/image/upload/c_crop,h_1126,w_2000,x_0,y_181/f_auto,q_auto,w_1100/v1554932288/shape/mentalfloss/12531-istock-637790866.jpg',
                  original_price: 29000,
                  discount: 0,
                  price: 29000
                },
         
              ]
            },
            {
              name: 'پاستاها',
              products: [
                {
                  rate: 4.3,
                  name: 'پاستا آلفردو',
                  description: '۲۴۰ گرم گوشت گوساله',
                  avatar: 'https://www.jessicagavin.com/wp-content/uploads/2019/08/chicken-alfredo-8-1200.jpg',
                  original_price: 27000,
                  discount: 0,
                  price: 27000
                }
         
              ]
            }
          ]
            
          
        }
        // u need to set the table too, for api link
        this.$store.commit('cafe/set', Cafe)
        

        // this.$axios.get('api/v1/table-token/' + this.tableCode + '/cafe-info/',
        // { params: {}, headers: { 'Authorization': 'Token ' + this.token } })
        // .then(res => {

        //   this.$store.commit('setActiveTable', {id: res.data.table})
          this.$store.commit('setActiveTable', true)
          this.$store.commit('changeNavigation', 'currentCafe')
          this.$store.commit('table/newPerson', {id: 1, name: this.user.full_name, avatar: this.user.avatar, orders: []})
          this.isComponentModalActive = false

        // }).catch(err =>{
        //   if (err.response){
        //     console.log(err.response.data)
        //   }
        // })
      }
    },
    computed: {
      user() {
        return this.$store.state.user.user 
      },
    },
  }
</script>

<style scoped lang="sass">
@import '~/assets/sass/variables.sass'

.shortcut-btns
  margin-right: 0!important
  margin-left: 0!important

.camera
  position: relative
  width: 100%
  background-color: grey
  height: 300px
  .enter-code-btn
    position: absolute
    right: 10px
    bottom: 10px

.checkCode-btn
  width: 100%

.landing
  margin-top: 20px
  text-align: center
  .user-img
    width: 75px
    height: 75px
    object-fit: cover
    border-radius: 40px
    border: 3px solid $primary

  .shortcut-btns
    padding: 10px 15px
    text-align: right
    .has-background-white
      border-radius: 5px
      padding: 10px 15px
      box-shadow: 0px 5px 10px rgba(0,0 ,0 ,0.09 )
    p
      font-size: 10px
    img
      width: 30px


@media (min-width: 992px)
  .camera
    // display: none


</style>