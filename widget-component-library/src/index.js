import React from "react";
import {render} from "react-dom";
import TPPFormWidget from "./lib/components/token-gating-form/TPPFormWidget"
import './index.css';
import "tailwindcss/tailwind.css"

const App = () => (
    <div>
        <TPPFormWidget jwttoken={process.env.REACT_APP_JWT} theme=""></TPPFormWidget>
    </div>
);

render(<App />, document.getElementById("root"));