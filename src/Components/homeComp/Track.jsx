import React from "react";
import { useState } from "react";
import { Breadcrumb, Layout, Col, Row, Card, TimePicker } from "antd";
import {
  Button,
  Cascader,
  Dropdown,
  DatePicker,
  Space,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  Checkbox,
  TreeSelect,
} from "antd";

const { Content } = Layout;
const Track = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  const [componentDisabled, setComponentDisabled] = useState(true);
  const [componentDisabled1, setComponentDisabled1] = useState(true);
  const [componentDisabled2, setComponentDisabled2] = useState(true);
  const { RangePicker } = TimePicker;
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const options = [];
  for (let i = 0; i < 11; i++) {
    options.push({
      value: 5 * i,
      label: 5 * i,
    });
  }
  const handleChange1 = (value) => {
    console.log(`Selected: ${value}`);
  };
  const onMenuClick = (e) => {
    console.log("click", e);
  };
  const items = [
    {
      key: "1",
      label: "1st item",
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        backgroundColor: "rgb(242 244 255)",
      }}
    >
      <Content className="contentBox" style={{ padding: "3%" }}>
        <Card
          bordered={false}
          style={{
            width: "98%",
            borderRadius: "1px",
            boxShadow:
              "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
          }}
        >
          <div className="site-layout-content">
            <Row className="box1">
              <Col span={24}>
                <h6>SEARCH ORDERS</h6>
              </Col>
            </Row>
            <Row>
              <Col md={12} xs={24} className="trackBox">
                <Form
                  className="checkbox"
                  layout="vertical"
                  onFinish={onFinish}
                >
                  <Checkbox
                    className="checkBox"
                    checked={componentDisabled}
                    onChange={(e) => setComponentDisabled(e.target.checked)}
                  >
                    <span>Today's Shipments</span>
                  </Checkbox>
                  <div className="label">
                    <Checkbox
                      className="checkBox"
                      checked={componentDisabled1}
                      onChange={(e) => setComponentDisabled1(e.target.checked)}
                    >
                      <span> Shipments Within Specified Period</span>
                    </Checkbox>
                    <span style={{ width: "5%" }}>:</span>
                    <Space direction="vertical" size={12}>
                      <DatePicker.RangePicker
                        style={{ color: "black", fontWeight: "550" }}
                      />
                    </Space>
                  </div>
                  <br />
                  <div className="label">
                    <span className="headingofLabel1">Status</span>
                    <span className="dotofShip">:</span>
                    <Form.Item
                      name="Status"
                      className="select1"
                      rules={[{ required: true, message: "Required Status" }]}
                    >
                      <Select
                        defaultValue="Canada"
                        className="select"
                        onChange={handleChange}
                        options={[
                          {
                            label: "India",
                            value: "India",
                          },
                          {
                            label: "London",
                            value: "London",
                          },
                        ]}
                      />
                    </Form.Item>
                  </div>
                  <br />
                  <div className="label">
                    <span className="headingofLabel1">
                      Show Cancelled Shipments
                    </span>
                    <span className="dotofShip">:</span>
                    <Form.Item name="Shipments" className="select1">
                      <Checkbox
                        checked={componentDisabled2}
                        onChange={(e) =>
                          setComponentDisabled2(e.target.checked)
                        }
                      ></Checkbox>
                    </Form.Item>
                  </div>
                  <br />

                  <div className="label">
                    <span className="headingofLabel1">Carrier</span>
                    <span className="dotofShip">:</span>
                    <Form.Item
                      name="Carrier"
                      className="select1"
                      rules={[{ required: true, message: "Required Carrier" }]}
                    >
                      <Select
                        defaultValue="Canada"
                        className="select"
                        onChange={handleChange}
                        options={[
                          {
                            label: "Jack",
                            value: "jack",
                          },
                          {
                            label: "Lucy",
                            value: "lucy",
                          },
                        ]}
                      />
                    </Form.Item>
                  </div>
                  <br />
                  <div className="label">
                    <span className="headingofLabel1">Payment Mode</span>
                    <span className="dotofShip">:</span>
                    <Form.Item
                      name="Carrier"
                      className="select1"
                      rules={[{ required: true, message: "Required Carrier" }]}
                    >
                      <Select
                        defaultValue="All"
                        className="select"
                        onChange={handleChange}
                        options={[
                          {
                            label: "UPI",
                            value: "jack",
                          },
                          {
                            label: "Net Banking",
                            value: "lucy",
                          },
                        ]}
                      />
                    </Form.Item>
                  </div>
                  <br />
                  <div className="label">
                    <span className="headingofLabel1">Origin Zip/Postal</span>
                    <span className="dotofShip">:</span>
                    <Form.Item
                      name="Carrier"
                      className="select1"
                      rules={[{ required: true, message: "Required Carrier" }]}
                    >
                      <Input className="select" placeholder="Text" />
                    </Form.Item>
                  </div>
                  <br />
                  <div className="label">
                    <span className="headingofLabel1">Dist'n Zip/Postal</span>
                    <span className="dotofShip">:</span>
                    <Form.Item
                      name="Carrier"
                      className="select1"
                      rules={[{ required: true, message: "Required Carrier" }]}
                    >
                      <Input className="select" placeholder="Text" />
                    </Form.Item>
                  </div>
                  <br />
                  <div className="label">
                    <span className="headingofLabel1">Origin Country</span>
                    <span className="dotofShip">:</span>
                    <Form.Item
                      name="Carrier"
                      className="select1"
                      rules={[{ required: true, message: "Required Carrier" }]}
                    >
                      <Select
                        defaultValue="All"
                        className="select"
                        onChange={handleChange}
                        options={[
                          {
                            label: "India",
                            value: "India",
                          },
                          {
                            label: "Canada",
                            value: "Canada",
                          },
                        ]}
                      />
                    </Form.Item>
                  </div>
                  <br />
                  <div className="label">
                    <span className="headingofLabel1">Distination Country</span>
                    <span className="dotofShip">:</span>
                    <Form.Item
                      name="Carrier"
                      className="select1"
                      rules={[{ required: true, message: "Required Carrier" }]}
                    >
                      <Select
                        defaultValue="All"
                        className="select"
                        onChange={handleChange}
                        options={[
                          {
                            label: "India",
                            value: "India",
                          },
                          {
                            label: "Canada",
                            value: "Canada",
                          },
                        ]}
                      />
                    </Form.Item>
                  </div>
                  <br />
                  <div className="label">
                    <span className="headingofLabel1">Sorted By</span>
                    <span className="dotofShip">:</span>
                    <Form.Item
                      name="Carrier"
                      className="select1"
                      rules={[{ required: true, message: "Required Carrier" }]}
                    >
                      <Select
                        defaultValue="Order"
                        className="select"
                        onChange={handleChange}
                        options={[
                          {
                            label: "Order1",
                            value: "jack",
                          },
                          {
                            label: "Order2",
                            value: "lucy",
                          },
                        ]}
                      />
                    </Form.Item>
                  </div>
                  <br />
                  <div className="label">
                    <span className="headingofLabel1">Order Source</span>
                    <span className="dotofShip">:</span>
                    <Form.Item
                      name="Carrier"
                      className="select1"
                      rules={[{ required: true, message: "Required Carrier" }]}
                    >
                      <Select
                        defaultValue="All"
                        className="select"
                        onChange={handleChange}
                        options={[
                          {
                            label: "Jack",
                            value: "jack",
                          },
                          {
                            label: "Lucy",
                            value: "lucy",
                          },
                        ]}
                      />
                    </Form.Item>
                  </div>
                  <br />
                  <div className="label">
                    <span className="headingofLabel1">Result Per Page</span>
                    <span className="dotofShip">:</span>
                    <Form.Item
                      name="Carrier"
                      className="select1"
                      rules={[{ required: true, message: "Required Carrier" }]}
                    >
                      <Select
                        defaultValue="0"
                        className="select"
                        onChange={handleChange1}
                        options={options}
                      />
                    </Form.Item>
                  </div>
                  <br />
                </Form>
              </Col>

              <Col md={12} xs={24} className="trackBox">
                <div className="left-header">
                  <h3>Shipment Look Up</h3>
                  <br />
                  <div className="label1">
                    <div className="label">
                      <span className="headingofLabel1">Tracking</span>
                      <span className="dotofShip">:</span>
                      <Form.Item
                        name="Carrier"
                        className="select1"
                        rules={[
                          { required: true, message: "Required Carrier" },
                        ]}
                      >
                        <Input className="select" placeholder="Text" />
                      </Form.Item>
                    </div>
                    <br />

                    <div className="label">
                      <span className="headingofLabel1">BOL</span>
                      <span className="dotofShip">:</span>
                      <Form.Item
                        name="Carrier"
                        className="select1"
                        rules={[
                          { required: true, message: "Required Carrier" },
                        ]}
                      >
                        <Input className="select" placeholder="Text" />
                      </Form.Item>
                    </div>
                    <br />

                    <div className="label">
                      <span className="headingofLabel1">Transaction</span>
                      <span className="dotofShip">:</span>
                      <Form.Item
                        name="Carrier"
                        className="select1"
                        rules={[
                          { required: true, message: "Required Carrier" },
                        ]}
                      >
                        <Input className="select" placeholder="Text" />
                      </Form.Item>
                    </div>
                    <br />

                    <div className="label">
                      <span className="headingofLabel1">Carrier</span>
                      <span className="dotofShip">:</span>
                      <Form.Item
                        name="Carrier"
                        className="select1"
                        rules={[
                          { required: true, message: "Required Carrier" },
                        ]}
                      >
                        <Input className="select" placeholder="Text" />
                      </Form.Item>
                    </div>
                    <br />

                    <div className="label">
                      <span className="headingofLabel1">Reference</span>
                      <span className="dotofShip">:</span>
                      <Form.Item
                        name="Carrier"
                        className="select1"
                        rules={[
                          { required: true, message: "Required Carrier" },
                        ]}
                      >
                        <Input className="select" placeholder="Text" />
                      </Form.Item>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md={24} xs={24} className="trackBox1">
                <div className="btnsTrack">
                  <Button className="btnstrack">Reset</Button>
                  <Button type="primary">Submit</Button>
                </div>
              </Col>
            </Row>
          </div>
        </Card>
      </Content>
    </div>
  );
};

export default Track;
