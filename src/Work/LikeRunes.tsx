import React, { useEffect, useRef } from "react";
import gsap from "gsap";

function LikeRunes() {
    const likeRunesRef: React.RefObject<HTMLDivElement> = useRef(null);
    const qRunes: gsap.utils.SelectorFunc = gsap.utils.selector(likeRunesRef);

    useEffect(() => {
        const animation1: gsap.core.Tween = gsap.from(qRunes(".div"), {
            duration: 2,
            width: "50%",
            delay: 0.6,
        });

        return () => {
            animation1.kill();
        };
    }, [likeRunesRef, qRunes]);

    return (
        <div className="like-runes" ref={likeRunesRef}>
            <div className="div" />
            <div className="div" />
        </div>
    );
}

export default LikeRunes;