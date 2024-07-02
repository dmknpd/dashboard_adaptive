document.addEventListener("DOMContentLoaded", function () {
  const openButton = document.querySelector(".sidebar__open");
  const mobileMenu = document.querySelector(".dashboard__mobile-menu ");
  const sidebar = document.querySelector(".sidebar");
  const body = document.querySelector("body");

  function openMenu() {
    sidebar.classList.toggle("toggle");
    body.classList.toggle("modal-open");
  }

  // -----Mini-menu-open-----
  openButton.addEventListener("click", () => {
    openMenu();
    openButton.classList.toggle("toggle");
  });

  // -----Mobile-menu-open-----
  mobileMenu.addEventListener("click", () => {
    openMenu();
    sidebar.classList.toggle("mobile");
  });

  // -----Modal-close-----
  body.addEventListener("click", (e) => {
    if (e.target.className === "modal-open") {
      body.classList.remove("modal-open");
      sidebar.classList.remove("mobile");
      openButton.classList.remove("toggle");
      sidebar.classList.toggle("toggle");
    }
  });
});
