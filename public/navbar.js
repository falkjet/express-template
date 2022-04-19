for (const menu of document.getElementsByClassName("navbar-menu")) {
  const buttons = menu.parentElement.getElementsByClassName("navbar-burger");
  for (const button of buttons) {
    button.addEventListener("click", () => {
      menu.classList.toggle("is-active");
    });
  }
}
