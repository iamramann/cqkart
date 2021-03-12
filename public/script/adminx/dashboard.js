import "/script/adminx/dashboard/deleteUser.js";
import "/script/adminx/dashboard/modifyProducts.js";
import "/script/adminx/dashboard/newProduct.js";
$(document).ready(function () {
  // ajax to get all product categories
  $.ajax({
    type: "GET",
    url: "/getCategories",
  })
    .done((data) => {
      let ul = $("#allCategories");
      if (data && data.length) {
        data.forEach((category, index) => {
          ul.append(
            `<li class="m-2 text-capitalize text-muted">
              <a href="/dashboard/${category}" style="text-decoration: none;">${category}</a>
            </li>`
          );
        });
      } else {
        ul.append(
          `<li class="m-2 text-capitalize text-muted"> no other categories </li>`
        );
      }
    })
    .fail((xhr, statusText) => {
      console.log(statusText);
    });
});
