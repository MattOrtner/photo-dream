document.addEventListener("DOMContentLoaded", function () {
  const previousSearchContainer = document.getElementById(
    "previousSearchContainer"
  );

  const elementTop =
    previousSearchContainer.getBoundingClientRect().top + window.pageYOffset;

  window.addEventListener("scroll", function () {
    if (window.pageYOffset >= elementTop) {
      previousSearchContainer.classList.add("sticky");
    } else {
      previousSearchContainer.classList.remove("sticky");
    }
  });
});
