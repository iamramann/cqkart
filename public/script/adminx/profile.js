$(document).ready(function () {
  const $submitBtn = $("#submitBtn"),
    $adminForm = $("#admin-form");
  const avatar = $("#avatar"),
    figCaption = $("#figCaption"),
    fileUpload = $("#fileUpload");
  const avatarHandler = (element) => {
    fileUpload.trigger("click");
  };

  avatar.click(avatarHandler);
  figCaption.click(avatarHandler);

  // $submitBtn.click(function (e) {
  //   e.preventDefault();
  //   const $form = $adminForm[0];
  //   const url = $adminForm.attr("action"),
  //     type = $adminForm.attr("method"),
  //     data = new FormData($form);

  //   $.ajax({
  //     type,
  //     url,
  //     data,
  //     processData: false,
  //     contentType: false,
  //   })
  //     .done((data) => {
  //       alert(data);
  //     })
  //     .fail((xhr, statusText) => {
  //       alert(statusText);
  //     });
  // });
});

// todo: handle form data validation before sending to server
