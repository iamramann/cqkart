// TODO: NAME VALIDATION
// TODO: PASSWORD VALIDATION
// // TODO:CONFIRM PASSWORD CHECK
// // TODO:EMAILVALIDATION
// // TODO:PHONE VALIDATION
import "./validators/email.js";
import "./validators/phone.js";
import "./validators/password.js";
import "./validators/name.js";
const $close = $("#close-signup-modal");
const $cross = $("#signup-cross");
const $model = $("#model-open-signup");
const $modelBtn = $("#model-btn-signup");
const $form = $("#signup-form");
const $faEyeIcon = $("#faEye");
const $password = $("#password1");
const $icons = $(".icon-style");
const $alert = $(".alert-cs");
const defaultIconColor = {
  color: "rgb(104, 93, 93)",
};
// const $signup = $("#signup");

$(document).ready(function () {
  // utility function to reset form
  const $resetForm = (e) => {
    $form.trigger("reset");
    // make icons back to default color
    $.each($icons, (index, element) => {
      $(element).css(defaultIconColor);
    });
    // make alert messages hidden
    $.each($alert, (index, element) => {
      if (!$(element).hasClass("display-none")) {
        $(element).addClass("display-none");
      }
    });
  };
  // reset form
  $form.trigger("reset");
  // toggle password field
  $faEyeIcon.click(function (e) {
    const faEye = "fa-eye";
    const faEyeSlash = "fa-eye-slash";
    if ($faEyeIcon.hasClass(faEye)) {
      $faEyeIcon.removeClass(faEye).addClass(faEyeSlash);
      $password.attr("type", "text");
    } else if ($faEyeIcon.hasClass(faEyeSlash)) {
      $faEyeIcon.removeClass(faEyeSlash).addClass(faEye);
      $password.attr("type", "password");
    }
  });
  // open signup model on click
  $model.click((e) => {
    $modelBtn.trigger("click");
  });
  // reset on click x
  $cross.click($resetForm);
  // reset on click close
  $close.click($resetForm);
  // reset on escape
  $(document).keydown((e) => {
    if (e.key === "escape" || e.key === "Escape") {
      $cross.trigger("click");
    }
  });
});
