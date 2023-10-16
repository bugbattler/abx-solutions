import { Card, Col, Row, Space, Spin, Tabs } from 'antd';
import { Content } from 'antd/es/layout/layout';
import React, { useEffect, useState } from 'react';
import ProfileContent from './ProfileContent';
import ShipperDetails from './ShipperDetails';
import ChangePasswordContent from './ChangePassword';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo } from '../../redux/createSlice/getSingleUser';

const { TabPane } = Tabs;
import { useTranslation } from 'react-i18next';

const MyAccount = () => {
  const { t } = useTranslation()

  const [activeTab, setActiveTab] = useState("1");
  const users = useSelector((state) => state.getUser);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const dispatch = useDispatch();

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  useEffect(() => {
    dispatch(getUserInfo());
  }, []);

  useEffect(() => {
    setUser(users?.getUser?.data[0]);
    setLoading(users?.loading);
  }, [users?.getUser]);

  return (
    <>
      {loading ? (
        <Space direction="vertical" className="bodyOfSpin">
          <Space>
            <Spin tip="Loading" size="large">
              <div className="content12" />
            </Spin>
          </Space>
        </Space>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            height: "max-content",
            backgroundColor: "rgb(242 244 255)",
          }}
        >
          <Content
            className="contentBox"
            style={{ padding: "1%", display: "flex", flexDirection: "column", width: "100%" }}
          >
            <Row
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Col md={24} xs={24}>
                <Card
                  bordered={false}
                  style={{
                    width: "100%",
                    borderRadius: "1px",
                    boxShadow:
                      "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "2%",
                    textAlign: "center",
                  }}
                >
                  <div
                    className="ProfilePhoto"
                  >
                    <h1>{user?.firstname.split("")[0]}</h1>
                  </div>
                  <h2>{user?.firstname} {user?.lastname}</h2>
                  <h4>{user?.email}</h4>
                  <Tabs activeKey={activeTab} onChange={handleTabChange} style={{ marginTop: '1rem' }}>
                    <TabPane tab={t("Profile")} key="1">
                    </TabPane>
                    <TabPane tab={t("Shipper Details")} key="2">
                    </TabPane>
                    <TabPane tab={t("Change Password")} key="3">
                    </TabPane>
                  </Tabs>
                </Card>
              </Col>
              <Col md={24} xs={24}>
                <Card
                  bordered={false}
                  style={{
                    width: "100%",
                    borderRadius: "1px",
                    boxShadow:
                      "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
                    padding: "2%"
                  }}
                >
                  {activeTab === "1" && <ProfileContent />}
                  {activeTab === "2" && <ShipperDetails />}
                  {activeTab === "3" && <ChangePasswordContent userId={user.id} />}
                </Card>
              </Col>
            </Row>
          </Content>
        </div>
      )}
    </>
  );
};

export default MyAccount;
