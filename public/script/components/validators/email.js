// TODO : EMAIL VALIDATION
import { tickIconColor, defaultIconColor, addErrorClasses } from "./values.js";
const emailPattern = /^[^ ]+@[^ ]+\.[a-zA-Z]{2,3}$/;
const $email = $("#email");
$email.keyup(function (e) {
  const $element = $(e.target);
  let message = "please enter a valid email*";
  const $tickIcon = $("#tick-icon");
  const $emailIcon = $("#email-icon");
  const $emailMsg = $("#email-msg");
  const $value = $(this).val();

  if ($emailMsg.hasClass("display-none")) {
    $emailMsg.removeClass("display-none");
  }

  if ($value.match(emailPattern)) {
    message = "Valid email";
    $tickIcon.removeClass("display-none").addClass("tick-icon");
    $emailIcon.css(tickIconColor);
    $email.addClass("text-muted");
    $emailMsg.addClass("display-none");
  } else {
    message = "please enter a valid email*";
    $emailMsg.removeClass("display-none");
    $element.removeClass("text-muted");
    addErrorClasses($emailMsg);
    $tickIcon.addClass("display-none");
    $emailIcon.css({ color: "red" });
  }
  if ($value == "") {
    $emailIcon.css(defaultIconColor);
    $emailMsg.addClass("display-none");
  }
  $emailMsg.text(message);
});
