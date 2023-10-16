import React from "react";
import CatagorySidebar from "./CatagorySidebar";
import Nav from "./Nav";
import Footer from "./Footer";
import { useTranslation } from 'react-i18next';

function AirExport() {
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
                    <h2>{t("Air Export Services")}</h2>
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
                    src="assets/img/UPS/air-import.jpg"
                    alt="courses-details"
                  />
                </div>
                <div className="course-details-content">
                  <h2>{t("Air Expor")}t</h2>
                  <p>
                  {t("ABX Solution can can move your air freight from anywhere in Canada and US, with our partners around the world, can handle all of your export needs. With a strong network in Asia, North & South America and Europe , we can ship airport-to-airport, point-to-point or door-to-door. We are experienced in handling everything from Accordions to Zithers professionally & efficiently.")}
                    <br />
                    <br />
                    * {t("Shipment Pre-Planning")}
                    <br />
                    * {t("Air cargo booking and pick-up")}
                    <br />
                    * {t("Competitive rates with a choice of carriers who meet our service criteria and give pre-allocated space")}
                    <br />
                    * {t("Consolidation services")}
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
                    * {t("CAED export customs clearance")}
                    <br />
                    * {t("International customs clearance & return customs clearance formalities")}
                    <br />
                    * {t("Cargo insurance")}
                    <br />* {t("Wide variety of commodities")}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              {/* <div className="blog-sidebar right">
                <div className="single-blog-widget mb-50">
                  <h3>categories</h3>
                  <ul>
                    <li>
                      <a href="#">Shipment Pre-Planning</a>
                    </li>
                    <li>
                      <a href="#">Air cargo booking and pick-up</a>
                    </li>
                    <li>
                      <a href="#">
                        Competitive rates with a choice of carriers who meet our
                        service criteria and give pre-allocated space
                      </a>
                    </li>
                    <li>
                      <a href="#">Consolidation services</a>
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
                      <a href="#">CAED export customs clearance</a>
                    </li>
                    <li>
                      <a href="#">
                        International customs clearance & return customs
                        clearance formalities
                      </a>
                    </li>
                    <li>
                      <a href="#">Cargo insurance</a>
                    </li>
                    <li>
                      <a href="#">Wide variety of commodities</a>
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

export default AirExport;
