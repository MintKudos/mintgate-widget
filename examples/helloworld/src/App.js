import './App.css';
import '@mintgate/react-mintgate/dist/lib.css'
import { TPPFormWidget} from '@mintgate/react-mintgate';
import { TPPLinksList} from '@mintgate/react-mintgate';
import { TPPLinksGrid} from '@mintgate/react-mintgate';
import tokens from './tokens.json';
function App() {
  return (
    <div className="App">
      <br />
      <h1> Token Gated Form</h1>
      <TPPFormWidget theme="default"/>
      <br />
      <h1> List of token Gated Links Example with $CREATOR</h1>
      <br />
      <TPPLinksList tokentid="$CREATOR"/>
      <br />
      <h1> Grid of token Gated Links Example with $GATE </h1>
      <br />
      <TPPLinksGrid tokentid="$GATE" theme="dark"/>
      <TPPFormWidget 
        gateTokens={tokens}
        jwttoken={process.env.JWT || process.env.REACT_APP_JWT} theme="default"/>
      {/* 
      17 Themes are available: 
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
      */}
    </div>
  );
}

export default App;
