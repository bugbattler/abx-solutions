import React from 'react'
import { Link } from 'react-router-dom';
import Nav from './Nav';
import Footer from './Footer';

function Services() {
    return (
        <>
        <Nav/>
            {/* <!-- Banner Area Start --> */}
            <div className="banner-area-wrapper">
                <div className="banner-area text-center">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="banner-content-wrapper">
                                    <div className="banner-content">
                                        <h2>Services</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* // <!-- Banner Area End --> */}

            <div className="courses-area pt-50 pb-50 text-center">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="section-title">
                                <h2>Our Services</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                    <div className="col-lg-4 col-md-6">
                            <div className="single-course">
                                <div className="course-img">
                                    <Link to="/oceanExport"><img src="assets/img/UPS/ser-oce-exp.jpg" alt="course" />
                                        <div className="course-hover">
                                            <i className="fa fa-link"></i>
                                        </div>
                                    </Link>
                                </div>
                                <div className="course-content">
                                    <h3><Link to="/oceanExport" >Ocean Export</Link></h3>
                                    <p>ABX Solutions provides a wide choice of services from Canada and the U.S. ports to any other port in the world. We have a strong network in Asia.</p>
                                    <Link to="/oceanExport" className="default-btn" >read more</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="single-course mb-0">
                                <div className="course-img">
                                    <Link to="/oceanImport" ><img src="assets/img/UPS/ser-oce-imp.jpg" alt="course" />
                                        <div className="course-hover">
                                            <i className="fa fa-link"></i>
                                        </div>
                                    </Link>
                                </div>
                                <div className="course-content">
                                    <h3><Link to="/oceanImport"  >Ocean Import</Link></h3>
                                    <p>Through ABX Solution’s network of agents and partners around the world, we can start the import process here by starting the export process there. </p>
                                    <Link to="/oceanImport"  className="default-btn" >read more</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="single-course">
                                <div className="course-img">
                                    <Link to="/airExport"><img src="assets/img/UPS/ser-air-imp.jpg" alt="course" />
                                        <div className="course-hover">
                                            <i className="fa fa-link"></i>
                                        </div>
                                    </Link>
                                </div>
                                <div className="course-content">
                                    <h3><Link to="/airExport">Air Export</Link></h3>
                                    <p>ABX Solutions can move your air freight from anywhere in Canada and US, with our partners around the world, can handle all of your export needs.</p>
                                    <Link to="/airExport" className="default-btn">read more</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="single-course">
                                <div className="course-img">
                                    <Link to="/airImport"><img src="https://company360.in/wp-content/uploads/2022/10/import-export-company-registration-india-company360.jpg" alt="course" />
                                        <div className="course-hover">
                                            <i className="fa fa-link"></i>
                                        </div>
                                    </Link>
                                </div>
                                <div className="course-content">
                                    <h3><Link to="/airImport">Air Import</Link></h3>
                                    <p>ABX Solutions can move your air freight from any place in the world, and specifically utilizing our strong network in Asia, North & South America and Europe.</p>
                                    <Link to="/airImport" className="default-btn">read more</Link>
                                </div>
                            </div>
                        </div>
                        
                        
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default Services