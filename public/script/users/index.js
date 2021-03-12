import "../components/header.js";
let viewDescBtns = document.querySelectorAll(".view-desc");

viewDescBtns.forEach((btn, index) => {
  btn.addEventListener("mouseover", (e) => {
    e.target.style.backgroundColor = "#ea1d63";
  });
  btn.addEventListener("mouseout", (e) => {
    e.target.style.backgroundColor = "#4267b2";
  });
});

let addToCartBtns = document.querySelectorAll(".add-to-cart");
addToCartBtns.forEach((btn, index) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    //TODO: ADD TO CART FUNCTIONALITY HERE
  });
});

const dropdown = document.querySelector(".dropdown-categories");
dropdown.addEventListener("change", (e) => {
  const { value } = e.target;
  window.open(`/user/getList/${value}`, "_self");
});

$(".addToCart").click(function (e) {
  e.preventDefault();
  const ele = $(this);
  const url = $(this).attr("href");
  const spinner = ele.siblings()[2];
  const gotoCart = ele.siblings()[1];
  $.ajax({
    type: "POST",
    url: url,
    contentType: "application/json",
    data: {},
    beforeSend: function () {
      ele.addClass("d-none");
      $(spinner).removeClass("d-none");
    },
  })
    .done((data) => {
      console.log(data);
      $(spinner).addClass("d-none");
      $(gotoCart).removeClass("d-none");
    })
    .fail((xhr, statusText) => {
      console.log(statusText);
    });
});
