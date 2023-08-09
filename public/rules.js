var accordions = document.getElementsByClassName("accordion");
var accordionButtons = document.getElementsByClassName("accordion-button");

document.addEventListener("DOMContentLoaded", function () {
    for (var i = 0; i < accordionButtons.length; i++) {
        accordionButtons[i].addEventListener("click", function () {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel) {
                if (panel.style.display === "block") {
                    panel.style.display = ""; // Remove the 'display' property
                } else {
                    panel.style.display = "block";
                }
            }
        });
    }
});

for (var i = 0; i < accordions.length; i++) {
    accordions[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel) {
            if (panel.style.display === "block") {
                panel.style.display = ""; // Remove the 'display' property
            } else {
                panel.style.display = "block";
            }
        }
    });
}
