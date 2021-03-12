$(document).ready(function () {
  const $resetBtn = $("#resetBtn"),
    $form = $("#newProduct"),
    $addBtn = $("#addBtn"),
    $productId = $("#productId"),
    $title = $("#title"),
    $price = $("#price"),
    $discount = $("#discount"),
    $quantity = $("#quantity"),
    $description = $("#description"),
    $fileUpload = $("#fileUpload"),
    $errorMsg = $(".error-msg"),
    $titleError = $("#name-error"),
    $priceError = $("#price-error"),
    $fileError = $("#file-error"),
    $discountError = $("#discount-error"),
    $quantityError = $("#quantity-error"),
    $descriptionError = $("#description-error"),
    $titleMsg = "product Name cannot be empty",
    $priceMsg = "please enter a valid price",
    $discountMsg = "please enter a valid discount",
    $quantityMsg = "please enter a valid qunatity",
    $descriptionMsg = "product must have a description",
    $fileMsg = "please select a file",
    $loadSampleDataBtn = $("#loadSampleData"),
    $category = $("#category"),
    categoriesArray = [
      "shoes",
      "electronics",
      "home and comfort",
      "men clothing",
      "food and beverages",
      "jewelery",
      "women clothing",
    ],
    onlyNumberRegEx = /^\d+$/,
    $myProductTable = $("#my-table");

  //! testing purpose only
  $loadSampleDataBtn.click((e) => {
    $title.val(faker.commerce.productName());
    $price.val(faker.random.number());
    $discount.val(Math.floor(Math.random() * 100 + 1));
    $description.val(faker.lorem.paragraph());
    $category.prop("selectedIndex", Math.floor(Math.random() * 5 + 1));
    $quantity.val(Math.floor(Math.random() * 100 + 1));
  });

  setProductId($productId);

  $title.keyup(function (e) {
    const value = e.target.value;
    if (value.length > 0) {
      $titleError.addClass("d-none");
    } else {
      $titleError.removeClass("d-none");
    }
  });

  $price.keyup(function (e) {
    const val = Number(e.target.value);
    if (isNaN(val) || val <= 0) {
      $priceError.text(`(${$priceMsg})`);
      $priceError.removeClass("d-none");
    } else {
      $priceError.text("");
      $priceError.addClass("d-none");
    }
  });

  $discount.keyup(function (e) {
    const val = Number(e.target.value);
    // console.log(val);
    if (isNaN(val) || val < 0 || val > 100) {
      $discountError.text(`(${$discountMsg})`);
      $discountError.removeClass("d-none");
    } else {
      $discountError.text("");
      $discountError.addClass("d-none");
    }
  });

  $quantity.keyup(function (e) {
    const val = Number(e.target.value);
    if (isNaN(val) || val <= 0) {
      $quantityError.text(`(${$quantityMsg})`);
      $quantityError.removeClass("d-none");
    } else {
      $quantityError.text("");
      $quantityError.addClass("d-none");
    }
  });

  $description.keyup(function (e) {
    const val = e.target.value;
    if (val.length === 0 || val.length > 400) {
      $descriptionError.text(`(${$descriptionMsg})`);
      $descriptionError.removeClass("d-none");
    } else {
      $descriptionError.text("");
      $descriptionError.addClass("d-none");
    }
  });

  $fileUpload.change(function (e) {
    const val = e.target.value;
    if (val.length === 0) {
      $fileError.text(`(${$fileMsg})`);
      $fileError.removeClass("d-none");
    } else {
      $fileError.text("");
      $fileError.addClass("d-none");
    }
  });

  $addBtn.click(function (e) {
    const $formx = $("#newProduct")[0],
      type = $form.attr("method"),
      url = $form.attr("action"),
      data = new FormData($formx);

    // unhide all error msgs span
    $errorMsg.each(function (index) {
      if ($(this).hasClass("d-none")) {
        $(this).removeClass("d-none");
      }
    });

    const titleValue = $title.val(),
      priceValue = Number($price.val()),
      discountValue = $discount.val(),
      qunatityValue = Number($quantity.val()),
      descriptionValue = $description.val(),
      fileValue = $fileUpload.val();
    // console.log(titleValue);
    if (titleValue.length === 0) {
      setErrorMsg($titleError, $titleMsg);
      return;
    } else if (isNaN(priceValue) || priceValue <= 0) {
      setErrorMsg($priceError, $priceMsg);
      return;
    } else if (isNaN(qunatityValue) || qunatityValue <= 0) {
      setErrorMsg($quantityError, $quantityMsg);
      return;
    } else if (descriptionValue.length === 0 || descriptionValue.length > 400) {
      setErrorMsg($descriptionError, $descriptionMsg);
      return;
    } else if (fileValue.length === 0) {
      setErrorMsg($fileError, $fileMsg);
      return;
    }
    // // todo: input validation
    // data = $form.serialize(),
    // ajax to add new product
    $.ajax({
      xhr: function () {
        $(".progress").removeClass("d-none");
        var xhr = new window.XMLHttpRequest();
        xhr.upload.addEventListener(
          "progress",
          function (evt) {
            if (evt.lengthComputable) {
              var percentComplete = (evt.loaded / evt.total) * 100;
              $(".progress-bar").width(percentComplete + "%");
              $(".progress-bar").html(percentComplete + "%");
            }
          },
          false
        );
        return xhr;
      },
      type,
      url,
      data,
      processData: false,
      contentType: false,
      beforeSend: function () {
        $(".progress-bar").width("0%");
        $("#uploadStatus").html('<img src="images/loading.gif"/>');
      },
    })
      .done((data) => {
        $(".progress").addClass("d-none");
        let { product, msg } = data;
        alert(msg);
        let {
          title,
          price,
          discount,
          quantity,
          _id,
          category,
          description,
        } = product;
        // console.log(data.product);
        setProductId($productId);
        // // todo: create a row in product table for newly added product
        const rowCount = $("#my-table tr").length;

        /*
         ! Fixme: when we add a product and display the added product by using manipulating DOM then the newly added product's edit btn won't work.
         * the reason might be is when we add a product the event listener in productsTable doesn't attached to newly created element bcoz page is already  rendered.
         */

        $myProductTable.append(
          `<tr class="disable-row-x">
                  <td class="fw-bold" aria-readonly="true">${rowCount}</td>
                  <td contenteditable="false" class="getValue my-name" data-name="title" style="width:100px;word-wrap: break-word;">${title}</td>
                  <td contenteditable="false"  class="getValue my-price" data-name="price">${price}</td>
                  <td contenteditable="false"  class="getValue my-discount" data-name="discount">${discount}</td>
                  <td contenteditable="false"  class="getValue my-quantity" data-name="quantity">${quantity}</td>
                  <!-- <td aria-readonly="true"><%#=productId%></td> -->
                  <td aria-readonly="true">${_id}</td>
                  <td class="mongoId" hidden>${_id}</td>
                  <td><a href="<%-image%>" target="_blank">view</a></td>
                  <!-- <td>${description}</td>  -->
                  <td class="text-capitalize">${category}</td>
                  <td>
                    <button class="btn-outline-primary editProduct"  title="edit" id="editProduct">
                      <i class="fa fa-pencil" aria-hidden="true"></i>
                    </button>
                    <!-- <button class="btn-success d-none updateProduct" data-confirm="Are you sure to update product" data-product-id="${_id}" data-url="/updateProduct" title="update" id="updateProduct">
                      <i class="fa fa-check" aria-hidden="true"></i>
                    </button> -->
                    <button class="btn-success d-none updateProduct" data-confirm="Are you sure to update product" data-product-id="${_id}" data-url="/updateProductDetails/${_id}" title="update" id="updateProduct">
                      <i class="fa fa-check" aria-hidden="true"></i>
                    </button> 
                    <button class="btn-danger d-none deleteProduct" data-confirm="Are you sure to delete this Product"
                    data-url="/deleteProduct/${_id}" data-product-id="${_id}" title="delete" id="deleteProduct">
                      <i class="fa fa-trash" aria-hidden="true"></i>
                    </button>
                    <button class="btn-secondary d-none cancel" title="cancel" id="cancel">
                      <i class="fa fa-times" aria-hidden="true"></i>
                    </button>
                  </td>
                </tr>
          `
        );
      })
      .fail(function (xhr, statusText) {
        alert("Fail to add product");
      })
      .always(function () {
        $form.trigger("reset");
      });
  });

  // reset form
  $resetBtn.click(function (e) {
    // reset form
    $form.trigger("reset");

    // get a new productId
    setProductId($productId);

    // hide all error msgs span
    $errorMsg.each(function (index) {
      if (!$(this).hasClass("d-none")) {
        $(this).addClass("d-none");
      }
    });
  });

  // helper function to set product Id
  function setProductId(ele) {
    $.ajax({
      url: "/getProductId",
      type: "GET",
    })
      .done((data) => {
        ele.val(data);
      })
      .fail((xhr, statusText) => {
        console.log("error");
      });
  }
});

function setErrorMsg(ele, msg) {
  ele.text(`(${msg})`);
  return;
}
