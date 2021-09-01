import React, {useEffect, useState} from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Navbar } from "./components/Navbar/Navbar";
import { About } from "./components/page/About/About";
import { Users } from "./components/page/User/Users";
import { Login } from "./components/Login/Login";
import { ContactUs } from "./components/ContactUs/ContactUs";
import { Home } from "./components/page/Home/Home";
import { PageNotFound } from "./components/page/PageNotFound/PageNotFound";
import { MultiServices } from "./components/page/MultiServices/MultiServices";
import { MyAccount } from "./components/page/MyAccount/MyAccount";
import { Nose } from "./components/page/Services/Nose/Nose";
import { Skin } from "./components/page/Services/Skin/Skin";
import { Teeth } from "./components/page/Services/Teeth/Teeth";
import { Moustache_Beard } from "./components/page/Services/Moustache&Beard/Moustache_Beard";
import { Eyes } from "./components/page/Services/Eyes/Eyes";
import { Grey } from "./components/page/Services/Grey/Grey";
import { Background } from "./components/page/Services/Background/Background";
import { Align } from "./components/page/Services/Align/Align";
import GuardedRoute from './components/GuardedRoute';
import { DataBaseImg } from "./components/page/dataBaseImg/DataBaseImg";
import { Context } from './store/appContext';


import { useCookies } from 'react-cookie';

//window.isAuth = require ('local-storage');

const API = process.env.REACT_APP_API;

function App() {

  const [token, setToken] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [currentUserMail, setCurrentUserMail] = useState("");
  const [currentRole, setCurrentRole] = useState("");
  const [currentId, setCurrentId] = useState("");
  //console.log(window.isAuth.get('isAuth'));

  const [cookies] = useCookies(['Token']);

  //let date = new Date();

  const handleCurrentId = (value) => {
    setCurrentId(value);
  }
  const handleCurrentRole = (value) => {
    setCurrentRole(value);
  }
  const handleToken = (value) => {
    setToken(value);
  }
  const handleCurrentUser = (value) => {
    setCurrentUser(value);
  }
  const handleCurrentUserMail = (value) => {
    setCurrentUserMail(value);
  }
  //console.log("@@@@@@@@@@@@@@@@ App page currentUnser 1: ", currentUser);
  const reloadPage= () => {
    //console.log("@@@@@@@@@@@@@@@@ App page: ", cookies.Token);
    //console.log("@@@@@@@@@@@@@@@@ App page currentUnser: ", currentUser);
    fetch(`${API}/reloadPage`, {
      method: 'POST',
      headers: {
        'Authorization': cookies.Token,
      //  'currentName': currentUser,
      },
    })
    .then((response) => { response.json().then((body) => {
        if (response.status === 422 || response.status === 401) {
          console.log("Token not valid")
        }
        else {
          handleToken(body.refresh_token)
          handleCurrentUser(body.userName);
          handleCurrentId(body.idUser);
          handleCurrentRole(body.role);
          handleCurrentUserMail(body.email);
          }
      });
    });
  }

  useEffect(() => {
    reloadPage();
  }, [])

  return (
    <Context.Provider value = {{
      currentId:currentId,
      currentUser: currentUser,
      currentUserMail: currentUserMail,
      currentRole: currentRole,
      token: token,
      handleCurrentId:handleCurrentId,
      handleCurrentRole:handleCurrentRole,
      handleToken: handleToken,
      handleCurrentUser: handleCurrentUser,
      handleCurrentUserMail: handleCurrentUserMail,
    }}>
      <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route exact path="/about">
          <Navbar />
          <div className="test">
          <About />
          </div>
        </Route>
        <Route exact path="/" component={Home} ></Route>

        <GuardedRoute exact path="/background" component={Background} ></GuardedRoute>
        <GuardedRoute exact path="/align" component={Align} ></GuardedRoute>
        <GuardedRoute exact path="/nose" component={Nose} ></GuardedRoute>
        <GuardedRoute exact path="/skin" component={Skin} ></GuardedRoute>
        <GuardedRoute exact path="/teeth" component={Teeth} ></GuardedRoute>
        <GuardedRoute exact path="/grey" component={Grey} ></GuardedRoute>
        <GuardedRoute exact path="/eyes" component={Eyes} ></GuardedRoute>
        <GuardedRoute exact path="/moustacheBeard" component={Moustache_Beard} ></GuardedRoute>

        <Route exact path="/Services">
          <Navbar />
          <div className="test">
          <MultiServices/>
          </div>
        </Route>


        <Route exact path="/contact">
          <div className="test">
          <ContactUs/>
          </div>
        </Route>


        <Route exact path="/dataBaseImg">
          <Navbar />
          <div className="test">
          <DataBaseImg/>
          </div>
        </Route>

        <Route exact path="/users" >
          <Navbar />
          <div className="test">
          <Users/>
          </div>
        </Route>
        <Route exact path="/myaccount" >
          <Navbar />
          <div className="test">
          <MyAccount/>
          </div>
        </Route>
        <Route component={PageNotFound}></Route>


        </Switch>
      </Router>
    </Context.Provider>
  );

}
export default App;
