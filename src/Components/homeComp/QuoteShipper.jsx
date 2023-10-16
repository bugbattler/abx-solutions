import { Button, Card, Col, Input, Row, Form } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next';
const QuoteShipper = () => {
    const { t } = useTranslation()
    return (
        <Col md={24} xs={24} className="trackBox shippingBox1">
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
                        <h6>{t("SHIPPER DETAILS")}</h6>
                    </Col>
                    <Button type="primary" style={{ position: "absolute", right: "2%" }}>
                        {t("Clear All")}
                    </Button>
                </Row>


                <Row className="login-form">
                    <Col md={11} xs={24}>
                        <div className="label24">
                            <span className="headingofLabel1">{t("Name")}</span>
                            <span className="dotofShip">:</span>
                            <Form.Item
                                name="ShipperName"
                                className="select1"
                                rules={[{ required: true, message: "Required Name" }]}
                            >
                                <Input placeholder="Enter Name of the Shipper" />
                            </Form.Item>
                        </div>
                    </Col>
                    <Col md={1}></Col>
                    <Col md={11} xs={24}>
                        <div className="label24">
                            <span className="headingofLabel1">{t("Number")}</span>
                            <span className="dotofShip">:</span>
                            <Form.Item
                                name="ShipperNumber"
                                className="select1"
                                rules={[{ required: true, message: "Required Number" }]}
                            >
                                <Input placeholder="Enter Number" />
                            </Form.Item>
                        </div>
                    </Col>
                    <Col md={11} xs={24}>
                        <div className="label24">
                            <span className="headingofLabel1">{t("Address 1")}</span>
                            <span className="dotofShip">:</span>
                            <Form.Item
                                name="ShipperAddressLine1"
                                className="select1"
                                rules={[{ required: true, message: "Required Address 1" }]}
                            >
                                <Input placeholder="Enter Address 1" />
                            </Form.Item>
                        </div>
                    </Col>
                    <Col md={1}></Col>
                    <Col md={11} xs={24}>
                        <div className="label24">
                            <span className="headingofLabel1">{t("Address 2")}</span>
                            <span className="dotofShip">:</span>
                            <Form.Item
                                name="ShipperAddressLine2"
                                className="select1"
                            >
                                <Input placeholder="Enter Address 2" />
                            </Form.Item>
                        </div>
                    </Col>
                    <Col md={11} xs={24}>
                        <div className="label24">
                            <span className="headingofLabel1">{t("City")}</span>
                            <span className="dotofShip">:</span>
                            <Form.Item
                                name="ShipperCity"
                                className="select1"
                                rules={[{ required: true, message: "Required City" }]}
                            >
                                <Input placeholder="Enter City" />
                            </Form.Item>
                        </div>

                    </Col>
                    <Col md={1}></Col>
                    <Col md={11} xs={24}>
                        <div className="label24">
                            <span className="headingofLabel1">{t("State Province Code")}</span>
                            <span className="dotofShip">:</span>
                            <Form.Item
                                name="ShipperStateProvinceCode"
                                className="select1"
                                rules={[{ required: true, message: "Required State Province Code" }]}
                            >
                                <Input placeholder="Enter State Province Code" />
                            </Form.Item>
                        </div>
                    </Col>
                    <Col md={11} xs={24}>
                        <div className="label24">
                            <span className="headingofLabel1">{t("Postal Code")}</span>
                            <span className="dotofShip">:</span>
                            <Form.Item
                                name="ShipperPostalCode"
                                className="select1"
                                rules={[{ required: true, message: "Required Postal Code" }]}
                            >
                                <Input placeholder="Enter Postal Code" />
                            </Form.Item>
                        </div>
                    </Col>
                    <Col md={1}></Col>
                    <Col md={11} xs={24}>
                        <div className="label24">
                            <span className="headingofLabel1">{t("Country Code")}</span>
                            <span className="dotofShip">:</span>
                            <Form.Item
                                name="ShipperCountryCode"
                                className="select1"
                                rules={[{ required: true, message: "Required Country Code" }]}
                            >
                                <Input placeholder="Enter Country Code" />
                            </Form.Item>
                        </div>
                    </Col>
                </Row>

            </Card>
        </Col>
    )
}

export default QuoteShipper
