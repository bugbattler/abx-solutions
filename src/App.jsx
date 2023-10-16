import "./styles/styles.scss"
import LayoutRoutes from './LayoutRoutes'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter } from "react-router-dom"
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';

import { useEffect } from "react"
function App() {
  const { t } = useTranslation()

    useEffect(() => {
      const lang = localStorage.getItem("language")
      i18next.changeLanguage(lang)
    }, [])
  return (
    <>
      <BrowserRouter>
        <LayoutRoutes />
      </BrowserRouter>
      <ToastContainer />
    </>
  )
}

export default App
