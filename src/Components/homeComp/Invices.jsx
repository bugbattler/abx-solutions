import React from "react";
import { useState } from "react";
import { DatePicker, Divider, Table } from "antd";
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  theme,
  Card,
  Layout,
} from "antd";
const { Content } = Layout;
const { Option } = Select;
const { RangePicker } = DatePicker;

const columns = [
  {
    title: "Id",
    dataIndex: "id",
  },
  {
    title: "Date",
    dataIndex: "date",
  },
  {
    title: "Age",
    dataIndex: "age",
  },
  {
    title: "Currrency",
    dataIndex: "currency",
  },
  {
    title: "Invoice Amount",
    dataIndex: "invoice",
  },
  {
    title: "Total Credit",
    dataIndex: "totalcredit",
  },
  {
    title: "Balance Due",
    dataIndex: "balance",
  },
  {
    title: "Print",
    dataIndex: "print",
    render: (text, record) => (
      <Button type="primary" onClick={() => console.log(record)}>
        {"Detail Summary"}
      </Button>
    ),
  },
];
const data = [
  {
    key: "1",
    id: "1491078",
    Date: "6 Feb,2023",
    age: 12,
    currency: "CAD",
    invoice: "$1,824,45",
    totalcredit: "$0.00",
    balance: "$1824,45",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
  },
  {
    key: "4",
    name: "Disabled User",
    age: 99,
    address: "Sydney No. 1 Lake Park",
  },
];
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === "Disabled User",
    // Column configuration not to be checked
    name: record.name,
  }),
};

const Invices = () => {
  const [selectionType, setSelectionType] = useState("checkbox");
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState("inline");
  const onFormLayoutChange = ({ layout }) => {
    setFormLayout(layout);
  };
  const formItemLayout =
    formLayout === "horizontal"
      ? {
          labelCol: {
            span: 4,
          },
          wrapperCol: {
            span: 14,
          },
        }
      : null;
  const buttonItemLayout =
    formLayout === "horizontal"
      ? {
          wrapperCol: {
            span: 14,
            offset: 4,
          },
        }
      : null;
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
            boxShadow:
              "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
          }}
        >
          <Row className="box1">
            <Col span={24}>
              <h6>PAY INVOICES</h6>
            </Col>
          </Row>
          <div className="Table">
            <Table
              rowSelection={{
                type: selectionType,
                ...rowSelection,
              }}
              columns={columns}
              dataSource={data}
              scroll={{ x: true }}
              responsive={true}
            />
          </div>
        </Card>
      </Content>
    </div>
  );
};

export default Invices;
