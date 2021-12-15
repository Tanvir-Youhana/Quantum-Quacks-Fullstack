import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import './components/App.css';
import Logo from './qq.png'
import UpdatePassword from "./components/UpdatePassword";
import {useState, useEffect} from "react"; 
import instance from "./axios";
import AuthContext from "./helpers/AuthContext.js";
import Registration from "./components/Registration.js";
import PageNotFound from "./components/PageNotFound.js";

function App() {
  const [authState, setAuthState] = useState({
    email: "",
    id: 0,
    status: false,
  });

  useEffect(() => {
    instance.get("/", {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    })
    .then((response) => {
      if(response.data.error) {
        setAuthState({ ...authState, status:false});
      } else {
        setAuthState({
          email: response.data.email,
          id: response.data.id,
          status: true,
        });
      }
    });
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({email: "", id: 0, status: false});
  };

  return (
      <div className="app">
        {/* <div className="app__header">
          <div className= "app__logo">  
            <img src={Logo} width= {80} />
          </div>
          <div className="app_title">
            Welcome to Quantum Quacks
          </div>
         
        </div> */}
        <AuthContext.Provider value={{ authState, setAuthState}}>
          <Router>
            
            {/* <div className="navbar">
              <div className="links">
                {!authState.status ? (
                  <>
                    <Link to="/login">Login</Link>
                    <Link to="/registeration">Registeration</Link>
                  </>
                ) : (
                  <>
                  <Link to="/"> HomePage</Link>
                  </>
                )} 
              </div>
              <div className="loggedInContainer">
                <h1>{authState.email} </h1>
                {authState.status && <button onClick={logout}> Logout</button>}
              </div>
            </div> */}

            <Switch>
              {/* <Route path="/" exact component={Home} /> */}
              {/* <Route path="/login" exact component={Login} /> */}
              <Route path="/" exact component={Login} />
              <Route path="/Home" exact component={Home} /> 
              <Route path="/signup" exact component={Registration} />
              <Route path= "/setting" exact component={UpdatePassword} />
              <Route path= "*" exact component={PageNotFound} /> 
            </Switch>
          </Router>
        </AuthContext.Provider>
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