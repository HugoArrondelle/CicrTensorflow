import React, { useState, Fragment, useEffect, useRef } from "react";
import CanvasDraw from 'react-canvas-draw';
import LoadingScreen from 'react-loading-screen';
import logo from './../../../../image/cicr_logo.png';


import { Navbar } from "./../../../Navbar/Navbar";

import { Context } from './../../../../store/appContext'

import './Skin.css';


import { useCookies } from 'react-cookie';


import { SaveButton } from './../../../SaveButton/SaveButton';


//const API = process.env.REACT_APP_API_SKIN;
const API = process.env.REACT_APP_API_SKIN;




export const Skin = () => {

  const currentUserMail = React.useContext(Context).currentUserMail;
  const [cookies, setCookie] = useCookies(['Token']);

  const [modalShow, setModalShow] = useState(false);

  const [fileTest, setFileTest] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previewImage, setpreviewImage] = useState(null);
  const [urlImageTransform, setUrlImageTransform] = useState("");


  const imgRef = useRef(null);
  const [imageCanvas, setImageCanvas] = useState(null);
  const [widthImage, setWidthImage] = useState(null);
  const [heightImage, setHeightImage] = useState(null);
  const [canvasColor, setCanvasColor] = useState("#62A6E3");
  const [canvasbrush, setCanvasBrush] = useState(5);

  const [previewDrawedImage, setpreviewDrawedImage] = useState(null);

  let imageURL = null ;

  let date = new Date();

  const selectFile = async (event) => {
    setFileTest(event.target.files[0]);
    console.log("Path : " , event.target.files);
    setpreviewImage(URL.createObjectURL(event.target.files[0]));

    const getPixels = require("get-pixels")
    getPixels((URL.createObjectURL(event.target.files[0])), function(err, pixels) {
      if(err) {
        console.log("Bad image path")
        return
      }
      setWidthImage(pixels.shape.slice()[0])
      setHeightImage(pixels.shape.slice()[1])
    })
  };

  const drawImage = () => {
    if (imgRef.current) {
      imageURL = imgRef.current.canvasContainer.children[1].toDataURL();
      setImageCanvas(imageURL);
      //setpreviewDrawedImage(true);
    }
  }

  // helper function: generate a new file from base64 String
