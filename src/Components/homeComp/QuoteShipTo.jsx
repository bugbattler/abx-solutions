import React, { useEffect, useState } from 'react'
import { Card, Col, Form, Input, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { GetSingleQuotation } from '../../redux/createSlice/SingleQuotation';
import { useTranslation } from 'react-i18next';

const QuoteShipTo = ({ id }) => {
    const { t } = useTranslation()
    const data =useSelector((state) => state.singleShip?.getSingleShip?.data[0]);
    const data1 = useSelector((state) => state.getSingleQuotation);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GetSingleQuotation(id));
    }, [id]);

    useEffect(() => {
        setLoading(data1.loading)
    }, [data1]);
    return (
        <Col md={12} xs={24} className="trackBox">
            <Card
                bordered={false}
                style={{
                    width: "100%",
                    borderRadius: "1px",
                    boxShadow:
                        "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
                }}

            >
                <Row className="box1" style={{ display: "flex" }}>
                    <Col span={24} style={{ position: "relative" }}>
                        <h6>{t("SHIP TO")}</h6>
                    </Col>
                </Row>

                <div className="login-form">
                    <div className="label24">
                        <span className="headingofLabel1">{t("Name")}</span>
                        <span className="dotofShip">:</span>
                        <Form.Item
                            name="ShipToName"
                            className="select1"
                            rules={[{ required: true, message: "Required Name" }]}
                            initialValue={data?.ShipToName}
                        >
                            <Input placeholder="Enter Name" />
                        </Form.Item>
                    </div>
                    <div className="label24">
                        <span className="headingofLabel1">{t("Attention Name")}</span>
                        <span className="dotofShip">:</span>
                        <Form.Item
                            name="ShipToAttentionName"
                            className="select1"
                            rules={[{ required: true, message: "Required Attention Name" }]}
                            initialValue={data?.ShipToAttentionName}
                        >
                            <Input placeholder="Enter Attention Name" />
                        </Form.Item>
                    </div>
                    <div className="label24">
                        <span className="headingofLabel1">{t("Phone Number")}</span>
                        <span className="dotofShip">:</span>
                        <Form.Item
                            name="ShipToPhoneNumber"
                            className="select1"
                            rules={[{ required: true, message: "Required Phone Number" }]}
                            initialValue={data?.ShipToPhoneNumber}
                        >
                            <Input placeholder="Enter Phone Number" />
                        </Form.Item>
                    </div>
                    <div className="label24">
                        <span className="headingofLabel1">{t("Address 1")}</span>
                        <span className="dotofShip">:</span>
                        <Form.Item
                            name="ShipToAddressLine1"
                            className="select1"
                            rules={[{ required: true, message: "Required Address 1" }]}
                            initialValue={data?.ShipToAddressLine1}
                        >
                            <Input placeholder="Enter Address 1" />
                        </Form.Item>
                    </div>
                    <div className="label24">
                        <span className="headingofLabel1">{t("Address 2")}</span>
                        <span className="dotofShip">:</span>
                        <Form.Item
                            name="ShipToAddressLine2"
                            className="select1"
                            initialValue={data?.ShipToAddressLine2}
                        >
                            <Input placeholder="Enter Address 2" />
                        </Form.Item>
                    </div>
                    <div className="label24">
                        <span className="headingofLabel1">{t("Address 3")}</span>
                        <span className="dotofShip">:</span>
                        <Form.Item
                            name="ShipToAddressLine3"
                            className="select1"
                            initialValue={data?.ShipToAddressLine3}
                        >
                            <Input placeholder="Enter Address 3" />
                        </Form.Item>
                    </div>
                    <div className="label24">
                        <span className="headingofLabel1">{t("City")}</span>
                        <span className="dotofShip">:</span>
                        <Form.Item
                            name="ShipToCity"
                            className="select1"
                            rules={[{ required: true, message: "Required City" }]}
                            initialValue={data?.ShipToCity}
                        >
                            <Input placeholder="Enter City" />
                        </Form.Item>
                    </div>
                    <div className="label24">
                        <span className="headingofLabel1">{t("State Province Code")}</span>
                        <span className="dotofShip">:</span>
                        <Form.Item
                            name="ShipToStateProvinceCode"
                            className="select1"
                            rules={[{ required: true, message: "Required State Province Code" }]}
                            initialValue={data?.ShipToStateProvinceCode}
                        >
                            <Input placeholder="Enter State Province Code" />
                        </Form.Item>
                    </div>

                    <div className="label24">
                        <span className="headingofLabel1">{t("Postal Code")}</span>
                        <span className="dotofShip">:</span>
                        <Form.Item
                            name="ShipToPostalCode"
                            className="select1"
                            rules={[{ required: true, message: "Required Postal Code" }]}
                            initialValue={data?.ShipToPostalCode}
                        >
                            <Input placeholder="Enter Postal Code" />
                        </Form.Item>
                    </div>

                    <div className="label24">
                        <span className="headingofLabel1">{t("Country Code")}</span>
                        <span className="dotofShip">:</span>
                        <Form.Item
                            name="ShipToCountryCode"
                            className="select1"
                            rules={[{ required: true, message: "Required Country Code" }]}
                            initialValue={data?.ShipToCountryCode}
                        >
                            <Input placeholder="Enter Country Code" />
                        </Form.Item>
                    </div>
                </div>
            </Card>
        </Col>
    )
};

export default QuoteShipTo;
