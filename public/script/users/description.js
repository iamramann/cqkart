import "../components/header.js";
import "/script/components/pwdModal.js";
$("#btn-cart").click(function (e) {
  const ele = $(this);
  const url = $(this).attr("data-link");
  // const spinner = ele.siblings()[2];`
  // todo: when add spinner make changes here
  const gotoCart = ele.siblings();
  // console.log(gotoCart);
  // console.log(spinner);
  $.ajax({
    type: "POST",
    url: url,
    contentType: "application/json",
    data: {},
    beforeSend: function () {
      ele.addClass("d-none");
      // $(spinner).removeClass("d-none");
    },
  })
    .done((data) => {
      console.log(data);
      // $(spinner).addClass("d-none");
      $(gotoCart)
        .removeClass("d-none")
        .addClass("btn btn-outline-btn-secondary p-2 text-capitalize w-100");
    })
    .fail((xhr, statusText) => {
      console.log(statusText);
    });
});

// let info = faker.helpers.createCard();
// // let infox = faker.commerce.createCard();
// let {
//   name,
//   email,
//   address: { city, country, zipCode },
// } = info;
// // let { color } = infox;
// console.log(faker.random.uuid());
// console.log(faker.commerce.color());
// console.log(faker.internet.avatar());
// console.log(faker.phone.phoneNumber());
// console.log(name, email, city);
