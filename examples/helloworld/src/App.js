import './App.css';
import '@mintgate/react-mintgate/dist/lib.css'
import { TPPFormWidget} from '@mintgate/react-mintgate';
import { TPPLinksList} from '@mintgate/react-mintgate';
import { TPPLinksGrid} from '@mintgate/react-mintgate';



function App() {
  return (
    <div className="container">
      <br />
      <h1> Token Gated Form</h1>
      <TPPFormWidget theme="aqua"/>
      <br />
      <h1> List of token Gated Links Example with $CREATOR</h1>
      <br />
      <TPPLinksList tokentid="$CREATOR" theme="aqua"/>
      <br />
      <h1> Grid of token Gated Links Example with $GATE </h1>
      <br />
      <TPPLinksGrid tokentid="$GATE" theme="aqua" base="4" lg="3" md="2" sm="1"/>
    </div>
  );
}

export default App;
