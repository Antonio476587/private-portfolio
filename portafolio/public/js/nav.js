"use strict";

// This is for menu
const btnsAbrir = document.querySelectorAll(".abrir");

const btnsCerrar = document.querySelectorAll(".cerrar");
 
const menu = document.querySelectorAll(".menu");

const menuLinks = document.querySelectorAll(".menu-link");

// These are contact links
const contactsLinks = document.querySelectorAll(".contact__link");

// Callback of redirections

const redirect = (ctc)=>{
    if (ctc.title=="facebook"){
        ctc.addEventListener("click",()=>window.locatin.assign("https://www.freelancer.com/u/AntonioServicio")
        )
    };
    if (ctc.title=="twitter"){
        ctc.addEventListener("click",()=>window.location.assign("https://twitter.com/AntonioCab111")
        )
    };
    if (ctc.title=="instagram"){
        ctc.addEventListener("click",()=>window.location.assign ("https://www.instagram/theheredero")
        )
    };
    if (ctc.title=="github"){
        ctc.addEventListener("click",()=>window.location.assign ("https://github.com/Antonio476587")
        )
    }
};

const redirectMenu = (l)=>{
    if (l.title=="home"){
        l.addEventListener("click",()=>window.location.assign("/#Home")
        )
    };
    if (l.title=="about"){
        l.addEventListener("click",()=>window.location.assign("/#About")
        )
    };
    if (l.title=="contact"){
        l.addEventListener("click",()=>window.location.assign ("/#Contact")
        )
    };
    l.addEventListener("click",()=>{
        for (const i of menu) {
        i.classList.remove("d-flex");
        i.setAttribute("hidden","");
        }
    })
};


// Looping to redirecting application
for (let i = 0; i < contactsLinks.length; i++) {
    const contact = contactsLinks[i];
    redirect(contact);
    contact.addEventListener("mouseover",()=>{
        contact.style.cursor = "crosshair";
    });
    contact.addEventListener("mouseout",()=>{
        contact.style.cursor = "default";
    })   
}

// Display menu

for (let i = 0; i < btnsAbrir.length; i++) {
    const btn = btnsAbrir[i];
    btn.addEventListener("click",()=>{
        menu[i].removeAttribute("hidden");
        menu[i].classList.add("d-flex");
    });
}

// Close menu

for (let i = 0; i < btnsCerrar.length; i++) {
    const btn = btnsCerrar[i];
    btn.addEventListener("click",()=>{
        menu[i].classList.remove("d-flex");
        menu[i].setAttribute("hidden","");
    });
}

// Beatiful cursor

for (let i = 0; i < menuLinks.length; i++) {
    const link = menuLinks[i];
    link.addEventListener("mouseover",()=>{
        link.style.cursor = "crosshair";
    });
    link.addEventListener("mouseout",()=>{
        link.style.cursor = "default";
    });
    redirectMenu(link);
};

