const errorColor = { color: "red" };
const tickIconColor = { color: "rgb(53, 173, 53)" };
const defaultIconColor = {
  color: "rgb(104, 93, 93)",
};
const errorClasses = ["mb-0", "text-start", "error-msg", "text-danger"];
const addErrorClasses = (element) => {
  errorClasses.forEach((classx, index) => {
    element.addClass(classx);
  });
};
export { errorColor, tickIconColor, defaultIconColor, addErrorClasses };
