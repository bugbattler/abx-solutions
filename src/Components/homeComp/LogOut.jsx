import { Modal } from 'antd';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const LogOut = () => {
  const { t } = useTranslation()
  const [modalVisible, setModalVisible] = useState(true);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    }
    setModalVisible(false);
    navigate("/")
  };
  return (
    <div style={{ width: "100%", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Modal
        title={t("Confirm Logout")}
        visible={modalVisible}
        onOk={handleLogout}
        onCancel={() => {
          navigate("/generate-order");
          setModalVisible(false)
        }}
      >
        <p>{t("Are you sure you want to log out?")}</p>
      </Modal>
    </div>
  )
}

export default LogOut;
