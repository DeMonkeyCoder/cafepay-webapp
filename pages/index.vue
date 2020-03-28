<template>
  <div class="home-container">
    <section class="intro flex" :style="{backgroundImage: `url(${background})`}">
      <img class="logo" :src="logo" alt />
      <transition name="fade" mode="out-in">
        <div class="intro-state center-align" v-if="state === 'intro'" :key="1">
          <h1 class="t-xxlarge">
            کافه‌
            <span class="t-xxlarge t-lightblue">پِی</span>
          </h1>
          <h2 class>انتخاب کن، سفارش بده و به راحتی پرداخت کن</h2>
          <div class="action flex buttons are-medium">
            <!-- @click="state = 'login'" for ورود - ثبت نام -->
            <button class="btn is-danger button is-fullwidth" @click="state = 'login'">ورود - ثبت نام</button>
            <button @click="scrollllll" class="btn cp-btn-primary-inverted button is-fullwidth">درباره کافه‌پِی</button>
          </div>
        </div>

        <div class="login center-align" v-if="state === 'login'" :key="2">
          <h2 class>ورود یا ثبت نام</h2>
          <b-field class="field">
            <b-input
              v-model="phone_number"
              :disabled="cloading"
              placeholder="۰۹xxxxxxxxx"
              size="is-large"
            ></b-input>
          </b-field>
          <div class="action flex buttons are-medium">
            <b-button
              size="is-medium"
              :loading="cloading"
              class="send-code-btn btn is-info button is-fullwidth"
              @click="sendCode"
            >ارسال کد تایید</b-button>
            <button
              class="btn cp-btn-primary-inverted button is-fullwidth"
              @click="state = 'intro'"
            >بازگشت</button>
          </div>
        </div>

        <div class="enter-code center-align" v-if="state === 'enter-code'" :key="3">
          <h2 class>لطفا کد ارسال شده را وارد کنید</h2>
          <b-field class="field">
            <b-input inputmode="numeric"
              v-model="user_code"
              :disabled="cloading"
              placeholder="کد"
              size="is-large"
            ></b-input>
          </b-field>
          <!-- <div class="input-container">
            <input
              v-model="user_code"
              :disabled="cloading"
              maxlength="5"
              class="is-medium"
              custom-class="code-input"
            />
            <div class="input-masks">
              <div class="mask"></div>
              <div class="mask"></div>
              <div class="mask"></div>
              <div class="mask"></div>
              <div class="mask"></div>
            </div>
          </div> -->
          <div class="action flex buttons are-medium">
            <b-button
              size="is-medium"
              :loading="cloading"
              class="send-code-btn btn is-success button is-fullwidth"
              @click="checkCode"
            >ورود</b-button>
            <button
              class="btn is-success button is-inverted is-fullwidth"
              @click="state = 'login'"
            >بازگشت</button>
          </div>
        </div>
      </transition>
    </section>

    <section dir="rtl" id="about-us" class="about-us has-background-white cp-tb-padding-4x cp-side-padding-4x">
      <h1 class="header">کافه‌پِی چیه؟</h1>
      <p>کافه پی شیوه جدید پرداخت است که برای ا
        ولین بار در کافه و رستوران های ایران ا
        جرا شده است. تیم کافه پی در سال 1398 با رویکرد سهولت در پرداخت و ارتباط با مشتری شروع به کار کرد. با استفاده از پلتفرم کافه پی، کاربران می توانند با اسکن q
        r کد روی میز کافه و رستوران، منوی رستوران را مشاهده و سفارش خود را ثبت نمایند و در انتها سفارش های روی میز را مشاهده نموده و دونگ خود را پرداخت کنند. همچنین قا
        بلیت های متنوعی برای مدیران کافه و رستوران از جمله مدیریت ارتباط با مشتری در نظر گرفته شده است. تیم کافه پی امکانات متنوع دیگری از جمله قابلیت ثبت نظرات درباره کیفیت
         غذا و سرویس دهی و پیدا کردن کافه و رستوران های مناسب برای کاربران تدارک دیده و همواره در تلاش برای افزودن امکانات جدید و بهبود خدمات به مشتریان عزیز می باشد.</p>
    </section>

    <section dir="rtl" class="rules cp-tb-padding-4x cp-side-padding-4x">
      <h2 class="header">قوانین استفاده از کافه‌پِی</h2>
      <ul class="cp-side-padding">
      <li>کافه پی در چارچوب قوانین جمهوری اسلامی ایران فعالیت میکند و شما متعهد می شوید از هرگونه استفاده مغایر قانون از این برنامه خودداری کنید.</li>
     
      <li>امکان پرداخت توسط شما، منوط به اتصال به اینترنت و داشتن شماره کارت بانکی، رمز دوم، تاریخ انقضای کارت و ccv2 می‌باشد.</li>
     
      <li>جهت استفاده از این سرویس، شما باید شماره موبایل خود را وارد کنید تا کد فعالسازی برای شما ارسال شود. شما با استفاده از این سرویس می‌پذیرد که از موبایل خود استفاده می‌کنید.</li>
      
      <li>کد فعالسازی امکان استفاده از نرم افزار را 
        برای شما فراهم می‌آورد. به منظور جلوگیری از سوء استفاده اشخاص ثالث، از افشای آن خودداری کنید. در صورتی که کد فعالسازی در اختیار اشخاص دیگر قرار گیرد، مسئولیت آن بر عهده شما خواهد بود.</li>
     
      <li>شما هنگام تکمیل مراحل فعالسازی نرم افزار، اطلاعات کاربری خود را اعلام می‌نمایید. جهت استفاده از امکان دریافت پول باید شماره کارت بانکی یا شماره شبای خود را اعلام کنید. چنانچه شماره حساب شخص دی
        گری را به عنوان شماره حساب خود اعلام نمایید کافه پی مسئولیتی در این خصوص نداشته و درخواست واریز به حساب شما مسکوت می ماند. مسئولیت صحت اطلاعات وارد شده بر عهده شما است</li>
      
      <li>شماره تماس، نام و نام خانوادگی و تراکنش‌ها در کافه پی، کاملا جنبه محرمانه داشته و کافه پی به هیچ عنوان آنها 
        را در اختیار اشخاص ثالث قرار نخواهد داد. اعلام این اطلاعات، صرفا حسب دستور مقام قضایی و یا استعلام مراجع ذیصلاح، طی مکاتبات محرمانه انجام میگردد.</li>
      
      <li>لازم است هنگام معرفی حساب بانکی و همچنین انجام تراکنش، مشخصات به دقت بررسی نموده و از صحت مندرجات آن اطمینان حاصل کنید. مسئولیت پرداخت اشتباه ناشی از اعلام مشخصات نادرست بر عهده شما خواهد بود.
        کاربر متعهد می شود تنها نسخه اصلی و دستکاری نشده برنامه را از طریق وب سایت کافه پی و یا از فروشگاه‌ها
        ی و رسمی اندروید و اپل نصب کند. کافه پی مسوولیتی در قبال مشکلات ناشی از نسخه های متفرقه که از طریق منابع دیگر نصب می‌شود ندارد.</li>

      <li>چنانچه معرفی حساب بانکی و و یا تراکنش آن مشمول مقررات پولشویی، یا درآمد ناشی از ربا و یا هر وصف کیفری دیگری باشد، مسئولیت آن بر عهده کاربر و پرداخت کننده میباشد.</li>

      <li>پرداخت‌های کافه پی از طریق شبکه شاپرک انجام می‌شود. در این شبکه بازه تسویه، یک مرتبه در شبانه روز است. تمامی پرداخت‌های اینترنتی از طریق شبکه شاپرک انجام می‌شود. وقتی در کا
        فه پی پرداختی انجام می‌شود پول همان لحظه از حساب پرداخت کننده کسر می‌شود و به حساب شاپر
        ک منتقل می‌شود و شاپرک فردای آن روز با کافه پی تسویه می‌کند و کافه پی بلافاصله پول را به حساب دریافت کننده پول واریز می‌کند. این زمان در اختیار مجموعه کافه پی نیست.</li>

      <li>در صورتی که از کاربری شکایت شود و سواستفاده آن کاربر محرز شود، کافه پی آن حساب کاربری و مبالغ پرداخت شده را تا اعلام تصمیم مراجع ذیصلاح مسدود می‌نماید.</li>

      <li>اگر تا پیش از تسویه پول توسط کافه پی، پرداخت کننده شکایت کند و مستندات کافی ارائه کند، از تسویه پول جلوگیری خواهد شد.</li>
      </ul>


    </section>

    <section dir="rtl" class="contact-us has-background-white cp-tb-padding-4x cp-side-padding-4x">
      <h6 class="header font-20">اگر پیشنهاد یا انتقادی از کافه‌پِی دارید برای ما ارسال کنید</h6>
      <b-field grouped>
        <b-input expanded
          id="date-picker-input"
          v-model="form.name"
          class="cp-input cp-input-primary cp-input-grey cp-input-shadow"
          placeholder="نام و نام خانوادگی"
          icon="account"
        ></b-input>
        <b-input expanded
          id="date-picker-input"
          v-model="form.phone_number"
          class="cp-input cp-input-primary cp-input-grey cp-input-shadow"
          placeholder="شماره تماس"
          icon="cellphone"
        ></b-input>
      </b-field>
      <b-field>
        <b-input class="cp-input cp-input-primary cp-input-grey cp-input-shadow-inner"
         dir="rtl" v-model="form.comment" maxlength="200" type="textarea" placeholder="پیام خود را بنویسید"></b-input>
        </b-field>
        <div dir="ltr" class="buttons left-align">
        <b-button @click="sendForm" :loading="cloading" class="bcp-btn bcp-btn-large" type="is-info">ارسال پیام به کارشناسان</b-button>
        </div>
    </section>
    <section class="cp-tb-padding-4x cp-side-padding-2x center-align">
      <P>آدرس: شیراز میدان پارسه یقطین جنوبی کوچه ۲۱ ساختمان اپادانا واحد ۸ 
      - تلفن تماس: ۰۷۱۳۸۳۲۵۴۷۴</P>
      <p dir="rtl" class="font-14 font-norm">کلیه حقوق این سایت (کافه‌پِی) متعلق به هوشمندسازان ویرا آرین می‌باشد.</p>
 
    </section>
  </div>
