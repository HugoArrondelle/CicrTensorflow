import React,  {  useState} from 'react'
import {Link} from 'react-router-dom'

import './Navbar.css';
import { useCookies } from 'react-cookie';

import { Context } from './../../store/appContext'

const API = process.env.REACT_APP_API;

export const Navbar = () => {



  const MenuItems = [
      {
        title: 'Home',
        path:'/',
        cName:"nav-links-custom",
        role: {
          user: "user",
          null: "",
          admin: "admin",
        }
      },
      {
        title: 'Services',
        path:'/services',
        cName:"nav-links-custom",
        role: {
          user: "user",
          null: "",
          admin: "admin",
        }
      },
      {
        title: 'User',
        path:'/users',
        cName:"nav-links-custom",
        role: {
          admin: "admin",
        }
      },
      {
        title: 'Data Base',
        path:'/dataBaseImg',
        cName:"nav-links-custom",
        role: {
          admin: "admin",
        }
      },
    ]



  const currentUser = React.useContext(Context).currentUser;
  const currentUserMail = React.useContext(Context).currentUserMail;
  const currentRole = React.useContext(Context).currentRole;


  const handleCurrentUser = React.useContext(Context).handleCurrentUser;
  const handleCurrentRole = React.useContext(Context).handleCurrentRole;

  //console.log("@@@@@@@@@@@@@@ token: ", token);
  //console.log("@@@@@@@@@@@@@@ currentUser: ", currentUser);
  const [cookies, removeCookie] = useCookies(['Token']);
  //console.log("@@@@@@@@@@@@@@ cookies: ", cookies);

  const [click, setClick] = useState(false);
  const [navbar,setNavbar] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const chnageBackground = () => {
    if (window.scrollY >= 80){
      setNavbar(true);
    }else {
      setNavbar(false);
    }
  }


  const signUp = async (id) => {

    const res = await fetch(`${API}/signUp/${id}`, {
      method: "DELETE",
    });
    await res.json();
    removeCookie("Token");
    sessionStorage.clear();
    handleCurrentRole("");
    handleCurrentUser(null);
    //setCurrentUser(null);
    //store.currentUser = null;
    //store.currentUserMail = null;
    //window.location.reload();
  };

  window.addEventListener('scroll',chnageBackground);

  return (

    <nav className={navbar ? 'navbar-custom active' : 'navbar-custom'}>
      <div className="nav__logo">
      <Link to='/' className={navbar ? 'navbar-logo active' : 'navbar-logo'} onClick={closeMobileMenu}>

      <svg className="fdp" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 512 512" viewBox="0 0 500 500" height="60px" width="60px">
        <g>
          <path d="M462.1,217c0,77.8-63.3,141-141,141c-77.8,0-141-63.3-141-141c0-77.8,63.3-141,141-141C398.9,75.9,462.1,139.2,462.1,217
            M321.1,71.4c-80.3,0-145.6,65.3-145.6,145.6c0,80.3,65.3,145.6,145.6,145.6c80.3,0,145.6-65.3,145.6-145.6
            C466.7,136.7,401.4,71.4,321.1,71.4"/><path d="M411.5,217c0,49.9-40.6,90.4-90.4,90.4c-49.9,0-90.4-40.6-90.4-90.4c0-49.9,40.6-90.4,90.4-90.4
            C371,126.6,411.5,167.1,411.5,217 M321.1,122c-52.4,0-95,42.6-95,95c0,52.4,42.6,94.9,95,94.9c52.4,0,94.9-42.6,94.9-94.9
            C416.1,164.6,373.5,122,321.1,122"/><rect x="298.6" y="142.9" className="st0" width="42.7" height="148.2"/> <rect x="246.3" y="195.6" className="st0" width="148.2" height="42.7"/><path d="M217,259.1l-1-6.1c3.4-0.7,6.3-0.4,8.7,0.7c2.4,1.2,4.3,3.2,5.8,6.1c1.8,3.6,2,7.2,0.7,10.7c-1.3,3.6-4.1,6.4-8.3,8.5
            c-4.5,2.2-8.6,2.8-12.3,1.7c-3.7-1.1-6.4-3.5-8.3-7.3c-1.7-3.3-2-6.5-1.1-9.6c0.5-1.8,1.8-3.6,3.6-5.3l4,4.8c-1.2,1-2,2.3-2.3,3.7
            c-0.3,1.4-0.1,2.9,0.6,4.3c1,2,2.5,3.3,4.6,3.8c2.1,0.5,4.7,0,7.9-1.6c3.4-1.7,5.5-3.5,6.4-5.5c0.8-2,0.8-3.9-0.2-5.9
            c-0.7-1.5-1.8-2.5-3.3-3.1C221.1,258.6,219.2,258.5,217,259.1"/><path d="M209.4,251.2c-3,0.6-5.7,0.6-7.9,0.1c-1.6-0.4-3.2-1.1-4.6-2c-1.4-0.9-2.6-2.1-3.4-3.3c-1.1-1.7-1.9-3.8-2.4-6.2
            c-0.8-4.4-0.1-8.2,2.1-11.3c2.2-3.1,5.8-5.2,10.6-6.1c4.8-0.9,8.8-0.3,12,1.8c3.2,2.1,5.2,5.3,6,9.7c0.8,4.4,0.1,8.2-2.1,11.3
            C217.6,248.3,214.1,250.3,209.4,251.2 M208,245.1c3.4-0.6,5.8-1.9,7.2-3.8c1.4-1.9,1.9-4,1.5-6.4c-0.5-2.4-1.7-4.2-3.7-5.4
            c-2-1.2-4.7-1.5-8.2-0.9c-3.4,0.6-5.8,1.9-7.2,3.7c-1.4,1.8-1.9,4-1.4,6.5c0.5,2.5,1.7,4.3,3.7,5.5
            C201.9,245.4,204.6,245.7,208,245.1"/><polygon points="218.6,218.6 188.5,215.4 189.4,206.3 210.6,203.1 190.6,195.4 191.6,186.3 221.7,189.6 221.1,195.2 197.4,192.7
            220.5,201.2 219.9,207.1 195.5,210.4 219.2,213 	"/><rect x="206.8" y="164.6" transform="matrix(0.3014 -0.9535 0.9535 0.3014 -24.8186 325.7066)" width="6.1" height="30.3"/><polygon points="228.9,172.4 206.4,161.1 202.4,169.1 197.8,166.8 208.5,145.3 213.1,147.6 209.1,155.6 231.7,166.9 	"/><polygon points="236.1,158.4 212.8,139 227.2,121.8 231.1,125.1 220.7,137.6 225.8,141.9 235.6,130.3 239.5,133.5 229.8,145.2
            236.1,150.4 246.9,137.5 250.8,140.8 	"/><rect x="250.6" y="104.6" transform="matrix(0.8145 -0.5802 0.5802 0.8145 -22.4264 169.3811)" width="6.1" height="30.3"/><polygon points="267,128.2 254.1,100.7 259.5,98.2 279.4,111.3 270.7,92.9 275.9,90.5 288.8,117.9 283.3,120.5 263.7,107.7
            272.2,125.8 	"/><polygon points="298.4,115.9 293.5,91.2 284.8,92.9 283.7,87.9 307.3,83.2 308.3,88.2 299.5,90 304.5,114.7 	"/><polygon points="313.9,113 315,82.7 337.4,83.4 337.2,88.6 320.9,88 320.7,94.7 335.9,95.3 335.7,100.4 320.5,99.9 320.2,108.1
            337.1,108.6 336.9,113.8 	"/><path d="M338.6,114l8.6-29.1l12.3,3.6c3.1,0.9,5.3,1.8,6.5,2.8c1.3,0.9,2.1,2.2,2.5,3.8c0.4,1.6,0.4,3.2-0.1,5
            c-0.6,2.2-1.8,3.8-3.5,4.8c-1.7,1-3.9,1.4-6.5,1c1,1.1,1.8,2.2,2.4,3.4c0.6,1.1,1.2,3,1.9,5.7l1.9,6.7l-7-2.1l-2.3-7.6
            c-0.8-2.7-1.4-4.4-1.8-5.2c-0.4-0.8-0.8-1.3-1.4-1.7c-0.6-0.4-1.5-0.8-2.8-1.2l-1.2-0.3l-3.6,12.1L338.6,114z M349.4,99l4.3,1.3
            c2.8,0.8,4.6,1.2,5.3,1.2c0.8,0,1.4-0.3,2-0.7c0.6-0.5,1-1.1,1.2-2c0.3-1,0.3-1.9-0.1-2.6c-0.3-0.8-1-1.3-1.9-1.8
            c-0.5-0.2-1.9-0.7-4.2-1.3l-4.6-1.3L349.4,99z"/><polygon points="364.3,121.9 380.2,96.1 385.2,99.2 385.2,123 395.8,105.7 400.6,108.7 384.8,134.5 379.5,131.3 379.5,107.9
            369.1,124.9 	"/><path d="M405.7,156.1l-4.5-4.8l3.2-6.6l-8.4-8.8l-6.7,2.9l-4.5-4.7l30.1-12.3l4.4,4.7L405.7,156.1z M406.8,139.7l5.2-10.7
            l-10.9,4.7L406.8,139.7z"/><polygon points="406.9,159.7 428.4,146.7 423.8,139 428.2,136.4 440.7,156.9 436.3,159.5 431.6,151.9 410.1,165 	"/><rect x="414.5" y="167.7" transform="matrix(0.9251 -0.3798 0.3798 0.9251 -32.6672 176.0162)" width="30.3" height="6.1"/><path d="M433,177.6c3-0.6,5.7-0.7,7.9-0.2c1.7,0.4,3.2,1,4.6,1.9c1.4,0.9,2.6,2,3.5,3.3c1.2,1.7,2,3.7,2.5,6.2
            c0.9,4.4,0.2,8.1-2,11.3c-2.2,3.2-5.7,5.3-10.5,6.2c-4.8,1-8.8,0.4-12.1-1.6c-3.2-2.1-5.3-5.3-6.2-9.6c-0.9-4.4-0.2-8.2,1.9-11.4
            C424.8,180.6,428.2,178.6,433,177.6 M434.4,183.7c-3.4,0.7-5.8,2-7.2,3.9c-1.4,1.9-1.9,4.1-1.4,6.5c0.5,2.4,1.7,4.2,3.8,5.4
            c2,1.2,4.8,1.4,8.2,0.7c3.4-0.7,5.8-2,7.2-3.8c1.4-1.8,1.8-4,1.3-6.5c-0.5-2.5-1.8-4.3-3.8-5.5C440.6,183.3,437.8,183,434.4,183.7"
            /><polygon points="423.9,210.5 454.1,212.8 453.7,218.7 432.5,229.6 452.8,231.1 452.4,236.7 422.1,234.5 422.6,228.4 443.3,217.6
            423.4,216.2 	"/><path d="M412.6,263.1l2.2-6.2l7.4-0.2l4-11.5l-5.7-4.7l2.1-6.1l24.7,21.1l-2.1,6.1L412.6,263.1z M427.6,256.4l12-0.3l-9.2-7.5
            L427.6,256.4z"/><polygon points="412,262.7 437.2,279.1 433.8,284.3 413,270.7 404.7,283.3 400.3,280.5 	"/><path d="M249.9,314.6l3.4-3.9l10,8.6l-7.9,9.1c-1.8,0.1-3.9-0.3-6.4-1.1c-2.5-0.9-4.6-2.1-6.5-3.7c-2.4-2.1-4.1-4.4-5-6.9
            c-0.9-2.5-1-5.1-0.3-7.8c0.7-2.7,2-5.1,3.9-7.3c2.1-2.4,4.4-4.1,7-5.1c2.6-1,5.3-1.2,8.1-0.5c2.1,0.5,4.3,1.7,6.5,3.6
            c2.9,2.5,4.6,5,5.1,7.6c0.6,2.6,0.2,5.1-1.2,7.6l-5.4-3.1c0.6-1.4,0.8-2.8,0.5-4.2c-0.3-1.4-1.2-2.7-2.5-3.9
            c-2-1.7-4.2-2.5-6.5-2.2c-2.3,0.3-4.5,1.6-6.7,4.2c-2.3,2.7-3.5,5.3-3.5,7.7c0,2.4,1,4.5,3,6.2c1,0.8,2.1,1.5,3.4,2
            c1.3,0.5,2.5,0.7,3.7,0.8l2.5-2.9L249.9,314.6z"/><polygon points="261.1,336.6 273.6,308.9 294.1,318.2 291.9,322.8 277.1,316.1 274.3,322.2 288.2,328.5 286,333.2 272.2,326.9
            268.8,334.4 284.2,341.3 282.1,346 	"/><polygon points="291,348.7 295.4,318.7 301.3,319.5 310.6,341.4 313.6,321.3 319.2,322.2 314.8,352.2 308.7,351.3 299.5,329.8
            296.6,349.5 	"/><polygon points="325.3,352.2 321.4,322.1 343.7,319.2 344.4,324.3 328.2,326.4 329,333.1 344.1,331.1 344.7,336.2 329.7,338.2
            330.7,346.3 347.4,344.1 348.1,349.3 	"/><polygon points="364,343.8 342.4,320 348.5,317.4 364.2,335.2 362.4,311.6 368.4,309.2 370.1,341.3 	"/><polygon points="385.8,333.3 367.3,309.3 385,295.6 388.2,299.7 375.3,309.7 379.4,315 391.4,305.7 394.5,309.8 382.5,319.1
            387.5,325.5 400.9,315.2 404,319.3 	"/>
        </g>
        </svg>
        <div className="navLogo-tittle">
          CICR
        </div>

      </Link>
        </div>
      <div className='menu-icon' onClick={handleClick}>
        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
      </div>
      <ul className={click ? 'nav-menu-custom active' : 'nav-menu-custom'}>
        {MenuItems.map((item, index) => {
                return (

                  <li className = 'nav-item-custom' key={index}>
                  { ((item.role.user === currentRole) || (item.role.admin === currentRole ) || (item.role.null === currentRole ))  && (
                    <Link
                      className={navbar ? 'nav-links-custom active' : 'nav-links-custom'}
                      to={item.path}
                      onClick={() => setClick(false)}
                    >
                      {item.title}
                    </Link>
                    ) }
                  </li>

                );
              })
        }
      </ul>




      {
        (cookies.Token && cookies.Token !== 'undefined' && cookies.Token !== 'null' && currentUser)
        ?



<div className="dropdown">

<button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
  Account
</button>
    <ul className="dropdown-menu">
        <li>

            <div className="navbar-login">
                <div className="row">
                    <div className="col-lg-4">
                        <p className="text-center">
                            <i className="icon-size fas fa-user-tie"></i>
                        </p>
                    </div>
                    <div className="col-md-7">
                      <span>{currentUser}</span>
                      <p className="text-muted small">{currentUserMail}</p>
                      <Link to='/myaccount' style={{ textDecoration: 'none' }}>
                        <button className='btn btn-primary btn-block btn-sm'>View Profile</button>
                      </Link>

                  </div>
                </div>
            </div>
        </li>
        <li className="divider"></li>
        <li>
            <div className="navbar-login navbar-login-session">
                <div className="row">
                    <div className="col-lg-12">
                        <p>
                        <Link to='/login' style={{ textDecoration: 'none' }}>
                          <button className='btn btn-danger btn-block' onClick={() => signUp(cookies.Token)} >Sign Out</button>
                        </Link>

                        </p>
                    </div>
                </div>
            </div>
        </li>
    </ul>
</div>


  :
  <Link to='/login'>
  <button className='btn_custom'>Sign In</button>
  </Link>
  }


      {/*
        (cookies.Token && cookies.Token != 'undefined' && cookies.Token != 'null')
        ?
      <Link to='/login'>
        <button className='btn_custom' onClick={() => signUp(cookies.Token)} >Sign Out</button>
      </Link>
        :
      <Link to='/login'>
        <button className='btn_custom'>Sign In</button>
      </Link>
      */
      }
      {/*currentUser && <button className='btn btn-secondary' disabled>{currentUser}</button>*/}
    </nav>
)

}
