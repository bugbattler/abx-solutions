import React, { useEffect, useState } from "react";
import { Form, Input, Button, Row, Col, Space, Spin } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { ChangePassword } from "../../redux/createSlice/ChangePassword";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const ChangePasswordContent = ({ userId }) => {
    const { t } = useTranslation()

    const [showPassword, setShowPassword] = useState(false);
    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const [confirmClick, setConfirmClick] = useState(false);

    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        setConfirmClick(true);
        if (e.newPassword !== e.renewPassword) {
            toast.error("New Password and Confirm Password Should Match!");
        } else {
            dispatch(ChangePassword({ currentPassword: e.currentPassword, newPassword: e.newPassword, userId: userId, navigate: navigate }))
        }
        const timer = setTimeout(() => {
            setConfirmClick(false);
        }, 2000);
        return () => clearTimeout(timer);
    };
    return (
        <>
            {confirmClick && (
                <Space direction="vertical">
                    <div className="loader-overlay">
                        <Spin tip="Loading" size="large"></Spin>
                    </div>
                </Space>
            )}
            <Row>
                <Col md={24} xs={24} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Form form={form} onFinish={handleSubmit}>

                        <label className="labelText">{t("Current Password")}:</label>
                        <Form.Item
                            name="currentPassword"
                            rules={[
                                { required: true, message: "Please Enter Current Password!" }
                            ]}
                        >
                            <Input.Password
                                prefix={
                                    <LockOutlined
                                        type="lock"
                                        style={{ color: "rgba(0,0,0,.25)" }}
                                    />
                                }
                                type="password"
                                placeholder="Enter Current Password"
                                iconRender={(visible) =>
                                    visible ? (
                                        <EyeTwoTone onClick={handlePasswordVisibility} />
                                    ) : (
                                        <EyeInvisibleOutlined onClick={handlePasswordVisibility} />
                                    )
                                }
                                autoComplete="current-password"
                            />
                        </Form.Item>

                        <label className="labelText">{t("New Password")}:</label>
                        <Form.Item
                            name="newPassword"
                            rules={[
                                { required: true, message: "Please Enter New Password!" }
                            ]}
                        >
                            <Input.Password
                                prefix={
                                    <LockOutlined
                                        type="lock"
                                        style={{ color: "rgba(0,0,0,.25)" }}
                                    />
                                }
                                type="password"
                                placeholder="Enter New Password"
                                iconRender={(visible) =>
                                    visible ? (
                                        <EyeTwoTone onClick={handlePasswordVisibility} />
                                    ) : (
                                        <EyeInvisibleOutlined onClick={handlePasswordVisibility} />
                                    )
                                }
                                autoComplete="current-password"
                            />
                        </Form.Item>

                        <label className="labelText">{t("Confirm New Password")}:</label>
                        <Form.Item
                            name="renewPassword"
                            rules={[
                                { required: true, message: "Please Enter Password to Confirm" }
                            ]}
                        >
                            <Input.Password
                                prefix={
                                    <LockOutlined
                                        type="lock"
                                        style={{ color: "rgba(0,0,0,.25)" }}
                                    />
                                }
                                type="password"
                                placeholder="Please Enter New Password to Confirm"
                                iconRender={(visible) =>
                                    visible ? (
                                        <EyeTwoTone onClick={handlePasswordVisibility} />
                                    ) : (
                                        <EyeInvisibleOutlined onClick={handlePasswordVisibility} />
                                    )
                                }
                                autoComplete="current-password"
                            />
                        </Form.Item>

                        <Form.Item
                            name="remember"
                            className="formOfRegistration"
                            valuePropName="checked"
                            initialValue={true}
                            style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                        >
                            <Button
                                type="primary"
                                htmlType="submit"
                            >
                                {t("Change Password")}
                            </Button>

                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </>
    );
};
export default ChangePasswordContent;