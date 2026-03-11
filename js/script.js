// Animación ligera de aparición

document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".btn");

    buttons.forEach((btn, index) => {
        btn.style.opacity = "0";
        btn.style.transform = "translateY(20px)";

        setTimeout(() => {
            btn.style.transition = "0.5s ease";
            btn.style.opacity = "1";
            btn.style.transform = "translateY(0)";
        }, index * 200);
    });
});


function toggleMenu(){

    const menu = document.getElementById("menu");
    const light = document.getElementById("lightBtn");

    menu.classList.toggle("active");
    light.classList.toggle("active");
}




