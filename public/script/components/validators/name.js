const $name = $("#name");
$name.keyup(function (e) {
  const value = $(this).val();
  $name.val(value.toUpperCase());
});
