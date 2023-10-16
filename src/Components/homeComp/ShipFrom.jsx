import { Button, Card, Col, Form, Input, Row } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { addressValidation } from "../../redux/createSlice/AddressValidation";

const ShipFrom = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const validationConfirm = (values) => {
    dispatch(addressValidation(values));
  };
  return (
    <>
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
            <h6>SHIP FROM</h6>
          </Col>
          <Button type="primary" style={{ position: "absolute", right: "2%" }}>
            Clear All
          </Button>
        </Row>

        <Form form={form} onFinish={validationConfirm} className="login-form">
          <div className="label24">
            <span className="headingofLabel1">Consignee Name</span>
            <span className="dotofShip">:</span>
            <Form.Item
              name="ConsigneeName"
              className="select1"
              rules={[{ required: true, message: "Required Consignee Name" }]}
            >
              <Input placeholder="Enter Consignee Name" />
            </Form.Item>
          </div>
          <div className="label24">
            <span className="headingofLabel1">Address</span>
            <span className="dotofShip">:</span>
            <Form.Item
              name="AddressLine"
              className="select1"
              rules={[{ required: true, message: "Required Address" }]}
            >
              <Input placeholder="Enter Address" />
            </Form.Item>
          </div>
          <div className="label24">
            <span className="headingofLabel1">Building Name</span>
            <span className="dotofShip">:</span>
            <Form.Item
              name="BuildingName"
              className="select1"
              rules={[{ required: true, message: "Required Building Name" }]}
            >
              <Input placeholder="Enter Building Name" />
            </Form.Item>
          </div>
          <div className="label24">
            <span className="headingofLabel1">Urbanization</span>
            <span className="dotofShip">:</span>
            <Form.Item
              name="Urbanization"
              className="select1"
              rules={[{ required: true, message: "Required Urbanization" }]}
            >
              <Input placeholder="Enter urbanization" />
            </Form.Item>
          </div>
          <Row>
            <Col md={11} xs={24} className="shipPadding">
              <div className="label">
                <span className="headingofLabel1">Region</span>
                <span className="dotofShip">:</span>
                <Form.Item
                  name="Region"
                  className="select1"
                  rules={[{ required: true, message: "Required Region" }]}
                >
                  <Input placeholder="Enter Region Name" />
                </Form.Item>
              </div>
            </Col>
           
            <Col md={2} className="shipPadding"></Col>
           
            <Col md={11} xs={24} className="shipPadding">
              <div className="label">
                <span className="headingofLabel1">Country</span>
                <span className="dotofShip">:</span>
                <Form.Item
                  name="CountryCode"
                  className="select1"
                  rules={[{ required: true, message: "Required Country" }]}
                >
                  <Input placeholder="Enter Country Name" />
                </Form.Item>
              </div>
            </Col>

            <Col md={11} xs={24} className="shipPadding">
              <div className="label">
                <span className="headingofLabel1">Political Division 1</span>
                <span className="dotofShip">:</span>
                <Form.Item
                  name="PoliticalDivision1"
                  className="select1"
                  rules={[{ required: true, message: "Required Pol Div 1" }]}
                >
                  <Input placeholder="Enter Political Div 1" />
                </Form.Item>
              </div>
            </Col>
            
            <Col md={2} className="shipPadding"></Col>
            
            <Col md={11} xs={24} className="shipPadding">
              <div className="label">
                <span className="headingofLabel1">Political Division 2</span>
                <span className="dotofShip">:</span>
                <Form.Item
                  name="PoliticalDivision2"
                  className="select1"
                  rules={[{ required: true, message: "Required Pol Div 2" }]}
                >
                  <Input placeholder=" Enter Political Div 2" />
                </Form.Item>
              </div>
            </Col>
            
            <Col md={11} xs={24} className="shipPadding">
              <div className="label">
                <span className="headingofLabel1">Postal Code Primary low</span>
                <span className="dotofShip">:</span>
                <Form.Item
                  name="PostcodePrimaryLow"
                  className="select1"
                  rules={[{ required: true, message: "Required Postal Prim " }]}
                >
                  <Input placeholder="Enter  Post Code Primary" />
                </Form.Item>
              </div>
            </Col>
           
            <Col md={2} className="shipPadding"></Col>
            
            <Col
              md={11}
              xs={24}
              className="shipPadding"
              style={{ marginBottom: "3%" }}
            >
              <div className="label">
                <span className="headingofLabel1">
                  Postal Code Extended Low
                </span>

                <span className="dotofShip">:</span>
                <Form.Item
                  name="PostcodeExtendedLow"
                  className="select1"
                  rules={[{ required: true, message: "Required Postal Ext" }]}
                >
                  <Input placeholder="Enter Post Code Extended" />
                </Form.Item>
              </div>
            </Col>
          </Row>

          <div className="btnsValidate">
            <Form.Item
              name="remember"
              className="btnValidate"
              valuePropName="checked"
              initialValue={true}
            >
              <Button type="primary" htmlType="submit">
                Validate
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Card>
    </>
  );
};

export default ShipFrom;
