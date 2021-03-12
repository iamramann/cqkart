// // TODO: PHONE NUMBER VALIDATION
import { tickIconColor } from "./values.js";
const contactPattern = /[6,7,8,9][0-9]{9,10}$/;
const $phone = $("#phone");
const errorClasses = ["mb-0", "text-start", "error-msg", "text-danger"];
$phone.keyup(function (e) {
  let message = "invalid phone number";
  const value = $(this).val();
  const $tickIcon = $("#tick-icon-2");
  const $phoneMsg = $("#phone-msg");
  const $phoneIcon = $("#phone-icon");
  if ($phoneMsg.hasClass("display-none")) {
    $phoneMsg.removeClass("display-none");
  }
  if (value.match(contactPattern)) {
    message = "valid";
    $phone.addClass("text-muted");
    $tickIcon.removeClass("display-none").addClass("tick-icon");
    $phoneIcon.css(tickIconColor);
    $phoneMsg.addClass("display-none");
  } else {
    $phoneIcon.css({ color: "red" });
    if ($phone.hasClass("text-muted")) {
      $phone.removeClass("text-muted");
    }
    addErrorClasses($phoneMsg);
    $tickIcon.removeClass("display-none").addClass("tick-icon");
  }
  $phoneMsg.text(message);
});
const addErrorClasses = (element) => {
  errorClasses.forEach((classx, index) => {
    element.addClass(classx);
  });
};
