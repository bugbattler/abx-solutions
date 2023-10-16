import React from "react";
import CatagorySidebar from "./CatagorySidebar";
import Nav from "./Nav";
import Footer from "./Footer";
import { useTranslation } from 'react-i18next';

function OceanExport() {
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
                    <h2>{t("Ocean Export Service")}</h2>
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
                  <img
                    src="assets/img/UPS/oceanexport.jpg"
                    alt="courses-details"
                  />
                </div>
                <div className="course-details-content">
                  <h2>{t("Ocean Export")}</h2>
                  <p>
                    {t("ABX Solutions provides a wide choice of services from Canada & U.S. ports to any other port in the world. We have a strong network in Asia, North & South America and Europe no matter if you need port-to-port, point-to-point or door-to-door services. We are experienced in handling everything from Apparel to Zincographs professionally & efficiently.")}
                    <br />
                    <br />
                    * {t("Shipment Pre-Planning")}
                    <br />
                    * {t("LCL & FCL cargo booking and pick-up")}
                    <br />
                    * {t("Monthly contract rates with a choice of carriers who meet our")}
                    
                    <br />
                    * {t("service criteria and give pre-allocated space")}
                    <br />
                    * {t("Worldwide Consolidation & Multi-Countries Consolidation")}
                    <br />
                    * {t("Professional automated documentation")}
                    <br />
                    * {t("Complete follow up")}
                    <br />
                    * {t("Dedicated account executives")}
                    <br />
                    * {t("Fast Track & Trace cargo information")}
                    <br />
                    * {t("Total logistics service")}
                    <br />
                    * {t("CAED / AES filling / EXPORT customs clearance")}
                    <br />
                    * {t("International customs clearance & return customs")}
                    <br />
                    * {t("Clearance formalities")}
                    <br />
                    * {t("Insurance services")}
                    <br />
                    * {t("Huge variety of commodities")}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              {/* <div className="blog-sidebar right">
                <div className="single-blog-widget mb-50">
                  <h3></h3>
                  <ul>
                    <li>
                      <a href="#">Shipment Pre-Planning</a>
                    </li>
                    <li>
                      <a href="#">LCL & FCL cargo booking and pick-up</a>
                    </li>
                    <li>
                      <a href="#">
                        Monthly contract rates with a choice of carriers who
                        meet our
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        service criteria and give pre-allocated space
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        Worldwide Consolidation & Multi-Countries Consolidation
                      </a>
                    </li>
                    <li>
                      <a href="#">Professional automated documentation</a>
                    </li>
                    <li>
                      <a href="#">Complete follow up</a>
                    </li>
                    <li>
                      <a href="#">Dedicated account executives</a>
                    </li>
                    <li>
                      <a href="#">Fast Track & Trace cargo information</a>
                    </li>
                    <li>
                      <a href="#">Total logistics service</a>
                    </li>
                    <li>
                      <a href="#">
                        CAED / AES filling / EXPORT customs clearance
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        International customs clearance & return customs
                      </a>
                    </li>
                    <li>
                      <a href="#">Clearance formalities</a>
                    </li>
                    <li>
                      <a href="#">Insurance services</a>
                    </li>
                    <li>
                      <a href="#">Huge variety of commodities</a>
                    </li>
                  </ul>
                </div>
              </div> */}
              <CatagorySidebar />
            </div>
          </div>
        </div>
      </div>
      <Footer/>
      {/* <!-- Blog End --> */}
    </>
  );
}

export default OceanExport;
