import logo from './logo.svg';
import './App.css';
import '@mintgate/react-mintgate/dist/lib.css'
import { TPPFormWidget} from '@mintgate/react-mintgate';

function App() {
  return (
    <div className="App">
      <TPPFormWidget jwttoken={process.env.JWT || process.env.REACT_APP_JWT} theme="default"/>
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
