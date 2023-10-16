import {
  Button,
  Card,
  Col,
  Layout,
  Modal,
  Row,
  Space,
  Spin,
  Table,
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetSingleShip } from "../../redux/createSlice/GetSingleShip";
import { useNavigate, useParams } from "react-router-dom";
import { confirmOrderThunk } from "../../redux/createSlice/ConfirmOrder";
import { Transaction } from "../../redux/createSlice/Transaction";
import { getUserInfo } from "../../redux/createSlice/getSingleUser";
import { toast } from "react-toastify";
import { RemoveQuotation } from "../../redux/createSlice/removeQuotation";
const { Content } = Layout;
import { useTranslation } from 'react-i18next';

const SingleOrder = () => {
  const { t } = useTranslation()

  const { ship_id } = useParams();
  const dataOfSingleorder = useSelector((state) => state.singleShip);
  const data = useSelector((state) => state.singleShip?.getSingleShip?.data[0]);
  const data1a = useSelector((state) => state.singleShip?.getSingleShip?.data);
  console.log(dataOfSingleorder, data, data1a);
  const [data2a, setData2a] = useState(null);
  const [confirmClick, setConfirmClick] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  useEffect(() => {
    if (data1a?.length > 1) {
      setData2a(data1a);
    } else {
      setData2a([data]);
    }
  }, [data, data1a]);
  const data1 = useSelector((state) => state.singleShip);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetSingleShip({ ship_id }));
  }, [ship_id]);
  useEffect(() => {
    setLoading(data1.loading);
  }, [data1]);
  const columns = [
    {
      title: `${t("Sr. No.")}`,
      dataIndex: "serialNumber",
      render: (_, __, index) => index + 1,
    },
    {
      title: `${t("Packaging Type Code")}`,
      dataIndex: "PackagingTypeCode",
      key: "PackagingTypeCode",
    },
    {
      title: `${t("Packaging Type Description")}`,
      dataIndex: "PackagingTypeDescription",
      key: "PackagingTypeDescription",
    },
    {
      title: `${t("Length")}`,
      dataIndex: "PackagLength",
      key: "PackagLength",
      render: (value, record) => {
        const totalCurrencyCode = record?.PackagTypeDimensionUnitCode || "";
        const totalCharges = parseFloat(value);
        return `${totalCharges} ${totalCurrencyCode}`;
      },
    },
    {
      title: `${t("Height")}`,
      dataIndex: "PackagHeight",
      key: "PackagHeight",
      render: (value, record) => {
        const totalCurrencyCode = record?.PackagTypeDimensionUnitCode || "";
        const totalCharges = parseFloat(value);
        return `${totalCharges} ${totalCurrencyCode}`;
      },
    },
    {
      title: `${t("Width")}`,
      dataIndex: "PackagWidth",
      key: "PackagWidth",
      render: (value, record) => {
        const totalCurrencyCode = record?.PackagTypeDimensionUnitCode || "";
        const totalCharges = parseFloat(value);
        return `${totalCharges} ${totalCurrencyCode}`;
      },
    },
    {
      title: `${t("Weight")}`,
      dataIndex: "PackageWeight",
      key: "PackageWeight",
      render: (value, record) => {
        const totalCurrencyCode = record?.PackageWeightUnitCode || "";
        const totalCharges = parseFloat(value);
        return `${totalCharges} ${totalCurrencyCode}`;
      },
    },
  ];


  const dataSource = [
    {
      key: "1",
      billingWeight: `${data?.BillingWeight} ${data?.BillingWeightUnitOfMgmt}`,
      selectedService: `${data?.ServiceDescription}(${data?.ServiceCode})`,
      serviceOptionCharges: `${data?.ServiceOptionsCharges} ${data?.ServiceOptionsCurrencyCode}`,
      transportationCharges: `${data?.TransportationCharges} ${data?.TransportationCurrencyCode}`,
      totalCharges: `${data?.TotalCharges} ${data?.TotalCurrencyCode}`,
    },
  ];

  const columns1 = [
    {
      title: `${t("Billing Weight")}`,
      dataIndex: "billingWeight",
      key: "billingWeight",
    },
    {
      title: `${t("Selected Service")}`,
      dataIndex: "selectedService",
      key: "selectedService",
    },
    {
      title: `${t("Service option Charges")}`,
      dataIndex: "serviceOptionCharges",
      key: "serviceOptionCharges",
    },
    {
      title: `${t("Transporatation Charges")}`,
      dataIndex: "transportationCharges",
      key: "transportationCharges",
    },
    {
      title: `${t("Total Charges")}`,
      dataIndex: "totalCharges",
      key: "totalCharges",
    },
  ];

  console.log(data, 82);
  const [visible, setVisible] = useState(false);

  const handleOk = () => {
    navigate("/ship");
    setVisible(false);
  };

  const handleOk1 = () => {
    ConfirmOrder();
    setConfirmModal(false);
  };
  const handleOk2 = () => {
    deleteOrder();
    setDeleteModal(false);
  };
  const handleCancel = () => {
    setVisible(false);
  };

  const handleCancel1 = () => {
    setConfirmModal(false);
  };

  const handleCancel2 = () => {
    setDeleteModal(false);
  };

  const user = useSelector((state) => state.getUser?.getUser?.data[0]);
  useEffect(() => {
    dispatch(getUserInfo());
  }, []);
  console.log(user, 146);

  const navigate = useNavigate();
  const editOrder = async () => {
    const id = data?.ship_id;
    await navigate(`/generate-order/${id}`);
  };

  const ConfirmOrder = async () => {
    setConfirmClick(true);
    if (user?.balance > data?.TotalCharges) {
      const response = await dispatch(confirmOrderThunk({ id: ship_id }));
      if (response?.payload?.success === true) {
        await dispatch(
          Transaction({ amount: data?.TotalCharges, ship_id: ship_id })
        );
        await dispatch(getUserInfo());
        setVisible(true);
      }
    } else {
      toast.error("Please top up your wallet!");
    }
    setConfirmClick(false);
  };

  const deleteOrder = async () => {
    setConfirmClick(true);
    const id = data?.ship_id;
    console.log(id);
    const response = await dispatch(RemoveQuotation({ id }));
    if (response?.payload?.success === true) {
      navigate("/orders");
    }
    setConfirmClick(false);
  };



  return (
    <>
      {confirmClick && (
        <Space direction="vertical">
          <div className="loader-overlay">
            <Spin tip="Loading" size="large"></Spin>
          </div>
        </Space>
      )}
      <Modal
        title="PLEASE NOTE DOWN SHIPMENTIDENTIFICATION NO"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
      >
        <div className="shipdetailsfinal">
          <h4>SHIPMENT IDENTIFICATION NO.</h4>
          <h4>: {data?.ShipmentIdentificationNumber}</h4>
        </div>
        <div className="shipdetailsfinal">
          <h4>TOTAL CHARGES(Including All)</h4>
          <h4>: {dataSource[0]?.totalCharges}</h4>
        </div>
      </Modal>
      <Modal
        title="SHIP ORDER"
        visible={confirmModal}
        onOk={handleOk1}
        onCancel={handleCancel1}
        centered
      >
        <p>Are You Sure You want to Ship Order?...</p>
      </Modal>
      <Modal
        title="DELETE ORDER"
        visible={deleteModal}
        onOk={handleOk2}
        onCancel={handleCancel2}
        centered
      >
        <p>Are You Sure You want to Delete Order?...</p>
      </Modal>
      {loading ? (
        <Space direction="vertical" className="bodyOfSpin">
          <Space>
            <Spin tip="Loading" size="large">
              <div className="content12" />
            </Spin>
          </Space>
        </Space>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            backgroundColor: "rgb(242 244 255)",
          }}
        >
          <Content
            className="contentBox"
            style={{
              padding: "3%",
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <Row
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Col md={24} xs={24}>
                <Card
                  bordered={false}
                  style={{
                    width: "100%",
                    borderRadius: "1px",
                    boxShadow:
                      "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
                    padding: "1%",
                  }}
                >
                  <>
                    {" "}
                    <h3>{t("SHIPPER DETAILS")}:</h3>
                    <Row style={{ width: "100%" }}>
                      <Col md={12} xs={24} className="ProfileContent">
                        <h4 className="heading2">{t("Name")}</h4>
                        <h4>: {data?.ShipperName}</h4>
                      </Col>
                      <Col md={12} xs={24} className="ProfileContent">
                        <h4 className="heading2">{t("Number")}</h4>
                        <h4>: {data?.ShipperNumber}</h4>
                      </Col>
                      <Col md={12} xs={24} className="ProfileContent">
                        <h4 className="heading2">{t("Phone Number")}</h4>
                        <h4>: {data?.ShipperPhoneNumber}</h4>
                      </Col>
                      <Col md={12} xs={24} className="ProfileContent">
                        <h4 className="heading2">{t("Attention Name")}</h4>
                        <h4>: {data?.ShipperAttentionName}</h4>
                      </Col>
                      <Col md={12} xs={24} className="ProfileContent">
                        <h4 className="heading2">{t("Address")}</h4>
                        <h4>
                          : {data?.ShipperAddressLine1}{" "}
                          {data?.ShipperAddressLine2}{" "}
                          {data?.ShipperAddressLine3}{" "}
                        </h4>
                      </Col>
                      <Col md={12} xs={24} className="ProfileContent">
                        <h4 className="heading2">{t("City")}</h4>
                        <h4>: {data?.ShipperCity}</h4>
                      </Col>
                      <Col md={12} xs={24} className="ProfileContent">
                        <h4 className="heading2">{t("State")}</h4>
                        <h4>: {data?.ShipperStateProvinceCode}</h4>
                      </Col>
                      <Col md={12} xs={24} className="ProfileContent">
                        <h4 className="heading2">{t("Country")}</h4>
                        <h4>: {data?.ShipperCountryCode}</h4>
                      </Col>
                      <Col md={12} xs={24} className="ProfileContent">
                        <h4 className="heading2">{t("Postal Code")}</h4>
                        <h4>: {data?.ShipperPostalCode}</h4>
                      </Col>
                    </Row>
                  </>
                </Card>
              </Col>
              <Col md={24} xs={24}>
                <Card
                  bordered={false}
                  style={{
                    width: "100%",
                    borderRadius: "1px",
                    boxShadow:
                      "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
                    padding: "1%",
                  }}
                >
                  <>
                    <h3>{t("SHIP FROM")}:</h3>
                    <Row style={{ width: "100%" }}>
                      <Col md={12} xs={24} className="ProfileContent">
                        <h4 className="heading2">{t("Name")}</h4>
                        <h4>: {data?.ShipFromName}</h4>
                      </Col>
                      <Col md={12} xs={24} className="ProfileContent">
                        <h4 className="heading2">{t("Phone Number")}</h4>
                        <h4>: {data?.ShipFromPhoneNumber}</h4>
                      </Col>
                      <Col md={12} xs={24} className="ProfileContent">
                        <h4 className="heading2">{t("Attention Name")}</h4>
                        <h4>: {data?.ShipFromAttentionName}</h4>
                      </Col>
                      <Col md={12} xs={24} className="ProfileContent">
                        <h4 className="heading2">{t("Address")}</h4>
                        <h4>
                          : {data?.ShipFromAddressLine1}{" "}
                          {data?.ShipFromAddressLine2}{" "}
                          {data?.ShipFromAddressLine3}
                        </h4>
                      </Col>
                      <Col md={12} xs={24} className="ProfileContent">
                        <h4 className="heading2">{t("City")}</h4>
                        <h4>: {data?.ShipFromCity}</h4>
                      </Col>
                      <Col md={12} xs={24} className="ProfileContent">
                        <h4 className="heading2">{t("State")}</h4>
                        <h4>: {data?.ShipFromStateProvinceCode}</h4>
                      </Col>
                      <Col md={12} xs={24} className="ProfileContent">
                        <h4 className="heading2">{t("Country")}</h4>
                        <h4>: {data?.ShipFromCountryCode}</h4>
                      </Col>
                      <Col md={12} xs={24} className="ProfileContent">
                        <h4 className="heading2">{t("Postal Code")}</h4>
                        <h4>: {data?.ShipFromPostalCode}</h4>
                      </Col>
                    </Row>
                  </>
                </Card>
              </Col>
              <Col md={24} xs={24}>
                <Card
                  bordered={false}
                  style={{
                    width: "100%",
                    borderRadius: "1px",
                    boxShadow:
                      "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
                    padding: "1%",
                  }}
                >
                  <>
                    <h3>{t("SHIP TO")}:</h3>
                    <Row style={{ width: "100%" }}>
                      <Col md={12} xs={24} className="ProfileContent">
                        <h4 className="heading2">{t("Name")}</h4>
                        <h4>: {data?.ShipToName}</h4>
                      </Col>
                      <Col md={12} xs={24} className="ProfileContent">
                        <h4 className="heading2">{t("Phone Number")}</h4>
                        <h4>: {data?.ShipToPhoneNumber}</h4>
                      </Col>
                      <Col md={12} xs={24} className="ProfileContent">
                        <h4 className="heading2">{t("Attention Name")}</h4>
                        <h4>: {data?.ShipToAttentionName}</h4>
                      </Col>
                      <Col md={12} xs={24} className="ProfileContent">
                        <h4 className="heading2">{t("Address")}</h4>
                        <h4>
                          : {data?.ShipToAddressLine1}{" "}
                          {data?.ShipToAddressLine2} {data?.ShipToAddressLine3}
                        </h4>
                      </Col>
                      <Col md={12} xs={24} className="ProfileContent">
                        <h4 className="heading2">{t("City")}</h4>
                        <h4>: {data?.ShipToCity}</h4>
                      </Col>
                      <Col md={12} xs={24} className="ProfileContent">
                        <h4 className="heading2">{t("State")}</h4>
                        <h4>: {data?.ShipToStateProvinceCode}</h4>
                      </Col>
                      <Col md={12} xs={24} className="ProfileContent">
                        <h4 className="heading2">{t("Country")}</h4>
                        <h4>: {data?.ShipToCountryCode}</h4>
                      </Col>
                      <Col md={12} xs={24} className="ProfileContent">
                        <h4 className="heading2">{t("Postal Code")}</h4>
                        <h4>: {data?.ShipToPostalCode}</h4>
                      </Col>
                    </Row>
                  </>
                </Card>
              </Col>
              <Col md={24} xs={24}>
                <Card
                  bordered={false}
                  style={{
                    width: "100%",
                    borderRadius: "1px",
                    boxShadow:
                      "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
                    padding: "1%",
                  }}
                >
                  <>
                    <h3>{t("SHIPMENT DETAILS")}:</h3>
                    <h3>{t("Packaging Type & Dimensions")}:</h3>
                    <Table
                      rowSelection={undefined}
                      dataSource={data2a}
                      columns={columns}
                      scroll={{ x: true }}
                      responsive={true}
                      pagination={false}
                    />
                  </>
                </Card>
              </Col>
              <Col md={24} xs={24}>
                <Card
                  bordered={false}
                  style={{
                    width: "100%",
                    borderRadius: "1px",
                    boxShadow:
                      "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
                    padding: "1%",
                  }}
                >
                  <>
                    <Table
                      rowSelection={undefined}
                      dataSource={dataSource}
                      columns={columns1}
                      scroll={{ x: true }}
                      responsive={true}
                      pagination={false}
                    />
                  </>

                  <div className="btnsValidate">
                    <Button
                      type="primary"
                      onClick={editOrder}
                      style={{ marginRight: "20px" }}
                    >
                      {t("EDIT ORDER")}
                    </Button>
                    <Button
                      type="primary"
                      onClick={() => {
                        setConfirmModal(true);
                      }}
                      style={{ marginRight: "20px" }}
                    >
                      {t("SHIP ORDER")}
                    </Button>
                    <Button
                      type="primary"
                      danger
                      ghost
                      onClick={() => {
                        setDeleteModal(true);
                      }}
                    >
                      {t("DELETE ORDER")}
                    </Button>
                  </div>
                </Card>
              </Col>
            </Row>
          </Content>
        </div>
      )}
    </>
  );
};
export default SingleOrder;
