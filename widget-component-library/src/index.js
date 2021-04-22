import React from "react";
import {render} from "react-dom";
import TPPFormWidget from "./lib/components/TPPFormWidget"

const App = () => (
    <div>
        <TPPFormWidget></TPPFormWidget>
    </div>
);

render(<App />, document.getElementById("root"));