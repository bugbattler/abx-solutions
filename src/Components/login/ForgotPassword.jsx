import React, { useEffect, useState } from "react";
import { Form, Input, Button, Row, Col, Modal } from "antd";
import { LockOutlined } from "@ant-design/icons";
import logo from "../../assets/logo.jpeg";
import image from "../../assets/cargo.png";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import axios from "axios";


const ForgotPassword = () => {
    const params = useParams();
    const token = `${params.a}.${params.b}.${params.c}`;
   

    const [form] = Form.useForm();

    const [showPassword, setShowPassword] = useState(false);
    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        axios.get(`https://abxsolutions.ca/api/users/validateResetToken/${params.a}/${params.b}/${params.c}`)
            .then((res) => {
                toast.success("Please Reset Your Password")
            })
            .catch((err) => {
                toast.success("Token Expired!");
            })
    }, [])



    const navigate = useNavigate();

    const handleSubmit = (e) => {
        const password = e.password;
        const cpassword = e.cpassword;
        if (password === cpassword) {
            axios.post(`https://abxsolutions.ca/api/users/resetPassword/${params.a}/${params.b}/${params.c}`,
                { password })
                .then((res) => {
                    toast.success("Password Changed Successfully!Pls Log In now!")
                    navigate("/")
                })
                .catch((error) => { console.log(error) })
        } else {
            toast.error("Password must match!")
        }
    };

    return (
        <div className="main">
            <Row className="loginpage">
                <Col md={12} xs={24}>
                    <img className="imageLeft" src={image} alt="" />
                </Col>
                <Col md={12} xs={24}>
                    <Form form={form} onFinish={handleSubmit} className="login-form">
                        <div className="imgLogo">
                            <img src={logo} alt="" />
                        </div>
                        <label className="labelText"> PASSWORD</label>
                        <Form.Item
                            name="password"
                            rules={[
                                { required: true, message: "Please enter password!" },
                                {
                                    min: 6,
                                    max: 50,
                                    message: "Password must be between 6 and 50 characters!",
                                },
                                {
                                    pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
                                    message:
                                        "Password must contain at least one letter and one number!",
                                },
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
                            />
                        </Form.Item>

                        <label className="labelText">CONFIRM PASSWORD</label>
                        <Form.Item
                            name="cpassword"
                            rules={[
                                { required: true, message: "Please enter password!" },
                                {
                                    min: 6,
                                    max: 50,
                                    message: "Password must be between 6 and 50 characters!",
                                },
                                {
                                    pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
                                    message:
                                        "Password must contain at least one letter and one number!",
                                },
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
                                className="login-form-button"
                            >
                                Reset Password
                            </Button>

                        </Form.Item>
                        <p style={{ width: "100%", textAlign: "center" }}>OR</p>
                        <a
                            className="registerBtn"
                        >
                            Don't have an Account?
                        </a>
                        <a
                            className="registerBtn"
                            onClick={() => {
                                navigate("/register");
                            }}
                        >
                            Register Now!
                        </a>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}

export default ForgotPassword
