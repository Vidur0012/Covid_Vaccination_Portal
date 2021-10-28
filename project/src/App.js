import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import { useState } from 'react';


import Tracker from './cmp/Tracker/Tracker';
import Header from './cmp/Header/Header';
import Search from './cmp/Search/Search';
import Book from './cmp/Book/Book'

import AdminLogin from './cmp/Admin/AdminLogin';
import AddCenter from './cmp/Admin/AddCenter';
import UpdateCenter from './cmp/Admin/UpdateCenter';
import ListCenters from './cmp/Admin/ListCenters';
import AddAdmin from './cmp/Admin/AddAdmin';

import CenterLogin from './cmp/Center/CenterLogin';
import ListBeneficiariesD1 from './cmp/Center/ListBeneficiariesD1';
import ListBeneficiariesD2 from './cmp/Center/ListBeneficiariesD2';



function App() {
   
  const [user,setloginuser] = useState({});
  const [book,setBook] = useState({});
  const [adm,setAdm] = useState();
  const [cnt,setCnt] = useState();

  return (
    <div className="App">
     
      <Router>
      <Header adm={adm} cnt={cnt} setAdm={setAdm} setCnt={setCnt} /><br/>
            <Switch>
                <Route exact path='/'></Route>
                <Route path="/centerlogin"><CenterLogin setCnt={setCnt}/></Route>
                <Route path="/checkD1"><ListBeneficiariesD1/></Route>
                <Route path="/checkD2"><ListBeneficiariesD2/></Route>

                <Route path="/admin"><AdminLogin setAdm={setAdm}/></Route>
                <Route path="/adminAddAdm"><AddAdmin/> </Route>
                <Route path="/adminAddCen"><AddCenter/> </Route>
                <Route path="/adminUpdCen/:id"><UpdateCenter/> </Route>
                <Route path="/adminListCen"><ListCenters/> </Route>
                
                <Route path="/book"><Book/></Route>
                <Route path='/search'><Search/></Route>
                <Route path='/tracker'><Tracker/></Route>
            </Switch>
      </Router>
      
    </div>
  );
}

export default App;
