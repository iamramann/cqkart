const app = require("../app");
const {
  calculateDiscount,
  getAllCategories,
  calculteTotalAmount,
} = require("../helper/helper");
app.locals.calculateDiscount = calculateDiscount;
app.locals.calculteTotalAmount = calculteTotalAmount;
app.locals.brandName = "CQKart";
app.locals.copyright = "Ⓒ Copyright 2021 CQKart, All Rights Reserved.";
app.locals.months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
getAllCategories(function (data) {
  app.locals.allCategories = data;
});
