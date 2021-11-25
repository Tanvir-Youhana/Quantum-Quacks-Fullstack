import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";
import EditProduct from "./components/EditProduct";
import Login from "./components/Login";
import Registration from "./components/Registration";
import './components/App.css';
import Logo from './robinhood.svg'
function App() {
  return (
      <div className="app">
        <div>
          <Router>
          <Switch>
            <Route exact path="/">
            <Login />
            </Route>
              <Route path="/signup">
                <Registration />
            </Route>
          </Switch>
          </Router>
        </div>
      </div>
  );
}























    {/*<Router>
    <div className="container">
      <div className="columns">
        <div className="column is-half is-offset-one-quarter">
          <Switch>
            <Route exact path="/">
              <ProductList />
            </Route>
            <Route path="/add">
              <AddProduct />
            </Route>
            <Route path="/edit/:id">
              <EditProduct />
            </Route>
            
            <Route path="/login">
            <Login />
            </Route>
              <Route path="/registration">
                <Registration />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
    </Router>*/}

 
export default App;