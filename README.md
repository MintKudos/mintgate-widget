# @mintgate/react-mintgate

This is a widget library for React for creating and viewing token protected content.

Install:
```bash
yarn add @mintgate/react-mintgate
```

In React project:
```js
import '@mintgate/react-mintgate/dist/lib.css'
import { TPPFormWidget} from '@mintgate/react-mintgate';

function App() {
  return (
    <div className="App">
      <TPPFormWidget />
    </div>
  );
}

export default App;
```

Example project in the repo:
/examples/helloworld

To build a new version:
```bash
yarn build
yarn publish
```