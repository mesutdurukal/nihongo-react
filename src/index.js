import React from "react";
import ReactDOM from "react-dom";
import { Stats, QA } from "./App";
import { IP } from "./ApiHandler";

ReactDOM.render(
    <React.StrictMode>
        <Stats />
    </React.StrictMode>,
    document.getElementById("statsDiv")
);

ReactDOM.render(
    <React.StrictMode>
        <QA />
    </React.StrictMode>,
    document.getElementById("qadiv")
);

ReactDOM.render(
    <React.StrictMode>
        <IP />
    </React.StrictMode>,
    document.getElementById("ip")
);

