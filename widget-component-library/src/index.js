import React from "react";
import {render} from "react-dom";
import TPPFormWidget from "./lib/components/TPPFormWidget"
import TPPCardWideEmbed from "./lib/components/TPPCardWideEmbed"
import TPPCardEmbed from "./lib/components/TPPCardEmbed"
import TPPLinksList from "./lib/components/TPPLinksList"
import TPPLinksGrid from "./lib/components/TPPLinksGrid"
import './index.css';
import "tailwindcss/tailwind.css"

const App = () => (
    <div>
        <div>
            <h1 className="mx-3 mt-8 mb-2 font-heading font-semibold text-2xl">Token Gating Form Widget</h1>
            <TPPFormWidget></TPPFormWidget>
        </div>
        <div>
        <h1 className="mx-3  mt-8 mb-2 font-heading font-semibold text-2xl">Token Gating Link Wide Embedd</h1>
        <TPPCardWideEmbed></TPPCardWideEmbed>
        </div>
        <h1 className="mx-3 mt-8 mb-2 font-heading font-semibold text-2xl">Token Gating Link Card Embedd</h1>
        <TPPCardEmbed></TPPCardEmbed>
        <h1 className="mx-3 mt-8 mb-2 font-heading font-semibold text-2xl">Token Gating Link Wide List</h1>
        <TPPLinksList></TPPLinksList>
        <h1 className="mx-3 mt-8 mb-2 font-heading font-semibold text-2xl">Token Gating Card Grid</h1>
        <TPPLinksGrid></TPPLinksGrid>
</div>
);

render(<App />, document.getElementById("root"));