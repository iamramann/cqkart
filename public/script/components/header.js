const bars = document.querySelector("#bars");
bars.addEventListener("click", (e) => {
  let navigation = document.querySelector(".navigation");
  let toggle = document.querySelector(".toggle");
  navigation.classList.toggle("active");
  toggle.classList.toggle("active");
});
