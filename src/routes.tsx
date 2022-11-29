import React from "react";

import MainPage from "./MainPage";
import About from "./About";
import Works from "./Works";
import WorkWrapper from "./Work";
import { NotFound } from "./Errors";

const routes = [
    { path: "/", element: <MainPage /> },
    { path: "/about", element: <About /> },
    { path: "/works", element: <Works /> },
    { path: "/work/:id", element: <WorkWrapper /> },
    { path: "*", element: <NotFound /> },
];

export default routes;
