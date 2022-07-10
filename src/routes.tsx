import React from "react";

import MainPage from "./MainPage";
import About from "./About";
import Works from "./Works";
import Work from "./Work";
import NotFound from "./NotFound";

import workContents from "./workContents";

const routes = [
    { path: "/", element: <MainPage /> },
    { path: "/about", element: <About /> },
    { path: "/works", element: <Works /> },
    { path: "/work/1", element: <Work work={workContents[0]} index={1} /> },
    { path: "/work/2", element: <Work work={workContents[1]} index={2} /> },
    { path: "/work/3", element: <Work work={workContents[2]} index={3} /> },
    { path: "/work/4", element: <Work work={workContents[3]} index={4} /> },
    { path: "/work/5", element: <Work work={workContents[4]} index={5} /> },
    { path: "/work/6", element: <Work work={workContents[5]} index={6} /> },
    { path: "/work/:id", element: <Work work={workContents[0]} index={1} /> },
    { path: "*", element: <NotFound /> },
];

export default routes;
