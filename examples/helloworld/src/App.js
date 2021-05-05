import logo from './logo.svg';
import './App.css';
import '@mintgate/react-mintgate/dist/lib.css'
import { TPPFormWidget} from '@mintgate/react-mintgate';
import { TPPLinksList} from '@mintgate/react-mintgate';


function App() {
  return (
    <div className="App">
      <TPPFormWidget theme="default"/>
      <TPPLinksList tokentid="NUP1ZYYUD906"/>
    </div>
  );
}

export default App;
