import React from 'react'
import { useTranslation } from 'react-i18next';

function CatagorySidebar() {
  const { t } = useTranslation()

  return (
    <div>
        <div className="blog-sidebar right">
                <div className="single-blog-widget mb-50">
                  <h3>{t("Categories")}</h3>
                  <ul>
                    <li>
                      <a href="#">{t("Shipment Pre-Planning")}</a>
                    </li>
                    <li>
                      <a href="#">{t("LCL & FCL cargo booking and pick-up")}</a>
                    </li>
                    <li>
                      <a href="#">
                        {t("Monthly contract rates with a choice of carriers who meet our")}
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        {t("service criteria and give pre-allocated space")}
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        {t("Worldwide Consolidation & Multi-Countries Consolidation")}
                      </a>
                    </li>
                    <li>
                      <a href="#">{t("Professional automated documentation")}</a>
                    </li>
                    <li>
                      <a href="#">{t("Complete follow up")}</a>
                    </li>
                    <li>
                      <a href="#">{t("Dedicated account executives")}</a>
                    </li>
                    <li>
                      <a href="#">{t("Fast Track & Trace cargo information")}</a>
                    </li>
                    <li>
                      <a href="#">{t("Total logistics service")}</a>
                    </li>
                    <li>
                      <a href="#">
                        {t("CAED / AES filling / EXPORT customs clearance")}
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        {t("International customs clearance & return customs")}
                      </a>
                    </li>
                    <li>
                      <a href="#">{t("Clearance formalities")}</a>
                    </li>
                    <li>
                      <a href="#">{t("Insurance services")}</a>
                    </li>
                    <li>
                      <a href="#">{t("Huge variety of commodities")}</a>
                    </li>
                  </ul>
                </div>
              </div>
    </div>
  )
}

export default CatagorySidebar