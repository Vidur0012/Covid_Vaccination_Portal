import logo from './logo.svg';
import './App.css';
import Login from './cmp/Login/Login';
import Register from './cmp/Register/Register';
import Homepage from './cmp/Homepage/Homepage';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import { useState } from 'react';
import Covid from './cmp/Covid/Covid';
function App() {
   
    const [user,setloginuser]=useState({})
  return (
    <div className="App">
      {/* <Covid/> */}
      <Router>
            <Switch>
                <Route exact path='/'>
                  {
                     user && user._id ?<Homepage setloginuser={setloginuser}/> :<Login setloginuser={setloginuser}/>
                  }
                  </Route>
                <Route  path='/Login'><Login setloginuser={setloginuser}/></Route>
                <Route  path='/Register'><Register/></Route>
            </Switch>
      </Router>
      
    </div>
  );
}

export default App;
