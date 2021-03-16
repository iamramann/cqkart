const $editProduct = $(".editProduct");
const $updateProduct = $(".updateProduct");
const $deleteProduct = $(".deleteProduct");
const $cancel = $(".cancel");
const displayNone = "d-none";
const disableRowClass = "disable-row-x";
const title = $(".my-name");

// helper function
const getParentRow = (ele) => {
  return $(ele.parent().parent()[0]);
};

const toggleTDS = (parent, value) => {
  const tds = parent.find("td");
  tds.each(function (i) {
    if ($(this).attr("contenteditable")) {
      $(this).attr("contenteditable", value);
    }
  });
};

// edit product btn
$editProduct.each(function (index) {
  const ele = $(this);
  ele.click(function (e) {
    const $parentRow = getParentRow(ele);
    $parentRow.removeClass(disableRowClass);
    toggleTDS($parentRow, true);
    const siblingsBtn = ele.siblings(); //get siblings
    // unhide btn
    siblingsBtn.each(function (e) {
      $(this).removeClass(displayNone);
    });
    // hide current btn
    ele.hide();
  });
});

//! Fixme: error while updating product when discount is "NA"
// update product btn
$updateProduct.each(function (index) {
  const ele = $(this);
  ele.click(function (e) {
    let flag = false;
    const url = ele.attr("data-url");

    const id = ele.attr("data-product-id");
    const $parentRow = getParentRow(ele);
    const $childs = $parentRow.children();
    let $name = $parentRow.children(".my-name");
    let $price = $parentRow.children(".my-price");
    let $discount = $parentRow.children(".my-discount");
    let $quantity = $parentRow.children(".my-quantity");
    let $mongoId = $parentRow.children(".mongoId");
    let messagex = "";

    // // todo: create data object
    const data = {
      id,
    };

    // // todo: validate input before sending to the server
    let name = $name.text();
    let price = $price.text();
    let discount = $discount.text();
    let quantity = $quantity.text();
    let mongoId = $mongoId.text();
    if (name.length >= 5) {
      // set flag
      flag = true;
    } else {
      messagex = "Name must be greater then 5 characters";
      flag = false;
    }
    // console.log(messagex);

    if (flag) {
      if (!isNaN(Number(price)) && Number(price) > 0) {
        flag = true;
      } else {
        messagex = "Price must be a +ve Number";
        flag = false;
      }
    }
    // console.log(messagex);
    if (flag) {
      if (!isNaN(Number(quantity)) && Number(quantity) > 0) {
        flag = true;
      } else {
        messagex = "Quantity must be a +ve Number";
        flag = false;
      }
    }
    // console.log(messagex);

    if (discount === "NA") {
      // do nothing
    } else if (flag) {
      if (
        !isNaN(Number(discount)) &&
        Number(discount) > 0 &&
        Number(discount) < 100 &&
        flag
      ) {
        flag = true;
      } else {
        flag = false;
        messagex = "Please enter a valid discount rate";
      }
    }
    // console.log(messagex);

    // // ! Fixme: whenever discount is NA we reomve discount key and server side undefined is recieved which throws error
    $childs.each(function (i) {
      if ($(this).hasClass("getValue")) {
        let attr = $(this).attr("data-name");
        let value =
          attr === "quantity" || attr === "price" || attr === "discount"
            ? !isNaN(Number($(this).text()))
              ? Number($(this).text())
              : null
            : $(this).text();

        data[attr] = value;
      }
    });

    //! one-liner to remove null keys from an object This mutates the given object instead of returning a new one.
    Object.keys(data).forEach((k) => data[k] == null && delete data[k]);

    const message = ele.attr("data-confirm");
    const choice = window.confirm(message);
    console.log(url);
    if (choice && flag) {
      // ajax to update the product
      $.ajax({
        url: url,
        type: "PATCH",
        contentType: "application/json",
        data: JSON.stringify(data),
      })
        .done(function (data) {
          if (data.isUpdated) {
            alert(data.msg);
            $parentRow.addClass(disableRowClass);
            $cancel.trigger("click");
          } else {
            alert(data.msg);
            const { title, discount, price, quantity } = data.product;
            $name.text(title);
            $price.text(price);
            $discount.text(discount);
            $quantity.text(quantity);
            $parentRow.addClass(disableRowClass);
            $cancel.trigger("click");
          }
        })
        .fail(function (xhr, statusText) {
          alert(statusText);
        });
    } else {
      $.ajax({
        type: "GET",
        url: `/getProductDetails/${mongoId}`,
      })
        .done((data) => {
          alert(messagex);
          const { title, discount, price, quantity } = data;
          $name.text(title);
          $price.text(price);
          $discount.text(discount);
          $quantity.text(quantity);
          $parentRow.addClass(disableRowClass);
          $cancel.trigger("click");
        })
        .fail((xhr, statusText) => {
          alert(statusText);
        });
    }
  });
});

// delete product btn
$deleteProduct.each(function (index) {
  const ele = $(this);
  const $parentRow = getParentRow(ele);
  ele.click(function (e) {
    const url = ele.attr("data-url");
    const id = ele.attr("data-product-id");
    const message = ele.attr("data-confirm");
    const choice = window.confirm(message);

    if (choice) {
      // //  ajax to remove a product from the display
      $.ajax({
        url: url,
        type: "DELETE",
        // contentType: "application/json",
        // data: JSON.stringify({ id }),
      })
        .done(function () {
          // // todo: delete current row from the DOM
          alert("Product successfully deleted");
          $parentRow.remove();
        })
        .fail(function (xhr, statusText) {
          alert(statusText);
        });
    }
  });
});

// cancel btn
$cancel.each(function (index) {
  const ele = $(this);
  ele.click(function (e) {
    // // todo: make row disable again and hide action buttons
    const $parentRow = getParentRow(ele);
    const siblingsBtn = ele.siblings(); //get siblings
    toggleTDS($parentRow, false);

    $(siblingsBtn[0]).show();
    $(siblingsBtn[1]).addClass(displayNone);
    $(siblingsBtn[2]).addClass(displayNone);
    ele.addClass(displayNone);
    $parentRow.addClass(disableRowClass);
  });
});
