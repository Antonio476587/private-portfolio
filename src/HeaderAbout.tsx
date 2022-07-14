import React from "react";
import ContainerImgMe from "./ContainerImgMe";

const HeaderAbout = React.forwardRef(function HeaderAbout(_props, ref: React.RefObject<HTMLDivElement>) {
    return (
        <div className="flexing cajita" ref={ref}>
            <ContainerImgMe nameContainer="simon-antonio" />
            <ContainerImgMe nameContainer="antonio-simon" />
        </div>
    );});

export default HeaderAbout;
