if (navigator.userAgent.includes("Instagram")) {
  window.location.href = "https://inapp.cafepay.app/redirect.php?url=" + window.location.href;
  document.body.innerHTML = ''
}