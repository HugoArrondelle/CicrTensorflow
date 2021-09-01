import React,  { useState, Fragment, useEffect} from 'react';
import ReactPaginate from "react-paginate";
import logo from './../../../image/cicr_logo.png';

import './dataBaseImg.css';
import { saveAs } from 'file-saver';
import LoadingScreen from 'react-loading-screen';



const API = process.env.REACT_APP_API;

export const DataBaseImg = () => {

    const [imgs, setImgs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [imgsPerPage] = useState(9);

    const getImg = async () => {
        setLoading(true);
        const res = await fetch(`${API}/getImg`);
        const data = await res.json();
        //console.log(data);

        setImgs(data);
        setLoading(false);

    };

    useEffect(() => {
        getImg();
    }, []);

    // Get current Imgs
    const indexOfLastImg = currentPage * imgsPerPage;
    const indexOfFirstImg = indexOfLastImg - imgsPerPage;
    const currentImgs = imgs.slice(indexOfFirstImg, indexOfLastImg);

    // Scroll to
    const scrollingTo = () => {
        const imgSection = document.getElementById("img-section");
        imgSection.getBoundingClientRect();
        imgSection.scrollIntoView({ behavior: 'smooth' });
    }

    // Change page and Scolling
    const paginate = ({selected}) => {
        setCurrentPage(selected+1);
        scrollingTo();
    }

    const headerClass = [
        "text-dark py-2 pr-4 m-0",
        currentPage ? "border-gray border-right" : ""
    ].join(" ")
    .trim();

    const downloadTargetImg = (index) => {
        const targetImg = document.querySelector(`.targetImg${index}`);
        const targetImgPath = targetImg.getAttribute('src');
        const targetImgName = getTargetImgName(targetImgPath);

        saveAs(targetImgPath, targetImgName);
    }
    const getTargetImgName= (str) => {
        return str.substring(str.lastIndexOf('/')+1);
    }
    const deleteTargetImg = async (id) => {
        const userResponse = window.confirm("Are you sure you want to delete it from the database?");
        if (userResponse) {
            const res = await fetch(`${API}/deleteImg/${id}`, {
                method: "DELETE",
            });
            const data = await res.json();
            console.log(data);
            window.location.reload(false);

        }
    }


    return (
    <Fragment>

    {(
    loading === true
        ? <LoadingScreen
            loading={true}
            bgColor='rgba(241,241,241,0.95)'
            spinnerColor='rgba(205,43,57,1)'
            textColor='#676767'
            logoSrc={logo}
            text='Downloading'
        >
            {
            // ...
            // here loadable content
            // for example, async data
            //<div>Loadable content</div>
            }
        </LoadingScreen>
        :
    <div>
        <section className="main-home" id="home">
            <div className="home-page-photo"></div>
            <div className="home__header-content">
                <h1 className="intro-title">DataBase Images</h1>
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
                C253.769,122.572,253.678,122.666,253.587,122.76z M349.817,122.76h-39.777l39.777-39.777V122.76z"/></g></svg>
            </div>
        </section>
        <section id="img-section" className="container mb-5">
            <div className="containre d-flex flex-row py-5">
                <div className="w-100 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between">
                    <div className="d-flex flex-row align-items-center">
                        <h2 className={headerClass}>
                            <strong className="text-secondary">{imgs.length}</strong>{" "}
                            Images
                        </h2>
                        {currentPage && (
                            <div className="page current-page d-inline-block h-100 pl-4 text-secondary">
                                Page <div className="page font-weight-bold">{currentPage}</div> /{" "}
                                <div className="page font-weight-bold">{Math.ceil(imgs.length / imgsPerPage)}</div>
                            </div>
                        )}
                    </div>

                </div>
            </div>
            <div className="row justify-content-center">
                {currentImgs.map((img, index) => (
                    <div className="col mb-5 col-md-4">
                        <div className="card h-100">
                            <div className="imgItem">
                                <img className={"targetImg"+index+" card-img-top imgSize"} src={"http://localhost:5000/img3/"+img._id} alt="..." />
                            </div>
                            <div className="card-body p-4">
                                <div className="text-center">
                                    <h5 className="fw-bolder">Fancy Product</h5>
                                    $40.00 - $80.00
                                </div>
                            </div>
                            <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                {/*<div className="text-center"><a className="btn btn-outline-dark mt-auto" href="#">View options</a></div>
                                <div className="text-center"><a className="btn btn-outline-dark mt-auto" href="#">View options</a></div>*/}
                                <div className="row">
                                    <div className="col">
                                        <button type="button" onClick={() => downloadTargetImg(index)} className="btn btn-primary btn-block" >Save</button>
                                    </div>
                                    <div className="col">
                                        <button className="btn btn-primary btn-block" onClick={() => deleteTargetImg(img._id)}>DELETE</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="navPag">
                <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    breakLabel={'...'}
                    pageCount={Math.ceil(imgs.length / imgsPerPage)}
                    onPageChange={paginate}
                    containerClassName={"paginationBttns"}
                    previousLinkClassName={"previousBttn"}
                    nextLinkClassName={"nextBttn"}
                    disabledClassName={"paginationDisabled"}
                    activeClassName={"paginationActive"}
                    pageRangeDisplayed={4}
                    marginPagesDisplayed={1}
                />
            </div>
        </section>
    </div>
    )}
    </Fragment>
)}
