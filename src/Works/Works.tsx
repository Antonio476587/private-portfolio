import React, { useEffect, useRef } from "react";

import Wall from "./Wall";

export default function Works() {
    const stateRef: React.RefObject<HTMLDivElement> = useRef(null);
    const cityRef: React.RefObject<HTMLDivElement> = useRef(null);
    const placeRef: React.RefObject<HTMLDivElement>  = useRef(null);


    function scrollAnimator(ev: Event): void {
        ev.preventDefault();
        console.log("funcionando");
        const pageScrollPercent = (scrollY * 100 ) / scrollMaxY;
        const pageScrollPercentDividedByAnHundred = pageScrollPercent / 100;
    
        if (cityRef.current) cityRef.current.style.transform = `translateY(${scrollY}px)`;
        if (placeRef.current) placeRef.current.style.scale = `${Math.min(pageScrollPercentDividedByAnHundred + 0.9, 1.8)}`;
    }

    useEffect(() => {


        if (stateRef.current) {
            
            if (!globalThis.scrollMaxY) {
                const scrollTop = document.lastElementChild?.scrollTop;
                if (scrollTop) globalThis.scrollMaxY = scrollTop;
            }

            stateRef.current.addEventListener("scroll", scrollAnimator);
            
        }
        
        return () => {
            if (stateRef.current) {
                stateRef.current.removeEventListener("scroll", scrollAnimator);
            }

        };
    }, []);

    return (
        <>
            <link rel="stylesheet" href="/css/testingBuilding.css" />
            <div id="state" ref={stateRef}>
                <div id="city" ref={cityRef}>
                    <div id="place" ref={placeRef}>
                        <div id="building">
                            <div id="roof"></div>
                            {[1, 2, 3, 4].map(value => <Wall wallID={`${value}`} key={value} />)}
                            <div id="foot"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}