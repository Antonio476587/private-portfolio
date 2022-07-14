import React from "react";
import { Routes, Route } from "react-router-dom";

import routes from "./routes";

export default function Page(): React.ReactElement {
    return (
        <Routes>
            {routes.map((attrs) => (
                <Route {...attrs} key={attrs.path} />
            ))}
        </Routes>
    );
}
