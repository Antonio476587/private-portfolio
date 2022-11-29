import React from "react";

import { xSquareSvg, houseSvg, pencilWorkspaceSvg, pencilSvg, briefcaseSvg } from "../Utils/Svg";

interface Menu {
    changeVisibilityMenu: () => void;
}

export default function Menu({ changeVisibilityMenu }: Menu) {

    return (
        <div className="menu" id="menu" hidden={true}>
            <div className="menu-base-body">
                <div className="menu-button-div">
                    <button onClick={() => changeVisibilityMenu()}>
                        {xSquareSvg}
                    </button>
                </div>
                <div className="menu-items-parent">
                    <div className="menu-item">
                        <a href="#Home" onClick={() => changeVisibilityMenu()}>
                            <div><img src="img/home.jpg" alt="" /></div>
                        </a>
                        <h3>{houseSvg} Home</h3>
                    </div>
                    <div className="menu-item">
                        <a href="/about" onClick={() => changeVisibilityMenu()}>
                            <div><img src="img/about.jpg" alt="" /></div>
                        </a>
                        <h3>{pencilWorkspaceSvg} About</h3>
                    </div>
                    <div className="menu-item">
                        <a href="/works" onClick={() => changeVisibilityMenu()}>
                            <div><img src="img/works.jpg" alt="" /></div>
                        </a>
                        <h3>{pencilSvg} Works</h3>
                    </div>
                    <div className="menu-item">
                        <a href="#Contact" onClick={() => changeVisibilityMenu()}>
                            <div><img src="img/contact.jpg" alt="" /></div>
                        </a>
                        <h3>{briefcaseSvg} Contact</h3>
                    </div>
                </div>
            </div>
            <div className="menu-base-footer" />
        </div>
    );
}
