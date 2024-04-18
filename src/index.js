import React from "react";
import ReactDOM from "react-dom";
import { Stats, Question, Answer } from "./App";

ReactDOM.render(
    <React.StrictMode>
        <Stats />
    </React.StrictMode>,
    document.getElementById("statsDiv")
);

ReactDOM.render(
    <React.StrictMode>
        <Question />
    </React.StrictMode>,
    document.getElementById("questionDiv")
);

ReactDOM.render(
    <React.StrictMode>
        <Answer />
    </React.StrictMode>,
    document.getElementById("answerDiv")
);