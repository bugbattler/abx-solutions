import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Nav from './Nav'
import Footer from './Footer'
import { useTranslation } from 'react-i18next';

function Home() {
    const Navigate=useNavigate()
    const { t } = useTranslation()

    return (
        <>
        <Nav/>
            {/* <!-- Background Area Start --> */}
            {/* <section id="slider-container" className="slider-area"> 
            <div className="slider-owl owl-theme owl-carousel"> 
                <div className="single-slide item" style={{backgroundImage:'url("assets/img/slider/slider1.jpg")'}}>
                    <div className="slider-content-area">  
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-7 col-md-offset-left-5"> 
                                    <div className="slide-content-wrapper">
                                        <div className="slide-content">
                                            <h3>EDUCATION MAKES </h3>
                                            <h2>PROPER HUMANITY </h2>
                                            <p>I must explain to you how all this mistaken idea of denouncing pleasure and prsing pain was born and I will give you a complete account of the system  </p>
                                            <a className="default-btn" href="about.html">Learn more</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="single-slide item" style={{backgroundImage:'url("assets/img/slider/slider2.jpg")'}}>
                    <div className="slider-content-area">   
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-7 col-md-offset-left-5"> 
                                    <div className="slide-content-wrapper text-start">
                                        <div className="slide-content">
                                            <h3>EDUCATION MAKES </h3>
                                            <h2>PROPER HUMANITY </h2>
                                            <p>I must explain to you how all this mistaken idea of denouncing pleasure and prsing pain was born and I will give you a complete account of the system  </p>
                                            <a className="default-btn" href="about.html">Learn more</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="single-slide item" style={{backgroundImage:'url("assets/img/slider/slider3.jpg")'}}>
                    <div className="slider-content-area">  
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-7 col-md-offset-left-5"> 
                                    <div className="slide-content-wrapper">
                                        <div className="slide-content">
                                            <h3>EDUCATION MAKES </h3>
                                            <h2>PROPER HUMANITY </h2>
                                            <p>I must explain to you how all this mistaken idea of denouncing pleasure and prsing pain was born and I will give you a complete account of the system  </p>
                                            <a className="default-btn" href="about.html">Learn more</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section> */}



            <div className="carousel">
                <div className="carousel-inner">
                    <div className="main-caption gradient">
                        <img src="assets/img/UPS/breadcrumb.jpg" className="d-block w-100" alt="..." />
                        <div className="carousel-caption d-md-block">
                            <h5>{t("ABX Solutions Are Here For You")}</h5>
                            {/* <p>{t("Some representative placeholder content for the first slide.")}</p> */}

                            <button onClick={(e)=>{Navigate("/Signin")}} className='btn-button'>
                                {t("Login")}
                            </button>

                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Background Area End --> */}


            {/* <!-- About Start --> */}
            <div className="about-area pt-50 pb-50">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="section-title text-center mb-5">
                                {/* <img src="img/icon/section.png" alt="section-title" /> */}
                                <h2>{t("About Us")}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="about-content">
                                <h2>{t("About")} <span>ABX</span></h2>
                                <p>{t("Not only an International Freight Forwarder but an eCommerce platforms solutions provider.")}<br />
                                {t("Abxsolutions Inc. is privately owned, independent freight forwarder based in Mississauga, Ontario, Canada and La Mirada, California, United States. We provide complete logistics service in ocean freight, air freight, Customs brokerage, warehousing, distribution, and beyond. Whatever your cargo transportation needs, we will do our very best to customize a solution for you.")}
                                </p>
                                <p className="hidden-sm"></p>
                                <Link className="default-btn text-white" to="/about">{t("view More")}</Link>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="about-img">
                                <img src="https://img.freepik.com/premium-photo/transportation-logistics_37416-165.jpg" alt="about" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- About End --> */}



            {/* <!-- Choose Start --> */}
            {/* <section className="choose-area pb-85 pt-150">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 col-md-offset-left-4">
                            <div className="choose-content text-start">
                                <h2>WHY YOU CHOOSE EDUHOME ?</h2>
                                <p>I must explain to you how all this mistaken idea of denouncing pleure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings  the master-builder of humanit happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because. </p>
                                <p className="choose-option">I must explain to you how all this mistaken idea of denouncing pleure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings  the master-builder. </p>
                                <a className="default-btn" >view courses</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}
            {/* <!-- Choose Area End --> */}


            {/* <!-- Notice Start --> */}
            <section className="notice-area pt-50 pb-50 bg-color">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="notice-left">
                                <h3>{t("notice board")}</h3>
                                <div className="single-notice-left mb-25 pb-25">
                                    <h4>{t("Ocean Freight")}</h4>
                                    <p>{t("We are able to offer competitive pricing, the best transit times, and schedule flexibility through our steamship line contracts. Everything you need to successfully negotiate your way from here to there is just a call or click away.")}</p>
                                </div>
                                <div className="single-notice-left mb-25 pb-25">
                                    <h4>{t("Air Freight")}</h4>
                                    <p>{t("Need to get your freight there quickly? We understand that air freight is a premium and is a more costly service than by ocean, but there are lots of options available.")}</p>
                                </div>
                                <div className="single-notice-left mb-25 pb-25">
                                    <h4>{t("Customer Service")}</h4>
                                    <p>{t("We have created a customer-oriented corporate culture with superior service systems. The effective use of information and technology to promote service quality is the foundation of our customer service team.")}</p>
                                </div>
                                <div className="single-notice-left mb-25 pb-25">
                                    <h4>{t("Customs Brokerage")}</h4>
                                    <p>{t("Our experienced technical experts can help your goods clear Customs quickly and efficiently with our electronic customs-clearance network. How?...")}</p>
                                </div>
                                <div className="single-notice-left mb-25 pb-25">
                                    <h4>{t("Local Transport")}</h4>
                                    <p>{t("We offers a multitude of ways to increase efficiency and contribute significantly to reduce costs. One of the ways we achieve that is through efficiencies in domestic transportation.")}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="notice-right">
                                <div className="single-notice-right mb-25 pb-25">
                                    <h3>{t("Our Mission")}</h3>
                                    <p>{t("To deliver the ultimate level of logistics services for our customers with efficient response, expedient strategy and effective service")}</p>
                                </div>
                                <div className="single-notice-right mb-25 pb-25">
                                    <h3>{t("Our Mission Statement")}</h3>
                                    <p>{t("PERFECT service the FIRST time. Even BETTER the SECOND time.")} </p>
                                </div>
                                <div className="single-notice-right mb-25 pb-25">
                                    <h3>{t("Our Vision")}</h3>
                                    <p>{t("Managing and exceeding customers’ expectations.")}</p>
                                </div>
                                <div className="single-notice-right">
                                    <h3>{t("Our Culture")}</h3>
                                    <p>{t("We have created a customer-oriented corporate culture with superior service systems. The effective use of information and technology to promote service quality is the foundation of our customer service team.")}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- Notice End --> */}



            {/* <!-- services Area Start --> */}
            <div className="courses-area pt-50 pb-50 text-center">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="section-title">
                                <h2>{t("Our Services")}</h2>
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
                                    <h3><Link to="/oceanExport" >{t("Ocean Export")}</Link></h3>
                                    <p>{t("ABX Solutions provides a wide choice of services from Canada and the U.S. ports to any other port in the world. We have a strong network in Asia.")}</p>
                                    <Link to="/oceanExport" className="default-btn" >{t("read more")}</Link>
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
                                    <h3><Link to="/oceanImport"  >{t("Ocean Import")}</Link></h3>
                                    <p>{t("Through ABX Solution’s network of agents and partners around the world, we can start the import process here by starting the export process there.")} </p>
                                    <Link to="/oceanImport"  className="default-btn" >{t("read more")}</Link>
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
                                    <h3><Link to="/airExport">{t("Air Export")}</Link></h3>
                                    <p>{t("ABX Solutions can move your air freight from anywhere in Canada and US, with our partners around the world, can handle all of your export needs.")}</p>
                                    <Link to="/airExport" className="default-btn">{t("read more")}</Link>
                                </div>
                            </div>
                        </div>
                        
                        <div className="row mt-25 mb-25">
                            <div className="col-lg-4 col-md-6"></div>
                            <div className="col-lg-4 col-md-6">
                                <Link className='view-more-btn' to="/services">{t("View More")}</Link>
                            </div>
                            <div className="col-lg-4 col-md-6"></div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
            {/* <!-- services Area End --> */}
        </>
    )
}

export default Home