const dataURLtoFile = (dataurl, filename) => {
  const arr = dataurl.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n) {
    u8arr[n - 1] = bstr.charCodeAt(n - 1)
    n -= 1 // to make eslint happy
  }
  return new File([u8arr], filename, { type: mime })
}




  const handleUploadImage = async (event) =>  {
    event.preventDefault();

    drawImage();

    const trueInputImg = document.querySelector('.trueInputImg');
    date.setDate(date.getDate() + 1);
    if (trueInputImg.files.length) {
      setLoading(true);
    }
    else
      return alert("You must insert an image!")



      drawImage();



     const canvaFile = dataURLtoFile(imageURL,"masque.png")


     const d = new FormData();
     d.append('file', fileTest);
     d.append('masque', canvaFile);


    fetch(`${API}/skin`, { method: 'POST', body: d, headers: {
      'Authorization': cookies.Token,
      'current_user_mail' : currentUserMail
    }, })
        .then((response) => { response.json().then((body) => {
          if (response.status === 422 || response.status === 401) {
            alert("Token not valid")
          }
          else  {
            setCookie('Token', body.refresh_token, { expires: date  });
            setUrlImageTransform(body._id);
          }
          setLoading(false);
        });
    });

  }



  const undo = () => {
    imgRef.current.undo();
  }

  const clear = () => {
    imgRef.current.clear();
  }

  useEffect(() => {

  },[]);

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
            />
          :
            <div>
              <section className="main-home" id="home">
                <div className="home-page-photo"></div>
                <div className="home__header-content">
                  <h1 className="intro-title">Skin</h1>
                  <p className="intro-text">Lorem ipsum dolor sit amet consectetur adictum piscing elit fusce sit amet inerdum neque ultra icies <br/>  pelentesque tempor justo a scelerisque placerat sit amet magna e.</p>
                  <svg id="SVG2" enable-background="new 0 0 512 512" height="80" viewBox="0 0 512 512" width="80" xmlns="http://www.w3.org/2000/svg"><g><path d="m457.643 486.394-54.463-54.464c15.73-22.59 19.245-51.162 10.504-76.416 23.285-26.791 36.004-60.687 36.004-96.515 0-75.579-42.651-141.373-105.141-174.61.132-.801.218-1.618.218-2.457-.001-45.177-42.59-81.932-94.94-81.932s-94.939 36.755-94.939 81.933c0 .839.086 1.655.218 2.457-62.49 33.237-105.141 99.031-105.141 174.61 0 47.823 22.79 91.957 61.351 119.658 2.785 73.997 63.843 133.342 138.511 133.342 39.488 0 76.737-16.672 103.041-45.91 10.258-2.39 20.146-6.711 29.1-12.947l54.464 54.464c2.929 2.929 6.767 4.394 10.606 4.394s7.678-1.464 10.607-4.394c5.859-5.858 5.859-15.356 0-21.213zm-163.04-64.114c-21.425-21.426-21.425-56.288 0-77.713 10.713-10.713 24.785-16.069 38.857-16.069s28.145 5.357 38.857 16.069c21.425 21.426 21.425 56.288 0 77.713s-56.287 21.425-77.714 0zm-44.778-392.28c31.163 0 57.26 17.648 63.508 41.102-19.303-6.311-39.898-9.738-61.282-9.738h-4.453c-21.384 0-41.979 3.427-61.282 9.738 6.249-23.454 32.346-41.102 63.509-41.102zm-169.862 228.999c0-92.434 75.201-167.636 167.636-167.636h4.453c92.435 0 167.636 75.201 167.636 167.636 0 24.992-7.774 48.803-22.164 68.668-1.28-1.468-2.596-2.915-3.993-4.313 0 0 0 0 0-.001-1.641-1.641-3.345-3.176-5.083-4.654v-34.641c0-56.55-46.007-102.558-102.558-102.558h-72.128c-56.551 0-102.558 46.007-102.558 102.558v54.723c-19.908-21.425-31.241-49.689-31.241-79.782zm61.24 114.379v-89.32c0-40.008 32.549-72.558 72.558-72.558h72.128c40.009 0 72.558 32.549 72.558 72.558v18.201c-29.103-8.906-62.077-1.884-85.057 21.095-24.129 24.129-30.659 59.275-19.634 89.39-1.295.172-2.606.27-3.932.27-10.568 0-20.198-5.59-25.129-14.589-3.982-7.266-13.099-9.925-20.363-5.945-7.265 3.982-9.927 13.099-5.945 20.363 10.2 18.61 29.909 30.171 51.438 30.171 6.864 0 13.583-1.174 19.918-3.43 1.173 1.329 2.377 2.639 3.648 3.91 10.208 10.208 22.392 17.258 35.331 21.174-17.354 11.211-37.716 17.332-58.897 17.332-59.894 0-108.622-48.728-108.622-108.622z"/></g></svg></div>
              </section>

              <div className="position-relative mobalIcon">
                <div className="position-absolute">
                  <button className='btn btn__Vid' onClick={() => setModalShow(true)}  >
                    <svg id="SVG7" enable-background="new 0 0 512 512" height="50" width="60" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
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
                    <div className="col-md-12 services-item">
                      <h3 className="title text-center">Draw your picture</h3>
                      <div className="titleHR"><span></span></div>
                    </div>
                  </div>

                  <div className="d-flex justify-content-evenly">
                    <div className="p-2 bd-highlight">
                      <label for="exampleColorInput" className="">
                        <span className="h4">
                          Click to activate the Color Picker:
                          <svg
                            style={{
                              fill:  canvasColor,
                              width: "150px",
                            }}
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 443.231 46.408"><path  id="brush" d="M270.991 35.408c-2.785.371-5.409-.612-7.852-1.555-1.395-.538-2.553.029-3.504-.477-.805.47-.602 1.012-.65 1.516-1.048 1.332-2.906-.287-3.969 1.01l.94 1.065c-.323.163-.597.413-.876.421-1.33.043-2.688.182-3.99-.017-2.193-.333-4.401.714-6.675-.826-1.567-1.062-4.125.698-6.059-1.062-.546-.498-1.934-.016-2.927-.09-1.729-.128-3.543.488-5.139-.923-.467-.413-1.691-.292-2.428-.026-4.247 1.535-8.432 1.555-12.689.01-.883-.32-1.981-.047-2.98-.047-4.662 0-9.326.07-13.986-.029-2.379-.051-4.701.182-7.151-.789-1.701-.674-4.233-.85-6.146.46-.652.446-1.242.345-1.86.345-12.988.018-25.976.014-38.963.014-7.109-2.046-14.388-.439-21.487-1.102-.745.967-2.192 1.328-1.47 2.973h-5.771c-1.112-1.097.021-1.672.626-2.377-.265-.165-.554-.502-.791-.469-4.438.629-8.687-1.077-13.077-1.035-4.496.043-8.992.043-13.487.002-7.179-.064-14.233 1.875-21.757.824.732 2.021 2.396.42 3.141 1.86-4.265.685-8.439.128-12.505.341l-2.057-2.057c-1.465.492-3.07-.283-4.935.754-1.529.853-4.188.895-5.772.12-1.961-.958-3.776-.786-5.661-.807-6.66-.072-13.32-.013-19.981-.038-1.908-.007-3.921.465-5.628-.968l-1.636-3.301 1.619-1.722c3.635 0 7.438.002 11.242-.002.679 0 1.369-.009 1.291-.998.959-.025 2.063.342 2.442-1.559l.826 2.326c1.136.756 2.641-.42 3.837.826-1.915.923-3.943.006-5.767.582-.544.366-.273.895-.319 1.351.285.164.544.432.825.456 4.346.391 7.979-1.326 11.452-3.731 2.59-1.794 4.446-4.571 8.001-5.185-1.392-1.871-3.189-.326-4.353-1.637 1.146-.491 2.226-1.287 3.343-1.346 1.358-.07 1.991-.74 2.645-1.751-1.504-.914-3.284.253-5.231-.949 2.862-.69 5.606.327 7.775-.542 2.276-.911 5.377.091 6.93-2.832 2.776-.115 5.849.577 8.091-2.01 5.476 0 10.979-.174 16.466.05 5.229.213 9.793-2.169 14.68-3.267.687-.154 1.192-1.118 1.857-1.784 2.913 0 6.085-.639 8.847.153 3.915 1.122 7.761.585 11.628.851 5.574.383 10.99-1.776 16.584-1.004 2.735-1.421 5.934-.257 8.52-1.182 2.8-1.001 5.444-.653 8.152-.771 1.63-.071 2.806-1.447 4.594-1.105 2.013.386 4.078-.173 6.127.962 1.585.877 3.868-.742 5.599 1.025.409.417 1.602.07 2.433.071 3 .001 6 .024 9-.004 5.552-.053 10.993 1.714 16.584 1.005 3.571 1.707 7.38.79 11.086.983 2.162.113 2.166.039 5.748 1.742l-2.609 1.729c1.406.886 2.588.402 3.703.547 1.731-2.175 4.236-2.918 6.757-2.946 11.498-.125 23.015-.416 34.487.135 4.168.2 8.524.087 12.56.965 6.568 1.431 13.09.57 19.619.794 6.659.228 13.331.048 19.997.051 2.085.001 3.849-1.433 6.097-1.076 2.021.32 4.113.238 6.119-.842.903-.487 2.288-.083 3.455-.083 4.332 0 8.818.701 12.955-.198 4.104-.892 8.094-.622 12.129-.767 4.328-.156 8.775.585 12.975-.163 9.04-1.609 18.081-.478 27.108-.837 2.904-.116 5.581-1.56 8.592-1.087 2.032.319 4.073.062 6.116.963 1.833.808 3.967-.312 6.147.908 1.731.968 4.361.747 6.506.949 3.207.302 6.315 1.188 9.55 1.414 3.16.22 7.109.303 8.495 4.479 2.042.205 2.782 2.631 4.724 2.796-1.274 2.051-1.361 4.09.046 6.219l-2.006.736c.966 3.693-1.742 7.114-.786 11.075l-2.302 1.808 1.131 1.242c-1.527 1.23-2.678-.008-3.922-.559-3.532 1.873-7.217 3.063-11.264 3.05-1.893-.007-3.744-.256-5.648.865-1.551.913-3.75-.562-5.638.923-.83.652-2.576.288-3.881.148-1.391-.15-2.132 1.239-3.595 1.094-3.559-.354-6.936 1.337-10.585 1.012-3.638-.323-7.355-.36-10.985.002-4.64.463-9.026-1.254-13.72-1.082-1.904-1.297-4.021-2.41-6.541-1.975-2.815.484-5.266-1.355-8.094-1.072-2.64.265-5.33-.014-7.992.093-.989.039-1.146-1.212-2.086-1.038-1.534 1.159-3.655.8-5.438 2.432l-1.469-2.43c-3.302 0-6.12.057-8.935-.017-2.546-.065-4.653-.903-5.38-3.687-1.553-.992-3.662.67-5.079-1.086l-4.072 1.822c-1.854-.057-2.225-1.419-3.445-2.213h-8.339l1.198-1.453c-2.502-1.1-4.064.837-6.097 1.714-4.646-3.407-9.333-2.465-14.177.188.778.797 1.547 1.276 1.048 2.549-3.841.731-8.368-1.057-11.544 2.199-1.291-.055-1.557-1.023-2.228-1.455.492-1.438 2.786.515 2.941-1.557.691.025 1.025-.309.832-1.085 1.131-.085 2.07-.085 3.884-.085l-2.251-1.788c-.528.524-.998.991-1.633 1.873-.523.06-.857.394-.832 1.085zm-182.996-7.467c-1.479 1.236-3.522-.307-5.337 1.221h7.377c-.202-1.018.275-1.873-.366-2.582-1.288-.477-1.801.022-1.674 1.361zm-67.821 2.051c1.235.171 2.554 1.113 4.161-.782-1.756.431-2.981-.169-4.161.782zm27.853 1.872c-.893-.595-1.534-.901-1.959.329.663.212 1.221.492 1.959-.329zm167.97-18.956c.328.466.661.466.989 0-.328-.466-.661-.466-.989 0zm-116.997 6c.325.467.658.467.982 0-.324-.467-.657-.467-.982 0zm12.491 12.509c-.467.325-.467.657 0 .982.467-.325.467-.657 0-.982zM304.755 40.383c-3.987.129-6.945-.754-10.126-2.227 1.812-1.307 3.503-.371 4.93-.842.596-.348.389-.888.465-1.658 2.138-.545 4.39-.082 6.517-.282.504.847 1.545 1.072 1.438 2.435-.753 1.121-3.017.791-3.224 2.574zM29.417 13.333l1.498 1.499c-.329 1.142-2.009.115-2.25 1.417-1.483-1.336-3.541-1.28-4.918-.704-2.134.892-3.716-.514-5.597-.429 3.672-1.503 7.816.435 11.267-1.783zM25.938 26.238h-9.797c1.705-1.162 3.594-.648 5.505-.889l.631-1.813h2.323l1.338 2.702zM102.636 35.158h-11.66l.015-.5h12l-.355.5zM292.991 34.716v1.304c-1.311.627-2.634.543-4.029.031 1.096-1.567 2.358-2.135 4.029-1.335zM263.843 37.234h-4.934c1.686-1.774 3.369-.162 4.934 0zM279.792 38.234h-4.652c1.513-1.13 3.113-.699 4.652 0zM10.027 29.864c-.739.82-1.296.541-1.959.329.426-1.23 1.066-.923 1.959-.329zM3 30.908c.325-.467.658-.467.982 0-.324.467-.657.467-.982 0zM87.995 27.941c-.127-1.34.387-1.839 1.675-1.361.641.709.164 1.564.366 2.582h-7.377c1.813-1.527 3.856.016 5.336-1.221zM20.174 29.992c1.18-.951 2.405-.352 4.161-.782-1.606 1.895-2.925.953-4.161.782zM271.655 34.238l1.801-1.788 2.251 1.788h-4.052zM48.027 31.864c-.739.82-1.296.541-1.959.329.426-1.23 1.066-.923 1.959-.329zM215.997 12.908c.328-.466.661-.466.989 0-.328.466-.661.466-.989 0zM99 18.908c.325-.467.658-.467.982 0-.324.467-.657.467-.982 0zM111.491 31.417c.467.325.467.657 0 .982-.467-.325-.467-.657 0-.982zM271.991 34.408c.025.691-.309 1.025-1 1-.025-.691.309-1.025 1-1z"/></svg>
                        </span>
                        <input
                          id="exampleColorInput"
                          type="color"
                          value={canvasColor}
                          onChange={(event) => {
                            setCanvasColor(event.target.value);
                          }}
                          style={{
                            display: "block"
                          }}
                        />
                      </label>
                    </div>
                    <div className="p-2 bd-highlight">
                      <label for="customRange" className="form-label">
                        <span className="h4">Brush:</span>
                        <input
                          className="form-range"
                          id="customRange"
                          min="1"
                          max="50"
                          type="range"
                          onChange={(event) => {
                            setCanvasBrush(event.target.value);
                          }}
                          style={{
                            color: canvasColor,
                            display: "inline-block"
                          }}
                        />
                      </label>
                    </div>
                  </div>

                  <div className="row">
                    <div className="imageCase">
                      <div className="mt-5 text-center text-uppercase">Select your image</div>
                        {(
                          previewImage === null
                          ?

                      <div className="text-center col d-flex align-items-center justify-content-center">
                          <div className="card-title text-center col d-flex align-items-center justify-content-center">
                            <svg id="SVGImageCase" height="50%" viewBox="0 -21 511.98744 511" width="50%" xmlns="http://www.w3.org/2000/svg"><path d="m377.652344 469.828125c-4.03125 0-8.148438-.511719-12.226563-1.578125l-329.898437-88.34375c-25.449219-7.019531-40.617188-33.34375-33.960938-58.773438l36.265625-139.070312c2.21875-8.535156 10.945313-13.71875 19.519531-11.433594 8.535157 2.21875 13.675782 10.964844 11.4375 19.519532l-36.269531 139.09375c-2.238281 8.574218 2.859375 17.425781 11.394531 19.773437l329.707032 88.300781c8.46875 2.238282 17.214844-2.796875 19.433594-11.222656l11.261718-45.441406c2.136719-8.574219 10.796875-13.78125 19.371094-11.6875 8.578125 2.132812 13.804688 10.792968 11.691406 19.367187l-11.304687 45.65625c-5.699219 21.609375-25.152344 35.839844-46.421875 35.839844zm0 0"/><path d="m463.988281 341.828125h-330.667969c-26.472656 0-48-21.527344-48-48v-245.335937c0-26.472657 21.527344-48 48-48h330.667969c26.472657 0 48 21.527343 48 48v245.335937c0 26.472656-21.527343 48-48 48zm-330.667969-309.335937c-8.832031 0-16 7.167968-16 16v245.335937c0 8.832031 7.167969 16 16 16h330.667969c8.832031 0 16-7.167969 16-16v-245.335937c0-8.832032-7.167969-16-16-16zm0 0"/><path d="m191.988281 149.828125c-23.53125 0-42.667969-19.136719-42.667969-42.667969s19.136719-42.667968 42.667969-42.667968 42.664063 19.136718 42.664063 42.667968-19.132813 42.667969-42.664063 42.667969zm0-53.335937c-5.890625 0-10.667969 4.78125-10.667969 10.667968 0 5.886719 4.777344 10.667969 10.667969 10.667969 5.886719 0 10.664063-4.78125 10.664063-10.667969 0-5.886718-4.777344-10.667968-10.664063-10.667968zm0 0"/><path d="m101.746094 320.066406c-4.09375 0-8.191406-1.558594-11.304688-4.691406-6.25-6.25-6.25-16.386719 0-22.636719l96.425782-96.425781c14.59375-14.59375 38.335937-14.59375 52.90625 0l25.792968 25.792969 79.230469-95.105469c7.082031-8.492188 17.472656-13.398438 28.503906-13.460938 11.859375-.660156 21.460938 4.734376 28.605469 13.121094l106.199219 123.902344c5.757812 6.699219 4.96875 16.8125-1.730469 22.570312-6.71875 5.761719-16.808594 4.972657-22.570312-1.726562l-106.238282-123.945312c-1.410156-1.6875-3.136718-1.601563-4.097656-1.902344-.914062 0-2.6875.277344-4.09375 1.941406l-90.453125 108.589844c-2.882813 3.453125-7.082031 5.546875-11.5625 5.738281-4.566406.253906-8.875-1.496094-12.035156-4.671875l-38.183594-38.1875c-2.710937-2.710938-4.949219-2.710938-7.660156 0l-96.425781 96.40625c-3.117188 3.132812-7.210938 4.691406-11.308594 4.691406zm0 0"/></svg>
                          </div>
                          </div>

                        :
                        <div className="dff">
                      <div className="text-center col d-flex align-items-center justify-content-center">

                          <div className="">
                            <CanvasDraw
                              brushColor={canvasColor}
                              brushRadius={canvasbrush}
                              canvasHeight={heightImage}
                              canvasWidth={widthImage}
                              hideGrid="true"
                              imgSrc={previewImage}
                              ref={imgRef}
                            />
                          </div>
                          </div>
                      </div>
                        )}

                      {(
                        previewImage === null
                        ?
                          null
                        :
                          <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                            <div className="row">
                              <div className="col">
                                <button type="button" className="btn btn-primary btn-block" onClick={undo}>Undo</button>
                              </div>
                              <div className="col">
                                <button className="btn btn-primary btn-block" onClick={clear}>Clear</button>
                              </div>
                            </div>
                          </div>
                      )}
                    </div>
                    <div className="col-lg-5 col-md-5 col-sm-5 container justify-content-center services-item">

                        <input className="trueInputImg" name="file" type="file" onChange={selectFile} />
                        <button onClick={handleUploadImage}>draw</button>

                    </div>
                  </div>
                  {(
                    previewDrawedImage === null
                  ?
                    null
                  :
                    <section id="services">
                      <div className="container">
                        <div className="row">
                          <div className="imageCase">
                            <div className="mt-5 text-center text-uppercase">your drawing</div>
                            <div className="dff">
                              <div className="text-center col d-flex align-items-center justify-content-center">
                                <img
                                  className="targetImg"
                                  height={heightImage}
                                  width={widthImage}
                                  src={imageCanvas}
                                  style={{
                                    "background-image": `url(${previewImage})`,
                                    "object-fit": 'cover'
                                  }}
                                />
                              </div>
                            </div>
                            </div>
                            <div className="col-lg-5 col-md-5 col-sm-5 container justify-content-center services-item">
                              <form onSubmit={handleUploadImage}>
                                <input className="trueInputImg" name="file" type="file" onChange={selectFile} />
                                <button>Upload</button>
                              </form>
                            </div>
                            <div className="col-lg-5 col-md-5 col-sm-5 container justify-content-center services-item">
                              <SaveButton/>
                            </div>
                        </div>
                      </div>
                    </section>
                )}
                </div>
              </section>

            </div>
        )}

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


      </div>
    </Fragment>
  );
}
