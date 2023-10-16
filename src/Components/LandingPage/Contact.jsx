import React from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import { useTranslation } from 'react-i18next';

function Contact() {
    const { t } = useTranslation()

  return (
    <>
      <Nav />
      {/* <!-- Banner Area Start --> */}
      <div className="banner-area-wrapper">
        <div className="banner-area text-center">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="banner-content-wrapper">
                  <div className="banner-content">
                    <h2>{t("Contact Us")}</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* // <!-- Banner Area End --> */}

      {/* <!-- Contact Start --> */}

      <div className="contact-area pt-150 pb-140">
        <div className="container">
          <div className="row">
            <div className="col-lg-5 col-md-5">
              <div className="contact-contents text-center">
                <div className="single-contact mb-65">
                  <div className="contact-icon">
                    <img src="assets/img/contact/contact1.png" alt="contact" />
                  </div>
                  <div className="contact-add">
                    <h3>{t("MISSISSAUGA, ON. CANADA")}</h3>
                    <p>
                      {t("Unit 31, 5155 Spectrum Way")},
                      <br />
                      {t("Mississauga ON L4W 5A1 CANADA")}
                      <br />
                      {t("Phone: 1-905-896-3880​")}{" "}
                    </p>
                    <p>{t("Email: TBD")}</p>
                  </div>
                </div>
                <div className="single-contact mb-65">
                  <div className="contact-icon">
                    <img src="assets/img/contact/contact3.png" alt="contact" />
                  </div>
                  <div className="contact-add">
                    <h3>TBD</h3>
                    <p>{t("135, First Lane, City Street")}</p>
                    <p>{t("New Yourk City, USA")}</p>
                  </div>
                </div>
                <div className="single-contact">
                  <div className="contact-icon">
                    <img src="assets/img/contact/contact3.png" alt="contact" />
                  </div>
                  <div className="contact-add">
                    <h3>TBD</h3>
                    <p>{t("135, First Lane, City Street")}</p>
                    <p>{t("New Yourk City, USA")}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-7 col-md-7">
              <div className="reply-area">
                <h3>{t("GET IN TOUCH")}</h3>
                <p>
                  {t("Reach out, share a question or provide feedback on our services. Fill out the form and we'll respond as soon as possible.")}{" "}
                </p>
                <form
                  id="contact-form"
                  action="https://whizthemes.com/mail-php/other/mail.php"
                >
                  <div className="row">
                    <div className="col-md-12">
                      <p>{t("Name")}</p>
                      <input type="text" name="con_name" />
                    </div>
                    <div className="col-md-12">
                      <p>{t("Email")}</p>
                      <input type="text" name="con_email" />
                    </div>
                    <div className="col-md-12">
                      <p>{t("Subject")}</p>
                      <input type="text" name="con_subject" />
                      <p>{t("Massage")}</p>
                      <textarea
                        name="con_message"
                        cols="15"
                        rows="10"
                      ></textarea>
                    </div>
                  </div>
                  <button className="reply-btn" type="submit">
                    <span>{t("send message")}</span>
                  </button>
                  <p className="form-message"></p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      {/* <!-- Contact End --> */}
    </>
  );
}

export default Contact;
