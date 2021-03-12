const submitBtn = document.querySelector("#loginBtn");
const $submitBtn = $("#loginBtn");
const loginSpinner = document.querySelector("#login-spinner");
const $loginSpinner = $("#login-spinner");
const form = document.querySelector("#form");
const $form = $("#form");
const $usernameField = $("#username");
const $passwordField = $("#password");
const $loginEyeIcon = $("#faEye2");
const disabled = true;
const width1 = 576;

if (window.innerWidth <= width1) {
  form.classList.remove("p-5");
  form.classList.add("p-0");
}

window.addEventListener("resize", (e) => {
  if (this.innerWidth <= width1) {
    form.classList.remove("p-5");
    form.classList.add("p-1");
  }
});

function toggleSubmitBtn(status) {
  $submitBtn.attr("disabled", status);
}

toggleSubmitBtn(disabled);

$usernameField.keyup((e) => {
  let status =
    $usernameField.val() && $passwordField.val() ? !disabled : disabled;
  toggleSubmitBtn(status);
});
$passwordField.keyup((e) => {
  let status =
    $usernameField.val() && $passwordField.val() ? !disabled : disabled;
  toggleSubmitBtn(status);
});

$loginEyeIcon.click(() => {
  const faEye = "fa-eye";
  const faEyeSlash = "fa-eye-slash";
  if ($loginEyeIcon.hasClass(faEye)) {
    $loginEyeIcon.removeClass(faEye).addClass(faEyeSlash);
    $passwordField.attr("type", "text");
  } else if ($loginEyeIcon.hasClass(faEyeSlash)) {
    $loginEyeIcon.removeClass(faEyeSlash).addClass(faEye);
    $passwordField.attr("type", "password");
  }
});

$submitBtn.click((e) => {
  $submitBtn.css({ display: "none" });
  $loginSpinner.removeClass("display-none");
});
