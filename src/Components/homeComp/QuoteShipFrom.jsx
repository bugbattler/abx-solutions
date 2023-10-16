import { Card, Col, Form, Input, Row } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { GetSingleQuotation } from '../../redux/createSlice/SingleQuotation';
import { useTranslation } from 'react-i18next';
const QuoteShipFrom = ({id}) => {
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
                        <h6>{t("SHIP FROM")}</h6>
                    </Col>

                </Row>

                <div className="login-form">
                    <div className="label24">
                        <span className="headingofLabel1">{t("Name")}</span>
                        <span className="dotofShip">:</span>
                        <Form.Item
                            name="ShipFromName"
                            className="select1"
                            rules={[{ required: true, message: "Required Name" }]}
                            initialValue={data?.ShipFromName}
                        >
                            <Input placeholder="Enter Name"/>
                        </Form.Item>
                    </div>
                    <div className="label24">
                        <span className="headingofLabel1">{t("Attention Name")}</span>
                        <span className="dotofShip">:</span>
                        <Form.Item
                            name="ShipFromAttentionName"
                            className="select1"
                            rules={[{ required: true, message: "Required Attention Name" }]}
                            initialValue={data?.ShipFromAttentionName}
                        >
                            <Input placeholder="Enter Attention Name"/>
                        </Form.Item>
                    </div>
                    <div className="label24">
                        <span className="headingofLabel1">{t("Phone Number")}</span>
                        <span className="dotofShip">:</span>
                        <Form.Item
                            name="ShipFromPhoneNumber"
                            className="select1"
                            rules={[{ required: true, message: "Required Phone Number" }]}
                            initialValue={data?.ShipFromPhoneNumber}
                        >
                            <Input placeholder="Enter Phone Number"/>
                        </Form.Item>
                    </div>
                    <div className="label24">
                        <span className="headingofLabel1">{t("Address 1")}</span>
                        <span className="dotofShip">:</span>
                        <Form.Item
                            name="ShipFromAddressLine1"
                            className="select1"
                            rules={[{ required: true, message: "Required Address 1" }]}
                            initialValue={data?.ShipFromAddressLine1}
                        >
                            <Input placeholder="Enter Address 1"/>
                        </Form.Item>
                    </div>
                    <div className="label24">
                        <span className="headingofLabel1">{t("Address 2")}</span>
                        <span className="dotofShip">:</span>
                        <Form.Item
                            name="ShipFromAddressLine2"
                            className="select1"
                            initialValue={data?.ShipFromAddressLine2}
                        >
                            <Input placeholder="Enter Address 2" />
                        </Form.Item>
                    </div>
                    <div className="label24">
                        <span className="headingofLabel1">{t("Address 3")}</span>
                        <span className="dotofShip">:</span>
                        <Form.Item
                            name="ShipFromAddressLine3"
                            className="select1"
                            initialValue={data?.ShipFromAddressLine3}
                        >
                            <Input placeholder="Enter Address 3" />
                        </Form.Item>
                    </div>
                    <div className="label24">
                        <span className="headingofLabel1">{t("City")}</span>
                        <span className="dotofShip">:</span>
                        <Form.Item
                            name="ShipFromCity"
                            className="select1"
                            rules={[{ required: true, message: "Required City" }]}
                            initialValue={data?.ShipFromCity}
                        >
                            <Input placeholder="Enter City" />
                        </Form.Item>
                    </div>
                    <div className="label24">
                        <span className="headingofLabel1">{t("State Province Code")}</span>
                        <span className="dotofShip">:</span>
                        <Form.Item
                            name="ShipFromStateProvinceCode"
                            className="select1"
                            rules={[{ required: true, message: "Required State Province Code" }]}
                            initialValue={data?.ShipFromStateProvinceCode}
                        >
                            <Input placeholder="Enter State Province Code" />
                        </Form.Item>
                    </div>

                    <div className="label24">
                        <span className="headingofLabel1">{t("Postal Code")}</span>
                        <span className="dotofShip">:</span>
                        <Form.Item
                            name="ShipFromPostalCode"
                            className="select1"
                            rules={[{ required: true, message: "Required Postal Code" }]}
                            initialValue={data?.ShipFromPostalCode}
                        > 
                            <Input placeholder="Enter Postal Code"  />
                        </Form.Item>
                    </div>

                    <div className="label24">
                        <span className="headingofLabel1">{t("Country Code")}</span>
                        <span className="dotofShip">:</span>
                        <Form.Item
                            name="ShipFromCountryCode"
                            className="select1"
                            rules={[{ required: true, message: "Required Country Code" }]}
                            initialValue={data?.ShipFromCountryCode}
                        >
                            <Input placeholder="Enter Country Code"  />
                        </Form.Item>
                    </div>

                </div>

            </Card>
        </Col>

    )
};

export default QuoteShipFrom;
