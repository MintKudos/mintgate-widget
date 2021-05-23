# @mintgate/react-mintgate

This is a widget library for React for creating and viewing token protected content.

Install:
```bash
yarn add @mintgate/react-mintgate
```
## How to Get Your Widget Token:
1. Log into the MintGate Site: https://www.mintgate.app/login
2. Go to https://www.mintgate.app/token_api or https://www.mintgate.app/developer and click on the Get Token Keys button. 
3. You will need to copy your Widget Token and pass the value as a key to the `jwttoken` parameter (for Token gating form and List/Grid of token gated links by token).
4. You will also need your userID (for List/Grid of token gated links by user only).


## Widget currently available:
1. Token gating form (form to set up a token gate on a link)
2. List/Grid of token gated links by token
3. List/Grid of token gated links by user
4. List/Grid of token gated link by link id
5. Token Profile

In React project:

## Form to set up token gated links:
**Required prop**: 
* jwttoken (string - your jwt token)


**Optional prop**:
* theme (string - one of our 16 themes) 
```js
import '@mintgate/react-mintgate/dist/lib.css'
import { TPPFormWidget} from '@mintgate/react-mintgate';

function App() {
  return (
    <div className="App">
      <TPPFormWidget jwttoken="yourjwttoken" theme='oneofourthemes'/>
    </div>
  );
}

export default App;
```

## List of Token Gated Links by Token:
**Required prop**: 
* tokentid (string - token address)


**Optional prop**:
* theme (string - one of our 16 themes) 
```js
import '@mintgate/react-mintgate/dist/lib.css'
import { TPPLinkList} from '@mintgate/react-mintgate';

function App() {
  return (
    <div className="App">
      <TPPLinkList tokentid='yourtokenaddress' theme='oneofourthemes'/>
    </div>
  );
}

export default App;
```

## Grid of Token Gated Links by Token:
**Required prop**: 
* tokentid (string - token address)

**Optional prop**:
* theme (string - one of our 16 themes) 
* breakpoints for number of columns
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
      <TPPLinkGrid base="4" lg="3" md="2" sm="1" xs="1" tokentid='yourtokenaddress' theme='oneofourthemes'/>
    </div>
  );
}

export default App;
```

## List of Token Gated Links by User:
**Required prop**: 
* userid (number - id of user)
* jwttoken (string - your jwt token)

**Optional prop**:
* theme (string - one of our 16 themes) 
```js
import '@mintgate/react-mintgate/dist/lib.css'
import { TPPLinkListUsers} from '@mintgate/react-mintgate';

function App() {
  return (
    <div className="App">
      <TPPLinkListUsers 
      userid='youruserid'
      jwttoken='yourjwttoken' theme='oneofourthemes'/>
    </div>
  );
}

export default App;
```

## Grid of Token Gated Links by User:
**Required prop**: 
* userid (number - id of user)
* jwttoken (string - your jwt token)


**Optional prop**:
* theme (string - one of our 16 themes) 
* breakpoints for number of columns
- base = default
- lg = 1200px
- md = 800px
- sm = 600px
- xs = 500px
```js
import '@mintgate/react-mintgate/dist/lib.css'
import { TPPLinkGridUsers} from '@mintgate/react-mintgate';

function App() {
  return (
    <div className="App">
      <TPPLinkGridUsers 
      userid='youruserid'
      base="4" lg="3" md="2" sm="1" xs="1"
      jwttoken='yourjwttoken'
      theme='oneofourthemes'/>
    </div>
  );
}

export default App;
```

## List of Token Gated Links by Id:
**Required prop**: 
* id (string - id of token gated link. The token id is the string after the 'go/'. For example, the id for token gated link http://mgate.io/go/MR2WIdgtP04A is MR2WIdgtP04A)

**Optional prop**:
* theme (string - one of our 16 themes) 
```js
import '@mintgate/react-mintgate/dist/lib.css'
import { TPPLinkListId} from '@mintgate/react-mintgate';

function App() {
  return (
    <div className="App">
      <TPPLinkListId
      id='linkid'
      theme='oneofourthemes'/>
    </div>
  );
}

export default App;
```

## Grid of Token Gated Links by ID:
**Required prop**: 
* id (string - id of token gated link. The token id is the string after the 'go/'. For example, the id for token gated link http://mgate.io/go/MR2WIdgtP04A is MR2WIdgtP04A)


**Optional prop**:
* theme (string - one of our 16 themes) 
* breakpoints for number of columns
- base = default
- lg = 1200px
- md = 800px
- sm = 600px
- xs = 500px
```js
import '@mintgate/react-mintgate/dist/lib.css'
import { TPPLinkGridId} from '@mintgate/react-mintgate';

function App() {
  return (
    <div className="App">
      <TPPLinkGridId 
      id='linkid'
      base="4" lg="3" md="2" sm="1" xs="1"
      theme='oneofourthemes'/>
    </div>
  );
}

export default App;
```

## Token Profile:
**Required prop**: tokenName (string - name of token)

**Optional prop**: body (true/false boolean - true show the profile info, false hides the profile info and only shows photo)
```js
import '@mintgate/react-mintgate/dist/lib.css'
import { TokenProfile} from '@mintgate/react-mintgate';

function App() {
  return (
    <div className="App">
      <TokenProfile
      tokenName="yourtokentid" body={true/false} />
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
