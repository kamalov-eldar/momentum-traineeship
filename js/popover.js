const popperButton = document.querySelector("#popper-button");
const popperPopup = document.querySelector("#popper-popup");
const closeСrossButton = document.querySelector("#closeСrossButton");
const closeButton = document.querySelector("#closeButton");

popperButton.addEventListener("click", function (e) {
    e.preventDefault();
    if (popperPopup.hasAttribute("show-popper")) {
        popperPopup.removeAttribute("show-popper");
    } else {
        popperPopup.setAttribute("show-popper", "");
    }
});

closeСrossButton.addEventListener("click", function (e) {
    e.preventDefault();
    popperPopup.removeAttribute("show-popper");
});

closeButton.addEventListener("click", function (e) {
    e.preventDefault();
    popperPopup.removeAttribute("show-popper");
});
