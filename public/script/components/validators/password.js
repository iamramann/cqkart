import { errorColor, tickIconColor } from "./values.js";
const $password = $("#password1");
const $cpassword = $("#cpassword");
const $cpass = $("#cpass");
const $tickIcon = $("#tick-icon-3");
const $passIcon = $("#passIcon");
$cpassword.keyup(function (e) {
  const password = $password.val();
  const value = $(this).val();
  if (password === value && password.length) {
    $cpass.css(tickIconColor);
    $passIcon.css(tickIconColor);
    $tickIcon.removeClass("display-none").addClass("tick-icon");
  } else {
    $cpass.css(errorColor);
  }
});
