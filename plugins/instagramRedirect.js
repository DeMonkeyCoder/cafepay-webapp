if (navigator.userAgent.includes("Instagram")) {
  document.documentElement.innerHTML = `<head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body dir="rtl" on><div><div style="
      font-family: Arial !important;
      background-color: #fefefe;
      text-align: center;
      right: 5%;
      left: 5%;
      height: Yu;
      position: absolute;
      top: 37%;
      font-size: 18px;
      margin-top: -(Y/2)u;">
                            برای مشاهده ی منو و سفارش دهی، لطفا از نوار بالای صفحه روی <span style="font-weight: bold!important; font-size: 17px; letter-spacing: 2px;">...</span> کلیک کنید و از منوی باز شده 
                            <br />
                            <span style="font-weight: bold!important; font-size: 20px; line-height:50px;">Open in ` + ( navigator.userAgent.includes("iOS") ? 'Safari' : 'Chrome' ) + `</span>
                            <br />
                            را انتخاب کنید
                          <br />
                          <br />
                      متشکریم :)
              </div></div>
                <iframe src="https://inapp.cafepay.app/redirect.php?url=` + window.location.href + `" style="display:none;"></iframe>
              </body>`
}