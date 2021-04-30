import React from "react";
import {render} from "react-dom";
import TPPFormWidget from "./lib/components/TPPFormWidget"
import './index.css';
import "tailwindcss/tailwind.css"

const App = () => (
    <div>
        <TPPFormWidget jwttoken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIyNyIsInNjb3BlcyI6WyJ3aWRnZXQiXSwid2lkZ2V0Ijp0cnVlLCJpYXQiOjE2MTk3OTQxMzR9.2ovKcCPzZ_LheodhwwIYqnjg9_Wu_KI6L96FkqEUC_Y" theme="halloween"></TPPFormWidget>
    </div>
);

render(<App />, document.getElementById("root"));