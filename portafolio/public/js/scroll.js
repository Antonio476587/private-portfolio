"use strict";

// HTML Nodes
const home = document.querySelector(".home");
const about = document.querySelector(".about");
const contact = document.querySelector(".contact");
const body = document.querySelector(".body");
const aboutDiv = document.querySelector(".about-div");
// Overlayer
const overlayer = document.querySelector(".overlayer");

// variable

let desactive = true;

// To start at end
addEventListener("load", () => scrollTo(0, home.offsetTop))

// Callback observer
const behaviorScrolling = (observes) => {
    for (const ob of observes) {
        if (ob.isIntersecting) {
            scrollTo(0, ob.target.offsetTop);
            if (ob.target == home && mq.matches) {
                animateHome();
            } else if (ob.target == about && mq.matches) {
                animateAbout();
                desAnimateHome();
            } else if (ob.target == contact && mq.matches) {
                desAnimateHome();
            };
            if (ob.target !== home) {
                document.querySelector(".fa-arrow-up").classList.remove("any-infinite");
            };
            if (ob.target !== about && about.classList.contains("open")) {
                about.classList.replace("open", "closed");
                overlayer.removeAttribute("hidden");
            };
        }
    };
};

// observer options
const options = {
    rootMargin: "-70px"
};


// Observer declaration
setTimeout(() => {
    const obersver = new IntersectionObserver(behaviorScrolling, options);
    // Observed objects
    obersver.observe(home);
    obersver.observe(about);
    obersver.observe(contact);
    if (mq.matches == false) alert("Para ver todas las animaciones, ingresa desde una PC");
}, 6000);


// Animations starts

// Home animation
let grados = 0;

let bgAnimation;

const animateHome = () => {
    bgAnimation = setInterval(() => {
        if (grados == 360) grados = 0;
        document.querySelector(".img-bg-c").style.transform = `perspective(1000px) rotate3d(0,1,0,${grados}deg)`;
        grados = grados + 5;
    }, 100);
}

// About animation 


function randomValues() {
    anime({
        targets: [".svg-square", ".svg-triangle", ".svg-polygon", ".svg-line"],
        easing: 'easeInOutQuad',
        duration: 4000,
        scale: function () { return anime.random(0.5, 1.5); },
        translateX: function () { return anime.random(-200, 200); },
        translateY: function () { return anime.random(-200, 200); },
        rotate: function () { return anime.random(0, 360); 
        },
        complete: randomValues
    });
}

const animateAbout = () => {
    if (desactive) {
        randomValues();
        desactive = false;
    }
};

    // There are the svg elements to animate in about

    if (mq.matches) {
        const fragment = document.createDocumentFragment();

        for (let i = 0; i < 40; i++) {

            const div = document.createElement("div");

            if (i > 9 && i < 20) {
                div.classList.add("svg-div", "triangle");
                div.innerHTML = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 50 50" xml:space="preserve" class="svg-triangle">
            <polygon points="1.5,45.351 25,4.648 48.5,45.351 "/>
            </svg>
            `;
                div.style.top = `${Math.round(Math.random() * 90)}%`;
                div.style.left = `${Math.round(Math.random() * 98)}%`;
            } else if (i > 19 && i < 30) {
                div.classList.add("svg-div", "polygon");
                div.innerHTML = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 50 50" xml:space="preserve" class="svg-polygon">
            <polygon points="10.305,47.613 1.224,19.662 25,2.387 48.776,19.662 39.694,47.613 "/>
            </svg>
            `;
                div.style.top = `${Math.round(Math.random() * 90)}%`;
                div.style.left = `${Math.round(Math.random() * 98)}%`;
            } else if (i > 29) {
                div.classList.add("svg-div", "line");
                div.innerHTML = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 50 50" xml:space="preserve" class="svg-line">
            <line stroke-linecap="round" stroke-miterlimit="10" x1="2.625" y1="47.5" x2="47.875" y2="1.875"/>
            </svg>
            `;
                div.style.top = `${Math.round(Math.random() * 90)}%`;
                div.style.left = `${Math.round(Math.random() * 98)}%`;
            }
            else {
                div.classList.add("svg-div", "square");
                div.innerHTML = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 50 50" xml:space="preserve" class="svg-square">
            <rect x="2.5" y="2.5" width="45" height="45"/>
            </svg>
            `;
                div.style.top = `${Math.round(Math.random() * 90)}%`;
                div.style.left = `${Math.round(Math.random() * 98)}%`;
            }
            fragment.appendChild(div);
        }

        aboutDiv.appendChild(fragment);
    };

    // Animations ends
    const desAnimateHome = () => {
        clearInterval(bgAnimation);
    };