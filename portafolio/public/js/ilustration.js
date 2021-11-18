"use strict";

// Overlayer
const overlay = document.querySelector(".overlayer");

// Buttons
const btnCI1 = document.querySelector(".btn-c-div-1");
const btnCI2 = document.querySelector(".btn-c-div-2");
const btnsDisplayAbs = document.querySelectorAll(".btn-display-abs");
const btnCloserAbs = document.querySelectorAll(".btn-closer-abs");
const btnLayerover = document.querySelector(".btn-layerover");

// Me and Simón
const simonAntonio = document.getElementById("simon-antonio");
const simon = document.getElementById("simon");

const antonioSimon = document.getElementById("antonio-simon");
const antonio = document.getElementById("antonio");

// Ilustration
const miniYo = document.querySelector(".container-mini-yo");

// Abilities
const graphicDesign = document.querySelector(".graphic__design");
const langs = document.querySelector(".langs");
const programming = document.querySelector(".programming");
const info = document.querySelector(".info");

// Children Buttons (Consider for Loop)
const btn1 = btnsDisplayAbs[0];
const btn2 = btnsDisplayAbs[1];
const btn3 = btnsDisplayAbs[2];
const btn4 = btnsDisplayAbs[3];

const btnC1 = btnCloserAbs[0];
const btnC2 = btnCloserAbs[1];
const btnC3 = btnCloserAbs[2];
const btnC4 = btnCloserAbs[3];

// Desplegar About

btnLayerover.addEventListener("click",()=>{
    about.classList.replace("closed","open");
    overlay.setAttribute("hidden","");
})

// Animation functions to abilities

// Display Function
const display = (abs,animationNew)=>{
    if (mdq.matches){
        for (let i = 0; i < btnsDisplayAbs.length; i++) {
            const bt = btnsDisplayAbs[i];
            bt.style.display = "none";
        }
    } else miniYo.setAttribute("hidden", ""); 
    abs.style.display="block";
    abs.classList.remove(abs.classList[4]);
    abs.classList.add("animate__animated", animationNew);
};

// Close function
const close = (abs,animationNew)=>{
    abs.classList.remove(abs.classList[4]);
    abs.classList.add(animationNew);
    setTimeout(() => {
        abs.style.display="none";
        if (mdq.matches){
            for (let i = 0; i < btnsDisplayAbs.length; i++) {
                const bt = btnsDisplayAbs[i];
                bt.style.display = "block";
            }
        } else miniYo.removeAttribute("hidden");
    }, 1000);
}

// Media querie on destokps
const mdq = matchMedia("(min-width:992px)");

// Change img of me or simon function

const change = (a,b, backclass)=>{
    if(a.classList.contains("front")){
        a.classList.replace("front",backclass);
        b.classList.replace(backclass,"front")
    } else {
        a.classList.replace(backclass,"front");
        b.classList.replace("front",backclass);
    }
}

// Listeners of img change

btnCI1.addEventListener("click",()=>{
    change(simonAntonio, simon, "back");
});

btnCI2.addEventListener("click",()=>{
    if (mdq.matches) {
        antonio.classList.remove("back");
        change(antonioSimon,antonio,"backtwo")}
    else change(antonioSimon, antonio, "back");
});

// Estos son los eventos de graphic design
btn1.addEventListener("click", () => {
    if (mdq.matches) display(graphicDesign,"animate__fadeInTopRight"); else display(graphicDesign,"animate__bounceIn");
});
btnC1.addEventListener("click", () => {
    if (mdq.matches) close(graphicDesign,"animate__flipOutY"); else close(graphicDesign,"animate__bounceOutLeft");
});

// Estos son los eventos de langs
btn2.addEventListener("click", () => {
    if (mdq.matches) display(langs,"animate__zoomInRight"); else display(langs,"animate__zoomInDown");
});
btnC2.addEventListener("click", () => {
    if (mdq.matches) close(langs,"animate__zoomOutDown"); else close(langs,"animate__zoomOut");
});

// Estos son los eventos de programming
btn3.addEventListener("click", () => {
    if (mdq.matches) display(programming,"animate__rotateIn"); else display(programming,"animate__fadeInUp");
});
btnC3.addEventListener("click", () => {
    if (mdq.matches) close(programming,"animate__zoomOut"); else close(programming,"animate__fadeOut");
});

// Estos son los eventos de info
btn4.addEventListener("click", () => {
    if (mdq.matches) display(info,"animate__bounceIn");
    else display(info,"animate__flipInX");
});
btnC4.addEventListener("click", () => {
    if (mdq.matches) close(info,"animate__bounceOut");
    else close(info,"animate__fadeOutUp");
});

