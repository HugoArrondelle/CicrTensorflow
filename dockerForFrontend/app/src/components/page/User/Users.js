import React, { useState, useEffect, useRef, Fragment } from "react";
import './User.css';


const API = process.env.REACT_APP_API;

export const Users = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const [editing, setEditing] = useState(false);
  const [id, setId] = useState("");

  const nameInput = useRef(null);

  let [users, setUsers] = useState([]);
  let [request, setRequest] = useState([]);

  //console.log("role : ", role);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editing) {
      const res = await fetch(`${API}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role
        }),
      });
      const data = await res.json();
      console.log(data);
    } else {
      const res = await fetch(`${API}/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role
        }),
      });
      const data = await res.json();
      console.log(data);
      setEditing(false);
      setId("");
    }
    await getUsers();
    await getRequest();
    setName("");
    setEmail("");
    setPassword("");

    nameInput.current.focus();

  };


  const getRequest = async () => {
    const res = await fetch(`${API}/requestUser`);
    const data = await res.json();
    //console.log(data);
    setRequest(data);
  };

  const getUsers = async () => {
    const res = await fetch(`${API}/users`);
    const data = await res.json();
    //console.log(data);
    setUsers(data);
  };

  const deleteUser = async (id) => {
    const userResponse = window.confirm("Are you sure you want to delete it?");
    if (userResponse) {
      const res = await fetch(`${API}/users/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      console.log(data);
      await getUsers();
    }
  };

  const deleteRequest = async (id) => {
    const requestResponse = window.confirm("Are you sure you want to delete it?");
    if (requestResponse) {
      const res = await fetch(`${API}/requestUser/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      console.log(data);
      await getRequest();
    }
  };



  const editUser = async (id) => {
    const res = await fetch(`${API}/users/${id}`);
    const data = await res.json();
    const activeLink = document.querySelector(".nav-link-1");
    const desactiveLink = document.querySelector(".nav-link-2");
    const activeTab = document.querySelector(".tab-pane-1");
    const desactiveTab = document.querySelector(".tab-pane-2");


    setEditing(true);
    setId(id);

    desactiveLink.setAttribute("aria-selected", "false");
    activeLink.setAttribute("aria-selected", "true");
    desactiveLink.classList.remove("active", "show");
    desactiveTab.classList.remove("active", "show");
    activeLink.classList.add("active", "show");
    activeTab.classList.add("active", "show");

    // Reset
    setName(data.name);
    setEmail(data.email);
    setPassword(data.password);
    setRole(data.role);
    nameInput.current.focus();
  };



  const validRequest = async (id) => {
    const res = await fetch(`${API}/requestUser/${id}/${role}`);
    await res.json();
    await getRequest();
  };








  useEffect(() => {
    getUsers();
    getRequest();
  }, []);

  return (
<Fragment>

    <section className="main-home" id="home">
        <div className="home-page-photo"></div>
        <div className="home__header-content">
            <h1 className="intro-title">We are digital expert</h1>
            <p className="intro-text">Lorem ipsum dolor sit amet consectetur adictum piscing elit fusce sit amet inerdum neque ultra icies <br/>  pelentesque tempor justo a scelerisque placerat sit amet magna e.</p>
            <a className="btn-custom" href="/home">Get started</a>
        </div>
    </section>




      <div className="container mt-5">
        <div className="row">
      <div className="bd-example bd-example-tabs">
        <ul className="nav nav-tabs justify-content-center" id="myTab" role="tablist">
          <li className="nav-item">
            <a className="nav-link nav-link-1 active" id="account-tab" data-toggle="tab" href="#account" role="tab" aria-controls="account" aria-selected="true"><i className="fas fa-user-plus"></i>   Create an account</a>
          </li>
          <li className="nav-item">
            <a className="nav-link nav-link-2" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false"><i className="fas fa-users"></i>   Users</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false"><i className="fas fa-user-check"></i>   Requests</a>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
          <div className="tab-pane tab-pane-1 fade active show" id="account" role="tabpanel" aria-labelledby="account-tab">

          <section className="container">
          <div className="row justify-content-center">
                <div className="col-md-6">
                  <form onSubmit={handleSubmit} className="card card-body">
                    <div className="form-group">
                      <input
                        type="text"
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
                    <div className="form-group">
                      <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        className="form-control"
                        placeholder="User's Password"
                      />
                    </div>
                    <div className="form-group">
                      <select defaultValue={role} className="form-control" onChange={(e) => setRole(e.target.value)} >
                        <option defaultValue="" disabled selected>Select your option</option>
                        <option defaultValue="admin">admin</option>
                        <option defaultValue="user">user</option>
                      </select>


                    </div>
                    <button className="btn btn-primary btn-block">
                      {editing ? "Update" : "Create"}
                    </button>
                  </form>
                </div>
            </div>
          </section>
            </div>
          <div className="tab-pane tab-pane-2 fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">


          <section className="container">
          <div className="row justify-content-center">
                <div className="">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Password</th>
                        <th>Operations</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user._id}>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.role}</td>
                          <td>****</td>
                          <td>
                            <button
                              className="btn btn-secondary btn-sm btn-block"
                              onClick={(e) => editUser(user._id)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-danger btn-sm btn-block"
                              onClick={(e) => deleteUser(user._id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                    </div>
                </section>



                </div>
          <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">

                          <section className="container">
                              <div className="col-md-6">
                              {request.map((request) => (
                                <table className="table table-striped">
                                  <thead>
                                    <tr>
                                      <th>Name</th>
                                      <th>Email</th>
                                      <th>Role</th>
                                      <th>Password</th>
                                      <th>Operations</th>
                                    </tr>
                                  </thead>
                                  <tbody>

                                      <tr key={request._id}>
                                        <td>{request.name}</td>
                                        <td>{request.email}</td>
                                        <td>
                                        <select onChange={(e) => setRole(e.target.value)} >
                                          <option defaultValue="" disabled selected>Select your option</option>
                                          <option defaultValue="admin">admin</option>
                                          <option defaultValue="user">user</option>
                                        </select>
                                        </td>
                                        <td>****</td>
                                        <td>
                                          <button
                                            className="btn btn-secondary btn-sm btn-block"
                                            onClick={(e) => validRequest(request._id,role)}
                                          >
                                            Valid
                                          </button>
                                          <button
                                            className="btn btn-danger btn-sm btn-block"
                                            onClick={(e) => deleteRequest(request._id)}
                                          >
                                            Delete
                                          </button>
                                        </td>
                                      </tr>

                                  </tbody>
                                </table>
                                ))}
                              </div>

                          </section>
          </div>
        </div>
      </div>
      </div>
    </div>












</Fragment>
  );
};
