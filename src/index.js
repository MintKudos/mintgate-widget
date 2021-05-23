import React from "react";
import {render} from "react-dom";
//import TPPFormWidget from "./lib/components/token-gating-form/TPPFormWidget"
import "tailwindcss/tailwind.css"
import {TPPFormWidget} from './lib';
import TPPLinksList from './components/token-gating-links/TPPLinksList'
import TPPLinksGrid from './components/token-gating-links/TPPLinksGrid'
import TPPLinksListUser from './components/token-gating-user/TPPLinksList'
import TPPLinksGridUser from './components/token-gating-user/TPPLinksGrid'
import TokenProfile from './components/token-profile/TokenProfile'
import TPPLinksGridId from './components/token-gating-id/TPPLinksGrid'
import TPPLinksListId from './components/token-gating-id/TPPLinksList'

const App = () => (
    <div>
        <TPPLinksGridId id="znZ7s15-31JV" theme="aqua"></TPPLinksGridId>
        <TPPLinksListId id="znZ7s15-31JV" theme="aqua"></TPPLinksListId>
    </div>
);

render(<App />, document.getElementById("root"));