</template>{

<script>
// import Logo from '~/components/Logo.vue'
import logo from '~/assets/img/shape/logo-transparent.png'
import background from '~/assets/img/background/320.png'

export default {
  data() {
    return {
      name: 'کافه پِی',
      logo,
      state: 'intro',
      phone_number: '',
      user_code: '',
      background,
      form: {
        name: null,
        phone_number: null,
        comment: null
      }
    }
  },
  methods: {
    entertoApp() {
      let userData = {
        first_name: 'علی',
        last_name: 'بیگی',
        phone_number: '09170540081',
        avatar: 'https://avatars0.githubusercontent.com/u/23187274?s=460&v=4',
        wallet: {
          amount: 78000,
          transactions: []
        }
      }
      this.$store.commit('user/set', userData)
      this.$router.push('/user/home')
    },
    sendCode() {
      this.cloading = true
      if (this.phone_number == '09170540081' || this.phone_number == 'enamad'){
        this.state = 'enter-code'
      }
      else this.toaster('شماره تلفن وارد شده معتبر نیست', 'is-danger')
      setTimeout(() => {
        this.cloading = false
      }, 1000);
      // this.$axios
      //   .post('https://cafepay.cloud/api/v1/user-profile/send-code/', {
      //     phone_number: this.phone_number
      //   })
      //   .then(res => {
      //     console.log('phone log', res)
      //     // this.state = 'enter-code'
      //     this.user_code = res.data.code
      //     this.checkCode()
      //   })
      //   .catch(err => {
      //     console.log(err)
      //     if (err.response) {
      //       if (
      //         err.response.data.phone_number[0] ===
      //         'This field may not be blank.'
      //       ) {
      //         this.toaster('شماره تلفن وارد شده معتبر نیست', 'is-danger')
      //       }
      //       if (
      //         err.response.data.phone_number[0] === 'Enter a valid phone number'
      //       ) {
      //         console.log(err.response.data)
      //         this.toaster('شماره تلفن وارد شده معتبر نیست', 'is-danger')
      //       }
      //     }
      //   })
    },
    checkCode() {
      this.cloading = true
      if (this.user_code == '12345' || this.user_code == '1qaz!QAZ'){
        this.entertoApp()
      }
      else this.toaster('کد وارد شده معتبر نیست', 'is-danger')
      setTimeout(() => {
        this.cloading = false
      }, 1000);
      // this.$axios
      //   .post('/api/v1/user-profile/verify-phone/', {
      //     phone_number: this.phone_number,
      //     code: this.user_code
      //   })
      //   .then(res => {
      //     console.log(res)
      //     this.$store.commit('setToken', res.data.token)
      //     this.$router.push('/user/home')
      //   })
      //   .catch(err => {
      //     if (err.response) {
      //       console.log(err.response.data)
      //     }
      //   })
    },
    scrollllll(){
      $('html, body').animate({scrollTop:$('#about-us').position().top});
    },
    sendForm(){
      this.cloading = true
      setTimeout(() => {
        this.toaster('پیام شما با برای کارشناسان ما ارسال شد', 'is-info', 'is-bottom')
        this.cloading = false
      }, 1500);
    }
  },
  mounted() {
    let h = window.innerHeight
    $('.intro').css({ 'min-height': h })
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/sass/variables.sass'
.field.is-grouped > .control:not(:last-child)
  margin-right: 0!important
  margin-left: 0.75rem!important

.rules
  li
    margin-bottom: 0.75rem
  li:before
    content: "\2022"
    color: $primary
    font-size: 24px
    font-weight: 700
    display: inline-block
    width: 0.75em
    position: relative
    top: 0.15em
    margin-right: -0.75em
  
.contact-us
  .bcp-btn
.header
  font-size: 26px
  font-weight: 500
  margin-bottom: 1.5rem
  text-align: center
.home-container
  position: absolute
  top: 0
  left: 0
  right: 0

.logo
  width: 300px   
.input-container
  position: relative
  input
    padding-left: 30px
    background: none
    border: none
    height: 50px
    font-size: 20px
    font-size: 1.429rem
    line-height: 1.1
    letter-spacing: 60px
    width: 350px
    color: white
    input:focus
      color: white!important
      border: none!important
      outline:none!important
      box-shadow:none!important 
  .input-masks
    display: flex
    -webkit-box-pack: justify
    -ms-flex-pack: justify
    justify-content: space-between
    -webkit-box-align: end
    -ms-flex-align: end
    align-items: flex-end
    bottom: 8px
    .mask
      height: 2px
      width: 43px
      background-color: #c8c8c8
      border-radius: 3px




.intro
  background-size: cover
  justify-content: center
  align-items: center
  flex-direction: column
  h2
    margin-top: 15px

.action
  // flex-direction: column
  justify-content: center
  align-items: center
  margin-top: 30px
  button
    margin: 0 10px
    flex: 1

.fade-enter-active, .fade-leave-active 
  transition: all .5s
  // transform: translateX(-100px)

.fade-enter, .fade-leave-to
  transition: all .5s
  transform: translateX(-100px)
  opacity: 0
.login
  .field
    margin-top: 15px
    margin-bottom: 30px!important
    display: flex
    justify-content: space-between
    .control
      flex: 2
  
.code-input, .code-input::placeholder
  background: transparent
  border-style: none
  color: white
  width: 3rem
  text-align: center
    
.control
  text-align: center
  small
    display: none!important

</style>
