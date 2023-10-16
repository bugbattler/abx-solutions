import { useEffect, useState } from 'react';
import { Button, Col, Form, Input, Row } from 'antd';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo } from '../../redux/createSlice/getSingleUser';
import { upShipperInfo } from '../../redux/createSlice/ShipperInfo';
import { useTranslation } from 'react-i18next';

const ShipperDetails = () => {
    const { t } = useTranslation()

    const [editMode, setEditMode] = useState(false);
    const user = useSelector((state) => state.getUser?.getUser?.data[0]);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUserInfo());
    }, [])

    const [user1, setUser] = useState({
        ShipperName: user?.ShipperName,
        ShipperNumber: user?.ShipperNumber,
        ShipperPhoneNumber: user?.ShipperPhoneNumber,
        ShipperAttentionName: user?.ShipperAttentionName,
        ShipperAddressLine1: user?.ShipperAddressLine1,
        ShipperAddressLine2: user?.ShipperAddressLine2,
        ShipperAddressLine3: user?.ShipperAddressLine3,
        ShipperCity: user?.ShipperCity,
        ShipperPostalCode: user?.ShipperPostalCode,
        ShipperStateProvinceCode: user?.ShipperStateProvinceCode,
        ShipperCountryCode: user?.ShipperCountryCode,
    });

    const [form] = Form.useForm();

    const handleUpdateProfile = () => {
        setEditMode(true);
    };

    const handleInputChange = (e, field) => {
        const { value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [field]: value,
        }));
    };
    const id1 = user?.id;
    const handleFormSubmit = (value) => {
        value.id = id1;
        dispatch(upShipperInfo(value)).then(() => {
            dispatch(getUserInfo());
            setEditMode(false);
        })
    };

    const getAddress = () => {
        const { ShipperAddressLine1, ShipperAddressLine2, ShipperAddressLine3 } = user1;
        const addressLines = [ShipperAddressLine1, ShipperAddressLine2, ShipperAddressLine3];
        const formattedAddress = addressLines.filter(Boolean).join(' ');

        return formattedAddress || 'N/A';
    };

    return (
        <>
            {editMode ? (
                <Form form={form} onFinish={handleFormSubmit}>
                    <h1>{t("Update Shipper Details")}</h1>
                    <Row>
                        <Col md={12} xs={24} className='ProfileContent'>
                            <h4>{t("Name")}</h4>
                            <Form.Item
                                name="ShipperName"
                                rules={[{ required: true, message: 'Please Enter Shipper First Name' }]}
                                initialValue={user1.ShipperName}
                            >
                                <span>: </span>  <Input style={{ width: "90%" }} value={user1.ShipperName} onChange={(e) => handleInputChange(e, 'ShipperName')} />
                            </Form.Item>
                        </Col>
                        <Col md={12} xs={24} className='ProfileContent'>
                            <h4>{t("Number")}</h4>
                            <Form.Item
                                name="ShipperNumber"
                                rules={[{ required: true, message: 'Please Enter Shipper Number' }]}
                                initialValue={user1.ShipperNumber}
                            >
                                <span>: </span> <Input style={{ width: "90%" }} value={user1.ShipperNumber} onChange={(e) => handleInputChange(e, 'ShipperNumber')} />
                            </Form.Item>
                        </Col>
                        <Col md={12} xs={24} className='ProfileContent'>
                            <h4>{t("Attention Name")}</h4>
                            <Form.Item
                                name="ShipperAttentionName"
                                rules={[{ required: true, message: 'Please Enter Shipper Attention Name' }]}
                                initialValue={user1.ShipperAttentionName}
                            >
                                <span>: </span>  <Input style={{ width: "90%" }} value={user1.ShipperAttentionName} onChange={(e) => handleInputChange(e, 'ShipperAttentionName')} />
                            </Form.Item>
                        </Col>
                        <Col md={12} xs={24} className='ProfileContent'>
                            <h4>{t("Phone Number")}</h4>
                            <Form.Item
                                name="ShipperPhoneNumber"
                                rules={[{ required: true, message: 'Please Enter Shipper Phone Number' }]}
                                initialValue={user1.ShipperPhoneNumber}
                            >
                                <span>: </span>  <Input style={{ width: "90%" }} value={user1.ShipperPhoneNumber} onChange={(e) => handleInputChange(e, 'ShipperPhoneNumber')} />
                            </Form.Item>
                        </Col>
                        <Col md={12} xs={24} className='ProfileContent'>
                            <h4>{t("Shipper AddressLine 1")}</h4>
                            <Form.Item
                                name="ShipperAddressLine1"
                                rules={[{ required: true, message: 'Please Enter Shipper Address Line 1' }]}
                                initialValue={user1.ShipperAddressLine1}
                            >
                                <span>: </span>  <Input style={{ width: "90%" }} value={user1.ShipperAddressLine1} onChange={(e) => handleInputChange(e, 'ShipperAddressLine1')} />
                            </Form.Item>
                        </Col>
                        <Col md={12} xs={24} className='ProfileContent'>
                            <h4>{t("Shipper AddressLine 2")}</h4>
                            <Form.Item
                                name="ShipperAddressLine2"
                                initialValue={user1.ShipperAddressLine2}
                            >
                                <span>: </span> <Input style={{ width: "90%" }} placeholder='Please Enter Shipper Address Line 2' value={user1.ShipperAddressLine2} onChange={(e) => handleInputChange(e, 'ShipperAddressLine2')} />
                            </Form.Item>
                        </Col>
                        <Col md={12} xs={24} className='ProfileContent'>
                            <h4>{t("Shipper AddressLine 3")}</h4>
                            <Form.Item
                                name="ShipperAddressLine3"
                                initialValue={user1.ShipperAddressLine3}
                            >
                                <span>: </span>    <Input style={{ width: "90%" }} placeholder='Please Enter Shipper Address Line 3' value={user1.ShipperAddressLine3} onChange={(e) => handleInputChange(e, 'ShipperAddressLine3')} />
                            </Form.Item>
                        </Col>
                        <Col md={12} xs={24} className='ProfileContent'>
                            <h4>City</h4>
                            <Form.Item
                                name="ShipperCity"
                                rules={[{ required: true, message: 'Please Enter Shipper City' }]}
                                initialValue={user1.ShipperCity}
                            >
                                <span>: </span> <Input style={{ width: "90%" }} value={user1.ShipperCity} onChange={(e) => handleInputChange(e, 'ShipperCity')} />
                            </Form.Item>
                        </Col>
                        <Col md={12} xs={24} className='ProfileContent'>
                            <h4>State Province Code</h4>
                            <Form.Item
                                name="ShipperStateProvinceCode"
                                rules={[{ required: true, message: 'Please Enter Shipper State Province Code' }]}
                                initialValue={user1.ShipperStateProvinceCode}
                            >
                                <span>: </span><Input style={{ width: "90%" }} value={user1.ShipperStateProvinceCode} onChange={(e) => handleInputChange(e, 'ShipperStateProvinceCode')} />
                            </Form.Item>
                        </Col>
                        <Col md={12} xs={24} className='ProfileContent'>
                            <h4>{t("Country Code")}</h4>
                            <Form.Item
                                name="ShipperCountryCode"
                                rules={[{ required: true, message: 'Please Enter Country Code' }]}
                                initialValue={user1.ShipperCountryCode}
                            >
                                <span>: </span> <Input style={{ width: "90%" }} value={user1.ShipperCountryCode} onChange={(e) => handleInputChange(e, 'ShipperCountryCode')} />
                            </Form.Item>
                        </Col>
                        <Col md={12} xs={24} className='ProfileContent'>
                            <h4>{t("Postal Code")}</h4>
                            <Form.Item
                                name="ShipperPostalCode"
                                rules={[{ required: true, message: 'Please Enter Postal Code' }]}
                                initialValue={user1.ShipperPostalCode}
                            >
                                <span>: </span>   <Input style={{ width: "90%" }} value={user1.ShipperPostalCode} onChange={(e) => handleInputChange(e, 'ShipperPostalCode')} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Button type="primary" htmlType="submit" style={{ float: "right" }}>{t("Save Changes")}</Button>
                </Form>
            ) : (
                <>
                    <h1>{t("Shipper Details")}</h1>
                    <Row style={{ width: "100%" }}>
                        <Col md={12} xs={24} className='ProfileContent'>
                            <h4 className='heading2'>{t("Name")}</h4>
                            <h4>: {user1?.ShipperName || "N/A"}</h4>
                        </Col>
                        <Col md={12} xs={24} className='ProfileContent'>
                            <h4 className='heading2'>{t("Shipper Number")}</h4>
                            <h4>: {user1?.ShipperNumber || "N/A"}</h4>
                        </Col>
                        <Col md={12} xs={24} className='ProfileContent'>
                            <h4 className='heading2'>{t("AttentionName")}</h4>
                            <h4>: {user1?.ShipperAttentionName || "N/A"}</h4>
                        </Col>
                        <Col md={12} xs={24} className='ProfileContent'>
                            <h4 className='heading2'>{t("Phone Number")}</h4>
                            <h4>: {user1?.ShipperPhoneNumber || "N/A"}</h4>
                        </Col>
                        <Col md={12} xs={24} className='ProfileContent'>
                            <h4 className='heading2'>{t("Address")}</h4>
                            <h4>: {getAddress()}</h4>
                        </Col>
                        <Col md={12} xs={24} className='ProfileContent'>
                            <h4 className='heading2'>{t("City")}</h4>
                            <h4>: {user1?.ShipperCity || "N/A"}</h4>
                        </Col>
                        <Col md={12} xs={24} className='ProfileContent'>
                            <h4 className='heading2'>{t("State Province Code")}:</h4>
                            <h4>: {user1?.ShipperStateProvinceCode || "N/A"}</h4>
                        </Col>
                        <Col md={12} xs={24} className='ProfileContent'>
                            <h4 className='heading2'>{t("Country Code")}</h4>
                            <h4>: {user1?.ShipperCountryCode || "N/A"}</h4>
                        </Col>
                        <Col md={12} xs={24} className='ProfileContent'>
                            <h4 className='heading2'>{t("Postal Code")}</h4>
                            <h4>: {user1?.ShipperPostalCode || "N/A"}</h4>
                        </Col>
                    </Row>
                </>
            )}

            {/* {!editMode && <Button style={{ float: "right" }} onClick={handleUpdateProfile}>Update Shipper Details</Button>} */}
        </>
    );
};

export default ShipperDetails;