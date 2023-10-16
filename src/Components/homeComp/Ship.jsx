import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Layout, Modal, Pagination, Row, Space, Spin, Table, Input, DatePicker } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getAllShips } from '../../redux/createSlice/GetShips';
import { useNavigate } from 'react-router-dom';
import { CancelShipment } from '../../redux/createSlice/CancelShipMent';
import OrderTimeLine from './OrderTimeLine';
import { AudioOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { GetSingleShip } from '../../redux/createSlice/GetSingleShip';
import { getAllShipsConfirmed } from '../../redux/createSlice/ConfirmedShips';
const { Content } = Layout;
const { Search } = Input;
const { RangePicker } = DatePicker;
import { useTranslation } from 'react-i18next';
const Ship = () => {
  const { t } = useTranslation()
  const data1 = useSelector((state) => state.getShipConfirm?.getShip?.data);
  console.log(data1);
  const data2 = useSelector((state) => state.getShipConfirm);
  console.log(data2);
  const data3 = useSelector((state) => state.getShipConfirm?.getShip);
  console.log(data3);
  const [datepara, setDatepara] = useState("");
  const [datepara1, setDatepara2] = useState("");
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [total1, setTotal1] = useState(data3?.total_count);
  const handleDateChange = async (dates) => {
    console.log('Selected Range:', dates);
    const date1 = dates[0].toLocaleString();
    const date2 = dates[1].toLocaleString();
    const date = new Date(date1);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day} 00:00:00.00`;
    const date3 = new Date(date2);
    const year2 = date3.getFullYear();
    const month2 = String(date3.getMonth() + 1).padStart(2, '0');
    const day2 = String(date3.getDate()).padStart(2, '0');
    const formattedDate2 = `${year2}-${month2}-${day2} 00:00:00.00`;
    setDatepara(formattedDate);
    setDatepara2(formattedDate2);
    console.log(formattedDate, formattedDate2);
    const data = await dispatch(
      getAllShips({ pageNo: currentPage, limit: pageSize, fromDate: datepara, toDate: datepara1 })
    );
    await setTotal1(data?.payload?.data.length);
    console.log(total1, data?.payload?.data.length, 50);
    setSelectedRange(dates);
  };


  console.log(datepara, datepara1, 42);
  const pageSize = 10;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const [hasNextPageData, setHasNextPageData] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await dispatch(
        getAllShipsConfirmed({ pageNo: currentPage, limit: pageSize, fromDate: datepara, toDate: datepara1 })
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
    setLoading(data2.loading)
  }, [data2]);
  const navigate = useNavigate();
  const handleViewDetails = (record) => {
    navigate(`/ship/singleShip/${record.ship_id}`);
  }
  const [shipmentId, setShipmentId] = useState(0);
  const [modalVisible1, setModalVisible1] = useState(false);
  const handleCancelShip = () => {
    dispatch(CancelShipment(shipmentId));
    getAllShips({ pageNo: currentPage, limit: pageSize })
    setModalVisible1(false);
  }
  const handleCancelShipment = (record) => {
    setModalVisible1(true);
    setShipmentId(record.ship_id);
  }


  const [visible, setVisible] = useState(false);
  const [shipment_id, setShipment_id] = useState("");
  const showModal = (record) => {
    setShipment_id(record.ship_id)
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const [searchTerm, setSearchTerm] = useState("");

  const [filteredData, setFilteredData] = useState(data1);

  const onSearch = (value) => {
    setSearchTerm(value);
  };

  const filt = async () => {
    if (searchTerm) {
      const results = await dispatch(GetSingleShip({ transId: searchTerm }));
      if (results?.payload?.data.length > 0) {
        setTotal1(results?.payload?.data.length)
        setFilteredData(results?.payload?.data);
      } else {
        toast.error("No Shipment Found with Given Transaction Id");
        setFilteredData([]);
      }
    } else if (searchTerm === "") {
      setTotal1(data3?.total_count);
      setFilteredData(data1)
    }
  }
  useEffect(() => {
    filt();
  }, [searchTerm, data1, total1])

  const currentDate = new Date();
  const columns = [
    {
      title: `${t('Sr. No.')}`,
      dataIndex: 'serialNumber',
      render: (_, __, index) => (index + 1),
    },
    {
      title: `${t('Transaction Id')}`,
      dataIndex: 'transId',
      key: 'transId',
      render: (transId) => transId || 'N/A',
    },
    {
      title: `${t('Status')}`,
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: `${t('Ship From(Name)')}`,
      dataIndex: 'ShipFromName',
      key: 'ShipFromName',
    },
    {
      title: `${t('Ship From(Address)')}`,
      dataIndex: 'ShipFromAddressLine1',
      key: 'ShipFromAddressLine1',
    },
    {
      title: `${t('Ship To(Name)')}`,
      dataIndex: 'ShipToName',
      key: 'ShipToName',
    },
    {
      title: `${t('Ship To(Address)')}`,
      dataIndex: 'ShipToAddressLine1',
      key: 'ShipToAddressLine1',
    },
    {
      title: `${t('Date-Time')}`,
      dataIndex: 'date',
      key: 'date',
      render: (date) => {
        const formattedDate = new Date(date).toLocaleDateString('en-US', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        });
        const formattedTime = new Date(date).toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        });
        return `${formattedDate}, ${formattedTime}`;
      }
    },
    {
      title: `${t('Total Charges')}`,
      dataIndex: 'TotalCharges',
      key: 'totalCharges',
      render: (value, record) => {
        const totalCurrencyCode = record?.TotalCurrencyCode || '';
        const totalCharges = parseFloat(value);
        return `${totalCharges} ${totalCurrencyCode}`;
      },
    },
    {
      title: `${t('Actions')}`,
      key: 'actions',
      render: (_, record) => {
        const givenDate = new Date(record.date);
        const differenceInHours = Math.abs(currentDate - givenDate) / 36e5;

        return (
          <Space>
            <Button
              type="primary"
              ghost
              onClick={() => handleViewDetails(record)}
            >
              {t("View")}
            </Button>
            {differenceInHours <= 48 ? (
              <Button
                type="primary"
                danger
                ghost
                onClick={() => handleCancelShipment(record)}
              >
                {t("Cancel")}
              </Button>
            ) : (
              <Button type="primary" disabled>
                {t("Cancel")}
              </Button>
            )}
            <Button type="primary" onClick={() => showModal(record)}>
              {t("Track")}
            </Button>
          </Space>
        );
      },
      width: 200,
    },
  ];
  return (
    <>
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
          title={t("Tracking")}
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
          centered
        >
          <OrderTimeLine ship_id={shipment_id} />
        </Modal>
        <Modal
          title={t("Cancel Shipment")}
          visible={modalVisible1}
          onOk={handleCancelShip}
          onCancel={() => {
            setModalVisible1(false)
          }}
        >
          <p>{t("Are you sure you want to cancel shipment?")}</p>
        </Modal>
        <Content
          className="contentBox"
          style={{ padding: "3%", display: "flex", flexDirection: "column", width: "100%" }}
        >
          <Row
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%"
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
                  padding: "1%"
                }}
              >
                <h2>{t("MY SHIPMENT LIST")} :</h2>
                <Row>
                  <Col md={8} xs={24}>
                    <div className="responsive-search-container">
                      <Search
                        placeholder="Enter Transaction ID"
                        onSearch={onSearch}
                        enterButton
                      />
                    </div>
                  </Col>
                  <Col md={8}></Col>
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
                ) : (<>
                  <Table
                    rowSelection={undefined}
                    dataSource={filteredData}
                    columns={columns}
                    scroll={{ x: true }}
                    responsive={true}
                    pagination={false}
                  />
                  <Pagination
                    style={{ marginTop: '10px', textAlign: 'center' }}
                    current={currentPage}
                    pageSize={pageSize}
                    total={total1}
                    onChange={handlePageChange}
                    responsive={true}
                  /></>)}
              </Card>
            </Col>
          </Row>
        </Content>
      </div>
    </>
  )
}

export default Ship;