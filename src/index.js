import React from "react";
import ReactDOM from "react-dom";
import { Stats, Question, Answer } from "./App";

ReactDOM.render(
    <React.StrictMode>
        <Stats />
    </React.StrictMode>,
    document.getElementById("stats")
);

ReactDOM.render(
    <React.StrictMode>
        <Question />
    </React.StrictMode>,
    document.getElementById("question")
);

ReactDOM.render(
    <React.StrictMode>
        <Answer />
    </React.StrictMode>,
    document.getElementById("answer")
);