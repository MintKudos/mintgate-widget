import React from "react";
import {render} from "react-dom";
import './index.css';
import "tailwindcss/tailwind.css"
import TPPLinkDisplay from "../lib/components/TPPFormLinkDisplay"

const App = () => (
    <div>
        <TPPLinkDisplay theme="aqua"></TPPLinkDisplay>
    </div>
);

render(<App />, document.getElementById("root"));