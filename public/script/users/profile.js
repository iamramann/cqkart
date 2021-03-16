import "/script/components/header.js";
import "/script/components/pwdModal.js";
$(document).ready(function (e) {
  const $details = $(".details");
  const $form = $("#form");
  const $states = $("#states");
  const $district = $("#district");
  const $submit = $("#submit");
  const $addAddressBtn = $("#add-address-btn");
  const $deleteUser = $("#delete-user");
  // const $personalDetails = $("#personal-details");
  const $address = $("#address");
  let datax;

  const hideMsg = (element) => {
    setTimeout(() => {
      element.addClass("d-none");
    }, 5000);
  };

  $details.focus(function (e) {
    $details.removeClass("opacity-5");
  });

  $details.blur(function (e) {
    $details.addClass("opacity-5");
  });

  /*
   * ajax to fetch state and district object from the server
   */
  $.ajax({
    type: "GET",
    url: "/states-and-districts",
  })
    .done(function (data) {
      // // todo: success handler
      datax = data;
      let { states } = data;
      states.forEach((x, i) => {
        $states.append(`<option value="${x.state}">${x.state}</option>`);
      });
    })
    .fail(function (xhr, statusText) {
      //  // todo: error handler
    });

  // * @Modified - 2021-02-22 16:08:35
  $states.change(function () {
    // get index of the state
    var index = $(this).children("option:selected").index();
    let { states } = datax;
    const district = states[index - 1].districts;
    $district.empty();
    district.sort().forEach((x, i) => {
      $district.append(`<option value="${x}">${x}</option>`);
    });
  });

  /*
   * @author - RAMAN SHARMA
   * @email: kukreti.rs@gmail.com
   * @linkedin - https://www.linkedin.com/in/rashx358/
   * @Modified - 2021-02-22 14:19:24
   */

  // * update user details here
  $submit.click(function (e) {
    e.preventDefault();
    // // todo: ajax to update user details
    const $method = $form.attr("method");
    const $url = $form.attr("action");
    let data = $form.serialize();
    const $msg = $("#new-add-msg-x"),
      $container = $("#new-add-alert-x"),
      $loader = $("#add-loader-x"),
      $newAddressRow = $("#new-add-row-x");
    $.ajax({
      type: $method,
      url: $url,
      data: data,
      beforeSend: function () {
        $submit.addClass("d-none");
        $loader.removeClass("d-none");
      },
    })
      .done((data) => {
        // // todo: success handler
        $newAddressRow.removeClass("d-none");
        $loader.addClass("d-none");
        $container.addClass("alert-success");
        $submit.removeClass("d-none");
        $msg.text(data);
        hideMsg($newAddressRow);
      })
      .fail((xhr, textStatus) => {
        // // todo: error handler
        $newAddressRow.removeClass("d-none");
        $container.addClass("alert-danger");
        $loader.addClass("d-none");
        $submit.removeClass("d-none");
        $msg.text(xhr);
        hideMsg($newAddressRow);
      });
  });

  // * ajax to add a new address in user's model
  $addAddressBtn.click(function (e) {
    e.preventDefault();
    // // todo: ajax for adding a address
    const type = $address.attr("method"),
      url = $address.attr("action"),
      data = $address.serialize(),
      $msg = $("#new-add-msg"),
      $container = $("#new-add-alert"),
      $newAddressRow = $("#new-add-row"),
      $loader = $("#add-loader");
    $.ajax({
      type,
      url,
      data,
      beforeSend: function () {
        $addAddressBtn.addClass("d-none");
        $loader.removeClass("d-none");
      },
    })
      .done((data) => {
        // // todo: success handler
        $newAddressRow.removeClass("d-none");
        $loader.addClass("d-none");
        $container.addClass("alert-success");
        $addAddressBtn.removeClass("d-none");
        $msg.text(data);
        hideMsg($newAddressRow);
      })
      .fail((xhr, textStatus) => {
        // // todo: error handler
        $newAddressRow.removeClass("d-none");
        $container.addClass("alert-danger");
        $loader.addClass("d-none");
        $addAddressBtn.removeClass("d-none");
        $msg.text(xhr);
        hideMsg($newAddressRow);
      })
      .always(function (xhr, statusText) {
        $address.trigger("reset");
      });
  });

  // todo: need some modification
  $deleteUser.click(function (e) {
    e.preventDefault();
    const message = $(this).attr("data-confirm");
    const url = $(this).attr("href");
    const choice = window.confirm(message);
    if (choice) {
      $.ajax({
        type: "GET",
        url: url,
      })
        .done((data) => {
          // // todo1: handle what to do after user deleted profile
          alert("Profile deleted successfully");
          let protocol = window.location.protocol;
          let host = window.location.host;
          let path = "user";
          window.open(`/${path}`, "_self");
        })
        .fail((xhr, textStatus) => {
          // // todo2: handle what to do if request fails
          alert("something went wrong please try again later");
        });
    }
  });
});
