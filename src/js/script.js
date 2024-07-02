document.addEventListener("DOMContentLoaded", function () {
  const openButton = document.querySelector(".sidebar__open");
  const mobileMenu = document.querySelector(".dashboard__mobile-menu ");
  const sidebar = document.querySelector(".sidebar");
  const body = document.querySelector("body");
  const modal = document.querySelector("modal-open");

  openButton.addEventListener("click", () => {
    sidebar.classList.toggle("toggle");
    openButton.classList.toggle("toggle");
    body.classList.toggle("modal-open");
  });

  mobileMenu.addEventListener("click", () => {
    sidebar.classList.toggle("mobile");
    sidebar.classList.toggle("toggle");
    body.classList.toggle("modal-open");
  });

  body.addEventListener("click", (e) => {
    if (e.target.className === "modal-open") {
      body.classList.remove("modal-open");
      sidebar.classList.toggle("mobile");
      sidebar.classList.toggle("toggle");
    }
  });
});
