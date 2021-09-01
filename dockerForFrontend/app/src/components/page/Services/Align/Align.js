import React, { useState, Fragment } from "react";


import LoadingScreen from 'react-loading-screen';
import logo from './../../../../image/cicr_logo.png';


import { Navbar } from "./../../../../components/Navbar/Navbar";

import './Align.css';


import { useCookies } from 'react-cookie';

import { SaveButton } from './../../../SaveButton/SaveButton';

import { Context } from './../../../../store/appContext'

const API = process.env.REACT_APP_API_ALIGN;




export const Align = () => {

  const currentUserMail = React.useContext(Context).currentUserMail;
  //const handleCurrentUserMail = React.useContext(Context).handleCurrentUserMail;


  const [cookies, setCookie] = useCookies(['Token']);

  const [modalShow, setModalShow] = useState(false);
  const [fileTest, setFileTest] = useState(null);
  const [urlImageTransform, setUrlImageTransform] = useState("");
  const [loading, setLoading] = useState(false);
  let [previewImage, setpreviewImage] = useState(null);

  const selectFile = async (event) => {
    setFileTest(event.target.files[0]);
    setpreviewImage(URL.createObjectURL(event.target.files[0]));

  };

  let date = new Date();

  const handleUploadImage = async (event) =>  {
          event.preventDefault();

          const trueInputImg = document.querySelector('.trueInputImg');
          // console.log("@@@@@@@@@@@ truInput: ", trueInputImg);

          date.setDate(date.getDate() + 1);
          if (trueInputImg.files.length) {
            setLoading(true);
          }
          else
            return alert("You must insert an image!")
          const d = new FormData();
          d.append('file', fileTest);


          fetch(`${API}/align`, { method: 'POST', body: d, headers: {
            'Authorization': cookies.Token,
            'current_user_mail' : currentUserMail
          }, })
          .then((response) => { response.json().then((body) => {
              setLoading(false);
              if (response.status === 422 || response.status === 401) {
                  alert(body.message)
              }
              else  {
                // console.log(body._id);
                setCookie('Token', body.refresh_token, { expires: date  });
                setUrlImageTransform(body._id);
              }

            });
          });
        }





    return (


      <Fragment>
      <Navbar />
      <div className="test">



{modalShow && (

    <div className="mobal_custom">
          <div className="modal__locked">
            <div className="modal-body">
              <center>
                <strong>Exemple</strong>
                <p>
                  This offer is not valid for your plan. Please upgrade your account to
                  enjoy more features.
                </p>
              </center>
            </div>
            <div className="modal-buttons">
              <button className="btn btn-footer btn-white" onClick={() => setModalShow(false)}>Cancel</button>
            </div>
          </div>
        </div>
)}

      {(
              loading === true
              ? <LoadingScreen
                  loading={true}
                  bgColor='rgba(241,241,241,0.95)'
                  spinnerColor='rgba(205,43,57,1)'
                  textColor='#676767'
                  logoSrc={logo}
                  text='Algorithme en cours de traitement'
                >

                </LoadingScreen>
              :

              <div>
          <section className="main-home" id="home">
              <div className="home-page-photo"></div>
              <div className="home__header-content">
                  <h1 className="intro-title">Align</h1>
                  <p className="intro-text">Lorem ipsum dolor sit amet consectetur adictum piscing elit fusce sit amet inerdum neque ultra icies <br/>  pelentesque tempor justo a scelerisque placerat sit amet magna e.</p>
                  <svg id="SVG8" enableBackground="0 0 318.263 318.263" height="80" viewBox="0 0 318.263 318.263" width="80" xmlns="http://www.w3.org/2000/svg"><g><path d="M232.344,127.31c-1.664,0.052-3.196,0.866-4.163,2.204l-7.533,10.321c-6.451-33.851-29.496-58.723-56.427-58.723
                  c-29.607,0-52.065,23.121-57.002,56.691l-6.685-8.457c-1.195-1.499-3.066-2.268-4.985-1.984c-1.897,0.275-3.498,1.539-4.217,3.312
                  L80.67,157.129c-0.581,1.443-0.509,3.076,0.205,4.463l8.293,16.188c0.701,1.371,1.953,2.373,3.451,2.758l16.417,4.215
                  c6.515,31.958,27.888,52.41,55.195,52.41c25.125,0,46.919-20.851,55.029-52.263l21.434-4.306c1.621-0.335,3.008-1.392,3.743-2.866
                  l10.649-21.312c0.972-1.912,0.688-4.213-0.676-5.856l-17.765-21.321C235.593,127.966,234.071,127.213,232.344,127.31z"/>
                <path d="M162.453,308.895c59.023,0,112.662-35.144,136.632-88.425l9.292,14.246c1.028,1.58,2.75,2.441,4.508,2.441
                  c1.014,0,2.026-0.29,2.93-0.872c2.493-1.623,3.202-4.95,1.568-7.438l-14.865-22.803c-0.052-0.086-0.143-0.117-0.199-0.2
                  c-0.127-0.169-0.268-0.335-0.421-0.488c-0.177-0.194-0.361-0.351-0.571-0.53c-0.174-0.137-0.341-0.283-0.54-0.399
                  c-0.189-0.114-0.374-0.189-0.573-0.283c-0.12-0.067-0.221-0.158-0.341-0.21c-0.115-0.042-0.252-0.021-0.374-0.062
                  c-0.192-0.062-0.393-0.116-0.603-0.158c-0.221-0.042-0.441-0.031-0.673-0.042c-0.262-0.01-0.52-0.01-0.787,0.021
                  c-0.215,0.021-0.409,0.041-0.618,0.105c-0.101,0.021-0.184-0.005-0.29,0.021l-36.063,10.445c-2.834,0.83-4.493,3.801-3.68,6.655
                  c0.683,2.358,2.83,3.885,5.165,3.885c0.504,0,1.008-0.072,1.498-0.21l25.328-7.337c-22.505,48.802-71.961,80.897-126.312,80.897
                  c-57.933,0-110.348-36.489-130.445-90.819c-1.021-2.793-4.123-4.21-6.903-3.182c-2.791,1.019-4.207,4.126-3.176,6.908
                  C43.574,269.582,100.043,308.895,162.453,308.895z"/>
                <path d="M293.153,111.635c0.787,2.181,2.854,3.543,5.049,3.543c0.604,0,1.229-0.11,1.838-0.328
                  c2.792-1.016,4.231-4.102,3.213-6.893C281.818,48.989,225.236,9.369,162.458,9.369c-59.668,0-113.792,35.971-137.375,90.246
                  L9.178,83.708c-2.102-2.1-5.499-2.1-7.601,0c-2.102,2.103-2.102,5.502,0,7.602l21.588,21.588c0.021,0.021,0.052,0.035,0.076,0.056
                  c0.196,0.191,0.473,0.31,0.703,0.473c0.318,0.225,0.606,0.482,0.974,0.634c0.037,0.016,0.079,0.021,0.118,0.037
                  c0.026,0.01,0.042,0.031,0.068,0.042c0.271,0.102,0.538,0.076,0.806,0.128c0.357,0.071,0.701,0.205,1.055,0.205h0.242
                  c0,0,0,0,0.005,0h38.116c2.973,0,5.375-2.407,5.375-5.375c0-2.966-2.402-5.375-5.375-5.375H35.013
                  C56.932,53.43,107.14,20.12,162.453,20.12C220.731,20.12,273.246,56.887,293.153,111.635z"/></g></svg></div>
          </section>

          <div className="position-relative mobalIcon">
              <div className="position-absolute">
                  <button className='btn btn__Vid' onClick={() => setModalShow(true)}  >
                      <svg id="SVG7" enableBackground="new 0 0 512 512" height="50" width="60" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                          <g>
                          <path d="M446.25,0h-357c-28.05,0-51,22.95-51,51v357c0,28.05,22.95,51,51,51h102l76.5,76.5l76.5-76.5h102c28.05,0,51-22.95,51-51
                              V51C497.25,22.95,474.3,0,446.25,0z M293.25,408h-51v-51h51V408z M346.8,211.65l-22.95,22.95c-20.399,17.85-30.6,33.15-30.6,71.4
                              h-51v-12.75c0-28.05,10.2-53.55,30.6-71.4l30.601-33.15c10.2-7.65,15.3-20.4,15.3-35.7c0-28.05-22.95-51-51-51s-51,22.95-51,51
                              h-51c0-56.1,45.9-102,102-102c56.1,0,102,45.9,102,102C369.75,175.95,359.55,196.35,346.8,211.65z"/>
                          </g>
                      </svg>
                  </button>
              </div>

          </div>




          <section id="services">
              <div className="container">
                  <div className="row">
                      <div className="col-md-12">
                          <h3 className="title text-center">Align</h3>
                          <div className="titleHR"><span></span></div>
                      </div>
                  </div>
                  <div className="row">
                      <div className="col-sm-6">
                          <div className="text-center services-item">
                              <div className="col-wrapper">
                                  <button className="btn btn-primary btn-block" href="#">Select automatic</button>
                              </div>
                          </div>
                      </div>
                      <div className="col-sm-6">
                          <div className="text-center services-item">
                              <div className="col-wrapper">
                                  <button className="btn btn-primary btn-block" href="#">Select eyes</button>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div className="row">
                      <div className="col-md-12 services-item">
                          <h3 className="title text-center">Upload your image</h3>
                          <div className="titleHR"><span></span></div>
                      </div>
                  </div>




                  <div className="row">
                      <div className="imageCase">
                          <div className="mt-5 text-center text-uppercase">Select your image</div>
                          <div className="card-body">
                              <div className="card-title text-center col d-flex align-items-center justify-content-center">

                              {(
                                      previewImage === null
                                      ? <svg id="SVGImageCase" height="50%" viewBox="0 -21 511.98744 511" width="50%" xmlns="http://www.w3.org/2000/svg"><path d="m377.652344 469.828125c-4.03125 0-8.148438-.511719-12.226563-1.578125l-329.898437-88.34375c-25.449219-7.019531-40.617188-33.34375-33.960938-58.773438l36.265625-139.070312c2.21875-8.535156 10.945313-13.71875 19.519531-11.433594 8.535157 2.21875 13.675782 10.964844 11.4375 19.519532l-36.269531 139.09375c-2.238281 8.574218 2.859375 17.425781 11.394531 19.773437l329.707032 88.300781c8.46875 2.238282 17.214844-2.796875 19.433594-11.222656l11.261718-45.441406c2.136719-8.574219 10.796875-13.78125 19.371094-11.6875 8.578125 2.132812 13.804688 10.792968 11.691406 19.367187l-11.304687 45.65625c-5.699219 21.609375-25.152344 35.839844-46.421875 35.839844zm0 0"/><path d="m463.988281 341.828125h-330.667969c-26.472656 0-48-21.527344-48-48v-245.335937c0-26.472657 21.527344-48 48-48h330.667969c26.472657 0 48 21.527343 48 48v245.335937c0 26.472656-21.527343 48-48 48zm-330.667969-309.335937c-8.832031 0-16 7.167968-16 16v245.335937c0 8.832031 7.167969 16 16 16h330.667969c8.832031 0 16-7.167969 16-16v-245.335937c0-8.832032-7.167969-16-16-16zm0 0"/><path d="m191.988281 149.828125c-23.53125 0-42.667969-19.136719-42.667969-42.667969s19.136719-42.667968 42.667969-42.667968 42.664063 19.136718 42.664063 42.667968-19.132813 42.667969-42.664063 42.667969zm0-53.335937c-5.890625 0-10.667969 4.78125-10.667969 10.667968 0 5.886719 4.777344 10.667969 10.667969 10.667969 5.886719 0 10.664063-4.78125 10.664063-10.667969 0-5.886718-4.777344-10.667968-10.664063-10.667968zm0 0"/><path d="m101.746094 320.066406c-4.09375 0-8.191406-1.558594-11.304688-4.691406-6.25-6.25-6.25-16.386719 0-22.636719l96.425782-96.425781c14.59375-14.59375 38.335937-14.59375 52.90625 0l25.792968 25.792969 79.230469-95.105469c7.082031-8.492188 17.472656-13.398438 28.503906-13.460938 11.859375-.660156 21.460938 4.734376 28.605469 13.121094l106.199219 123.902344c5.757812 6.699219 4.96875 16.8125-1.730469 22.570312-6.71875 5.761719-16.808594 4.972657-22.570312-1.726562l-106.238282-123.945312c-1.410156-1.6875-3.136718-1.601563-4.097656-1.902344-.914062 0-2.6875.277344-4.09375 1.941406l-90.453125 108.589844c-2.882813 3.453125-7.082031 5.546875-11.5625 5.738281-4.566406.253906-8.875-1.496094-12.035156-4.671875l-38.183594-38.1875c-2.710937-2.710938-4.949219-2.710938-7.660156 0l-96.425781 96.40625c-3.117188 3.132812-7.210938 4.691406-11.308594 4.691406zm0 0"/></svg>
                                      : <img className="preview" src={previewImage} alt="" />
                              )}





                              </div>


                          </div>
                      </div>
                              <div className="col-lg-5 col-md-5 col-sm-5 container justify-content-center services-item">
                                <form onSubmit={handleUploadImage}>
                                    <input className="trueInputImg" name="file" type="file" onChange={selectFile} />
                                    <button>Upload</button>
                                </form>
                              </div>
                  </div>
              </div>
          </section>
          <section>
          {urlImageTransform && (
              <div className="container">
                  <div className="row">
                      <div className="imageCase">
                          <div className="mt-5 text-center text-uppercase">your results</div>
                          <div className="card-body">
                              <div className="card-text col d-flex align-items-center justify-content-center">
                                        <img className="preview" src={urlImageTransform} alt="" />
                              </div>
                          </div>
                      </div>
                      <SaveButton/>
                  </div>
              </div>
            )}
          </section>

          </div>
          )}
        </div>
      </Fragment>
    );




}
