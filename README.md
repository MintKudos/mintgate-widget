# @mintgate/react-mintgate

This is a widget library for React for creating and viewing token protected content.

Install:
```bash
yarn add @mintgate/react-mintgate
```
How to Get Your Widget Token:
1. Log into the MintGate Site: https://www.mintgate.app/login
2. Go to https://www.mintgate.app/token_api or https://www.mintgate.app/developer and click on the Get Token Keys button. 
3. You will need to copy your Widget Token and pass the value as a key to the `jwttoken` parameter.


In React project:
```js
import '@mintgate/react-mintgate/dist/lib.css'
import { TPPFormWidget} from '@mintgate/react-mintgate';

function App() {
  return (
    <div className="App">
      <TPPFormWidget jwttoken='yourwidgettoken' theme='oneofourthemes'/>
    </div>
  );
}

export default App;
```
Optional - You can add any of the following style themes as a value to the theme parameter:
* aqua
* black
* bumblebee
* cupcake
* cyberpunk
* dark
* dracula
* fantasy
* forest
* garden
* halloween
* light (default)
* luxury
* pastel
* retro
* synthwave
* valentine

Example project in the repo:
`/examples/helloworld`

---
Internal: to build a new NPM version
```bash
yarn build
yarn publish
```