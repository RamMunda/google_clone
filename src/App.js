import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './components/Home';
import SearchPage from './components/SearchPage';

function App() {
  return (
    <div className="App">
       <Router>
           <Route exact path="/" component={Home} />
           <Route exact path="/searchpage" component={SearchPage} />
       </Router>
    </div>
  );
}

export default App;
