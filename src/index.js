import React from "react";
import {render} from "react-dom";
//import TPPFormWidget from "./lib/components/token-gating-form/TPPFormWidget"
import "tailwindcss/tailwind.css"
import {TPPFormWidget} from './lib';
import TPPLinksList from './components/token-gating-links/TPPLinksList'

const App = () => (
    <div>
        <TPPLinksList tokentid="0x6b175474e89094c44da98b954eedeac495271d0f"></TPPLinksList>
    </div>
);

render(<App />, document.getElementById("root"));