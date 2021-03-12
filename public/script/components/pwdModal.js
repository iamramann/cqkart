const $pwdModal = $("#pwdModal");
const $changePassword = $("#changePassword");
const $oldPwd = $("#oldpwd");
const $newPwd = $("#newPwd");
const $confirmNewPwd = $("#confirmNewPwd");
const $changePwdTick = $("#changePwdTick");
const $updatePwd = $("#updatePwd");
const $changeMsg = $("#changeMsg");
const hideElement = "display-none";
let flag = false;

// utility method
function makeValueEmpty(arr) {
  arr.forEach((ele) => {
    ele.val("");
  });
}

// open change password model
$changePassword.click(function (e) {
  $pwdModal.trigger("click");
});

// confirm password
$confirmNewPwd.keyup(function (e) {
  const password = $newPwd.val();
  const value = $(this).val();
  if (password === value && password.length) {
    $changePwdTick.removeClass(hideElement);
    flag = true;
  } else {
    $changePwdTick.addClass(hideElement);
  }
});

// update password
$updatePwd.click(function (e) {
  if (
    $newPwd.val().length === 0 ||
    $oldPwd.val().length === 0 ||
    $confirmNewPwd.val().length === 0
  ) {
    flag = false;
  }

  if (flag) {
    const data = {
      newPassword: $newPwd.val(),
      oldPassword: $oldPwd.val(),
      confirmPassword: $confirmNewPwd.val(),
    };

    $.ajax({
      type: "POST",
      url: "/user/changePassword",
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(data),
    })
      .done(function (data) {
        $changePwdTick.addClass(hideElement);
        $changeMsg.removeClass(hideElement).text(data).addClass("text-muted");
        makeValueEmpty([$oldPwd, $newPwd, $confirmNewPwd]);
      })
      .fail(function (xhr, textStatus) {
        makeValueEmpty([$oldPwd, $newPwd, $confirmNewPwd]);
        $changeMsg.removeClass(hideElement).text(textStatus).css({
          color: "red",
        });
      });
  } else {
    makeValueEmpty([$oldPwd, $newPwd, $confirmNewPwd]);
    $changeMsg
      .removeClass(hideElement)
      .text("Please fill all the details...")
      .css({ color: "red" });
  }
});
