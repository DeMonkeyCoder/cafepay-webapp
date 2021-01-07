<template>
  <div class="home-container">
    <section
      class="intro cp-side-padding flex"
      :style="{
        backgroundImage: mobile ? `url(${mobilebc})` : `url(${background})`
      }"
    >
      <img class="logo" :src="logo" alt />
      <h3 class="has-text-white-bis t-medium">
        انتخاب کن، سفارش بده و به راحتی پرداخت کن
      </h3>
      
        <b-button
          @click="$router.push('/user/home')"
          class="go-to-user bcp-btn bcp-btn-large"
          expanded
          type="is-info"
          >ورود به کافه‌پِی</b-button
        >
      
      <!-- <transition name="fade" mode="out-in">
        <div class="intro-state center-align" v-if="state === 'intro'" :key="1">
       

          <div class="action flex buttons are-medium">
          
            <button
              class="btn cp-btn-primary button is-fullwidth"
              @click="changeState('login')"
            >
              ورود به کافه‌پِی
            </button>
           
            <button
              @click="scrollllll"
              class="btn is-light button is-fullwidth"
            >
              درباره کافه‌پِی
            </button>
          </div>
        </div>

        <div
          class="login cp-tb-margin center-align"
          v-if="state === 'login'"
          :key="2"
        >
          <h2 class="has-text-white-bis font-bold">ورود</h2>
          <b-field>
            <b-input
              inputmode="numeric"
              class="cp-input cp-input-primary cp-input-grey"
              message="You can have a message too"
              maxlength="11"
              v-model="phone_number"
              :disabled="globalLoading"
              placeholder="۰۹xxxxxxxxx"
              size="is-medium"
            ></b-input>
          </b-field>
          <div class="action flex buttons are-medium">
            <b-button
              size="is-medium"
              :loading="globalLoading"
              class="send-code-btn forward ml-zero btn is-info button is-fullwidth"
              @click="sendCode"
              >ارسال کد تایید</b-button
            >
            <b-button
              type="is-light"
              class="back"
              rounded
              icon-right="chevron-right"
              @click="state = 'intro'"
            />
          </div>
        </div>

        <div
          class="enter-code cp-tb-margin center-align"
          v-if="state === 'enter-code'"
          :key="3"
        >
          <h2 class="has-text-white-bis font-bold">
            لطفا کد ارسال شده را وارد کنید
          </h2>
          <b-field class="field">
            <b-input
              inputmode="numeric"
              class="cp-input cp-input-primary cp-input-grey"
              maxlength="5"
              v-model="user_code"
              :disabled="globalLoading"
              placeholder="12345"
              size="is-medium"
            ></b-input>
          </b-field>

          <div class="action flex buttons are-medium">
            <b-button
              size="is-medium"
              :loading="globalLoading"
              class="send-code-btn forward ml-zero btn is-info button is-fullwidth"
              @click="checkCode"
              >تایید کد</b-button
            >
            <b-button
              type="is-light"
              class="back"
              rounded
              icon-right="chevron-right"
              @click="state = 'login'"
            />
          </div>
        </div>

        <div
          class="signup cp-tb-margin center-align"
          v-if="state === 'signup'"
          :key="4"
        >
          <h5 class="has-text-white-bis font-bold">
            جهت تکمیل ثبت نام و ورود به برنامه نام و نام‌خانوادگی خود را وارد
            کنید
          </h5>

          <b-field>
            <b-input
              :dir="$dir()"
              v-model="first_name"
              class="cp-input cp-input-primary cp-input-grey"
              placeholder="نام"
              size="is-medium"
            ></b-input>
          </b-field>

          <b-field>
            <b-input
              :dir="$dir()"
              v-model="last_name"
              class="cp-input cp-input-primary cp-input-grey"
              placeholder="نام خانوادگی"
              size="is-medium"
            ></b-input>
          </b-field>

          <div class="action cp-t-margin flex buttons are-medium">
            <b-button
              size="is-medium"
              :disabled="!fullnameEntered"
              :loading="globalLoading"
              class="send-code-btn forward ml-zero btn is-info button is-fullwidth"
              @click="signup"
              >ثبت اطلاعات</b-button
            >
            <b-button
              type="is-light"
              class="back"
              rounded
              icon-right="chevron-right"
              @click="state = 'login'"
            />
          </div>
        </div>
      </transition> -->
    </section>

    <section
      :dir="$dir()"
      id="about-us"
      class="about-us has-background-white cp-tb-padding-4x cp-side-padding-4x"
    >
      <h1 class="header">کافه‌پِی چیست؟</h1>
      <p>
        کافه پی یک سیستم یکپارچه فروش، حسابداری و مدیریت ارتباط با مشتری در حوزه
        خدمات کافه، رستوران و فست فود مبتنی بر کلود است. علاوه بر خدمات هوشمند و
        متنوعی که کافه پی برای صاحبان کسب کار دارد، خدمتی نوین در راستای سهولت
        در ثبت سفارش و تسویه صورت حساب به مشتریان ارایه می دهد.
      </p>
      <!-- <h1 class="header-second">سیستم فروش</h1>
      <p>سیستم فروش، پر استفاده ترین قسمت نرم افزار می باشد که روزانه به دفعات توسط سالن دار ها، صندوق دار ها و صاحبان کسب کار استفاده می شود. با توجه به این امر، سعی شده سیستم فروش به گونه این طراحی شود که بدون نیاز به آموزش، به راحتی برای هر گروه افراد قابل استفاده باشد.</p>
      <h1 class="header-second">سیستم حسابداری</h1>
      <p>تمامی داده های فروش، به صورت خودکار در سیستم حسابداری کافه پی ثبت و نگهداری می شود. از جمله امکانات این قسمت، دریافت انواع گزارش های حسابداری مرتبط با فروش است. این گزارش های می تواند به صورت تجمعی یا ریز تهیه شود. امکان اعمال انواع فیلتر مانند، بازه زمانی، مشتری خاص، دسته محصول خاص و ... در سیستم در نظر گرفته شده.</p>
      <h1 class="header-second">مدیریت ارتباط با مشتری</h1>
      <p>یکی از خدمات نوینی که کافه پی ارایه می دهد، سیستم ثبت سفارش توسط مشتری است. با توجه به سیستمی شدن ثبت سفارش افراد، اطلاعات دقیقی از رفتار مشتریان به صورت کاملا خودکار به دست می آید. از جمله، تعداد دفعات مراجعه افراد، سفارش های پیشین، نظرات و امتیازات قبلی افراد، غذای مورد علاقه و سلیقه هر یک از مشتریان. با استفاده از این اطلاعات، صاحبان کسب کار می توانند، آفر ها و تخفیف های شخصی سازی شده به مشتریان خود ارایه کنند و با پلتفرمی که در اختیار دارند مشتریان خود را از این آفر ها و تخفیفات مطلع کنند.</p>
      <h1 class="header-second">سیستم ثبت سفارش توسط مشتری</h1>
      <p>روی هر یک از میزهای کافه/رستوران، یک QR در نظر گرفته می شود، که با اسکن کردن آن از طریق اپ کافه پی، به صفحه منو کافه/رستوران منتقل می شوند، کاربران پس از انتخاب، می توانند به صورت آنلاین سفارش خود را ثبت و صورت حساب را آنلاین پرداخت کنند.</p> -->
    </section>

    <section
      :dir="$dir()"
      id="how-to-use"
      class="cp-tb-padding-4x cp-side-padding-4x"
    >
      <h1 class="header">راهنمای سفارش‌دهی و پرداخت</h1>

      <div class="how-to-use-steps columns">
        <div class="htus-container column is-6">
          <div class="htus has-background-white normal-radius long-shadow">
            <div class="htus-num">
              <p class="primary">۱</p>
            </div>
            <div class="htus-content">
              روی دکمه
              <span class="htus-btn font-norm p-text">ورود - ثبت نام</span> کلیک
              کن، شماره همراهت وارد و تجربه کافه پی رو شروع کن
            </div>
          </div>
        </div>
        <div class="htus-container column is-6">
          <div class="htus has-background-white normal-radius long-shadow">
            <div class="htus-num">
              <p class="secondary">۲</p>
            </div>
            <div class="htus-content">
              بارکد روی میز رو اسکن یا روی دکمه
              <span class="htus-btn font-norm s-text">وارد کردن کد میز</span> کد
              کلیک کن و کد مربوط به میز رو وارد کن
            </div>
          </div>
        </div>
      </div>
      <div class="how-to-use-steps columns">
        <div class="htus-container column is-6">
          <div class="htus has-background-white normal-radius long-shadow">
            <div class="htus-num">
              <p class="purple">۳</p>
            </div>
            <div class="htus-content">
              غذایی که میخوای رو از منو انتخاب کن و پرداختت رو همونجا آنلاین
              انجام بده.
            </div>
          </div>
        </div>
        <div class="htus-container column is-6">
          <div class="htus has-background-white normal-radius long-shadow">
            <div class="htus-num">
              <p class="green">۴</p>
            </div>
            <div class="htus-content">
              بعد از اتمام غذا میتونی نظرت رو راجع به غذا و کافه یا رستورانی که
              توش بودی بدی
            </div>
          </div>
        </div>
      </div>
    </section>

    <section
      :dir="$dir()"
      class="rules cp-tb-padding-4x cp-side-padding-4x has-background-white"
    >
      <h2 class="header">قوانین استفاده از کافه‌پِی</h2>
      <ul class="cp-side-padding">
        <li>
          کافه پی در چارچوب قوانین جمهوری اسلامی ایران فعالیت میکند و شما متعهد
          می شوید از هرگونه استفاده مغایر قانون از این برنامه خودداری کنید.
        </li>

        <li>
          امکان پرداخت توسط شما، منوط به اتصال به اینترنت و داشتن شماره کارت
          بانکی، رمز دوم، تاریخ انقضای کارت و ccv2 می‌باشد.
        </li>

        <li>
          جهت استفاده از این سرویس، شما باید شماره موبایل خود را وارد کنید تا کد
          فعالسازی برای شما ارسال شود. شما با استفاده از این سرویس می‌پذیرد که
          از موبایل خود استفاده می‌کنید.
        </li>

        <li>
          کد فعالسازی امکان استفاده از نرم افزار را برای شما فراهم می‌آورد. به
          منظور جلوگیری از سوء استفاده اشخاص ثالث، از افشای آن خودداری کنید. در
          صورتی که کد فعالسازی در اختیار اشخاص دیگر قرار گیرد، مسئولیت آن بر
          عهده شما خواهد بود.
        </li>

        <li>
          شما هنگام تکمیل مراحل فعالسازی نرم افزار، اطلاعات کاربری خود را اعلام
          می‌نمایید. جهت استفاده از امکان دریافت پول باید شماره کارت بانکی یا
          شماره شبای خود را اعلام کنید. چنانچه شماره حساب شخص دی گری را به عنوان
          شماره حساب خود اعلام نمایید کافه پی مسئولیتی در این خصوص نداشته و
          درخواست واریز به حساب شما مسکوت می ماند. مسئولیت صحت اطلاعات وارد شده
          بر عهده شما است
        </li>

        <li>
          شماره تماس، نام و نام خانوادگی و تراکنش‌ها در کافه پی، کاملا جنبه
          محرمانه داشته و کافه پی به هیچ عنوان آنها را در اختیار اشخاص ثالث قرار
          نخواهد داد. اعلام این اطلاعات، صرفا حسب دستور مقام قضایی و یا استعلام
          مراجع ذیصلاح، طی مکاتبات محرمانه انجام میگردد.
        </li>

        <li>
          لازم است هنگام معرفی حساب بانکی و همچنین انجام تراکنش، مشخصات به دقت
          بررسی نموده و از صحت مندرجات آن اطمینان حاصل کنید. مسئولیت پرداخت
          اشتباه ناشی از اعلام مشخصات نادرست بر عهده شما خواهد بود. کاربر متعهد
          می شود تنها نسخه اصلی و دستکاری نشده برنامه را از طریق وب سایت کافه پی
          و یا از فروشگاه‌ها ی و رسمی اندروید و اپل نصب کند. کافه پی مسوولیتی در
          قبال مشکلات ناشی از نسخه های متفرقه که از طریق منابع دیگر نصب می‌شود
          ندارد.
        </li>

        <li>
          چنانچه معرفی حساب بانکی و و یا تراکنش آن مشمول مقررات پولشویی، یا
          درآمد ناشی از ربا و یا هر وصف کیفری دیگری باشد، مسئولیت آن بر عهده
          کاربر و پرداخت کننده میباشد.
        </li>

        <li>
          پرداخت‌های کافه پی از طریق شبکه شاپرک انجام می‌شود. در این شبکه بازه
          تسویه، یک مرتبه در شبانه روز است. تمامی پرداخت‌های اینترنتی از طریق
          شبکه شاپرک انجام می‌شود. وقتی در کا فه پی پرداختی انجام می‌شود پول
          همان لحظه از حساب پرداخت کننده کسر می‌شود و به حساب شاپر ک منتقل
          می‌شود و شاپرک فردای آن روز با کافه پی تسویه می‌کند و کافه پی بلافاصله
          پول را به حساب دریافت کننده پول واریز می‌کند. این زمان در اختیار
          مجموعه کافه پی نیست.
        </li>

        <li>
          در صورتی که از کاربری شکایت شود و سواستفاده آن کاربر محرز شود، کافه پی
          آن حساب کاربری و مبالغ پرداخت شده را تا اعلام تصمیم مراجع ذیصلاح مسدود
          می‌نماید.
        </li>

        <li>
          اگر تا پیش از تسویه پول توسط کافه پی، پرداخت کننده شکایت کند و مستندات
          کافی ارائه کند، از تسویه پول جلوگیری خواهد شد.
        </li>
      </ul>
    </section>

    <section
      :dir="$dir()"
      class="contact-us has-background-white cp-tb-padding-4x cp-side-padding-4x"
    >
      <h6 class="header font-20">
        اگر پیشنهاد یا انتقادی از کافه‌پِی دارید برای ما ارسال کنید
      </h6>
      <b-field grouped>
        <b-input
          expanded
          id
          v-model="form.name"
          class="cp-input cp-input-primary cp-input-grey cp-input-shadow"
          placeholder="نام و نام خانوادگی"
          icon="account"
        ></b-input>
        <b-input
          expanded
          id
          v-model="form.phone_number"
          class="cp-input cp-input-primary cp-input-grey cp-input-shadow"
          placeholder="شماره تماس"
          icon="cellphone"
        ></b-input>
      </b-field>
      <b-field>
        <b-input
          class="cp-input cp-input-primary cp-input-grey cp-input-shadow-inner"
          :dir="$dir()"
          v-model="form.comment"
          maxlength="200"
          type="textarea"
          placeholder="پیام خود را بنویسید"
        ></b-input>
      </b-field>
      <div dir="ltr" class="buttons left-align">
        <b-button
          @click="sendForm"
          :loading="globalLoading"
          class="bcp-btn bcp-btn-large"
          type="is-info"
          >ارسال پیام به کارشناسان</b-button
        >
      </div>
    </section>
    <section class="cp-tb-padding-2x cp-side-padding-2x center-align">
      <a
        class="enamad"
        target="_blank"
        href="https://trustseal.enamad.ir/?id=151125&amp;Code=JqBoaBpmXtRClu4juASL"
      >
        <img
          src="https://Trustseal.eNamad.ir/logo.aspx?id=151125&amp;Code=JqBoaBpmXtRClu4juASL"
          alt
          style="cursor:pointer"
          id="JqBoaBpmXtRClu4juASL"
        />
      </a>
      <P>
        آدرس: شیراز میدان پارسه یقطین جنوبی کوچه ۲۱ ساختمان اپادانا واحد ۸ -
        تلفن تماس: ۰۷۱۳۸۳۲۵۴۷۴
      </P>
      <p :dir="$dir()" class="font-14 font-norm">
        کلیه حقوق این سایت (کافه‌پِی) متعلق به هوشمندسازان ویرا آرین می‌باشد.
      </p>
    </section>
  </div>
