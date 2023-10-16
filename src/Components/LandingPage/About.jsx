import React from 'react'
import Nav from './Nav'
import Footer from './Footer'
import { useTranslation } from 'react-i18next';

function About() {
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
                                <h2>{t("about us")}</h2> 
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>    
    {/* // <!-- Banner Area End --> */}

    {/* <!-- About Start --> */}
        <div className="about-area pt-50 pb-50">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="about-content">
                        <h2>{t("About")} <span>ABX</span></h2>
                        <p>{t("Not only an International Freight Forwarder but an eCommerce platforms solutions provider.")}
</p>
                            <p className="hidden-sm">{t("Abxsolutions Inc. is privately owned, independent freight forwarder based in Mississauga, Ontario, Canada and La Mirada, California, United States. We provide complete logistics service in ocean freight, air freight, Customs brokerage, warehousing, distribution, and beyond. Whatever your cargo transportation needs, we will do our very best to customize a solution for you.")} <br/><br/>
                            {t("Abxsolutions strives to provide cost effective, customer-oriented, and fast paced logistics services. With a strong presence in local and international markets, we are fully prepared to thoroughly map your supply chain and find the very best logistics program to suit your needs. With our experienced teams around the globe, we can be your single source for ALL your logistics needs.")}</p>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="about-img">
                            <img src="https://img.freepik.com/premium-photo/transportation-logistics_37416-165.jpg" alt="about" />
                        </div>
                    </div>
                    <div className="col-md-12">
                    <div >
                            <p>{t("We offer a unique e-Commerce solution to the marketplace. Helping small to medium manufacturers and producers to develop end to end e-Commerce and seller platform worldwide. Our one stop shop solution and a team of dedicated experts will enable any organization to achieve its financial goals and market dominance.")}</p>
                           
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
        {/* <!-- About End --> */}
    </>
  )
}

export default About