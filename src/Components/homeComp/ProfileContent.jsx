import { useEffect, useState } from 'react';
import { Button, Col, Form, Input, Row, Space, Spin } from 'antd';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo } from '../../redux/createSlice/getSingleUser';
import { upUserInfo } from '../../redux/createSlice/updateUserDetails';
import { useTranslation } from 'react-i18next';

const ProfileContent = () => {
    const { t } = useTranslation()

    const [editMode, setEditMode] = useState(false);
    const user = useSelector((state) => state.getUser?.getUser?.data[0]);
    const dispatch = useDispatch();
    const [confirmClick, setConfirmClick] = useState(false);



    const [user1, setUser] = useState({
        firstname: user?.firstname,
        lastname: user?.lastname,
        email: user?.email,
        org_name: user?.org_name,
        mobile: user?.mobile,
        balance: user?.balance,
    });

    const [form] = Form.useForm();

    const handleUpdateProfile = () => {
        setConfirmClick(true);
        setEditMode(true);
        setConfirmClick(false);
    };

    const handleInputChange = (e, field) => {
        const { value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [field]: value,
        }));
    };



    const handleFormSubmit = (values) => {
        setConfirmClick(true);
        dispatch(upUserInfo(values)).then(() => {
            dispatch(getUserInfo());
            setEditMode(false);
        });
        const timer = setTimeout(() => {
            setConfirmClick(false);
        }, 2000);
        return () => clearTimeout(timer);
    };

    useEffect(() => {
        dispatch(getUserInfo());
    }, []);

    return (
        <>
            {confirmClick && (
                <Space direction="vertical">
                    <div className="loader-overlay">
                        <Spin tip="Loading" size="large"></Spin>
                    </div>
                </Space>
            )}
            {editMode ? (
                <Form form={form} onFinish={handleFormSubmit}>
                    <Row>
                        <Col md={12} xs={24} className='ProfileContent' >
                            <h4>{t("First Name")}</h4>
                            <Form.Item
                                name="firstname"
                                rules={[{ required: true, message: 'Please enter your firstname' }]}
                                initialValue={user?.firstname}
                                className='FormItem'
                            >
                                <span>: </span><Input style={{ width: "70%" }} value={user1?.firstname} onChange={(e) => handleInputChange(e, 'firstname')} />
                            </Form.Item>
                        </Col>
                        <Col md={12} xs={24} className='ProfileContent'>
                            <h4>{t("Last Name")}</h4>
                            <Form.Item
                                name="lastname"
                                rules={[{ required: true, message: 'Please enter your lastname' }]}
                                initialValue={user?.lastname}
                                className='FormItem'
                            >
                                <span>: </span><Input style={{ width: "70%" }} value={user1?.lastname} onChange={(e) => handleInputChange(e, 'lastname')} />
                            </Form.Item>
                        </Col>
                        <Col md={12} xs={24} className='ProfileContent'>
                            <h4>{t("Email")}</h4>
                            <Form.Item
                                name="email"
                                rules={[{ required: true, message: 'Please enter your email' }, { type: 'email', message: 'Please enter a valid email' }]}
                                initialValue={user?.email}
                                className='FormItem'
                            >
                                <span>: </span><Input style={{ width: "70%" }} value={user1?.email} onChange={(e) => handleInputChange(e, 'email')} />
                            </Form.Item>
                        </Col>
                        <Col md={12} xs={24} className='ProfileContent'>
                            <h4>{t("Organisation Name")}</h4>
                            <Form.Item
                                name="org_name"
                                rules={[{ required: true, message: 'Please enter your organisation name' }]}
                                initialValue={user?.org_name}
                                className='FormItem'
                            >
                                <span>: </span><Input style={{ width: "70%" }} value={user1?.org_name} onChange={(e) => handleInputChange(e, 'org_name')} />
                            </Form.Item>
                        </Col>
                        <Col md={12} xs={24} className='ProfileContent'>
                            <h4>{t("Mobile No")}</h4>
                            <Form.Item
                                name="mobile"
                                rules={[{ required: true, message: 'Please enter your mobile number' }]}
                                initialValue={user?.mobile}
                                className='FormItem'
                            >
                                <span>: </span><Input style={{ width: "70%" }} value={user1?.mobile} onChange={(e) => handleInputChange(e, 'mobile')} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Button type="primary" htmlType="submit" style={{ float: "right" }}>{t("Save Changes")}</Button>
                </Form>
            ) : (
                <>
                    <h1>{user?.firstname} {user?.lastname}</h1>
                    <Row style={{ width: "100%" }}>
                        <Col md={12} xs={24} className='ProfileContent'>
                            <h4 className='heading2'>{t("Email")}</h4>
                            <h4>: {user?.email}</h4>
                        </Col>
                        <Col md={12} xs={24} className='ProfileContent'>
                            <h4 className='heading2'>{t("Organisation Name")}</h4>
                            <h4>: {user?.org_name}</h4>
                        </Col>
                        <Col md={12} xs={24} className='ProfileContent'>
                            <h4 className='heading2'>{t("Mobile No")}</h4>
                            <h4>: {user?.mobile}</h4>
                        </Col>
                        <Col md={12} xs={24} className='ProfileContent'>
                            <h4 className='heading2'>{t("Wallet Balance")}</h4>
                            <h4>: {user?.balance} $</h4>
                        </Col>
                    </Row>
                </>
            )}

            {!editMode && <Button style={{ float: "right" }} onClick={handleUpdateProfile}>{t("Update Profile Details")}</Button>}
        </>
    );
};

export default ProfileContent;