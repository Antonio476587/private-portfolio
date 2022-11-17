import React from "react";
import { Link } from "react-router-dom";

interface BuildingWindow {
    defaultStatus: string;
    img: string;
    alternativeText: string;
    workUrlId: string;
}

function BuildingWindow({ defaultStatus, img, alternativeText, workUrlId }: BuildingWindow) {

    return (
        <div className={defaultStatus}>
            <Link to={`/work/${workUrlId}`}>
                <img src={img} alt={alternativeText} />
            </Link>
        </div>
    );
}

export default BuildingWindow;