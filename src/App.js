import logo from './logo.svg';
import Recipes from './Components/Recipes';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Recipes!</h1>
      <p>Search for a recipe below:</p>
      <Recipes />
    </div>
  );
}

export default App;
