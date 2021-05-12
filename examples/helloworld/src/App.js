import './App.css';
import '@mintgate/react-mintgate/dist/lib.css'
import { TPPFormWidget} from '@mintgate/react-mintgate';
import { TPPLinksList} from '@mintgate/react-mintgate';
import { TPPLinksGrid} from '@mintgate/react-mintgate';
import { TPPLinksListUsers} from '@mintgate/react-mintgate';
import { TPPLinksGridUsers} from '@mintgate/react-mintgate';
import tokens from './tokens.json';
function App() {
  return (
    <div className="App">
      <br />
      <h1> Token Gated Form</h1>
      <TPPFormWidget 
        gateTokens={tokens}
        jwttoken={process.env.JWT || process.env.REACT_APP_JWT} theme="light"/>
      <br />
      <h1> List of token Gated Links by Token - Example with $CREATOR</h1>
      <br />
      <TPPLinksList tokentid="$CREATOR" theme="light"/>
      <br />
      <h1> Grid of token Gated Links by Token - Example with $GATE </h1>
      <br />
      <TPPLinksGrid base="4" lg="3" md="2" sm="1" xs="1" tokentid="$GATE" theme="light"/>
      <h1> List of token Gated Links by a User - Example with MintGate </h1>
      <TPPLinksListUsers jwttoken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxNzciLCJzY29wZXMiOlsid2lkZ2V0Il0sIndpZGdldCI6dHJ1ZSwiaWF0IjoxNjIwNTA0NzYwfQ.DNh6Y8Gbp_ymaRCfMN7Ze9O10Ycq942V4N8KmDPY0sQ" userid="177" theme="light" />
      <h1> Grid of token Gated Links by a User - Example with MintGate </h1>
      <TPPLinksGridUsers jwttoken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxNzciLCJzY29wZXMiOlsid2lkZ2V0Il0sIndpZGdldCI6dHJ1ZSwiaWF0IjoxNjIwNTA0NzYwfQ.DNh6Y8Gbp_ymaRCfMN7Ze9O10Ycq942V4N8KmDPY0sQ" 
      base="4" lg="3" md="2" sm="1" xs="1" userid="177" theme="light" />
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
