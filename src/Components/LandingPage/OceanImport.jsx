import React from 'react'
import CatagorySidebar from './CatagorySidebar'
import Nav from './Nav'
import Footer from './Footer'
import { useTranslation } from 'react-i18next';

function OceanImport() {
    const { t } = useTranslation()

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
                                        <h2>{t("Ocean Import Service")}</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* // <!-- Banner Area End --> */}

            {/* <!-- Blog Start --> */}
            <div className="courses-details-area blog-area pt-150 pb-140">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="courses-details">
                                <div className="courses-details-img">
                                    <img src="assets/img/UPS/oceanexport.jpg" alt="courses-details" />
                                </div>
                                <div className="course-details-content">
                                    <h2>{t("Ocean Import")}</h2>
                                    <p>{t("ABX Solution offers full ocean services from cargo pick up to delivery and beyond. With a worldwide network of agents, we are positioned to help our customers not only get their freight from “Point A” to “Point B,” but offers cargo tracking through our website and other services to make the shipping process seamless and painless.")}<br/><br/>
                                   {t("The international transportation process has become much more complicated over the past decade or so, whether it’s import or export. We want to assure you that we have the expertise to help guide our customers through the maze of new rules and regulations.")}<br/><br/>
                                    {t("We are able to offer competitive pricing, the best transit times, and schedule flexibility through our steamship line contracts. Everything you need to successfully negotiate your way from here to there is just a call or click away.")}<br/><br/>
                                   {t("ABX Solution is licensed by the Federal Maritime Commission as both an ocean freight forwarder and an NVOCC. We offer full ocean services -- export or import -- and the expertise to guide you through the maze of complicated rules and regulations")}.
                                    </p>

                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            {/* <div className="blog-sidebar right">
                                <div className="single-blog-widget mb-50">
                                    <h3>categories</h3>
                                    <ul>
                                        <li><a href="#">Shipment Pre-Planning</a></li>
                                        <li><a href="#">Ocean cargo booking and pick-up at origin</a></li>
                                        <li><a href="#">Competitive rates with a choice of carriers who meet our service criteria</a></li>
                                        <li><a href="#">Overseas consolidation services
                                        </a></li>
                                        <li><a href="#">Deconsolidation and distribution
                                        </a></li>
                                        <li><a href="#">Professional automated documentation
                                        </a></li>
                                        <li><a href="#">Dedicated account executives
                                        </a></li>
                                        <li><a href="#">Fast Track & Trace cargo information
                                        </a></li>
                                        <li><a href="#">Total logistics service
                                        </a></li>
                                        <li><a href="#">Customs clearance
                                        </a></li>
                                        <li><a href="#">Cargo insurance
                                        </a></li>
                                        <li><a href="#">Wide variety of commodities
                                        </a></li>
                                        
                                    </ul>
                                </div>

                            </div> */}
                            <CatagorySidebar />
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Blog End --> */}
<Footer/>
        </>
    )
}

export default OceanImport