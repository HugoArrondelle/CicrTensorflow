import React, { useState, Fragment } from "react";


import LoadingScreen from 'react-loading-screen';
import logo from './../../../../image/cicr_logo.png';


import { Navbar } from "./../../../Navbar/Navbar";

import { Context } from './../../../../store/appContext'

import './Teeth.css';


import { useCookies } from 'react-cookie';


import { SaveButton } from './../../../SaveButton/SaveButton';


const API = process.env.REACT_APP_API;




export const Teeth = () => {

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
            alert("You must insert an image!")

          const d = new FormData();
          d.append('file', fileTest);

          /******************************************/
          // Algo ALIGN AND NOT Teeth
          /******************************************/
          fetch(`${API}/align`, { method: 'POST', body: d, headers: {
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
                  <h1 className="intro-title">Teeth</h1>
                  <p className="intro-text">Lorem ipsum dolor sit amet consectetur adictum piscing elit fusce sit amet inerdum neque ultra icies <br/>  pelentesque tempor justo a scelerisque placerat sit amet magna e.</p>
                  <svg id="SVG3" enableBackground="new 0 0 511.774 511.774" height="80" viewBox="0 0 511.774 511.774" width="80" xmlns="http://www.w3.org/2000/svg"><path d="m475.746 297.696c-27.857 0-28.092-.455-31.884 1.368-3.051-2.649-6.928-4.244-11.149-4.244h-34.513c-3.765 0-7.253 1.272-10.13 3.425-3.052-2.078-6.735-3.295-10.697-3.295-42.321 0-42.624-.812-48.412 2.44-3.27-2.906-7.56-4.688-12.269-4.688h-50.293c-3.902 0-7.521 1.221-10.509 3.291-2.988-2.07-6.606-3.291-10.509-3.291h-50.293c-4.709 0-8.999 1.782-12.269 4.688-5.788-3.252-6.091-2.44-48.412-2.44-3.963 0-7.645 1.217-10.697 3.295-2.876-2.152-6.365-3.425-10.13-3.425h-34.512c-4.221 0-8.098 1.595-11.149 4.244-3.814-1.834-4.111-1.368-31.884-1.368-8.456 0-15.336 7.825-15.336 17.443 0 23.08-1.05 29.947 4.132 40.179-.681 39.379 19.564 82.488 78.71 87.766 23.313 2.08 51.462.158 81.261-1.877 62.764-4.284 79.36-4.288 142.176 0 25.692 1.755 56.73 4.066 81.261 1.877 59.146-5.278 79.391-48.387 78.71-87.766 5.203-10.273 4.132-17.508 4.132-40.179 0-9.617-6.879-17.443-15.335-17.443zm-79.31 16.318c0-2.166 1.158-3.193 1.764-3.193h34.513c.702 0 1.76 1.222 1.764 3.063.06 30.245.384 33.896-2.02 39.566-9.111 21.597-36.02 13.399-36.02-10.125v-29.311zm-61.235 0c0-1.689 1.374-3.063 3.063-3.063h39.108c1.689 0 3.067 1.374 3.063 3.063-.065 28.526.328 29.928-.421 33.772-5.311 27.421-44.815 22.258-44.815-4.331v-29.441zm-71.311-2.802c0-1.384 1.125-2.51 2.509-2.51h50.293c1.384 0 2.509 1.126 2.509 2.51v46.259c0 11.625-9.458 21.083-21.083 21.083h-13.145c-11.625 0-21.083-9.458-21.083-21.083zm-71.31 0c0-1.384 1.125-2.51 2.509-2.51h50.293c1.384 0 2.509 1.126 2.509 2.51v46.259c0 11.625-9.458 21.083-21.083 21.083h-13.145c-11.625 0-21.083-9.458-21.083-21.083 0-24.465 0-32.958 0-46.259zm-61.236 32.113v-29.312c0-1.689 1.374-3.063 3.063-3.063h39.108c1.689 0 3.063 1.374 3.063 3.063v29.441c.002 30.734-45.234 29.256-45.234-.129zm-54.04-29.441c0-1.842 1.062-3.063 1.764-3.063h34.513c.702 0 1.764 1.222 1.764 3.063v29.441c0 30.424-38.04 29.492-38.04 0-.001-17.992-.001-13.427-.001-29.441zm-37.566 35.458c-4.014-6.824-3.039-12.099-3.039-34.202 0-.655.144-1.14.279-1.443h24.047c.399.892.279-.215.279 23.881 0 15.658-13.594 25.113-21.566 11.764zm367.079 77.806c-22.061 1.972-49.597.089-78.749-1.902-63.513-4.336-80.814-4.338-144.355 0-29.151 1.992-56.688 3.876-78.749 1.902-37.088-3.309-58.024-23.505-63.075-56.527.101.003 13.1 5.146 24.955-6.437 12.853 22.04 41.774 24.004 56.848 3.242 13.694 17.269 39.267 19.724 55.969 4.841 5.82 13.311 19.089 22.515 34.003 22.287 12.579-.192 28.767 2.868 42.228-14.101 14.765 18.612 35.756 13.155 42.228 14.101 14.578 0 28.012-8.621 34.003-22.287 16.699 14.88 42.248 12.446 55.969-4.841 14.899 20.519 43.826 19.088 56.849-3.242 11.85 11.577 24.851 6.44 24.954 6.437-5.049 32.986-25.953 53.214-63.078 56.527zm68.264-89.571c0 9.001-5.685 20.037-14.286 17.866-6.522-1.701-10.32-10.115-10.32-17.866 0-24.257-.119-22.989.279-23.881h24.047c.4.893.28-.214.28 23.881z"/><path d="m366.82 86.845c3.847 0 7.115-2.732 7.84-6.439 1.034-4.776-2.709-9.561-7.84-9.561-3.844 0-7.114 2.724-7.84 6.44-1.025 4.736 2.662 9.56 7.84 9.56z"/><path d="m479.927 99.149c-25.049-4.153-53.069-14.472-82.915-22.072-4.281-1.087-8.636 1.498-9.727 5.779-1.09 4.281 1.497 8.636 5.779 9.727 29.534 7.52 57.874 17.979 84.245 22.352 8.054 1.335 13.303 4.765 16.046 10.482 6.009 12.528.518 33.909-6.303 51.392-8.816-18.015-29.82-22.641-43.474-7.521-14.416-21.336-43.256-20.575-56.864.946-14.705-16.563-40.067-17.396-55.816-2.072-6.461-12.139-19.063-19.758-32.781-19.758-6.396.917-27.549-4.468-42.228 14.101-7.029-8.892-17.788-14.114-29.083-14.101-12.306.014-14.702-.169-18.519.395-11.947 1.738-21.997 9.201-27.406 19.363-15.785-15.358-41.091-14.47-55.816 2.072-13.68-21.635-42.51-22.191-56.864-.946-13.559-15.016-34.395-10.634-43.454 7.483-5.492-14.011-12.772-37.905-6.323-51.353 2.743-5.72 7.992-9.148 16.047-10.484 49.238-8.165 104.179-37.117 163.012-29.774 74.142 9.253 110.064-1.62 138.863-1.152 4.391.105 8.057-3.452 8.128-7.87.338-20.963-44.093 5.743-145.009-6.854-62.582-7.813-120.259 22.015-167.612 29.865-47.177 7.824-34.032 64.923-11.154 107.045v20.398c0 9.618 6.88 17.443 15.336 17.443 28.503 0 26.983.156 29.299-.437 3.26 4.264 8.205 6.991 13.734 6.991h34.513c4.264 0 8.181-1.624 11.246-4.321 10.316 9.555 19.824 7.87 38.23 7.87 6.79 0 13.047-2.31 18.04-6.177 4.849 7.287 13.134 12.102 22.525 12.102h33.229c7.42 0 14.15-3.006 19.041-7.862 4.891 4.856 11.621 7.862 19.041 7.862h33.229c9.391 0 17.675-4.814 22.525-12.102 10.037 7.774 18.976 6.177 36.228 6.177 7.73 0 14.773-2.99 20.041-7.87 3.065 2.698 6.982 4.321 11.246 4.321h34.513c5.529 0 10.474-2.727 13.734-6.991 3.081.789 3.243.364 29.299.437 8.456.024 15.336-7.825 15.336-17.443v-20.325c22.654-42.459 36.218-99.256-11.157-107.118zm-418.903 128.887h-24.046c-.34-.76-.28-33.584-.279-33.689.042-9.83 5.634-18.135 12.303-18.135s12.303 8.305 12.303 18.135c-.001 35.308.115 32.81-.281 33.689zm54.32 3.489c0 1.842-1.062 3.064-1.764 3.064h-34.512c-.702 0-1.764-1.223-1.764-3.064 0-9.911 0-29.446 0-39.249 0-12.471 8.532-22.617 19.02-22.617s19.021 10.146 19.021 22.617c-.001 13.2-.001 24.869-.001 39.249zm61.236-6.91c0 7.457-6.066 13.523-13.523 13.523h-18.188c-7.457 0-13.523-6.066-13.523-13.523v-28.79c0-12.511 10.201-22.617 22.618-22.617 12.471 0 22.618 10.146 22.618 22.617v28.79zm71.31 8.408c0 6.088-4.953 11.041-11.041 11.041h-33.229c-6.088 0-11.041-4.953-11.041-11.041 0-13.794 0-22.928 0-47.535 0-11.622 9.455-21.082 21.083-21.082h13.145c11.645 0 21.083 9.476 21.083 21.082zm71.311 0c0 6.088-4.953 11.041-11.041 11.041h-33.229c-6.088 0-11.041-4.953-11.041-11.041v-47.535c0-11.6 9.433-21.082 21.083-21.082h13.145c11.645 0 21.083 9.476 21.083 21.082zm61.235-8.408c0 7.457-6.066 13.523-13.523 13.523h-18.188c-7.457 0-13.523-6.066-13.523-13.523v-28.79c0-12.471 10.146-22.617 22.618-22.617 12.422 0 22.618 10.112 22.618 22.617v28.79zm54.04 6.91c0 1.842-1.062 3.064-1.764 3.064h-34.512c-.702 0-1.764-1.223-1.764-3.064 0-8.117 0-25.126 0-39.249 0-12.471 8.532-22.617 19.021-22.617 10.487 0 19.02 10.146 19.02 22.617-.001 18.31-.001 30.045-.001 39.249zm40.326-3.489h-24.046c-.4-.889-.28 1.473-.28-33.689 0-9.83 5.634-18.135 12.303-18.135s12.303 8.305 12.303 18.135c-.001 35.11.116 32.804-.28 33.689z"/></svg></div>
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
                          <h3 className="title text-center">Teeth</h3>
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
