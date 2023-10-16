import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Components/header/Navbar";
import Quote from "./Components/homeComp/Quote";
import Ship from "./Components/homeComp/Ship";
import Invices from "./Components/homeComp/Invices";
import MyAccount from "./Components/homeComp/MyAccount";
import LogOut from "./Components/homeComp/LogOut";
import Signin from "./Components/login/Signin";
import Header1 from "./Components/header/Menubar";
import Registration from "./Components/login/Registration";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import ForgotPassword from "./Components/login/ForgotPassword";
import Cookies from "js-cookie";
import { Space, Spin } from "antd";
import SingleShip from "./Components/homeComp/SingleShip";
import SavedQuotations from "./Components/homeComp/SavedQuotations";
import Singlequotation from "./Components/homeComp/SingleQuotation";
import Cart from "./Components/homeComp/Cart";
import SingleOrder from "./Components/homeComp/SingleOrder";
import LandingPageContainer from "./Components/LandingPage/LandinPageContainer";
import Home from "./Components/LandingPage/Home";
import About from "./Components/LandingPage/About";
import Contact from "./Components/LandingPage/Contact";
import Services from "./Components/LandingPage/Services";
import OceanExport from "./Components/LandingPage/OceanExport";
import OceanImport from "./Components/LandingPage/OceanImport";
import AirExport from "./Components/LandingPage/AirExport";
import AirImport from "./Components/LandingPage/AirImport";
import TermsConditions from "./Components/LandingPage/TermsConditions";
import PrivacyPolicy from "./Components/LandingPage/PrivacyPolicy";
import Nav from "./Components/LandingPage/Nav";
import Foo from "./Components/LandingPage/Footer";

const LayoutRoutes = () => {
  const [tokenLoaded, setTokenLoaded] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const token = Cookies.get("token");
  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
    }
    setTokenLoaded(true);
  }, [token]);

  return (
    <Routes>
      {/* <Route path="/" element={<LandingPageContainer/>} /> */}
      <Route exact path="/" element={<Home />} />
      <Route exact path="/about" element={<About />} />
      <Route exact path="/contact" element={<Contact />} />
      <Route exact path="/services" element={<Services />} />
      <Route exact path="/oceanExport" element={<OceanExport />} />
      <Route exact path="/oceanImport" element={<OceanImport />} />
      <Route exact path="/airExport" element={<AirExport />} />
      <Route exact path="/airImport" element={<AirImport />} />
      <Route exact path="/termsConditions" element={<TermsConditions />} />
      <Route exact path="/privacyPolicy" element={<PrivacyPolicy />} />
      <Route path="/Signin" element={<Signin />} />
      <Route path="/register" element={<Registration />} />
      <Route path="/resetPassword/:a/:b/:c" element={<ForgotPassword />} />
      {isAuthenticated === true ? (
        <Route path="/*" element={<AuthenticatedLayout />} />
      ) : (
        <Route path="/" element={<Signin />} />
      )}
    </Routes>
  );
};

const AuthenticatedLayout = React.memo(() => {
  const location = useLocation();
  const hideHeaderAndNavbar = location.pathname === "/";
  const isLoading = useSelector((state) => state.login?.isLoading);
  return (
    <>
      {isLoading === true ? (
        <Space direction="vertical" className="bodyOfSpin">
          <Space>
            <Spin tip="Loading" size="large">
              <div className="content12" />
            </Spin>
          </Space>
        </Space>
      ) : (
        <div>
          {!hideHeaderAndNavbar && (
            <div
              style={{
                position: "fixed",
                top: "0",
                left: "0",
                right: "0",
                zIndex: "100",
              }}
            >
              <Navbar />
            </div>
          )}
          {!hideHeaderAndNavbar && (
            <div
              style={{
                position: "fixed",
                zIndex: "1000",
                top: "4.5rem",
                right: 0,
                left: 0,
              }}
            >
              <Header1 />
            </div>
          )}
          <div className="btmContent">
            <Routes>
              <Route path="/generate-order/" element={<Quote />} />
              <Route path="/generate-order/:id" element={<Quote />} />
              <Route path="/ship" element={<Ship />} />
              <Route path="/savedQuotations" element={<SavedQuotations />} />
              <Route path="/invoices" element={<Invices />} />
              <Route path="/account" element={<MyAccount />} />
              <Route path="/logout" element={<LogOut />} />
              <Route
                path="/ship/singleShip/:ship_id"
                element={<SingleShip />}
              />
              <Route
                path="/quotation/getSingle/:id"
                element={<Singlequotation />}
              />
              <Route path="/orders" element={<Cart />} />
              <Route
                path="/order/singleOrder/:ship_id"
                element={<SingleOrder />}
              />
            </Routes>
          </div>
        </div>
      )}
    </>
  );
});

export default LayoutRoutes;
