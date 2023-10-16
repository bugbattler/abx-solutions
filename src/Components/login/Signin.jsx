import React, { useEffect, useState } from "react";
import { Form, Input, Button, Row, Col, Modal, Space, Spin } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import logo from "../../assets/abxsolutions_logo_full.svg";
import image from "../../assets/cargo.png";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { UserLogin } from "../../redux/createSlice/LoginSlice";
import axios from "axios";
import Cookies from "js-cookie";

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userlog = useSelector((state) => state.login.userLog);
  const statuscheck = userlog === null ? userlog : userlog?.data;
  const [showPassword, setShowPassword] = useState(false);
  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const [isLoading, setIsLoading] = useState(false);
  const token = Cookies.get("token");
  const [passwordLoad, setPasswordload] = useState(false);

  useEffect(() => {
    if (token !== undefined) {
      if (statuscheck && statuscheck?.status === 200) {
        setIsLoading(true);
        setTimeout(() => {
          toast.success(statuscheck?.message);
          navigate("/generate-order");
          setIsLoading(false);
        }, 2000);
      } else if (statuscheck && statuscheck.status === 400) {
        setIsLoading(true);
        setTimeout(() => {
          toast.error(statuscheck.message);
          setIsLoading(false);
        }, 500);
      } else if (token) {
        setIsLoading(true);
        setTimeout(() => {
          navigate("/generate-order");
          setIsLoading(false);
        }, 2000);
      }
    } else {
      setIsLoading(false);
    }
  }, [statuscheck, token]);


  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const handleSubmit = (e) => {
    setIsLoading(true);
    dispatch(UserLogin(e));
  };

  const handleForgot = () => {
    setPasswordload(true);
    form.validateFields(["email"]).then((values) => {
      const { email } = values;
      axios
        .post("https://abxsolutions.ca/api/users/forgotPassword", { email })
        .then((response) => {
          toast.success("Password reset link sent successfully to the given email address!");
          setIsModalVisible(false);
          setPasswordload(false);
        })
        .catch((error) => {
          toast.error("Please enter a valid email address.");
          setPasswordload(false);
        });
    });
  };
  return (
    <div className="main">
      <Modal
        title="Forgot Password"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsModalVisible(false)}>
            Cancel
          </Button>,
          <Button
            key="ok"
            type="primary"
            onClick={handleForgot}
          >
            Submit
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter your email address" },
              { type: "email", message: "Please enter a valid email address" },
            ]}
          >
            <Input placeholder="Enter Email" />
          </Form.Item>
        </Form>
      </Modal>
      {passwordLoad && (<Space direction="vertical" >
        <div className="loader-overlay">
          <Spin tip="Loading" size="large">

          </Spin>
        </div>
      </Space>)}

      {isLoading === true ? (<Space direction="vertical" className="bodyOfSpin">
        <Space>
          <Spin tip="Loading" size="large">
            <div className="content12" />
          </Spin>
        </Space>
      </Space>) : (<Row className="loginpage">
        <Col md={12} xs={24}>
          <img className="imageLeft" src={image} alt="" />
        </Col>
        <Col md={12} xs={24}>
          <Form form={form} onFinish={handleSubmit} className="login-form">
            <div className="imgLogo">
              <img src={logo} alt="" />
            </div>
            <label className="labelText">EMAIL</label>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please Enter an Email Id!" },
              ]}
            >
              <Input
                prefix={
                  <UserOutlined
                    type="user"
                    style={{ color: "rgba(0,0,0,.25)", width: "100%" }}
                  />
                }
                placeholder="Enter Email"
                style={{ width: "100%" }}
                type="email"
                autoComplete="username"
              />
            </Form.Item>
            <label className="labelText">PASSWORD</label>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please Enter a Password!" }
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
                placeholder="Enter Password"
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
            >
              <div className="">
                <a
                  className="login-form-forgot"
                  onClick={() => setIsModalVisible(true)}
                >
                  Forgot password?
                </a>
              </div>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>

            </Form.Item>
            <p style={{ textAlign: "center", fontSize: "15px", marginTop: "0%" }}>Don't have an account? <Link to="/register">SignUp</Link></p>
          </Form>
        </Col>
      </Row>)}

    </div>
  );
};

export default Signin;
