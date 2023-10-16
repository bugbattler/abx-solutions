import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { useTranslation } from 'react-i18next';
import LangSelector from "../langSelector/LangSelector";

function Nav() {
const Navigate=useNavigate();
const { t } = useTranslation()
const setLang = (data) => {
  localStorage.setItem('language', data)
  window.location.reload()
}

  return (
    <div>
      {/* <!-- Header Area Start --> */}
      {/* <header className="top">
        <div className="header-area header-sticky fixed">
          <div className="container">
            <div className="row">
              <div className="col-md-3">
                <div className="logo">
                  <a href="index.html"><img src="assets/img/logo/logo.png" alt="eduhome" /></a>
                </div>
              </div>
              
              <div className="col-md-9">
                <div className="content-wrapper one">
                  <div className="main-menu one text-end">
                    <nav>
                      <ul>
                        <li><a href="index.html">Home</a>
                          <ul>
                            <li><a href="index.html">Home One</a></li>
                            <li><a href="index-2.html">Home Two</a></li>
                            <li><a href="index-3.html">Home Three</a></li>
                            <li><a href="index-4.html">Home Four</a></li>
                            <li><a href="index-5.html">Home Five</a></li>
                          </ul>
                        </li>
                        <li><a href="about.html">About</a></li>
                        <li><a href="course.html">courses</a>
                          <ul>
                            <li><a href="course.html">courses</a></li>
                            <li><a href="course-details.html">courses details</a></li>
                          </ul>
                        </li>
                        <li><a href="event.html">event</a>
                          <ul>
                            <li><a href="event.html">event</a></li>
                            <li><a href="event-left-side-bar.html">event left sidebar</a></li>
                            <li><a href="event-right-side-bar.html">event right sidebar</a></li>
                            <li><a href="event-details.html">event details</a></li>
                          </ul>
                        </li>
                        <li className="hidden-sm"><a href="teacher.html">teacher</a>
                          <ul>
                            <li><a href="teacher.html">teacher</a></li>
                            <li><a href="teacher-details.html">teacher details</a></li>
                          </ul>
                        </li>
                        <li><a href="blog.html">blog</a>
                          <ul>
                            <li><a href="blog.html">blog</a></li>
                            <li><a href="blog-left-side-bar.html">blog left sidebar</a></li>
                            <li><a href="blog-right-side-bar.html">blog righ sidebar</a></li>
                            <li><a href="blog-details.html">blog details</a></li>
                          </ul>
                        </li>
                        <li><a href="contact.html">Contact</a></li>
                        <li><a href="contact.html">Buy Now</a></li>
                      </ul>
                    </nav>
                  </div>
                  <div className="mobile-menu one"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header> */}
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src="assets/img/logo/abxsolutionslogofull.svg" alt="abxsolutions logo" style={{ height: "35px", width: "auto" }} />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  {t("Home")}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  {t("About Us")}
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="/services"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {t("Services")}
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/oceanImport">
                      {t("Ocean Import")}
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/oceanExport">
                      {t("Ocean Export")}
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/airImport">
                      {t("Air Import")}
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/airExport">
                      {t("Air Export")}
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  {t("Contact Us")}
                </Link>
              </li>
             
            </ul>
            <form className="d-flex" role="search">
                     <LangSelector className="lang-class " setLang={setLang}/>
              {/* <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" /> */}
              <button  className="btn-button mx-3" onClick={()=>Navigate("/register")}>
                {t("Sign Up")}
              </button>
             
             
                 

            </form>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Nav;
