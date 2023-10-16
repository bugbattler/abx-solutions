import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Layout,
  Modal,
  Pagination,
  Row,
  Space,
  Spin,
  Table,
  Input,
  DatePicker,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllShips } from "../../redux/createSlice/GetShips";
import { useNavigate } from "react-router-dom";
import { CancelShipment } from "../../redux/createSlice/CancelShipMent";
import OrderTimeLine from "./OrderTimeLine";
import { AudioOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { GetSingleShip } from "../../redux/createSlice/GetSingleShip";
import { confirmOrderThunk } from "../../redux/createSlice/ConfirmOrder";
import { getUserInfo } from "../../redux/createSlice/getSingleUser";
import { Transaction } from "../../redux/createSlice/Transaction";
import { RemoveQuotation } from "../../redux/createSlice/removeQuotation";
const { Content } = Layout;
const { Search } = Input;
const { RangePicker } = DatePicker;
import { useTranslation } from 'react-i18next';
const Cart = () => {
  const { t } = useTranslation()
  const data1 = useSelector((state) => state.getShip?.getShip?.data);
  const data2 = useSelector((state) => state.getShip);
  const data3 = useSelector((state) => state.getShip?.getShip);
  const [datepara, setDatepara] = useState("");
  const [datepara1, setDatepara2] = useState("");
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [total1, setTotal1] = useState(data3?.total_count);
  const [confirmClick, setConfirmClick] = useState(false);
  const handleDateChange = async (dates) => {
    const date1 = dates[0].toLocaleString();
    const date2 = dates[1].toLocaleString();
    const date = new Date(date1);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day} 00:00:00.00`;
    const date3 = new Date(date2);
    const year2 = date3.getFullYear();
    const month2 = String(date3.getMonth() + 1).padStart(2, "0");
    const day2 = String(date3.getDate()).padStart(2, "0");
    const formattedDate2 = `${year2}-${month2}-${day2} 00:00:00.00`;
    setDatepara(formattedDate);
    setDatepara2(formattedDate2);
    const data = await dispatch(
      getAllShips({
        pageNo: currentPage,
        limit: pageSize,
        fromDate: datepara,
        toDate: datepara1,
      })
    );
    await setTotal1(data?.payload?.data.length);
    setSelectedRange(dates);
  };

  const pageSize = 10;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const [hasNextPageData, setHasNextPageData] = useState(true);
  const [confirmModal, setConfirmModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [confirmrecord, setConfirmrecord] = useState(null);
  const [deleteRecord, setDeleteRecord] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await dispatch(
        getAllShips({
          pageNo: currentPage,
          limit: pageSize,
          fromDate: datepara,
          toDate: datepara1,
        })
      );
      setTotal1(data3?.total_count);
      if (data1?.length === 0) {
        setHasNextPageData(false);
      } else {
        setHasNextPageData(true);
      }
    };
    fetchData();
  }, [currentPage, dispatch, pageSize, datepara, datepara1]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(data2.loading);
  }, [data2]);
  const navigate = useNavigate();
  const handleViewDetails = (record) => {
    setConfirmClick(true);
    navigate(`/order/singleOrder/${record.ship_id}`);
    setConfirmClick(false);
  };
  const [shipmentId, setShipmentId] = useState(0);
  const [modalVisible1, setModalVisible1] = useState(false);
  const handleCancelShip = () => {
    dispatch(CancelShipment(shipmentId));
    getAllShips({ pageNo: currentPage, limit: pageSize });
    setModalVisible1(false);
  };

  const handleCancelShipment = async (record) => {
    setModalVisible1(true);
    setShipmentId(record.ship_id);
  };

  const deleteOrder1 = async (record) => {
    setDeleteRecord(record);
    setDeleteModal(true);
  };

  const deleteOrder = async (record) => {
    setConfirmClick(true);
    const id = record?.id;
    const response = await dispatch(RemoveQuotation({ id }));
    if (response?.payload?.success === true) {
      await dispatch(
        getAllShips({
          pageNo: currentPage,
          limit: pageSize,
          fromDate: datepara,
          toDate: datepara1,
        })
      );
    }
    setConfirmClick(false);
  };

  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const [shipment_identification, setShipment_identification] = useState("");
  // const showModal = (record) => {
  //     setShipment_id(record.ship_id)
  //     setVisible(true);
  // };

  const handleOk = () => {
    setVisible(false);
    navigate("/ship");
  };

  const handleOk1 = () => {
    setConfirmModal(false);
    ConfirmOrder(confirmrecord);
  };

  const handleOk2 = () => {
    setDeleteModal(false);
    deleteOrder(deleteRecord);
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

  const [searchTerm, setSearchTerm] = useState("");

  const [filteredData, setFilteredData] = useState(data1);
  const [totalCharges, setTotalCharges] = useState(null);
  const [totalChargesunit, setTotalChargesunit] = useState(null);

  const onSearch = (value) => {
    setSearchTerm(value);
  };

  const currentDate = new Date();
  const user = useSelector((state) => state.getUser?.getUser?.data[0]);
  useEffect(() => {
    dispatch(getUserInfo());
  }, []);
  const ConfirmOrder1 = async (record) => {
    setConfirmrecord(record);
    setConfirmModal(true);
  };
  const ConfirmOrder = async (record) => {
    setConfirmClick(true);
    if (user?.balance > record.TotalCharges) {
      const response = await dispatch(confirmOrderThunk({ id: record?.id }));
      setShipment_identification(record?.ShipmentIdentificationNumber);
      setTotalCharges(record?.TotalCharges);
      setTotalChargesunit(record?.TotalCurrencyCode);
      if (response?.payload?.success === true) {
        await dispatch(
          Transaction({ amount: record?.TotalCharges, ship_id: record?.id })
        );
        await dispatch(getUserInfo());
        await dispatch(
          getAllShips({
            pageNo: currentPage,
            limit: pageSize,
            fromDate: datepara,
            toDate: datepara1,
          })
        );
        setTimeout(() => {
          setVisible(true);
        }, 1000);
      }
    } else {
      toast.error("Please top up your wallet!");
    }
    setConfirmClick(false);
  };

  const columns = [
    {
      title: `${t("Sr. No.")}`,
      dataIndex: "serialNumber",
      render: (_, __, index) => index + 1,
    },
    {
      title: `${t("Ship From(Name)")}`,
      dataIndex: "ShipFromName",
      key: "ShipFromName",
    },
    {
      title: `${t("Ship From(Address)")}`,
      dataIndex: "ShipFromAddressLine1",
      key: `ShipFromAddressLine1`,
    },
    {
      title: `${t("Ship To(Name)")}`,
      dataIndex: "ShipToName",
      key: `ShipToName`,
    },
    {
      title: `${t("Ship To(Address)")}`,
      dataIndex: "ShipperAddressLine1",
      key: `ShipperAddressLine1`,
    },
    {
      title: `${t("Date-Time")}`,
      dataIndex: "date",
      key: "date",
      render: (date) => {
        const formattedDate = new Date(date).toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
        });
        const formattedTime = new Date(date).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });
        return `${formattedDate}, ${formattedTime}`;
      },
    },
    {
      title: `${t("Total Charges(Including All Charges)")}`,
      dataIndex: "TotalCharges",
      key: "totalCharges",
      render: (value, record) => {
        const totalCurrencyCode = record?.TotalCurrencyCode || "";
        const totalCharges = parseFloat(value);
        return `${totalCharges} ${totalCurrencyCode}`;
      },
    },

    {
      title: `${t("Action")}`,
      key: "actions",
      render: (_, record) => {
        const givenDate = new Date(record.date);
        const differenceInHours = Math.abs(currentDate - givenDate) / 36e5;
        return (
          <Space>
            <Button type="primary" onClick={() => ConfirmOrder1(record)}>
              {t("SHIP ORDER")}
            </Button>
            <Button
              type="primary"
              ghost
              onClick={() => handleViewDetails(record)}
            >
              {t("VIEW")}
            </Button>
            <Button
              type="primary"
              danger
              ghost
              onClick={() => deleteOrder1(record)}
            >
              {t("DELETE")}
            </Button>
          </Space>
        );
      },
      width: 200,
    },
  ];
  return (
    <>
      {confirmClick && (
        <Space direction="vertical">
          <div className="loader-overlay">
            <Spin tip="Loading" size="large"></Spin>
          </div>
        </Space>
      )}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          width: "100%",
          backgroundColor: "rgb(242 244 255)",
        }}
      >
        <Modal
          title="PLEASE NOTE DOWN SHIPMENTIDENTIFICATION NO"
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
          centered
        >
          <div className="shipdetailsfinal">
            <h4>{t("SHIPMENT IDENTIFICATION NO.")}</h4>
            <h4>: {shipment_identification}</h4>
          </div>
          <div className="shipdetailsfinal">
            <h4>{t("TOTAL CHARGES(Including All)")}</h4>
            <h4>
              : {totalCharges} {totalChargesunit}{" "}
            </h4>
          </div>
        </Modal>
        <Modal
          title={t("SHIP ORDER")}
          visible={confirmModal}
          onOk={handleOk1}
          onCancel={handleCancel1}
          centered
        >
          <p>{t("Are you Sure You Want To Ship Order?")}...</p>
        </Modal>
        <Modal
          title={t("DELETE ORDER")}
          visible={deleteModal}
          onOk={handleOk2}
          onCancel={handleCancel2}
          centered
        >
          <p>{t("Are you Sure You Want To Delete Order?")}...</p>
        </Modal>

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
                <h2>{t("ORDERS")} :</h2>
                <Row>
                  {/* <Col md={8} xs={24}>
                                        <div className="responsive-search-container">
                                            <Search
                                                placeholder="Enter Transaction ID"
                                                onSearch={onSearch}
                                                enterButton
                                            />
                                        </div>
                                    </Col>
                                    <Col md={8}></Col> */}
                  <Col md={8} xs={24}>
                    <div className="responsive-search-container">
                      <RangePicker onChange={handleDateChange} />
                    </div>
                  </Col>
                </Row>
                {loading ? (
                  <Space direction="vertical" className="bodyOfSpin">
                    <Space>
                      <Spin tip="Loading" size="large">
                        <div className="content12" />
                      </Spin>
                    </Space>
                  </Space>
                ) : (
                  <>
                    <Table
                      rowSelection={undefined}
                      dataSource={data1}
                      columns={columns}
                      scroll={{ x: true }}
                      responsive={true}
                      pagination={false}
                    />
                    <Pagination
                      style={{ marginTop: "10px", textAlign: "center" }}
                      current={currentPage}
                      pageSize={pageSize}
                      total={total1}
                      onChange={handlePageChange}
                      responsive={true}
                    />
                  </>
                )}
              </Card>
            </Col>
          </Row>
        </Content>
      </div>
    </>
  );
};

export default Cart;
