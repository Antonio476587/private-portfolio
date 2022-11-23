import React from "react";
import { useParams } from "react-router-dom";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

import LikeRunes from "./LikeRunes";
import HeaderWork from "./HeaderWork";
import CaseStudy from "./CaseStudy";
import NotFound from "../Errors/NotFound";

import workContents from "./workContents";

gsap.registerPlugin(ScrollTrigger);

interface Work {
  h2: string;
  p1: string;
  img1: string[];
  img2: string[];
  p2: string;
  p3: string;
  img3: string[];
  p4: string;
  img4: string[];
  styles: string[];
  type: "casestudy" | "gallery" | "classic" ;
}

interface WorkProps {
  work: Work | undefined;
  index: number;
}

function Work({ work, index }: WorkProps): JSX.Element {
    function prevSection(): void {
        if (index === 1) return;
        location.assign((index - 1).toString());
    }

    function nextSection(): void {
        location.assign((index + 1).toString());
    }

    if (work) {

        const { type, styles, ...workToRender } = work;
        let selectedPresentationOfWork;

        switch (type) {
            case "casestudy":
                selectedPresentationOfWork = <CaseStudy work={workToRender} changeSectionFunctions={[prevSection, nextSection]} />;
                break;
            case "classic":
                selectedPresentationOfWork = <div>a</div>;
                break;
            case "gallery":
                selectedPresentationOfWork = <div>b</div>;
                break;
        }

        return (
            <div
                id="body-work"
                style={{
                    "--color-body-background": styles[0] ?? "#EBEBFF",
                    "--color-foreground": styles[1] ?? "#0C043E",
                    "--color-foreground-2": styles[2] ?? "#111",
                }}
            >
                <LikeRunes />
                <HeaderWork />
                {selectedPresentationOfWork}
                
            </div>
        );
    }
    else return <NotFound />;
}

function WorkWrapper() {
    const { id } = useParams();

    if (typeof id === "string") {
        const workID = parseInt(id);
        if (!isNaN(workID) && workContents[workID - 1]) {
            return <Work work={workContents[workID - 1]} index={workID}/>;
        } else if (workContents.length === (workID - 1)) {
            return <Work work={workContents[0]} index={1} />;
        }
    }
    return <NotFound />;

}

export default WorkWrapper;
export { Work };