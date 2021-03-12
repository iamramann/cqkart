import "../components/header.js";
$(document).ready(function (e) {
  const $msg = $(".msg");
  const $mainRow = $(".main-row");

  // remove product from the cart
  $(".delete").click(function (e) {
    let ele = $(this);
    let parent = ele.closest("div.my-col");
    const productId = ele.attr("data-id");
    $.ajax({
      type: "GET",
      url: `/user/removeItem?productId=${productId}`,
    })
      .done((data) => {
        alert(data);
        let cartValue = $("#cart-value");
        const getCartValue = Number(cartValue.text());
        const getPrice = Number(
          ele
            .parent()
            .parent()
            .children(".price-section")
            .children(".my-price")
            .text()
        );
        const getQuantity = Number(
          ele
            .parent()
            .parent()
            .children(".my-qty")
            .children(".qty-section")
            .text()
        );

        // // ! Fixme: when all product got removed the some -ve float value persists
        let totalValue = (getCartValue - getPrice * getQuantity).toFixed(2);
        cartValue.text(totalValue);
        parent.remove();
        if ($mainRow.children().length > 1) {
          // do nothing
        } else {
          $msg.removeClass("d-none");
          $msg.text("No products in the cart...");
        }
      })
      .fail((xhr, statusText) => {
        alert(statusText);
      });
  });

  //* ajax to update quanity
  $(".increment").click(function (e) {
    // // todo: update value on clicking  + btn
    let ele = $(this);
    let productId = ele.attr("data-id");
    // let type = "POST";
    // let url = `/user/addToCart/?productId=${productId}`;

    // ! Fixme: change url to add to cart
    let type = "GET";
    let url = "/states-and-districts"; //! temprory url
    let quantityEle = ele
      .parent()
      .parent()
      .children(".my-qty")
      .children(".qty-section");

    $.ajax({
      type,
      url,
    })
      .done((data) => {
        // // todo: on success increment the quanity on client side
        console.log(data);
        let price = Number(
          ele
            .parent()
            .parent()
            .children(".price-section")
            .children(".my-price")
            .text()
        );
        let cartValue = $("#cart-value");
        const getCartValue = Number(cartValue.text());
        let value = Number($(quantityEle).text()) + 1;
        $(quantityEle).text(value);
        let totalValue = (price + getCartValue).toFixed(2);
        cartValue.text(totalValue);
      })
      .fail((xhr, statusText) => {
        console.log(statusText);
        // alert(statusText);
      });
  });

  // ajax to decrement quanity
  $(".decrement").click(function (e) {
    // // todo: update value on clicking  + btn
    let ele = $(this);
    let productId = ele.attr("data-id");
    // let type = "POST";
    // let url = `/user/addToCart/?productId=${productId}`;
    // ! Fixme: change url to add to cart
    let type = "GET";
    let url = "/states-and-districts"; //! temprory url
    let quantityEle = ele
      .parent()
      .parent()
      .children(".my-qty")
      .children(".qty-section");
    $.ajax({
      type,
      url,
      contentType: "application/json",
      data: {},
    })
      .done((data) => {
        console.log(data);
        // // todo: on success increment the quanity on client side
        let ele = $(quantityEle);
        let price = ele
          .parent()
          .parent()
          .children(".price-section")
          .children(".my-price")
          .text();
        let cartValue = $("#cart-value");
        const getCartValue = Number(cartValue.text());
        if (Number(ele.text()) === 1) {
          let totalValue = (getCartValue - price).toFixed(2);
          cartValue.text(totalValue);
          // remove parent element
          ele.closest("div.my-col").remove();
        } else {
          // make a decrement
          let value = Number(ele.text()) - 1;
          let totalValue = (getCartValue - price).toFixed(2);
          cartValue.text(totalValue);
          ele.text(value);
        }
      })
      .fail((xhr, statusText) => {
        alert(statusText);
      });
  });
});
