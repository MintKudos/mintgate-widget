import React from "react";
import {render} from "react-dom";
import Example from "./lib/components/example"
import TPPFormPanel from "./lib/components/TPPFormPanel";

const App = () => (
    <div>
        <Example></Example>
        <TPPFormPanel></TPPFormPanel>
    </div>
);

render(<App />, document.getElementById("root"));