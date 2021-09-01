import React,  {  useState, useEffect, useRef, Fragment} from 'react'


import { useCookies } from 'react-cookie';
import { Context } from './../../../store/appContext'
//import  *   from './../../../App'


const API = process.env.REACT_APP_API;

export const MyAccount = () => {



  //const token = React.useContext(Context).token;
  const currentUser = React.useContext(Context).currentUser;
  const currentUserMail = React.useContext(Context).currentUserMail;
  //const currentRole = React.useContext(Context).currentRole;
  const currentId = React.useContext(Context).currentId;

  const handleToken = React.useContext(Context).handleToken;
  const handleCurrentUser = React.useContext(Context).handleCurrentUser;
  const handleCurrentUserMail = React.useContext(Context).handleCurrentUserMail;
  const handleCurrentRole = React.useContext(Context).handleCurrentRole;
  const handleCurrentId = React.useContext(Context).handleCurrentId;



  const [name, setName] = useState(currentUser);
  const [email, setEmail] = useState(currentUserMail);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //const [id, setId] = useState(currentId);

  const nameInput = useRef(null);

  const [cookies] = useCookies(['Token']);

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
          setName(body.userName);
          setEmail(body.email);
          //setCookie('Token', body.refresh_token, { expires: date  });
        }
      });
    });
  }

  const handleSubmit1 = async (e) => {
    e.preventDefault();
      const res = await fetch(`${API}/mycount/${currentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email
        }),
      });
      await res.json();
      reloadPage();
      setName(currentUser);
      setEmail(currentUserMail);
      nameInput.current.focus();


  };
  const handleSubmit2 = async (e) => {
    e.preventDefault();
      const res = await fetch(`${API}/mycountPassword/${currentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password,
          newPassword,
          confirmPassword
        }),
      });
      const data = await res.json();
      alert(data.message);
      setPassword("");
      setNewPassword("");
      setConfirmPassword("");
      //console.log(data);


  };


  const setImput = () => {
    setName(currentUser);
    setEmail(currentUserMail);
  }

  useEffect(() => {
    setImput();
  }, [currentUser, currentUserMail])

  return (

    <Fragment>

        <section className="main-home" id="home">
            <div className="home-page-photo"></div>
            <div className="home__header-content">
                <h1 className="intro-title">My Account</h1>
                <p className="intro-text">Lorem ipsum dolor sit amet consectetur adictum piscing elit fusce sit amet inerdum neque ultra icies <br/>  pelentesque tempor justo a scelerisque placerat sit amet magna e.</p>
                <a className="btn-custom" href="/home">Get started</a>
            </div>
        </section>




          <div className="container mt-5">
            <div className="row">
          <div className="bd-example bd-example-tabs">
            <ul className="nav nav-tabs justify-content-center" id="myTab" role="tablist">
              <li className="nav-item">
                <a className="nav-link nav-link-1 active" id="account-tab" data-toggle="tab" href="#account" role="tab" aria-controls="account" aria-selected="true"><i className="fas fa-user-edit"></i>   Update account</a>
              </li>
              <li className="nav-item">
                <a className="nav-link nav-link-2" id="password-tab" data-toggle="tab" href="#password" role="tab" aria-controls="password" aria-selected="false"><i className="fas fa-lock"></i>   Update password</a>
              </li>

            </ul>
            <div className="tab-content" id="myTabContent">
              <div className="tab-pane tab-pane-1 fade active show" id="account" role="tabpanel" aria-labelledby="account-tab">

              <section className="container">
              <div className="row justify-content-center">
                    <div className="col-md-6">
                      <form onSubmit={handleSubmit1} className="card card-body">
                        <div className="form-group">
                          <input
                            type="text"
                            id = "InputName"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            className="form-control"
                            placeholder="Name"
                            ref={nameInput}
                            autoFocus
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            className="form-control"
                            placeholder="User's Email"
                          />
                        </div>

                        <button className="btn btn-primary btn-block">
                          Update
                        </button>
                      </form>
                    </div>
                </div>
              </section>
                </div>
          <div className="tab-pane tab-pane-2 fade" id="password" role="tabpanel" aria-labelledby="password-tab">


          <section className="container">
          <div className="row justify-content-center">
                <div className="col-md-6">
                  <form onSubmit={handleSubmit2} className="card card-body">
                    <div className="form-group">
                      <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        className="form-control"
                        placeholder="Old password"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        onChange={(e) => setNewPassword(e.target.value)}
                        value={newPassword}
                        className="form-control"
                        placeholder="New Password"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        value={confirmPassword}
                        className="form-control"
                        placeholder="Comfirm Password"
                      />
                    </div>
                    <button className="btn btn-primary btn-block">
                      Update
                    </button>
                  </form>
                </div>
            </div>
          </section>
</div>
</div>
</div>
                </div>
        </div>












    </Fragment>
)

}
