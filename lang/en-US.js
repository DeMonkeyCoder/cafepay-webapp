export default {
  balance: 'Balance',

  order_list_page: {
    status: 'Status',
    payment_done: 'Payed',
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
      preorder: {
        current_orders: 'Current Order',
        order_from: 'Order from',
        payment_is_not_done: 'Payment is not done',
        details: 'Details',
        checkout: 'Checkout',
        checkout_CASH: 'Please Pay Your bill with Cash or Credit Card',
        states: {
          waiting: 'Waiting for kitchen confirmation',
          preparing: 'Prepearing your order',
          ready: 'Your order is ready!',
          confirmed: 'Your Order has been Accepted',
          rejected: 'Your order is rejected by the kitchen'
        }
      },
      total_amount: 'Total amount',
      payed_amount: 'Payed amount',
      table_payment_done: 'Table bill is payed',
      no_orders_on_your_table: 'No orders found on your table',
      checkout_all_items: 'Checkout all items',
      checkout: 'Checkout',
      checkout_CASH: 'Please Pay Your bill with Cash or Credit Card',
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
      person_payed: 'Payed',
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
      you_payed_on_this_product: 'You already payed on {num} products of this kind',
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
        Enter the 4-digit code sent to <span>{phone_number}</span>
      </p>`,
    submit_code: 'Next',
    resend_code: 'Resend code',
    resend_time_message: 'in {resendTime} seconds',
    welcome_to_cafepay: 'Welcome to Cafepay!',
    complete_your_registration_message: 'To complete registration, please enter your name',
    your_name: 'Your name',
    sumbit_information: 'Sumbit',
  }
}