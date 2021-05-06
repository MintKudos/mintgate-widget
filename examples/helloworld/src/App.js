import logo from './logo.svg';
import './App.css';
import '@mintgate/react-mintgate/dist/lib.css'
import { TPPFormWidget} from '@mintgate/react-mintgate';
import { TPPLinksList} from '@mintgate/react-mintgate';


function App() {
  return (
    <div className="App">
      <br />
      <h1> Token Gated Form</h1>
      <TPPFormWidget theme="default"/>
      <br />
      <h1> List of token Gated Link</h1>
      <br />
      <TPPLinksList tokentid="$GATE"/>
    </div>
  );
}

export default App;
