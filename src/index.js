import React from "react";
import {render} from "react-dom";
//import TPPFormWidget from "./lib/components/token-gating-form/TPPFormWidget"
import "tailwindcss/tailwind.css"
import {TPPFormWidget} from './lib';
import TPPLinksList from './components/token-gating-links/TPPLinksList'
import TPPLinksGrid from './components/token-gating-links/TPPLinksGrid'
import TPPLinksListUser from './components/token-gating-user/TPPLinksList'
const App = () => (
    <div>
        <TPPLinksList tokentid="0x6b175474e89094c44da98b954eedeac495271d0f"></TPPLinksList>
        <TPPLinksGrid tokentid="0x6b175474e89094c44da98b954eedeac495271d0f" theme="aqua"></TPPLinksGrid>
        <TPPLinksListUser userid='177' jwttoken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxNzciLCJzY29wZXMiOlsiYXBpIiwid2lkZ2V0Il0sImFwaSI6dHJ1ZSwiaWF0IjoxNjIwNTA0NzYwfQ.rKqdfM-QxESa8Arq0TuyoKDSoxC5xyvkmDtfEL0lMNE"></TPPLinksListUser>
    </div>
);

render(<App />, document.getElementById("root"));