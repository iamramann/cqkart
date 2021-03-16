const element1 = document.querySelector("#model-open-signin");
const element2 = document.querySelector("#model-open-signup");
const newUserClick = document.querySelector("#new-user-click");
const closeLoginModal = document.querySelector("#close-login-modal");
const alreadyAUser = document.querySelector("#already-a-user");
const closeSignupModal = document.querySelector("#close-signup-modal");

alreadyAUser.addEventListener("click", (e) => {
  closeSignupModal.click();
  element1.click();
  // $("#username").focus();
});

newUserClick.addEventListener("click", (e) => {
  closeLoginModal.click();
  element2.click();
});
