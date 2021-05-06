import logo from './logo.svg';
import './App.css';
import '@mintgate/react-mintgate/dist/lib.css'
import { TPPFormWidget} from '@mintgate/react-mintgate';
import { TPPLinksList} from '@mintgate/react-mintgate';
import { TPPLinksGrid} from '@mintgate/react-mintgate';



function App() {
  return (
    <div className="App">
      <br />
      <h1> Token Gated Form</h1>
      <TPPFormWidget theme="default"/>
      <br />
      <h1> List of token Gated Links Example with $CREATOR</h1>
      <br />
      <TPPLinksList tokentid="$CREATOR" theme="aqua"/>
      <br />
      <h1> Grid of token Gated Links Example with $GATE </h1>
      <br />
      <TPPLinksGrid tokentid="$GATE" theme="aqua"/>
    </div>
  );
}

export default App;
