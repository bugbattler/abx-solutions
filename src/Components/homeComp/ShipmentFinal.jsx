import { Button, Card, Col, Modal, Row, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Transaction } from "../../redux/createSlice/Transaction";
import { confirmOrderThunk } from "../../redux/createSlice/ConfirmOrder";
import { getAllShips } from "../../redux/createSlice/GetShips";
import { getUserInfo } from "../../redux/createSlice/getSingleUser";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid"; // Import the UUID library
import { makeShipment1 } from "../../redux/createSlice/makeShipment";

const ShipmentFinal = React.memo(
  ({
    ShipFromAttentionName,
    ShipFromPhoneNumber,
    ShipFromName,
    ShipFromAddressLine1,
    ShipFromCity,
    ShipFromStateProvinceCode,
    ShipFromPostalCode,
    ShipFromCountryCode,
    ShipToAttentionName,
    ShipToPhoneNumber,
    ShipToName,
    ShipToAddressLine1,
    ShipToCity,
    ShipToStateProvinceCode,
    ShipToPostalCode,
    ShipToCountryCode,
    ShipMentType,
    serviceSelected,
    serviceCode,
    spinner,
    spinnerStop,
    savedQuoteData,
  }) => {
    const shipment = useSelector((state) => state.shipment?.shipment);
    const getQuoteData = useSelector(
      (state) => state.getQuote?.getQuotations?.data
    );
    const shipment1 =
      shipment?.data?.shipment?.ShipmentResponse?.ShipmentResults;
    const shipIdforConfirm = shipment?.data?.ship_id;
    const alert = shipment?.data?.shipment?.ShipmentResponse?.Response?.Alert;
    const graphicImage = shipment1?.PackageResults?.ShippingLabel?.GraphicImage;
    const imageSrc = `data:image/gif;base64,${graphicImage}`;
    const [showDownloadButton, setShowDownloadButton] = useState(false);
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);
    const [visible1, setVisible1] = useState(false);
    const [visibleInvoice, setVisibleInvoice] = useState(false);
    const [image, setImage] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [expandedRowKey, setExpandedRowKey] = useState(null);
    const [visibleSaveQuote, setVisibleSaveQuote] = useState(false);

    const quoteData = useSelector(
      (state) => state.getQuote?.getQuotations?.data
    );

    useEffect(() => {
      if (shipment1?.PackageResults?.length > 1) {
        const arr = [];
        shipment1?.PackageResults?.forEach((element) => {
          arr.push(element?.ShippingLabel?.GraphicImage);
        });
        setImage(arr);
        const updatedTableData = shipment1?.PackageResults.map((item) => ({
          ...item,
          key: uuidv4(),
        }));
        setTableData(updatedTableData);
      }
    }, [shipment1]);

    const handleExpand = (record) => {
      if (expandedRowKey === record.key) {
        setExpandedRowKey(null);
      } else {
        setExpandedRowKey(record.key);
      }
    };

    const dataSource = [
      {
        key: "1",
        billingWeight: `${shipment1?.BillingWeight?.Weight} ${shipment1?.BillingWeight?.UnitOfMeasurement?.Code}`,
        serviceOptionCharges: `${shipment1?.ShipmentCharges?.ServiceOptionsCharges?.MonetaryValue} ${shipment1?.ShipmentCharges?.ServiceOptionsCharges?.CurrencyCode}`,
        transportationCharges: `${shipment1?.ShipmentCharges?.TransportationCharges?.MonetaryValue} ${shipment1?.ShipmentCharges?.TransportationCharges?.CurrencyCode}`,
        totalCharges: `${shipment1?.ShipmentCharges?.TotalCharges?.MonetaryValue} ${shipment1?.ShipmentCharges?.TotalCharges?.CurrencyCode}`,
      },
    ];

    const columns = [
      {
        title: "BILLNG WEIGHT",
        dataIndex: "billingWeight",
        key: "billingWeight",
      },
      {
        title: "SERVICE OPTION CHARGES",
        dataIndex: "serviceOptionCharges",
        key: "serviceOptionCharges",
      },
      {
        title: "TRANSPORATION CHARGES",
        dataIndex: "transportationCharges",
        key: "transportationCharges",
      },
      {
        title: "TOTAL CHARGES",
        dataIndex: "totalCharges",
        key: "totalCharges",
      },
    ];

    const column2 = [
      {
        title: "BILLNG WEIGHT",
        dataIndex: "billingWeight",
        render: (_, record, index) => (
          <>
            {record?.billingWeight} {record?.billingWeightUnit}
          </>
        ),
      },
      {
        title: "Total Charges",
        dataIndex: "billingWeight",
        render: (_, record, index) => <>{record?.totalCharges} CAD</>,
      },
    ];

    const columns1 = [
      {
        title: "Sr. No.",
        dataIndex: "serialNumber",
        render: (_, __, index) => <>{index + 1}</>,
      },
      {
        title: "Tracking No",
        dataIndex: "TrackingNumber",
        key: "TrackingNumber",
      },
      {
        title: "Actions",
        dataIndex: "actions",
        render: (_, record, index) => (
          <div>
            <Button
              onClick={() =>
                handleDownload1(record?.ShippingLabel?.GraphicImage)
              }
            >
              DOWNLOD
            </Button>
            <Button
              style={{ marginLeft: "2%" }}
              onClick={() =>
                handlePrintImage1(record?.ShippingLabel?.GraphicImage)
              }
            >
              PRINT
            </Button>
          </div>
        ),
      },
    ];

    const handleDownload1 = async (imageData) => {
      spinner();
      const link = await document.createElement("a");
      link.href = `data:image/gif;base64,${imageData}`;
      link.download = `INVOICE_${shipment1?.ShipmentIdentificationNumber}.jpg`;
      link.click();
      spinnerStop();
    };

    const handlePrintImage1 = async (imageData) => {
      const printWindow = await window.open("", "_blank");
      await printWindow.document.write(
        "<html><head><title>Print Image</title></head><body>"
      );
      await printWindow.document.write(
        `<img src="data:image/gif;base64,${imageData}" style="max-width: 100%;  transform: rotate(90deg); margin-top:0rem; height:100vh" />`
      );
      await printWindow.document.write("</body></html>");
      await printWindow.document.close();
      await printWindow.print();
    };

    const handleDownload = () => {
      spinner();
      const link = document.createElement("a");
      link.href = imageSrc;
      link.download = `INVOICE_${shipment1?.ShipmentIdentificationNumber}.jpg`;
      link.click();
      spinnerStop();
    };

    const handlePrintImage = async () => {
      const printWindow = await window.open("", "_blank");
      await printWindow.document.write(
        "<html><head><title>Print Image</title></head><body>"
      );
      await printWindow.document.write(
        `<img src=${imageSrc} style="max-width: 100%;" />`
      );
      await printWindow.document.write("</body></html>");
      await printWindow.document.close();
      await printWindow.print();
    };

    const dispatch = useDispatch();
    const user = useSelector((state) => state.getUser?.getUser?.data[0]);

    useEffect(() => {
      dispatch(getUserInfo());
    }, []);

    const confirmorder = async () => {
      setVisibleInvoice(false);
      spinner();
      const TotalCharges = await getQuoteData?.totalCharges;
      if ((await user?.balance) > TotalCharges) {
        const res = await dispatch(makeShipment1(savedQuoteData));
        console.log(res, "207");
        if (res?.payload?.status === 200) {
          const response = await dispatch(
            confirmOrderThunk({ id: shipIdforConfirm })
          );
          if (response?.payload?.success === true) {
            await dispatch(
              Transaction({ amount: TotalCharges, ship_id: shipIdforConfirm })
            );
            await dispatch(getUserInfo());
            setVisibleInvoice(true);
            setVisible(true);
          }
        }
      } else {
        toast.error("Please top up your wallet!");
      }
      spinnerStop();
    };

    const handleOk = () => {
      setVisible(false);
      shipment1?.PackageResults?.length > 1
        ? toast.success(
            "You can download your invoices on clicking on download button"
          )
        : handleDownload();
    };
    const handleOk1 = () => {
      setVisible1(false);
      confirmorder();
    };

    const handleCancel = () => {
      setVisible(false);
    };

    const handleCancel1 = () => {
      setVisible1(false);
    };

    const handleCancelSaveQuote = () => {
      setVisibleSaveQuote(false);
    };

    const handleOkSaveQuote = async () => {
      spinner();
      const res = await dispatch(makeShipment1(savedQuoteData));
      if (res?.payload?.status === 200) {
        toast.success("Shipment Added to cart");
        navigate("/orders");
      }
      setVisibleSaveQuote(false);
      spinnerStop();
    };
    return (
      <div>
        <Modal
          title="SHIP ORDER"
          visible={visible1}
          onOk={handleOk1}
          onCancel={handleCancel1}
          centered
        >
          <p>Are you sure You want to confirm order?</p>
        </Modal>
        <Modal
          title="PLEASE NOTE DOWN SHIPMENTIDENTIFICATION NO"
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
          centered
        >
          <div className="shipdetailsfinal">
            <h4>SHIPMENT IDENTIFICATION NO.</h4>
            <h4>: {shipment1?.ShipmentIdentificationNumber}</h4>
          </div>
          <div className="shipdetailsfinal">
            <h4>TOTAL CHARGES(Including All)</h4>
            <h4>: {getQuoteData?.totalCharges} CAD</h4>
          </div>
        </Modal>
        <Modal
          title="DO YOU WANT TO ADD TO CART?"
          visible={visibleSaveQuote}
          onOk={handleOkSaveQuote}
          onCancel={handleCancelSaveQuote}
          centered
        ></Modal>
        <Card
          bordered={false}
          style={{
            width: "100%",
            borderRadius: "1px",
            boxShadow:
              "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
          }}
        >
          {/* <Row className="box1" justify="center">
                    <Col span={24}>
                        <h6>YOU HAVE DONE SHIPMENT...PLEASE NOTE DOWN BELOW DETAILS...</h6>
                    </Col>
                </Row> */}
          <h4 className="Shipbill">ORDER DETAILS FOR THE CHOOSEN SERVICE</h4>
          <div>
            <Row className="box1" gutter={[16, 16]}>
              <Col md={12} xs={24}>
                <h4>SHIP FROM:</h4>
                <div className="lineShipFrom">
                  <p>{ShipFromAttentionName}</p>
                  <p>{ShipFromPhoneNumber}</p>
                  <p>{ShipFromName}</p>
                  <p>{ShipFromAddressLine1}</p>
                  <h4>
                    {ShipFromCity} {ShipFromStateProvinceCode}{" "}
                    {ShipFromPostalCode} {ShipFromCountryCode}
                  </h4>
                </div>
                <br />
                <h4>SHIP TO:</h4>
                <div className="lineShipFrom">
                  <p>{ShipToAttentionName}</p>
                  <p>{ShipToPhoneNumber}</p>
                  <p>{ShipToName}</p>
                  <p>{ShipToAddressLine1}</p>
                  <h4>
                    {ShipToCity} {ShipToStateProvinceCode} {ShipToPostalCode}{" "}
                    {ShipToCountryCode}
                  </h4>
                </div>
              </Col>
              <Col md={12} xs={24}>
                {/* <div className="shipdetailsfinal">
                                <h4>Tracking No</h4>
                                <h5>: {shipment1?.PackageResults?.TrackingNumber}</h5>
                            </div>
                            <div className="shipdetailsfinal">
                                <h4>SHIP ID.#</h4>
                                <h4>: {shipment1?.ShipmentIdentificationNumber}</h4>
                            </div> */}
                <div className="shipdetailsfinal">
                  <h4>SHIPMENT TYPE</h4>
                  <h4>: {ShipMentType ? ShipMentType : "NA"}</h4>
                </div>
                <div className="shipdetailsfinal">
                  <h4>SHIPMENT WEIGHT</h4>
                  {/* <h4>: {shipment1?.BillingWeight?.Weight} {shipment1?.BillingWeight?.UnitOfMeasurement?.Code}</h4> */}
                  <h4>
                    : {getQuoteData?.billingWeight}{" "}
                    {getQuoteData?.billingWeightUnit}
                  </h4>
                </div>
                <div className="shipdetailsfinal">
                  <h4>SERVICE SELECTED</h4>
                  <h4>
                    : {serviceSelected}({serviceCode})
                  </h4>
                </div>
              </Col>
            </Row>
          </div>
          <div>
            <Row className="box1" gutter={[16, 16]}>
              <Col md={24} xs={24}>
                <Table
                  rowSelection={undefined}
                  columns={column2}
                  dataSource={[getQuoteData]}
                  scroll={{ x: true }}
                  responsive={true}
                  pagination={false}
                />

                <div className="btnsValidate">
                  <Button onClick={() => setVisibleSaveQuote(true)}>
                    SAVE QUOTATION
                  </Button>
                  <Button
                    style={{ marginLeft: "2%" }}
                    type="primary"
                    onClick={() => setVisible1(true)}
                  >
                    SHIP ORDER
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        </Card>
        {visibleInvoice &&
          (shipment1?.PackageResults?.length > 1 ? (
            <Card
              bordered={false}
              style={{
                width: "100%",
                borderRadius: "1px",
                boxShadow:
                  "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
              }}
            >
              {" "}
              <Row className="box1" gutter={[16, 16]}>
                <Col md={24} xs={24}>
                  <Table
                    columns={columns1}
                    expandable={{
                      expandedRowRender: (record, index) => (
                        <Card
                          bordered={false}
                          style={{
                            width: "100%",
                            borderRadius: "1px",
                            boxShadow:
                              "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
                            padding: "4%",
                          }}
                          className="trackBox12"
                        >
                          <div className="track">
                            <Row className="box2ForImages" gutter={[16, 16]}>
                              <Col md={24} xs={24}>
                                <div className="shipdetailsfinal11">
                                  <img
                                    className="TrackImage"
                                    src={`data:image/gif;base64,${record?.ShippingLabel?.GraphicImage}`}
                                    alt=""
                                    onMouseEnter={() =>
                                      setShowDownloadButton(true)
                                    }
                                  />
                                </div>
                              </Col>
                            </Row>
                          </div>
                        </Card>
                      ),
                      rowExpandable: (record) =>
                        record.name !== "Not Expandable",
                      expandedRowKeys: [expandedRowKey],
                      onExpand: (_, record) => handleExpand(record),
                    }}
                    dataSource={tableData}
                    scroll={{ x: true }}
                    responsive={true}
                    pagination={false}
                  />
                </Col>
              </Row>
            </Card>
          ) : (
            <Card
              bordered={false}
              style={{
                width: "100%",
                borderRadius: "1px",
                boxShadow:
                  "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
              }}
              className="trackBox12"
            >
              <div className="downloadButton">
                <Button onClick={handleDownload}>DOWNLOD</Button>
                <Button style={{ marginLeft: "2%" }} onClick={handlePrintImage}>
                  PRINT
                </Button>
              </div>
              <div className="track">
                <Row className="box1" gutter={[16, 16]}>
                  <Col md={24} xs={24}>
                    <div className="shipdetailsfinal11">
                      <img
                        className="TrackImage"
                        src={imageSrc}
                        alt=""
                        onMouseEnter={() => setShowDownloadButton(true)}
                      />
                    </div>
                  </Col>
                </Row>
              </div>
            </Card>
          ))}
      </div>
    );
  }
);
export default ShipmentFinal;
