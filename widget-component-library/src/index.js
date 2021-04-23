import React from "react";
import {render} from "react-dom";
import TPPFormWidget from "./lib/components/TPPFormWidget"
import './index.css';
import "tailwindcss/tailwind.css"

const App = () => (
    <div>
        <TPPFormWidget></TPPFormWidget>
    </div>
);

render(<App />, document.getElementById("root"));