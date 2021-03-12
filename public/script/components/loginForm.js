const loginForm = document.querySelector("#login-form");
const loginUsername = document.querySelector("#username");
const loginPassword = document.querySelector("#password2");
const loginBtn = document.querySelector("#submitBtn");
const loginEyeIcon = document.querySelector("#faEye2");
const openLoginModel = document.querySelector("#model-open-signin");
const modelOpenBtn = document.querySelector("#model-btn-signin");
const loginModalClose = document.querySelector("#close-login-modal");
const loginCrossBtn = document.querySelector("#login-cross");
const isDisabled = true;
const spinner = document.querySelector("#spinner-1");

const reset = function resetLoginForm() {
  loginForm.reset();
  toggleLoginBtn(isDisabled);
};
loginModalClose.addEventListener("click", reset);
loginCrossBtn.addEventListener("click", reset);
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" || e.key === "escape") {
    reset();
    loginCrossBtn.click();
  }
});

// loginUsername.focus();

openLoginModel.addEventListener("click", function (e) {
  e.preventDefault();
  modelOpenBtn.click();
});

loginBtn.addEventListener("click", (e) => {
  e.target.style.display = "none";
  spinner.style.display = "block";
});

loginEyeIcon.addEventListener("click", function (e) {
  if (loginEyeIcon.classList.contains("fa-eye")) {
    loginEyeIcon.classList.remove("fa-eye");
    loginEyeIcon.classList.add("fa-eye-slash");
    loginPassword.type = "text";
  } else if (loginEyeIcon.classList.contains("fa-eye-slash")) {
    loginEyeIcon.classList.add("fa-eye");
    loginEyeIcon.classList.remove("fa-eye-slash");
    loginPassword.type = "password";
  }
});

function toggleLoginBtn(status) {
  loginBtn.disabled = status;
}

reset();
toggleLoginBtn(isDisabled);
loginUsername.addEventListener("keyup", function (e) {
  if (loginPassword.value && loginUsername.value) {
    toggleLoginBtn(!isDisabled);
  } else {
    toggleLoginBtn(isDisabled);
  }
});
loginPassword.addEventListener("keyup", function (e) {
  if (loginPassword.value && loginUsername.value) {
    toggleLoginBtn(!isDisabled);
  } else {
    toggleLoginBtn(isDisabled);
  }
});
