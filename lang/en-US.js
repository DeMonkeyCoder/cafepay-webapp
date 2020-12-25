const order_states_general = {
  waiting: 'Waiting for kitchen confirmation',
  preparing: 'Prepearing your order',
  ready: 'Your order is ready!',
  confirmed: 'Your Order has been Accepted',
  rejected: 'Your order is rejected by the kitchen',
}

export default {
  unknown_error: 'Error occurred. Please try again later',
  network_error: 'Please check your network connection',
  balance: 'Balance',

  payment_result : {
    payment_result_success: 'Payment is <span class="font-norm font-18 g-text">successfully</span> done',
    payment_result_error: 'There was an <span class="font-norm font-18 s-text">Error</span> in your payment',
    payed_amount: 'Paid amount',
    transaction_id: 'Transaction ID',
    return_to_application: 'Return to Application',
  },

  order_list_page: {
    status: 'Status',
    payment_done: 'Paid',
    payment_not_done: 'Payment not done',
    states: {
      Canceled: 'Canceled',
      Pending: 'Waiting for confirmation',
      Accepted: 'Confirmed',
      Kitchen: 'Prepearing',
      Ready: 'Ready',
      Delivered: 'Delivered',
      Unknown: 'Unknown'
    }
  },

  table_page: {
    ordering_unavailable: 'Ordering is not available',
    scan_first_message: `<p class="cp-side-margin-2x">
        First go to the
        <span class="p-text">scan</span>
        section
      </p>
      <p>and scan the barcode</p>
      <p>or enter the table\'s code</p>`,
    edit_order: 'Edit Order',
    payment_status_header_payed: 'Paid',
    payment_status_header_of: 'of',
    table: 'Table',
    preorder: {
      self_pickup_warning: 'Self pickup order with no delivery.',
      current_orders: 'Current Order',
      order_from: 'Order from',
      payment_is_not_done: 'Payment is not done',
      details: 'Details',
      checkout: 'Checkout',
      checkout_CASH: 'Please Pay Your bill with Cash or Credit Card',
      states: Object.assign({...order_states_general} , {
        waiting: 'Waiting for kitchen confirmation'
      })
    },
    states: Object.assign({...order_states_general} , {
      waiting: 'Your Order is submitted'
    }),
    total_amount: 'Total amount',
    payed_amount: 'Paid amount',
    
    service_fee: 'Service Fee',
    sub_total_amount: 'Subtotal',
    final_total_amount: 'Total',
    checkout_cash_or_credit: 'Cash or Credit Card',
    pay_to_cashier: 'Pay to cashier',
    checkout_online_submit_button: 'Checkout online',
    checkout_cash_submit_button: 'Submit Order',
    
    table_payment_done: 'Table bill is paid',
    no_orders_on_your_table: 'No orders found on your table',
    checkout_all_items: 'Checkout all items',
    checkout: 'Checkout',
    checkout_CASH_message: 'Please Pay Your bill with Cash or Credit Card',
    choose_payment_method: 'Choose payment method',
    person: {
      tour: {
        previous: 'Previous',
        how_can_i_pay: 'How can I pay?',
        got_it: 'Got it!',
        person_orders_guide: 'Orders and payment details of people is available here',
        person_payment_guide: 'Move the slider to right or left to set the amount you want to pay',
      }
    },
    person_orders: '<span class="font-norm p-text">{title}</span>\'s Orders',
    person_order_count: 'Total:‌ {order_count} items',
    person_payed: 'Paid',
    cash_checkout_type_submitted: 'Cash payment submitted',
  },

  current_cafe: {
    return_to_scan_confirmation: 'Do you want to return to scan page?',
    return_to_scan: 'Retrun to scan page',
    no: 'No'
  },

  menu_page: {
    your_current_order: 'Your Current Order',
    submit_order: 'Submit Order',
    submit_order_self_pickup: 'Self Pickup',
    sold_out: 'Sold out',
    tour: {
      previous: 'Previous',
      how_can_i_pay: 'How can I pay?',
      got_it: 'Got it!',
      submit_order_guide: 'Submit your order by clicking this button',
    },
    toasts: {
      you_payed_on_this_product: 'You already paid on {num} products of this kind',
    }
  },

  cafe_info: {
    about: 'About',
    gallery: 'Gallery',
    contact_info: 'Contact Info'
  },

  profile_page: {
    signin_to_profile: 'Sign in to Cafepay',
    signup_date: 'Date signed up',
    orders_list: 'Orders List',
    profile_information: 'Account',
    terms: 'Terms of use',
    logout: 'Logout',
    first_name: 'First Name',
    last_name: 'Last Name',
    phone_number: 'Phone Number',
    update_information: 'Save',
    logout_confirmation_message: 'Are you sure you want to logout?',
    no: 'No',
    update_information_success: 'Updated Successfully'
  },

  cafe_navigator: {
    menu: 'Menu',
    information: 'Information',
    comments: 'Comments',
    posts: 'Posts',
  },
  
  scan_page: {
    camera_permission_message: `To scan the barcode with your device camera, please choose
    <span class="t-text font-norm">Allow</span> when the permission request dialog appears`,
    open_camera: 'Open Camera',
    scan_the_barcode: 'Scan the table\'s barcode with application\'s camera',
    or: 'or',
    enter_table_code: 'Enter the table\'s code',
    submit_table_code: 'Submit',
    code_incorrect: 'Code is incorrect'
  },

  login_component: {
    signin_to_cafepay: 'Sign in to Cafepay',
    enter_your_phone_number: 'Enter your phone number',
    verification_code_will_be_sent_meesage: 'A code will be sent to verify your phone number',
    next: 'Next',
    change_phone_number: 'Wrong phone number?',
    verify_phone_message: `<h3 class="font-bold">
        Enter code
      </h3>
      <p class="state-explaination">
        Enter the 5-digit code sent to <span>{phone_number}</span>
      </p>`,
    submit_code: 'Next',
    resend_code: 'Resend code',
    resend_time_message: 'in {resendTime} seconds',
    welcome_to_cafepay: 'Welcome to Cafepay!',
    complete_your_registration_message: 'To complete registration, please enter your name',
    your_name: 'Your name',
    sumbit_information: 'Sumbit',
    phone_number_empty_error: 'Please enter your phone number',
    phone_number_invalid: 'Please enter a valid phone number',
    name_empty_error: 'Please enter your name'
  }
}