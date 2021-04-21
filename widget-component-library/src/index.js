import React from "react";
import {render} from "react-dom";
import Example from "./lib/components/example"

const App = () => (
    <div>
        <Example></Example>
    </div>
);

render(<App />, document.getElementById("root"));