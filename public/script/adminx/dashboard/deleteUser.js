const $deleteUser = $("#delete-user");
// ajax to change user status to delete
$deleteUser.click(function (e) {
  e.preventDefault();
  const message = $(this).attr("data-confirm");
  const url = $(this).attr("href");
  const choice = window.confirm(message);
  if (choice) {
    $.ajax({
      type: "DELETE",
      url: url,
    })
      .done(() => {
        alert("User deleted");
        const $parentRow = $($(this).parent().parent()[0]);
        const $status = $("#status");
        const $userImg = $("#user-img");
        $parentRow.addClass("disable-row");
        $status.text("deleted").removeClass("text-success");
        $userImg.addClass("text-muted text-decoration-none");
        $deleteUser
          .removeClass("text-danger")
          .addClass("text-decoration-none text-muted");
      })
      .fail((xhr, statusText) => {
        console.log(statusText);
        alert("something went wrong please try again later");
      });
  }
});
