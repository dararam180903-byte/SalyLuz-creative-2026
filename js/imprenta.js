

const panels = document.querySelectorAll(".panel")
const container = document.querySelector(".adicontainer")

panels.forEach(panel => {

panel.addEventListener("click", () => {

if(panel.classList.contains("active")){
panel.classList.remove("active")
container.classList.remove("expanded")
}else{

panels.forEach(p => p.classList.remove("active"))

panel.classList.add("active")
container.classList.add("expanded")

}

})

})


document.addEventListener("keydown", e =>{

if(e.key === "Escape"){

panels.forEach(p => p.classList.remove("active"))
container.classList.remove("expanded")

}

})

