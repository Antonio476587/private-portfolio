import React, { useRef, useEffect } from "react";

import Contact from "./Contact";
import MainMenuItem from "./MainMenuItem";
// import Menu from "./Menu";

function aboutLinkTween(main: HTMLElement | false, aboutLink: HTMLElement): any {
    if (main) scrollTo(0, main.offsetTop);
    const q = gsap.utils.selector(aboutLink);
    gsap.set(q(".main-menu-item"), { clearProps: "all" });
    gsap.to(q(".main-menu-item"), {
        perspective: 73,
        zIndex: 10,
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        perspectiveOrigin: "center",
        duration: 1,
        onComplete: () =>
            location.assign(gsap.getProperty(aboutLink, "data-link").toString()),
    });
}

function workLinkTween(main: HTMLElement | false, worksLink: HTMLElement): any {
    if (main) scrollTo(0, main.offsetTop);
    const q = gsap.utils.selector(worksLink);
    gsap.set(q(".main-menu-item"), { clearProps: "all" });
    gsap.to(q(".main-menu-item"), {
        perspective: 73,
        zIndex: 10,
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        perspectiveOrigin: "center",
        duration: 1,
        onComplete: () =>
            location.assign(gsap.getProperty(worksLink, "data-link").toString()),
    });
}

export default function MainPage() {
    const mainRef: React.RefObject<HTMLElement>  = useRef(null);
    const contactRef: React.RefObject<HTMLDivElement> = useRef(null);
    const aboutLinkRef: React.RefObject<HTMLAnchorElement>= useRef(null);
    const worksLinkRef: React.RefObject<HTMLAnchorElement> = useRef(null);
    const tl: React.MutableRefObject<gsap.core.Timeline | null> = useRef(null);

    useEffect(() => {
        let animation1: gsap.core.Tween;
        const contact: HTMLElement | boolean = contactRef.current?? false;
        const main: HTMLElement | boolean = mainRef.current?? false;
        let { current: tlCurrent } = tl;

        if (tlCurrent == null) {
            if (contact) {
                tlCurrent = gsap.timeline({
                    scrollTrigger: {
                        fastScrollEnd: true,
                        trigger: contact,
                        id: contact.id,
                        start: "center center",
                        end: "center-=200 top",
                        toggleActions: "play none none reverse",
                        scrub: true,
                    },
                    defaults: { duration: 1, ease: "none" },
                });
            }
        }
        if (tlCurrent) {
            if (main) {
                animation1 = gsap.to(["#main-menu-item1", "#main-menu-item2"], {
                    perspective: 100,
                    scrollTrigger: {
                        fastScrollEnd: true,
                        trigger: main,
                        id: main.id,
                        start: "bottom bottom",
                        end: "bottom top",
                        toggleActions: "play none none reverse",
                        scrub: true,
                    },
                });
            }
            tlCurrent.to(".linkedIN", {
                height: "110%",
                repeat: 1,
                yoyo: true,
            });
        }

        return () => {
            if (tlCurrent) tlCurrent.kill();
            if (animation1) animation1.kill();
        };
    }, []);

    useEffect(() => {
        const main: HTMLElement | boolean = mainRef.current?? false;
        const aboutLink: HTMLElement | boolean = aboutLinkRef.current?? false;
        const worksLink: HTMLElement | boolean = worksLinkRef.current?? false;

        if (aboutLink && worksLink) {
            aboutLink.addEventListener("click", () => {aboutLinkTween(main, aboutLink);}, false);
            worksLink.addEventListener("click", () => {workLinkTween(main, worksLink);}, false);
        }
        return () => {
            if (aboutLink && worksLink) {   
                aboutLink.removeEventListener("click", () => {aboutLinkTween(main, aboutLink);}, false);
                worksLink.removeEventListener("click", () => {workLinkTween(main, worksLink);}, false);
            }
        };
    }, []);

    const changeVisibilityMenu = () => {
        const menu: HTMLElement | null = document.querySelector(".menu");
        menu ? menu.toggleAttribute("hidden") : null;
    };

    return (
        <>
            <Contact changeVisibilityMenu={changeVisibilityMenu} ref={contactRef} />
            <main id="main" ref={mainRef}>
                <div className="main-menu">
                    <a data-link="/about" ref={aboutLinkRef}>
                        <MainMenuItem name="About" id="main-menu-item1" />
                    </a>
                    <a data-link="/works" ref={worksLinkRef}>
                        <MainMenuItem name="Works" id="main-menu-item2" />
                    </a>
                </div>
            </main>
            {/* <Menu changeVisibilityMenu={changeVisibilityMenu} /> */}
        </>
    );
}
