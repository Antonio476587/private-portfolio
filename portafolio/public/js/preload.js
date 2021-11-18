"use strict";

// const and data
const paths = document.querySelectorAll(".svg path");
const preload = document.querySelector(".preload");

//match media 
const mq = matchMedia("(min-width:992px)");

// Inicio de animation preload
    if (mq.matches) {
        for (let i = 0; i < paths.length; i++) {
            const path = paths[i];
            path.style.animation = `movimiento 3s ease-in-out alternate`;
            path.style.animationIterationCount = "2";
        };
        setTimeout(() => {
            preload.classList.add("animate__animated","animate__fadeOut")    
        }, 5000);
        setTimeout(() => {
            preload.setAttribute("hidden","");             
        }, 6000);
    } else {
        preload.setAttribute("hidden","");
        document.querySelector(".con-welcome").style.animationDelay = "1000ms";
    }
