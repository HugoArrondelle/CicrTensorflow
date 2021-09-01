import React, { useState, Fragment } from "react";


import LoadingScreen from 'react-loading-screen';
import logo from './../../../../image/cicr_logo.png';


import { Navbar } from "./../../../Navbar/Navbar";

import { Context } from './../../../../store/appContext'

import './Background.css';


import { useCookies } from 'react-cookie';


import { SaveButton } from './../../../SaveButton/SaveButton';


const API = process.env.REACT_APP_API_BACKGROUND;




export const Background = () => {

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
    console.log("Path : " , event.target.files);
    setpreviewImage(URL.createObjectURL(event.target.files[0]));

  };




  let date = new Date();
  // console.log(cookies.Token);
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

          fetch(`${API}/background`, { method: 'POST', body: d, headers: {
            'Authorization': cookies.Token,
            'current_user_mail' : currentUserMail
          }, })
          .then((response) => { response.json().then((body) => {
            if (response.status === 422 || response.status === 401) {
              alert("Token not valid")
            }
            else  {
              // console.log(body._id);
              setCookie('Token', body.refresh_token, { expires: date  });
              setUrlImageTransform(body._id);

            }
            setLoading(false);
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
                  <h1 className="intro-title">Background</h1>
                  <p className="intro-text">Lorem ipsum dolor sit amet consectetur adictum piscing elit fusce sit amet inerdum neque ultra icies <br/>  pelentesque tempor justo a scelerisque placerat sit amet magna e.</p>
                  <svg id="SVG7" enableBackground="0 0 512 512" height="80" viewBox="0 0 578.405 578.405" width="80" xmlns="http://www.w3.org/2000/svg"><g><path d="M491.54,352.312c11.024,0,19.961-8.937,19.961-19.961V202.604c0-44.026-35.818-79.844-79.844-79.844h-41.918V79.844
                  C389.739,35.818,353.921,0,309.895,0H80.343C36.317,0,0.499,35.818,0.499,79.844v229.552c0,44.026,35.818,79.844,79.844,79.844
                  h41.918v42.916c0,44.026,35.818,79.844,79.844,79.844h229.552c44.026,0,79.844-35.818,79.844-79.844
                  c0-11.024-8.937-19.961-19.961-19.961c-11.024,0-19.961,8.937-19.961,19.961c0,22.013-17.909,39.922-39.922,39.922H202.105
                  c-22.013,0-39.922-17.909-39.922-39.922V202.604c0-22.013,17.909-39.922,39.922-39.922h229.552
                  c22.013,0,39.922,17.909,39.922,39.922v129.747C471.579,343.375,480.516,352.312,491.54,352.312z M40.421,79.844
                  c0-22.013,17.909-39.922,39.922-39.922h28.358l-68.28,68.273V79.844z M122.261,349.318H83.482l38.779-38.779V349.318z
                  M122.261,202.604v51.474l-76.033,76.034c-3.684-6.043-5.808-13.136-5.808-20.717v-31.354l82.117-82.118
                  C122.355,198.127,122.261,200.355,122.261,202.604z M40.421,221.583v-56.932L165.02,40.065c0.047-0.047,0.094-0.095,0.141-0.143
                  h56.921L40.421,221.583z M253.587,122.76h-51.481c-2.25,0-4.477,0.094-6.68,0.276l78.182-78.182
                  c1.49-1.49,2.695-3.157,3.615-4.932h32.672c7.58,0,14.673,2.124,20.717,5.808l-76.749,76.749
                  C253.769,122.572,253.678,122.666,253.587,122.76z M349.817,122.76h-39.777l39.777-39.777V122.76z"/></g></svg></div>
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
                          <h3 className="title text-center">Background</h3>
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
                                        <img className="targetImg preview" src={urlImageTransform} alt="" />
                              </div>
                          </div>
                      </div>
                      <div className="col-lg-5 col-md-5 col-sm-5 container justify-content-center services-item">
                      <SaveButton/>
                      </div>
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
