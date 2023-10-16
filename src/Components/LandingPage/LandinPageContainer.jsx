import React from "react"

function LandingPageContainer() {
<>
<Router>
        <Nav />
        <Routes>
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
        </Routes>
        <Footer />
      </Router>
</>
}
export default LandingPageContainer;