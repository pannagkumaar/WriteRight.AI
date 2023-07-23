import Writeright from "./components/Writeright";
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="container">
        <header className="App-header">
          <h1 className="heading">WriteRight.AI</h1>
        </header>
        <main>
          <Writeright defaultKeyword="aesthetic" />
        </main>
        <footer className="mt-5 footer">
         <span>&copy; WriteRight.AI</span>
        </footer>
      </div>
    </div>
  );
}

export default App;
