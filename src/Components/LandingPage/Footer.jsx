import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Footer() {
    const { t } = useTranslation()

  return (
    <div>
        {/* <!-- Footer Start --> */}
        <footer className="footer-area bg-color">
            <div className="main-footer">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-6">
                            <div className="single-widget pr-60">
                                <div className="footer-logo pb-25">
                                    <Link to="/"><img src="assets/img/logo/abxsolutionslogofull.svg" alt="Abx" /></Link>
                                </div>
                                <p>{t("Not only an International Freight Forwarder but an eCommerce platforms solutions provider")}</p>
                                <div className="footer-social">
                                    <ul>
                                        <li><a href="https://www.facebook.com/devitems/?ref=bookmarks"><i className="bi bi-facebook"></i></a></li>
                                        <li><a href="https://www.pinterest.com/devitemsllc/"><i className="bi bi-pinterest"></i></a></li>
                                        <li><a href="#"><i className="bi bi-vimeo"></i></a></li>
                                        <li><a href="https://twitter.com/devitemsllc"><i className="bi bi-twitter"></i></a></li>
                                    </ul>    
                                </div>
                            </div>
                        </div>
                        <div className="col-md-1"></div>
                        <div className="col-lg-3 col-md-6">
                            <div className="single-widget">
                                <h3>{t("Quick Links")}</h3>
                                <ul>
                                    <li><Link to="/">{t("Home")}</Link></li>
                                    <li><Link to="/about">{t("About Us")}</Link></li>
                                    <li><Link to="/services">{t("Services")}</Link></li>
                                    <li><Link to="/contact">{t("Contact Us")}</Link></li>
                                    <li><Link to="/termsConditions">{t("Terms & Conditions")}</Link></li>
                                    <li><Link to="/privacyPolicy">{t("Privacy Policy")}</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-1"></div>

                        <div className="col-lg-3 col-md-6 pt-4 pt-lg-0">
                            <div className="single-widget">
                                <h3>{t("Our Services")}</h3>
                                <ul>
                                    <li><Link to="/oceanImport">{t("Ocean Import")}</Link></li>
                                    <li><Link to="/oceanExport">{t("Ocean Export")}</Link></li>
                                    <li><Link to="/airImport">{t("Air Import")}</Link></li>
                                    <li><Link to="/airExport">{t("Air Export")}</Link></li>
                                </ul>
                            </div>
                        </div>
                        {/* <div className="col-lg-3 col-md-6 pt-4 pt-lg-0">
                            <div className="single-widget">
                                <h3>Our Services</h3>
                                <ul>
                                    <li><Link to="/termsConditions">Terms & Conditions</Link></li>
                                    <li><Link to="/oceanExport">Privacy Policy</Link></li>
                                    
                                </ul>
                            </div>
                        </div> */}
                        {/* <div className="col-lg-3 col-md-6 pt-4 pt-lg-0">
                            <div className="single-widget">
                                 <div className="footer-social">
                                    <ul>
                                        <li><a href="https://www.facebook.com/devitems/?ref=bookmarks"><i className="zmdi zmdi-facebook"></i></a></li>
                                        <li><a href="https://www.pinterest.com/devitemsllc/"><i className="zmdi zmdi-pinterest"></i></a></li>
                                        <li><a href="#"><i className="zmdi zmdi-vimeo"></i></a></li>
                                        <li><a href="https://twitter.com/devitemsllc"><i className="zmdi zmdi-twitter"></i></a></li>
                                    </ul>    
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>   
            <div className="footer-bottom text-center">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <p>Copyright © <a href="">AbxSolutions</a> Designed By <a href="https://bugbattlers.com/" target="_blank">BugBattlers Pvt. Ltd.</a> / <a href="https://www.volckano.com/" target="_blank">Verve Group Inc.</a></p>
                        </div> 
                    </div>
                </div>    
            </div>
        </footer>
        {/* <!-- Footer End --> */}
    </div>
  )
}

export default Footer