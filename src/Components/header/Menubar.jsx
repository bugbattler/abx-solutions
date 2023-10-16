import React, { useEffect, useState } from 'react';
import { Layout, Menu, Drawer, Button } from 'antd';
import { MenuOutlined, DingdingOutlined, ZoomInOutlined, FileTextOutlined, ProfileOutlined, UserOutlined, PoweroffOutlined, CommentOutlined, InfoCircleOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo } from '../../redux/createSlice/getSingleUser';
const { Header } = Layout;
import { useTranslation } from 'react-i18next';

const Header1 = () => {
    const { t } = useTranslation()

    const [openMenu, setOpenmenu] = useState(false);
    const currentToken = Cookies.get("token");
    const navigate = useNavigate();
    const user = useSelector((state) => state.getUser?.getUser?.data[0]);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUserInfo());
    }, []);
    useEffect(() => {
        if (!currentToken) {
            toast.error("Your session has expired. Please login again.");
            navigate("/");
        }
    }, [navigate]);

    const handleDrawerClose = () => {
        setOpenmenu(false);
    };

    return (
        <div style={{ marginTop: "1%" }}>
            <Header className='header'>
                <div className='menubtn'>
                    <MenuOutlined height={15} width={15} onClick={() => setOpenmenu(true)} />
                </div>
                <span className='headerMenu'><Appmenu /></span>

                <Drawer
                    placement='left'
                    width={250}
                    open={openMenu}
                    onClose={handleDrawerClose}
                    closable={true}
                    bodyStyle={{ backgroundColor: "rgb(255, 255, 255)", width: "100%", overflow: "hidden" }}
                    onClick={handleDrawerClose}
                >
                    <Appmenu isInline />
                    <div className='ant-menu ant-menu-root ant-menu-inline ant-menu-dark MenuItems css-dev-only-do-not-override-12jzuas' role="menu" tabIndex="0" data-menu-list="true" style={{ backgroundColor: "#244589 !important", borderRadius: "8px" }} >
                        <div className="ant-menu-item ant-menu-item-selected">
                            <span className='ant-menu-title-content'>Balance : ${user?.balance}</span>
                        </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "start", justifyContent: "center", flexDirection: "column", position: "absolute", bottom: "10px", left: "5px", fontSize: "small" }}>
                        <div>
                            version:0.0.1
                        </div>
                        <div>
                            copyright@parceler
                        </div>
                    </div>
                </Drawer>
            </Header>
        </div>
    )
}

function Appmenu({ isInline = false }) {
    const { t } = useTranslation()
    const ship_id = useSelector((state) => state.singleShip?.getSingleShip?.data[0]?.ship_id);
    let id = useSelector((state) => state.getSingleQuotation?.getSingleQuotation?.data[0]?.quotation_id);
    const location = useLocation();
    const navigate = useNavigate();
    const [selectedKey, setSelectedKey] = useState('1');
    id = id ? `${id}` : ""
    useEffect(() => {
        const path = location.pathname;
        switch (path) {
            case `/generate-order/${id}`:
                setSelectedKey('1');
                break;
            case '/ship':
                setSelectedKey('2');
                break;
            case '/savedQuotations':
                setSelectedKey('3');
                break;
            case '/invoices':
                setSelectedKey('4');
                break;
            case '/account':
                setSelectedKey('5');
                break;
            case '/Logout':
                setSelectedKey('6');
                break;
            case `/ship/singleShip/${ship_id}`:
                setSelectedKey('2');
                break;
            case `/quotation/getSingle/${id}`:
                setSelectedKey('3');
                break;
            case `/orders`:
                setSelectedKey('7');
                break;
            case `/order/singleOrder/${ship_id}`:
                setSelectedKey('7');
                break;
            default:
                setSelectedKey('1');
                break;
        }
    }, [location, ship_id, id]);

    const handleMenuClick = (key) => {
        setSelectedKey(key);
        switch (key) {
            case '1':
                navigate(`/generate-order/${id}`);
                break;
            case '2':
                navigate('/ship');
                break;
            case '3':
                navigate('/savedQuotations');
                break;
            case '4':
                navigate('/invoices');
                break;
            case '5':
                navigate('/account');
                break;
            case '6':
                navigate('/Logout');
                break;
            case '7':
                navigate(`/orders`);
            default:
                break;
        }
    };

    return (
        <Menu
            theme="dark"
            mode={isInline ? 'inline' : 'horizontal'}
            selectedKeys={[selectedKey]}
            onClick={({ key }) => handleMenuClick(key)}
            items={[
                { key: '1', label: `${t('GENERATE ORDER')}`, icon: <ProfileOutlined className="iconsofheader" /> },
                { key: '7', label: `${t('CART')}`, icon: <ShoppingCartOutlined className="iconsofheader" /> },
                { key: '2', label: `${t('SHIP')}`, icon: <DingdingOutlined className="iconsofheader" /> },
                // { key: '3', label: 'QUOTATIONS', icon: <ZoomInOutlined className="iconsofheader" /> },
                // { key: '4', label: 'INVOICES', icon: <InfoCircleOutlined className="iconsofheader" /> },
                { key: '5', label: `${t('MY ACCOUNT')}`, icon: <UserOutlined className="iconsofheader" /> },
                { key: '6', label: `${t('LOGOUT')}`, style: { color: 'red' }, icon: <PoweroffOutlined className="iconsofheader" /> }

            ]}
            className="MenuItems"
            style={{ backgroundColor: 'rgb(255, 255, 255)', justifyContent: 'center', alignContent: 'center', width: '100%' }}
        />
    );
}

export default Header1;