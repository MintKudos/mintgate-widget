# @mintgate/react-mintgate

This is a widget library for React for creating and viewing token protected content.

Install:
```bash
yarn add @mintgate/react-mintgate
```
How to Get Your Widget Token:
1. Log into the MintGate Site: https://www.mintgate.app/login
2. Go to https://www.mintgate.app/token_api or https://www.mintgate.app/developer and click on the Get Token Keys button. 
3. You will need to copy your Widget Token and pass the value as a key to the `jwttoken` parameter (for Token gating form and List/Grid of token gated links by token).
4. You will also need your userID (for List/Grid of token gated links by user only).


Widget currently available:
1. Token gating form (form to set up a token gate on a link)
2. List/Grid of token gated links on MintGate platform by token
3. List/Grid of token gated links on MintGate platform by user

In React project:

For Token gating form:
```js
import '@mintgate/react-mintgate/dist/lib.css'
import { TPPFormWidget} from '@mintgate/react-mintgate';

function App() {
  return (
    <div className="App">
      <TPPFormWidget theme='oneofourthemes'/>
    </div>
  );
}

export default App;
```

For List of Token Gated Links by Token:
```js
import '@mintgate/react-mintgate/dist/lib.css'
import { TPPLinkList} from '@mintgate/react-mintgate';

function App() {
  return (
    <div className="App">
      <TPPLinksList tokentid='yourtokenaddress' theme='oneofourthemes'/>
    </div>
  );
}

export default App;
```

For Grid of Token Gated Links by Token:
add brakign points for the gird based on screensize:
- base = default
- lg = 1200px
- md = 800px
- sm = 600px
- xs = 500px
```js
import '@mintgate/react-mintgate/dist/lib.css'
import { TPPLinkGrid} from '@mintgate/react-mintgate';

function App() {
  return (
    <div className="App">
      <TPPLinksGrid base="4" lg="3" md="2" sm="1" xs="1" tokentid='yourtokenaddress' theme='oneofourthemes'/>
    </div>
  );
}

export default App;
```

For List of Token Gated Links by User:
```js
import '@mintgate/react-mintgate/dist/lib.css'
import { TPPLinkList} from '@mintgate/react-mintgate';

function App() {
  return (
    <div className="App">
      <TPPLinksListUsers 
      userid='youruserid'
      jwttoken='yourjwttoken' theme='oneofourthemes'/>
    </div>
  );
}

export default App;
```

For Grid of Token Gated Links by User:
add brakign points for the gird based on screensize:
- base = default
- lg = 1200px
- md = 800px
- sm = 600px
- xs = 500px
```js
import '@mintgate/react-mintgate/dist/lib.css'
import { TPPLinkGrid} from '@mintgate/react-mintgate';

function App() {
  return (
    <div className="App">
      <TPPLinksGrid 
      userid='youruserid'
      base="4" lg="3" md="2" sm="1" xs="1"
      tokentid='yourtokenaddress' theme='oneofourthemes'/>
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
`/examples/hellowor`


---
Internal: to build a new NPM version
```bash
yarn build
yarn publish
```