</template>{

<script>
// import Logo from '~/components/Logo.vue'
import logo from '~/assets/img/shape/logo-transparent-white-mixed.png'
import background from '~/assets/img/background/320-2.jpg'
import mobilebc from '~/assets/img/background/320-3.jpg'

export default {
  data() {
    return {
      name: 'کافه پِی',
      logo,
      state: 'intro',
      phone_number: '',
      user_code: '',

      first_name: '',
      last_name: '',
      mobile: false,
      isUserExist: true,
      form: {
        name: null,
        phone_number: null,
        comment: null
      },
      background,
      mobilebc
    }
  },
  computed: {
    fullnameEntered() {
      return this.first_name != '' && this.last_name != '' ? true : false
    },
    tableScannedToken() {
      // to do : we need to change this to /?token=code insted of ?code
      let token = this.$route.fullPath.split('?')[1]
      return token
    }
  },
  methods: {
    // sendCode() {
    //   let validation = /^(\0|0)?9\d{9}$/g
    //   if (this.phone_number.match(validation)) {
    //     this.$axios
    //       .post('api/v1/user-profile/send-code/', {
    //         phone_number: this.phone_number
    //       })
    //       .then(res => {
    //         console.log('phone log', res)
    //         this.state = 'enter-code'
    //         this.user_code = res.data.code
    //       })
    //       .catch(err => {
    //         console.log(err.response)

    //         if (err.response) {
    //           // signup

    //           if (err.response.status == 303) {
    //             this.isUserExist = false
    //             this.state = 'enter-code'
    //           }
    //         }
    //       })
    //   } else if (this.phone_number == '') {
    //     this.toaster('لطفا شماره تلفن خود را وارد نمایید', 'is-danger')
    //   } else {
    //     this.toaster('شماره تلفن وارد شده معتبر نیست', 'is-danger')
    //   }
    // },
    // checkCode() {
    //   this.$axios
    //     .post('/api/v1/user-profile/auth-token/', {
    //       phone_number: this.phone_number,
    //       code: this.user_code
    //     })
    //     .then(res => {
    //       console.log('user loged in', res.data)
    //       this.$store.commit('setToken', res.data.token)
    //       // check if it's the first time that user logged in by full name
    //       if (res.data.full_name.trim() == '') {
    //         this.state = 'signup'
    //       } else {
    //         this.$store.dispatch('user/retrieve').then(res => {
    //           if (this.tableScannedToken) {
    //             this.$store
    //               .dispatch('sendCode', this.tableScannedToken)
    //               .then(res => {
    //                 this.$router.push('/user/home')
    //               })
    //           } else this.$router.push('/user/home')
    //         })
    //       }
    //     })
    //     .catch(err => {
    //       if (err.response) {
    //         console.log(err.response.data)
    //       }
    //     })
    // },
    // signup() {
    //   // actualy this is user update info
    //   console.log('f l', this.first_name, this.last_name)

    //   if (this.first_name != '' && this.last_name != '') {
    //     this.$api
    //       .put('/api/v1/user-profile/', {
    //         first_name: this.first_name,
    //         last_name: this.last_name
    //       })
    //       .then(res => {
    //         this.$store.dispatch('user/retrieve').then(res => {
    //           if (this.tableScannedToken) {
    //             this.$store
    //               .dispatch('sendCode', this.tableScannedToken)
    //               .then(res => {
    //                 this.$router.push('/user/home')
    //               })
    //           } else this.$router.push('/user/home')
    //         })
    //       })
    //       .catch(err => {
    //         if (err.response) {
    //           console.log(err.response.data)
    //         }
    //       })
    //   }
    //   if (this.first_name == '') {
    //     this.toaster('لطفاْ نام خود را وارد کنید', 'is-danger')
    //   } else if (this.last_name == '') {
    //     this.toaster('نام خانوادگی خود را وارد کنید', 'is-danger')
    //   }
    // },
    scrollllll() {
      $('html, body').animate({ scrollTop: $('#about-us').position().top })
    },
    sendForm() {
      this.globalLoading = true
      setTimeout(() => {
        this.toaster(
          'پیام شما با برای کارشناسان ما ارسال شد',
          'is-info',
          'is-bottom'
        )
        this.globalLoading = false
      }, 1500)
    }
  },
  created() {
    if (process.client) {
    let w = window.innerWidth
    if (w < 600) this.$router.push(this.localePath('/user/home'))
    }
  },
  mounted() {
    let h = window.innerHeight
    let w = window.innerWidth
    if (w <= 601) this.mobile = true
    $('.intro').css({ 'min-height': h })
  },
  watch: {}
}
</script>

<style lang="sass" scoped>
@import '~/assets/sass/variables.sass'
.field.is-grouped > .control:not(:last-child)
  margin-inline-start: 0!important
  margin-inline-end: 0.75rem!important

.go-to-user
  margin-top: 1rem
  width: 300px!important

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
    margin-inline-start: -0.75em
  
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
  width: 360px   
.input-container
  position: relative
  input
    padding-inline-end: 30px
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
      outline: none!important
      box-shadow: none!important 
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


#how-to-use
  .htus-container
    padding: $padding
    .htus
      height: 75px
      padding: $padding * 3
      display: flex
      align-items: center
      .htus-content
        flex: 6
          
      .htus-num
        flex: 1
        p
          width: 40px
          height: 40px
          color: white
          font-size: 20px
          border-radius: 25px
          display: flex
          justify-content: center
          align-items: center



.header-second 
  font-size: 20px
  font-weight: 500
  color: #29abe2!important
  margin-bottom: .5rem
  margin-top: .5rem
  text-align: start


.intro
  background-position: 20px 20px 20px 200px
  background-size: cover
  justify-content: center
  align-items: center
  flex-direction: column
  h2
    font-size: 18px
  h3
    font-size: 16px!important

.action

  justify-content: center
  align-items: center
  // .button 
  //   .icon
  //     &:last-child
  //       margin-inline-end: 0!important
  //       margin-inline-start: 0!important
  button    
    margin: 0 10px
    &.forward
      flex: 9 
    &.back
      flex: 1
      margin-inline-start: 0
      padding-inline-start: 0.5rem!important
      padding-inline-end: 0.5rem!important
      .mdi
        font-size: 28px!important

    .icon:last-child
      margin: 0!important

.intro-state
  width: 500px

  .action
    // flex-direction: column
    margin-top: 0.75rem!important
    justify-content: space-between
    button
      border: none
      flex: 1

.fade-enter-active, .fade-leave-active
  transition: all .5s
  // transform: translateX(-100px)

.fade-enter, .fade-leave-to
  transition: all .5s
  transform: translateX(-100px)
  opacity: 0


.enamad
  display: block
  width: 100px
  margin: auto
  margin-bottom: $margin


.signup
  
.login, .enter-code, .signup
  width: 500px
  .field
    margin-top: 0.75rem
    margin-bottom: 0!important
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

@media (max-width: 600px)
  .logo
    width: 80%!important
  .intro-state
    width: 100%
  .login, .enter-code, .signup
    width: 96%

</style>
