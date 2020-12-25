export default {
  unknown_error: 'خطایی رخ داده، مجددا امتحان کنید',
  network_error: 'خطا در اتصال به اینترنت',
  balance: 'موجودی',
  
  payment_result : {
    payment_result_success: 'پرداخت با <span class="font-norm font-18 g-text">موفقیت</span> انجام شد',
    payment_result_error: 'پرداخت با <span class="font-norm font-18 s-text">خطا</span> روبه رو شد',
    payed_amount: 'مبلغ پرداخت شده',
    transaction_id: 'شماره تراکنش',
    return_to_application: 'بازگشت به اپلیکیشن',
  },

  order_list_page: {
    status: 'وضعیت',
    payment_done: 'پرداخت شده',
    payment_not_done: 'پرداخت نشده',
    states: {
      Canceled: 'لغو شده',
      Pending: 'در انتظار تایید',
      Accepted: 'تایید شده',
      Kitchen: 'در حال آماده سازی',
      Ready: 'آماده تحویل',
      Delivered: 'تحویل داده شده',
      Unknown: 'نامشخص'
    }
  },

  table_page: {
    ordering_unavailable: 'سفارش ‌گیری فعال نیست',
    scan_first_message: `<p class="cp-side-margin-2x">
        ابتدا به بخش
        <span class="p-text">اسکن</span>
        بروید
      </p>
      <p>و بارکد مربوط به میز را اسکن کنید</p>
      <p>یا کد میز را وارد نمایید</p>`,
    table: 'میز',
    edit_order: 'ویرایش سفارش',
    payment_status_header_payed: 'پرداخت شده',
    payment_status_header_of: 'از',
    preorder: {
      self_pickup_warning: 'توجه داشته باشید سفارش در محل مجموعه به شما تحویل داده خواهد شد.',
      current_orders: 'سفارشات فعلی',
      order_from: 'سفارش از',
      payment_is_not_done: 'پرداخت سفارش انجام نشده',
      details: 'جزییات',
      checkout: 'پرداخت سفارش',
      checkout_CASH: 'سفارش خود را سر صندوق پرداخت کنید',
      states: {
        waiting: 'در انتظار تایید توسط پذیرنده',
        preparing: 'در حال آماده‌سازی سفارش شما',
        ready: '!سفارش شما آماده است',
        is_delivered: '!سفارش شما آماده است',
        confirmed: 'سفارش شما تایید شد',
        rejected: 'سفارش شما توسط پذیرنده رد شد',
        waiting_onsight: 'سفارش با موفقیت ثبت شد'
      }
    },
    total_amount: 'مجموع سفارشات',
    payed_amount: 'پرداخت شده',

    service_fee: 'خدمات',
    sub_total_amount: 'مجموع سفارشات',
    final_total_amount: 'جمع کل',
    checkout_cash_or_credit: 'پرداخت نقدی یا کارتخوان',
    pay_to_cashier: 'پرداخت سر صندوق',
    checkout_online_submit_button: 'پرداخت آنلاین',
    checkout_cash_submit_button: 'ثبت سفارش',

    table_payment_done: 'پرداخت میز کامل شده است',
    no_orders_on_your_table: 'سفارشی برروی میز شما وجود ندارد',
    checkout_all_items: 'پرداخت کل فاکتور',
    checkout: 'پرداخت سفارش',
    checkout_CASH_message: 'سفارش خود را سر صندوق پرداخت کنید',
    choose_payment_method: 'انتخاب روش پرداخت',
    person: {
      tour: {
        previous: 'قبلی',
        how_can_i_pay: 'چگونه پرداخت کنم؟',
        got_it: 'فهمیدم!',
        person_orders_guide: 'سفارشات هر فرد با اطلاعات پرداختی آن در این قسمت قابل مشاهده است',
        person_payment_guide: 'با کشیدن این اسلاید به سمت چپ و یا راست مبلغی که میخواهید پرداخت کنید را مشخص کنید',
      }
    },
    person_orders: 'سفارشات <span class="font-norm p-text">{title}</span>',
    person_order_count: 'مجموع:‌ {order_count} عدد',
    person_payed: 'پرداخت شده',
    cash_checkout_type_submitted: 'پرداخت سفارش به صورت نقدی ثبت شد',
  },

  current_cafe: {
    return_to_scan_confirmation: 'آیا میخواهید به صفحه اسکن بازگردید؟',
    return_to_scan: 'بازگشت به صفحه اسکن',
    no: 'خیر'
  },

  menu_page: {
    your_current_order: 'سفارشات فعلی شما',
    submit_order: 'تایید سفارش',
    submit_order_self_pickup: 'تحویل در مجموعه',
    sold_out: 'تمام شد',
    tour: {
      previous: 'قبلی',
      how_can_i_pay: 'چگونه پرداخت کنم؟',
      got_it: 'فهمیدم!',
      submit_order_guide: 'با انتخاب این گزینه سفارش خود را ثبت کنید',
    },
    toasts: {
      you_payed_on_this_product: `روی {num} عدد ازین محصول پرداخت انجام داده اید`
    }
  },

  cafe_info: {
    about: 'درباره',
    gallery: 'گالری تصاویر',
    contact_info: 'اطلاعات تماس'
  },
  
  profile_page: {
    signin_to_profile: 'ورود به حساب کاربری',
    signup_date: 'عضویت در',
    orders_list: 'لیست سفارشات',
    profile_information: 'اطلاعات کاربری',
    terms: 'قوانین و شرایط استفاده',
    logout: 'خروج از حساب کاربری',
    first_name: 'نام',
    last_name: 'نام خانوادگی',
    phone_number: 'شماره تلفن',
    update_information: 'تغییر مشخصات',
    logout_confirmation_message: 'آیا میخواهید از حساب کاربری خود خارج شوید؟',
    no: 'خیر',
    update_information_success: 'اطلاعات با موفقیت ویرایش شد'
  },

  cafe_navigator: {
    menu: 'منو',
    information: 'اطلاعات',
    comments: 'نظرات',
    posts: 'پست‌ها',
  },
  
  scan_page: {
    camera_permission_message: `جهت اسکن بارکد توسط دوربین درون برنامه، لطفا بعد از مشاهده پیام زیر
    گزینه <span class="t-text font-norm">Allow</span> را انتخاب نمایید`,
    open_camera: 'باز کردن دوربین',
    scan_the_barcode: 'بارکد روی میز را با دوربین درون برنامه اسکن کنید',
    or: 'یا',
    enter_table_code: 'کد میز را وارد کنید',
    submit_table_code: 'ورود به میز',
    code_incorrect: 'کد وارد شده نادرست است'
  },

  login_component: {
    signin_to_cafepay: 'ورود به کافه‌پِی',
    enter_your_phone_number: 'شماره تلفن همراه خود را وارد نمایید',
    verification_code_will_be_sent_meesage: 'یک کد جهت تایید شماره برای شما ارسال خواهد شد.',
    next: 'ادامه',
    change_phone_number: 'تغییر شماره',
    verify_phone_message: `<h3 class="font-bold">
        لطفا کد ارسال شده را وارد کنید
      </h3>
      <p class="state-explaination">
        کد تایید برای شماره <span>{phone_number}</span> پیامک شد
      </p>`,
    submit_code: 'تایید',
    resend_code: 'ارسال مجدد کد',
    resend_time_message: 'تا {resendTime} ثانیه دیگر',
    welcome_to_cafepay: 'به کافه‌پِی خوش آمدید!',
    complete_your_registration_message: 'جهت تکمیل عضویت، نام خود را وارد کنید',
    your_name: 'نام شما',
    sumbit_information: 'ثبت اطلاعات',
    phone_number_empty_error: 'لطفا شماره تلفن خود را وارد نمایید',
    phone_number_invalid: 'شماره تلفن وارد شده معتبر نیست',
    name_empty_error: 'لطفا نام خود را وارد کنید',
  }
}