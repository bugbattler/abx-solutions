import React, { useState } from "react";
import { Form, Input, Button, Row, Col, DatePicker } from "antd";
import image from "../../assets/cargo.png";
import { registration } from "../../redux/createSlice/Userregistration";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { toast } from "react-toastify";
import logo from "../../assets/abxsolutions_logo_full.svg";


const Registration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    if (e.password === e.cpassword) {
      const firstname = e.firstname;
      const lastname = e.lastname;
      const email = e.email;
      const mobile = e.mobile;
      const org_name = e.org_name;
      const password = e.password;
      dispatch(registration({ firstname, lastname, email, mobile, org_name, password }));
    } else {
      toast.error("Password does not match")
    }
  };

  const user = useSelector((state) => state.user.user);
  const statuscheck = user === null ? user : user.data;

  if (statuscheck && statuscheck.success === true) {
    toast.success("User Registration Successful")
    navigate("/")
  } else if (statuscheck && statuscheck.status === 400) {
    toast.error(statuscheck.message)
  }
  const inputStyle = {};
  const [form] = Form.useForm();

  return (
    <div className="main1">
      <Row className="regitsrationPage">
        <Col md={12} xs={24}>
          <img className="imageLeft" src={image} alt="" />
        </Col>
        <Col md={12} xs={24}>
          <Form form={form} onFinish={handleSubmit} className="login-form">
            <div className="imgLogo">
              <img src={logo} alt="" />
            </div>
            <div className="headingOfSignUo">
              <h4>Sign Up</h4>
              <span>Please fill information below</span>
            </div>

            <div style={{ display: "flex", width: "100%" }}>
              <div style={{ width: "48%", marginRight: "2%" }}>
                <label className="labelText">FIRST NAME</label>
                <Form.Item
                  name="firstname"
                  rules={[{ required: true, message: "Please enter a first name!" }]}
                  colon={false}
                  style={{ width: "100%" }}
                >
                  <Input
                    placeholder="Enter  First Name"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </div>
              <div style={{ width: "48%", marginLeft: "2%" }}>
                <label className="labelText">LAST NAME</label>
                <Form.Item
                  name="lastname"
                  rules={[{ required: true, message: "Please enter a last name!" }]}
                  colon={false}
                  style={{ width: "100%" }}
                >
                  <Input
                    placeholder="Enter Last Name"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </div>
            </div>
            <label className="labelText">EMAIL</label>
            <Form.Item
              name="email"
              className="formOfRegistration"
              rules={[
                { required: true, message: "Please enter an email!" },
                {
                  type: "email",
                  message: "Please enter a valid email address!",
                },
              ]}
              colon={false}
            >
              <Input
                placeholder="Enter Email"
                style={inputStyle}
                className="no-focus-outline"
                type="email"
              />

            </Form.Item>
            <label className="labelText">MOBILE</label>
            <Form.Item
              name="mobile"
              className="formOfRegistration"
              rules={[{ required: true, message: "Please enter a Mobile No!" }]}
              colon={false}
            >
              <Input
                placeholder="Enter Mobile No"
                style={inputStyle}
                className="no-focus-outline"
              />
            </Form.Item>
            <label className="labelText">ORGANIZATION</label>
            <Form.Item
              name="org_name"
              className="formOfRegistration"
              rules={[
                { required: true, message: "Please enter an Organization name!" },
              ]}
              colon={false}
            >
              <Input
                placeholder="Enter Organization Name"
                style={inputStyle}
                className="no-focus-outline"
              />
            </Form.Item>

            <label className="labelText">PASSWORD</label>
            <Form.Item
              name="password"
              className="formOfRegistration"
              rules={[
                { required: true, message: "Please enter a password!" },
                { min: 6, max: 50, message: "Password must be between 6 and 50 characters!" },
                {
                  pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
                  message: "Password must contain at least one letter and one number!",
                },
              ]}
              colon={false}
            >
              <Input.Password
                placeholder="Enter Password"
                style={inputStyle}
                className="no-focus-outline"
                type="password"
                iconRender={(visible) =>
                  visible ? (
                    <EyeTwoTone onClick={handlePasswordVisibility} />
                  ) : (
                    <EyeInvisibleOutlined onClick={handlePasswordVisibility} />
                  )
                }
              />
            </Form.Item>
            <label className="labelText">RE-ENTER PASSWORD</label>
            <Form.Item
              name="cpassword"
              className="formOfRegistration"
              rules={[
                { required: true, message: "Please enter a password!" },
                { min: 6, max: 50, message: "Password must be between 6 and 50 characters!" },
                {
                  pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
                  message: "Password must contain at least one letter and one number!",
                },
              ]}
              colon={false}
            >
              <Input.Password
                placeholder="Enter Password To Confirm"
                style={inputStyle}
                className="no-focus-outline"
                type="password"
                iconRender={(visible) =>
                  visible ? (
                    <EyeTwoTone onClick={handlePasswordVisibility} />
                  ) : (
                    <EyeInvisibleOutlined onClick={handlePasswordVisibility} />
                  )
                }
              />
            </Form.Item>
            <Form.Item
              name="remember"
              className="formOfRegistration"
              valuePropName="checked"
              initialValue={true}
            >
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
                className="login-form-button"
              // onClick={() => navigate("/")}
              >
                Sign Up
              </Button>
            </Form.Item>

            <p style={{ textAlign: "center", fontSize: "15px" }}>Already have an account? <Link to="/Signin">Sign In</Link></p>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Registration;