import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";

import Page from "../src/Page.tsx";
import template from "./template.js";
import templateHome from "./templateHome.js";

function render(req, res) {

    const context = {};
    
    const element = (
        <StaticRouter location={req.url} context={context}>
            <Page />
        </StaticRouter>
    );

    const body = ReactDOMServer.renderToString(element);

    if (req.url.endsWith("/") || req.url.endsWith("/?P=false")) {
        res.append("Link", "</css/preload.css>; rel=preload; as=style");
        for (let i = 0; i < 6; i++) {
            res.append("Link", `</img/Q${i + 1}.webp>; rel=preload; as=image`);
        }
        res.send(templateHome(body));
    } else {
        res.send(template(body));
    }
}

export default render;
