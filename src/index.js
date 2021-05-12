import React from "react";
import {render} from "react-dom";
//import TPPFormWidget from "./lib/components/token-gating-form/TPPFormWidget"
import "tailwindcss/tailwind.css"
import {TPPFormWidget} from './lib';
import TPPLinksList from './components/token-gating-links/TPPLinksList'
import TPPLinksGrid from './components/token-gating-links/TPPLinksGrid'
import TPPLinksListUser from './components/token-gating-user/TPPLinksList'
import TPPLinksGridUser from './components/token-gating-user/TPPLinksGrid'

const App = () => (
    <div>
        <TPPLinksListUser jwttoken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxNzciLCJzY29wZXMiOlsid2lkZ2V0Il0sIndpZGdldCI6dHJ1ZSwiaWF0IjoxNjIwNTA0NzYwfQ.DNh6Y8Gbp_ymaRCfMN7Ze9O10Ycq942V4N8KmDPY0sQ" userid="177" theme="aqua" base="3"></TPPLinksListUser>
        <TPPLinksGridUser jwttoken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxNzciLCJzY29wZXMiOlsid2lkZ2V0Il0sIndpZGdldCI6dHJ1ZSwiaWF0IjoxNjIwNTA0NzYwfQ.DNh6Y8Gbp_ymaRCfMN7Ze9O10Ycq942V4N8KmDPY0sQ" userid="177" theme="aqua" base="3"></TPPLinksGridUser>
    </div>
);

render(<App />, document.getElementById("root"));