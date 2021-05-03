# Getting Started with MintGate React Widget Library

## Current Widgets
* Token gating form component

You can add the MintGate token gating setup form into your project directly. The form allows anyone on your site to set up a token gated link without accessing the MintGate site.

## Getting Started as a developer
1. You will need to access your developer keys to get started with the widget integration. Your individual users will not need to get their own developer key, only you as the developer/enterprise would. 

Go to https://www.mintgate.app/. Log into the Twitter account that you want to use the keys of. 

2. Once you have logged in, go to https://www.mintgate.app/token_api. 

3. For using the widget, copy your the token key under Widget Token.

4. In your project, install the package. 

5. Integration. In your app integration, you need to pass the Widget Token as a prop. For example:

```
import {TPPFormWidget} from "@mintgate/react-mintgate"

const App = () => (
    <div>
        <TPPFormWidget jwttoken="yourwidgettoken"></TPPFormWidget>
    </div>
);
```
6. (Optional) We offer 16 different widget styles that you can pass in via the theme prop:

- aqua
      - black
      - bumblebee
      - cupcake
      - cyberpunk
      - dark
      - dracula
      - fantasy
      - forest
      - garden
      - halloween
      - light (default)
      - luxury
      - pastel
      - retro
      - synthwave
      - valentine 

```
import {TPPFormWidget} from "@mintgate/react-mintgate"

const App = () => (
    <div>
        <TPPFormWidget jwttoken="yourwidgettoken" theme="themename"></TPPFormWidget>
    </div>
);
```
    
### Questions?
Reach out to devs@mintkudos.com. 