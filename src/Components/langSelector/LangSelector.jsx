import React, { useState } from "react";
import "./LanguageSelector.css";
import img from "../../assets/DE.png"
import Flags from 'react-flags-select';
// import 'react-flags-select/css/react-flags-select.css';
import { useTranslation } from 'react-i18next';

function LangSelector(props) {
  const { t } = useTranslation()

  const [selectedLanguage, setSelectedLanguage] = useState('us'); // Default language is 'us' (United States English)

  const handleLanguageChange = (selected) => {
    setSelectedLanguage(selected);
    // You can add logic here to change the language of your application
    // based on the selected language.
  };
  return (
    <>
      {/* <select
        class="lang-selection"
        aria-label="Large select example"
        onChange={(e) => props.setLang(e.target.value)}
      >
        <option selected>--Select Languages--</option>
        <option key={"en"} value="en" className="en">
          English
        </option>
        <option key={"hi"} value="hi">
          Hindi
        </option>
        <option key={"ch"} value="ch">
          <img src="https://www.countryflagicons.com/FLAT/64/CN.png" alt="" />
          Chinese
        </option>
      </select> */}
      <select name="" id="" className="lang-selector"
      onChange={(e) => props.setLang(e.target.value)}
      >
        <option value="" >{t("Select Langueges")}</option>
        <option key={"en"} value="en"  className="en" data-content='<span class="flag-icon flag-icon-us"></span> English'>English </option>
        <option key={"ch"} value="ch" className="chi">{t("China")}</option>
      </select>
     
    </>
  );
}

export default LangSelector;
