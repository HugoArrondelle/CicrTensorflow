import React, { useState, Fragment } from "react";
import { useHistory } from 'react-router-dom';
import './Login.css';
import { useCookies } from 'react-cookie';
import { Context } from './../../store/appContext'
import { Navbar } from "./../Navbar/Navbar";

const API = process.env.REACT_APP_API;


export const Login = () => {

  const handleToken = React.useContext(Context).handleToken;
  const handleCurrentUser = React.useContext(Context).handleCurrentUser;
  const handleCurrentUserMail = React.useContext(Context).handleCurrentUserMail;
  const handleCurrentRole = React.useContext(Context).handleCurrentRole;

  const [click, setClick] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookie, setCookie] = useCookies(['Token']);


  //console.log(window.isAuth.get('isAuth'));

  // const capitalize = (str) => {
  //   return str.charAt(0).toUpperCase() + str.slice(1);
  // }


  const createRequest = async (e) => {
    e.preventDefault();
      const res = await fetch(`${API}/requestUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      await res.json();

      setName("");
      setEmail("");
      setPassword("");
  };




let history = useHistory();


let date = new Date();
// add a day


  const login = async (e) => {
    e.preventDefault();
      date.setDate(date.getDate() + 1);
      console.log(date);
      const res = await fetch(`${API}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await res.json();

      if (res.status === 401){
        alert("incorrect Email or Password");
      }
      else {
        console.log("Login");
        setCookie('Token', data.access_token, { expires: date  });

        //sessionStorage.setItem('token', data.access_token);
        //sessionStorage.setItem('currentUser', capitalize(data.current_user));
        //sessionStorage.setItem('currentUserMail', capitalize(data.current_user_mail));

        handleCurrentRole(data.current_role);
        handleToken(data.access_token);
        handleToken(data.idUser);
        // handleCurrentUser(capitalize(data.current_user));
        // handleCurrentUserMail(capitalize(data.current_user_mail));
        handleCurrentUser(data.current_user);
        handleCurrentUserMail(data.current_user_mail);

        //sessionStorage.setItem('userName', capitalize(data.current_user));
        history.push("/");
      }

    setName("");
    setEmail("");
    setPassword("");

  };








  return (
    <Fragment>

    <Navbar />

    <div style={{
          top: '0%', height: "80px" , "backgroundColor":"rgb(170, 170, 170)",

      }} >

    </div>
  <div style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)'
    }} >


      <div className={click ? 'container1 right-panel-active' : 'container1'} id="container">

     <div className="form-container sign-up-container">

       <form onSubmit={createRequest}>
         <h1>Create Account</h1>
         <input
           type="text"
           onChange={(e) => setName(e.target.value)}
           value={name}
           className="form-control"
           placeholder="Name"
           autoFocus
         />

         <input
           type="email"
           onChange={(e) => setEmail(e.target.value)}
           value={email}
           className="form-control"
           placeholder="Email"
         />

         <input
           type="password"
           onChange={(e) => setPassword(e.target.value)}
           value={password}
           className="form-control"
           placeholder="Password"
         />

         <button>Sign Up</button>
       </form>
     </div>
     <div className="form-container sign-in-container">
       <form onSubmit={login}>
         <h1>Sign In</h1>

         <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            />
         <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            />

         <a href="/login">Forgot your password?</a>
         <button>Sign in</button>
       </form>
     </div>
     <div className="overlay-container">
       <div className="overlay">
         <div className="overlay-panel overlay-left">
           <h1 style={{
                 color: 'White'
             }}>Welcome Back!</h1>
           <p>To keep connected please login with your personal info</p>
           <button className="ghost" id="signIn" onClick={() => setClick(false)}>Sign In</button>
         </div>
         <div className="overlay-panel overlay-right">
           <h1 style={{
                 color: 'White'
             }} >Hello, friend</h1>
           <p>Enter your personal details and start jorney with us</p>
           <button className="ghost" id="signUp" onClick={() => setClick(true)} >Sign Up</button>
         </div>
       </div>
     </div>
   </div>

  </div>

  </Fragment>
);
}
