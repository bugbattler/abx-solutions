import React, { useEffect, useState } from 'react';
import { Button, Card, Col, DatePicker, Form, Input, Layout, Modal, Pagination, Row, Space, Spin, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllsavedQuoatations } from '../../redux/createSlice/getSavedQuotations';
import { RemoveQuotation } from '../../redux/createSlice/removeQuotation';
import { GetSingleQuotation } from '../../redux/createSlice/SingleQuotation';
import { toast } from 'react-toastify';
const { Content } = Layout;
const { Search } = Input;
const { RangePicker } = DatePicker;

const SavedQuotations = () => {
  const [loading, setLoading] = useState(true);
  const data1 = useSelector((state) => state.getQuotations?.getQuotations?.data);
  const data2 = useSelector((state) => state.getQuotations);
  const data3 = useSelector((state) => state.getQuotations?.getQuotations);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [total1, setTotal1] = useState(data3?.count);
  const [currentPage, setCurrentPage] = useState(1);
  const [datepara, setDatepara] = useState("");
  const [datepara1, setDatepara2] = useState("");

  const pageSize = 10;

  const [selectedRange, setSelectedRange] = useState([]);

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
      getAllsavedQuoatations({ pageNo: currentPage, limit: pageSize, fromDate: datepara, toDate: datepara1 })
    );
    await setTotal1(data?.payload?.data.length);
    console.log(total1, data?.payload?.data.length, 50);
    setSelectedRange(dates);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const [hasNextPageData, setHasNextPageData] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const data = await dispatch(
        getAllsavedQuoatations({ pageNo: currentPage, limit: pageSize, fromDate: datepara, toDate: datepara1 })
      );
      if (data1?.length === 0) {
        setHasNextPageData(false);
      } else {
        setHasNextPageData(true);
      }
    };
    fetchData();
  }, [currentPage, total1, dispatch, pageSize, datepara, datepara1]);



  useEffect(() => {
    setLoading(data2.loading)
  }, [data2]);

  const handleViewDetails = (record) => {
    navigate(`/quotation/getSingle/${record.quotation_id}`);
  }


  const [shipmentId, setShipmentId] = useState(0);
  const [modalVisible1, setModalVisible1] = useState(false);
  const handleRemoveQuote = async () => {
    const result = await dispatch(RemoveQuotation(shipmentId));
    const res1 = await dispatch(getAllsavedQuoatations({ pageNo: currentPage, limit: pageSize }));
    setModalVisible1(false);
  }
  const handleRemoveQuotation = (record) => {
    setModalVisible1(true);
    setShipmentId(record.quotation_id);
  }

  const [id, setSearchTerm] = useState("");
  const onSearch = (value) => {
    setSearchTerm(value);
  };


  const [dataSingle, setDataSingle] = useState(data1);
  const filter = async () => {
    if (id) {
      const results = await dispatch(GetSingleQuotation(id))
      if (results?.payload?.data.length > 0) {
        setTotal1(results?.payload?.data.length);
        setDataSingle(results?.payload?.data);
      } else {
        toast.error("No Quotation Found With Given Id");
        setDataSingle([]);
      }
    } else if (id === "") {
      setTotal1(data3?.count);
      setDataSingle(data1)
    }
  }
  useEffect(() => {
    filter();
  }, [id, data1, dispatch, total1])
  const columns = [
    {
      title: 'Sr. No.',
      dataIndex: 'serialNumber',
      render: (_, __, index) => (index + 1),
    },
    // {
    //   title: 'ID',
    //   dataIndex: 'id',
    //   key: 'id',
    // },
    {
      title: 'Quotation Id',
      dataIndex: 'quotation_id',
      key: 'quotation_id',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date) => {
        const dateObj = new Date(date);
        const formattedDate = dateObj.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });

        const formattedTime = dateObj.toLocaleString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        });

        return `${formattedDate} ${formattedTime}`;
      },
    },
    {
      title: 'Shipper Name',
      dataIndex: 'ShipperName',
      key: 'ShipperName',
    },
    {
      title: 'Shipper Phone Number',
      dataIndex: 'ShipperPhoneNumber',
      key: 'ShipperPhoneNumber',
    },
    {
      title: 'Ship From Address',
      dataIndex: 'shipFromAddress',
      key: 'shipFromAddress',
      render: (text, record) => {
        const { ShipFromAddressLine1, ShipFromAddressLine2, ShipFromAddressLine3, ShipFromCity, ShipFromStateProvinceCode, ShipFromPostalCode, ShipFromCountryCode } = record;

        const addressLines = [ShipFromAddressLine1, ShipFromAddressLine2, ShipFromAddressLine3]
          .filter((line) => !!line)
          .join(', ');

        const cityStatePostal = [ShipFromCity, ShipFromStateProvinceCode, ShipFromPostalCode]
          .filter((item) => !!item)
          .join(', ');

        const country = ShipFromCountryCode || '';

        return [addressLines, cityStatePostal, country].filter(Boolean).join(', ');
      },
    },
    {
      title: 'Ship To Address',
      dataIndex: 'shipToAddress',
      key: 'shipToAddress',
      render: (text, record) => {
        const { ShipToAddressLine1, ShipToAddressLine2, ShipToAddressLine3, ShipToCity, ShipToStateProvinceCode, ShipToPostalCode, ShipToCountryCode } = record;

        const addressLines = [ShipToAddressLine1, ShipToAddressLine2, ShipToAddressLine3]
          .filter((line) => !!line)
          .join(', ');

        const cityStatePostal = [ShipToCity, ShipToStateProvinceCode, ShipToPostalCode]
          .filter((item) => !!item)
          .join(', ');

        const country = ShipToCountryCode || '';

        return [addressLines, cityStatePostal, country].filter(Boolean).join(', ');
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button type="primary" ghost onClick={() => handleViewDetails(record)}>
            View
          </Button>
          <Button type='primary' danger ghost onClick={() => handleRemoveQuotation(record)}>
            Delete
          </Button>
        </Space>
      ),
      width: 200,
    },
  ]

  return (
    <>
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
          style={{ padding: "3%", display: "flex", flexDirection: "column", width: "100%" }}
        >
          <Row
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%"
            }}
          ><Col md={24} xs={24}>
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
                <h2>YOUR SAVED QUOTATIONS LIST :</h2>
                <Row>
                  <Col md={8} xs={24}>
                    <div className="responsive-search-container">
                      <Search
                        placeholder="Enter Quotation ID"
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
                  <Space direction="vertical" className="bodyOfSpin" >
                    <Space>
                      <Spin tip="Loading" size="large">
                        <div className="content12" />
                      </Spin>
                    </Space>
                  </Space >
                ) : (
                  <>    <Table
                    rowSelection={undefined}
                    dataSource={dataSingle}
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
                    /></>)}
              </Card>
            </Col>
          </Row>
        </Content>
      </div>
      <Modal
        title="Cancel Shipment"
        visible={modalVisible1}
        onOk={handleRemoveQuote}
        onCancel={() => {
          setModalVisible1(false)
        }}
      >
        <p>Are you sure you want to delete quotation?</p>
      </Modal>
    </>
  )
}

export default SavedQuotations;
