// const and data
const paths = document.querySelectorAll(".svg path");
const preload = document.querySelector(".preload");

const windowLocation = window.location;
let animation1;
let animation2;

let windowLoaded = false;

const colors = [
    "rgb(0, 94, 94)",
    "rgb(33, 34, 34))",
    "rgb(38, 0, 88)",
    "rgb(77, 3, 52)",
    "rgb(2, 53, 19)",
    "rgb(68, 36, 0)",
];

// Shortcut functions
const animateConWelcome = () => document.querySelector(".con-welcome").classList.add("animate__animated", "animate__fadeInDown", "animate__slow");
const scrollToBeginOfThePage = () => window.scrollTo(0, document.querySelector(".home").offsetTop);
const removeAnimationsOfAnimate = htmlElement => {
    const htmlElementClassListString = htmlElement.classList.toString();
    const animatedClassesToBeRemoved = htmlElementClassListString.match(/(animate[\w]+)/g);
    animatedClassesToBeRemoved.forEach((animatedClass) => {
        htmlElement.classList.remove(animatedClass);
    });
};

window.addEventListener("load", () => {
    windowLoaded = true;
    scrollToBeginOfThePage();
    if (window.scrollMaxY) return;
    else window.scrollMaxY = window.scrollY;
}, { once: true });

function randomValues() {
    if (windowLoaded) return;
    gsap.to(preload, {
        backgroundColor: gsap.utils.random(colors),
        duration: 3,
        power: "power1",
        onComplete: randomValues,
    });
}

function handleAnimationEnd(event) {
    event.stopPropagation();
    const { target } = event;
    removeAnimationsOfAnimate(target);
    preload.setAttribute("hidden", "");
    target.removeEventListener("animationend", handleAnimationEnd, {
        once: true,
    });
    return true;
}

function preloadFinished() {
    preload.classList.add("animate__animated", "animate__fadeOut");
    animateConWelcome();
    preload.addEventListener("animationend", handleAnimationEnd, {
        once: true,
    });
}

function preloadCharged() {
    if (!windowLoaded) {
        window.addEventListener("load", () => {
            scrollToBeginOfThePage();
            paths.forEach((path, i) => {
                animation2 = gsap.to(path, {
                    strokeDashoffset: gsap.getProperty(path, "stroke-dasharray") + 0.5,
                    duration: 2.5,
                    ease: "power2",
                    onComplete: preloadFinished,
                    onCompleteParams: [animation2],
                });
            });
        }, { once: true });
    } else {
        paths.forEach((path, i) => {
            animation2 = gsap.to(path, {
                strokeDashoffset: gsap.getProperty(path, "stroke-dasharray") + 0.5,
                duration: 2.5,
                ease: "power2",
                onComplete: preloadFinished,
                onCompleteParams: [animation2],
            });
        });
    }
}

// Inicio de animation preload
if (windowLocation.pathname === "/") {
    if (windowLocation.search === "?P=false") {
        preload.setAttribute("hidden", "");
        window.addEventListener("load", () => {
            animateConWelcome();
        }, { once: true });
    } else {
        animation1 = anime({
            targets: paths,
            strokeDashoffset: [anime.setDashoffset, 0],
            easing: "easeInOutSine",
            duration: 2500,
            delay: function (el, i) {
                return i * 300;
            },
            direction: "alternate",
            loop: false,
        });

        randomValues();

        animation1.finished.then(preloadCharged);
    }
}
