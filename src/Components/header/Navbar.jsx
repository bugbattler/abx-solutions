import React, { useEffect } from 'react';
import 'antd/dist/reset.css';
import { Row, Col } from 'antd';
// import logo from "../../assets";
import { useDispatch, useSelector } from 'react-redux';
import LangSelector from '../langSelector/LangSelector';
import { getUserInfo } from '../../redux/createSlice/getSingleUser';
import { useTranslation } from 'react-i18next';
const Navbar = () => {
    const { t } = useTranslation()
    const user = useSelector((state) => state.getUser?.getUser?.data[0]);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUserInfo());
    }, []);
   
    return (
        <div className='NavbarParceler'>
            <img className='ms-5' src="assets/img/logo/abxsolutionslogofull.svg" alt=""  style={{ height: "35px", width: "auto" }}  />
           
            <div className='balance'>
                <h6>{t("WALLET BALANCE")}</h6>
                <span>$ {user?.balance}</span>
            </div>
        </div>
    )
}

export default Navbar;