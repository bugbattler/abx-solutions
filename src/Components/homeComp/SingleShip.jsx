import { Button, Card, Col, Layout, Row, Space, Spin, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetSingleShip } from '../../redux/createSlice/GetSingleShip';
import { useParams } from 'react-router-dom';
// import { labelrecoveryThunk } from '../../redux/createSlice/Labelrecovery';
const { Content } = Layout;
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
import { useTranslation } from 'react-i18next';

const SingleShip = () => {
    const { t } = useTranslation()

    const { ship_id } = useParams();
    const data = useSelector((state) => state.singleShip?.getSingleShip?.data[0]);
    console.log(data)
    const data1a = useSelector((state) => state.singleShip?.getSingleShip?.data);
    const [data2a, setData2a] = useState(null);
    const [label, setLabel] = useState(null);

    useEffect(() => {
        if (data1a?.length > 1) {
            setData2a(data1a)
        } else {
            setData2a([data])
        }
    }, [data, data1a])
    const data1 = useSelector((state) => state.singleShip);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(GetSingleShip({ ship_id }))
    }, [ship_id])
    useEffect(() => {
        setLoading(data1.loading)
    }, [data1]);

    // useEffect(() => {
    //     labelRecovery();
    // }, []);

    const [numPages, setNumPages] = useState(null);
    const [pdfBlob, setPdfBlob] = useState(null);

    const [confirmClick, setConfirmClick] = useState(false);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };


    // const labelRecovery = async () => {
    //     setConfirmClick(true);
    //     const response = await dispatch(labelrecoveryThunk({ ship_item_id: ship_id }));
    //     const image = await response?.payload?.data?.LabelRecoveryResponse;
    //     const pdfData = image?.LabelResults?.Receipt?.Image?.GraphicImage;
    //     // Convert base64 to Blob
    //     const byteCharacters = atob(pdfData);
    //     const byteArrays = [];
    //     for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    //         const slice = byteCharacters.slice(offset, offset + 512);
    //         const byteNumbers = new Array(slice.length);
    //         for (let i = 0; i < slice.length; i++) {
    //             byteNumbers[i] = slice.charCodeAt(i);
    //         }
    //         const byteArray = new Uint8Array(byteNumbers);
    //         byteArrays.push(byteArray);
    //     }
    //     const blob = new Blob(byteArrays, { type: 'application/pdf' });
    //     setPdfBlob(blob);
    //     setConfirmClick(false);
    // };

    const handleDownload = () => {

        const pdfURL = URL.createObjectURL(pdfBlob);

        // Create a temporary link element and trigger the download
        const link = document.createElement('a');
        link.href = pdfURL;
        link.download = `INVOICE_${data?.PackageResultsTrackingNumber}.pdf`;
        link.click();

        // Clean up by revoking the URL
        URL.revokeObjectURL(pdfURL);
    };



    const handlePrintImage = async () => {
        const pdfURL = URL.createObjectURL(pdfBlob);

        // Create a new window to show the PDF content for printing
        const printWindow = window.open(pdfURL);
        if (printWindow) {
            printWindow.onload = () => {
                printWindow.print();
                // Clean up by revoking the URL
                URL.revokeObjectURL(pdfURL);
            };
        }
    };

    const columns = [
        {
            title: `${t('Sr. No.')}`,
            dataIndex: 'serialNumber',
            render: (_, __, index) => (index + 1),
        },
        {
            title: `${t('Packaging Type Code')}`,
            dataIndex: 'PackagingTypeCode',
            key: 'PackagingTypeCode',       
        },
        {
            title: `${t('Packaging Type Description')}`,
            dataIndex: 'PackagingTypeDescription',
            key: 'PackagingTypeDescription',
        },
        {
            title: `${t('Length')}`,
            dataIndex: 'PackagLength',
            key: 'PackagLength',
            render: (value, record) => {
                const totalCurrencyCode = record.PackagTypeDimensionUnitCode || '';
                const totalCharges = parseFloat(value);
                return `${totalCharges} ${totalCurrencyCode}`;
            },
        },
        {
            title: `${t('Height')}`,
            dataIndex: 'PackagHeight',
            key: 'PackagHeight',
            render: (value, record) => {
                const totalCurrencyCode = record.PackagTypeDimensionUnitCode || '';
                const totalCharges = parseFloat(value);
                return `${totalCharges} ${totalCurrencyCode}`;
            },
        },
        {
            title: `${t('Width')}`,
            dataIndex: 'PackagWidth',
            key: 'PackagWidth',
            render: (value, record) => {
                const totalCurrencyCode = record.PackagTypeDimensionUnitCode || '';
                const totalCharges = parseFloat(value);
                return `${totalCharges} ${totalCurrencyCode}`;
            },
        },
        {
            title: `${t('Weight')}`,
            dataIndex: 'PackageWeight',
            key: 'PackageWeight',
            render: (value, record) => {
                const totalCurrencyCode = record.PackageWeightUnitCode || '';
                const totalCharges = parseFloat(value);
                return `${totalCharges} ${totalCurrencyCode}`;
            },
        },
        {
            title: `${t('Actions')}`,
            dataIndex: 'actions',
            render: (_, record, index) => (
                <div>
                    <Button onClick={() => handleDownload1(record.packageLabel)}>
                        {t("DOWNLOD INVOICE")}
                    </Button>
                    <Button style={{ marginTop: "2%" }} onClick={() => handlePrintImage1(record?.packageLabel)}>
                        {t("PRINT INVOICE")}
                    </Button>
                </div>
            ),
        },
    ];

    const handleDownload1 = async (imageData) => {
        console.log(`https://abxsolutions.ca/api/public/${imageData}`, "Hii")
        const link = await document.createElement("a");
        link.href = `https://abxsolutions.ca/api/public/${imageData}`;
        link.download = `INVOICE_${imageData}`;
        link.click();
    };

    const handlePrintImage1 = (imageData) => {
        console.log(`${imageData}`);
        const invoiceUrl = `https://abxsolutions.ca/api/public/${imageData}`;

        const printWindow = window.open("", "_blank");

        printWindow.document.write("<html><head><title>Print Image</title></head><body>");
        printWindow.document.write(
            `<img id="print-image" src="${invoiceUrl}" style="max-width: 100%; transform: rotate(90deg); max-height: 100%; margin-top: 40%" />`
        );
        printWindow.document.write("</body></html>");

        const printImage = printWindow.document.getElementById("print-image");

        printImage.onload = () => {
            // The image has fully loaded, so we can now print the window
            printWindow.print();
            printWindow.close();
        };
    };


    const columns1 = [
        {
            title: `${t('Sr. No.')}`,
            dataIndex: 'serialNumber',
            render: (_, __, index) => {
                const indexofTable = index === 1 ? "UPDATED" : index + 1;
                return `${indexofTable}`
            },
        },
        {
            title: `${t('Transaction Id')}`,
            dataIndex: 'transId',
            key: 'transId',
            render: (value, record, index) => {
                const transactionId = index === 1 ? "" : value;
                return `${transactionId}`
            },
        },
        {
            title: `${t('Billing Weight')}`,
            dataIndex: 'BillingWeight',
            key: 'BillingWeight',
            render: (value, record, index) => {
                console.log(index, record?.billed_weight);
                const billingWeightunit = record.BillingWeightUnitOfMgmt || 'NA';
                const billingWeight = parseFloat(value);
                const displayValue = index === 1 ? parseFloat(record.billed_weight) : billingWeight;
                return `${displayValue} ${billingWeightunit}`;
            },
        },
        {
            title: `${t('Date-Time')}`,
            dataIndex: 'date',
            key: 'date',
            render: (date, value, index) => {
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
                console.log(index)
                if (index === 1) {
                    return "";
                } else {
                    return `${formattedDate}, ${formattedTime}`;
                }
            }
        },
        {
            title: `${t('Service Code')}`,
            dataIndex: 'ServiceCode',
            key: 'ServiceCode',
            render: (value, record, index) => {
                const serviceCode = index === 1 ? "" : value;
                return `${serviceCode}`
            }
        },
        {
            title: `${t('Service Description')}`,
            dataIndex: 'ServiceDescription',
            key: 'ServiceDescription',
            render: (value, record, index) => {
                const serviceDesc = index === 1 ? "" : value;
                return `${serviceDesc}`
            }
        },
        {
            title: `${t('Package Results Service Options Charges')}`,
            dataIndex: 'PackageResultsServiceOptionsCharges',
            key: 'PackageResultsServiceOptionsCharges',
            render: (value, record, index) => {
                const totalCurrencyCode = record.PackageResultsServiceOptionsCurrencyCode || '';
                const totalCharges = parseFloat(value);
                if (index === 1) {
                    return "";
                } else {
                    return `${totalCharges} ${totalCurrencyCode}`;
                }
            },
        },
        {
            title: `${t('Package Results Tracking No')}`,
            dataIndex: 'PackageResultsTrackingNumber',
            key: 'PackageResultsTrackingNumber',
            render: (value, record, index) => {
                const PackageResultsTrackingNumber = index === 1 ? "" : value;
                return `${PackageResultsTrackingNumber}`
            }
        },
        {
            title: `${t('Service Charges')}`,
            dataIndex: 'ServiceOptionsCharges',
            key: 'ServiceOptionsCharges',
            render: (value, record, index) => {
                const totalCurrencyCode = record.ServiceOptionsCurrencyCode || '';
                const totalCharges = parseFloat(value);
                if (index === 1) {
                    return "";
                } else {
                    return `${totalCharges} ${totalCurrencyCode}`;
                }
            },
        },
        {
            title: `${t('Transportaion Charges')}`,
            dataIndex: 'TransportationCharges',
            key: 'TransportationCharges',
            render: (value, record, index) => {
                const totalCurrencyCode = record.TransportationCurrencyCode || '';
                const totalCharges = parseFloat(value);
                if (index === 1) {
                    return "";
                } else {
                    return `${totalCharges} ${totalCurrencyCode}`;
                }
            },
        },
        {
            title: `${t('Total Charges')}`,
            dataIndex: 'TotalCharges',
            key: 'totalCharges',
            render: (value, record, index) => {
                const totalCurrencyCode = record.TotalCurrencyCode || '';
                const totalCharges = parseFloat(value);
                if (index === 1) {
                    const updatedAmount = parseFloat(record?.updated_amount)
                    return `${updatedAmount} ${totalCurrencyCode}`;
                } else {
                    return `${totalCharges} ${totalCurrencyCode}`;
                }
            },
        },
    ];



    return (
        <>
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
                                ><> <h2>{t("SHIPPER DETAILS")}:</h2>
                                        <Row style={{ width: "100%" }}>

                                            <Col md={12} xs={24} className='ProfileContent'>
                                                <h4 className='heading2'>{t("Name")}</h4>
                                                <h4>: {data?.ShipperName}</h4>
                                            </Col>
                                            <Col md={12} xs={24} className='ProfileContent'>
                                                <h4 className='heading2'>{t("Number")}</h4>
                                                <h4>: {data?.ShipperNumber}</h4>
                                            </Col>
                                            <Col md={12} xs={24} className='ProfileContent'>
                                                <h4 className='heading2'>{t("Phone Number")}</h4>
                                                <h4>: {data?.ShipperPhoneNumber}</h4>
                                            </Col>
                                            <Col md={12} xs={24} className='ProfileContent'>
                                                <h4 className='heading2'>{t("Attention Name")}</h4>
                                                <h4>: {data?.ShipperAttentionName}</h4>
                                            </Col>
                                            <Col md={12} xs={24} className='ProfileContent'>
                                                <h4 className='heading2'>{t("Address")}</h4>
                                                <h4>: {data?.ShipperAddressLine1} {data?.ShipperAddressLine2} {data?.ShipperAddressLine3} </h4>
                                            </Col>
                                            <Col md={12} xs={24} className='ProfileContent'>
                                                <h4 className='heading2'>{t("City")}</h4>
                                                <h4>: {data?.ShipperCity}</h4>
                                            </Col>
                                            <Col md={12} xs={24} className='ProfileContent'>
                                                <h4 className='heading2'>{t("State")}</h4>
                                                <h4>: {data?.ShipperStateProvinceCode}</h4>
                                            </Col>
                                            <Col md={12} xs={24} className='ProfileContent'>
                                                <h4 className='heading2'>{t("Country")}</h4>
                                                <h4>: {data?.ShipperCountryCode}</h4>
                                            </Col>
                                            <Col md={12} xs={24} className='ProfileContent'>
                                                <h4 className='heading2'>{t("Postal Code")}</h4>
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
                                        padding: "1%"
                                    }}
                                ><>
                                        <h2>{t("SHIP FROM")}:</h2>
                                        <Row style={{ width: "100%" }}>

                                            <Col md={12} xs={24} className='ProfileContent'>
                                                <h4 className='heading2'>{t("Name")}</h4>
                                                <h4>: {data?.ShipFromName}</h4>
                                            </Col>
                                            <Col md={12} xs={24} className='ProfileContent'>
                                                <h4 className='heading2'>{t("Phone Number")}</h4>
                                                <h4>: {data?.ShipFromPhoneNumber}</h4>
                                            </Col>
                                            <Col md={12} xs={24} className='ProfileContent'>
                                                <h4 className='heading2'>{t("Attention Name")}</h4>
                                                <h4>: {data?.ShipFromAttentionName}</h4>
                                            </Col>
                                            <Col md={12} xs={24} className='ProfileContent'>
                                                <h4 className='heading2'>{t("Address")}</h4>
                                                <h4>: {data?.ShipFromAddressLine1} {data?.ShipFromAddressLine2} {data?.ShipFromAddressLine3}</h4>
                                            </Col>
                                            <Col md={12} xs={24} className='ProfileContent'>
                                                <h4 className='heading2'>{t("City")}</h4>
                                                <h4>: {data?.ShipFromCity}</h4>
                                            </Col>
                                            <Col md={12} xs={24} className='ProfileContent'>
                                                <h4 className='heading2'>{t("State")}</h4>
                                                <h4>: {data?.ShipFromStateProvinceCode}</h4>
                                            </Col>
                                            <Col md={12} xs={24} className='ProfileContent'>
                                                <h4 className='heading2'>{t("Country")}</h4>
                                                <h4>: {data?.ShipFromCountryCode}</h4>
                                            </Col>
                                            <Col md={12} xs={24} className='ProfileContent'>
                                                <h4 className='heading2'>{t("Postal Code")}</h4>
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
                                        padding: "1%"
                                    }}
                                ><>
                                        <h2>{t("SHIP TO")}:</h2>
                                        <Row style={{ width: "100%" }}>

                                            <Col md={12} xs={24} className='ProfileContent'>
                                                <h4 className='heading2'>{t("Name")}</h4>
                                                <h4>: {data?.ShipToName}</h4>
                                            </Col>
                                            <Col md={12} xs={24} className='ProfileContent'>
                                                <h4 className='heading2'>{t("Phone Number")}</h4>
                                                <h4>: {data?.ShipToPhoneNumber}</h4>
                                            </Col>
                                            <Col md={12} xs={24} className='ProfileContent'>
                                                <h4 className='heading2'>{t("Attention Name")}</h4>
                                                <h4>: {data?.ShipToAttentionName}</h4>
                                            </Col>
                                            <Col md={12} xs={24} className='ProfileContent'>
                                                <h4 className='heading2'>{t("Address")}</h4>
                                                <h4>: {data?.ShipToAddressLine1} {data?.ShipToAddressLine2} {data?.ShipToAddressLine3}</h4>
                                            </Col>
                                            <Col md={12} xs={24} className='ProfileContent'>
                                                <h4 className='heading2'>{t("City")}</h4>
                                                <h4>: {data?.ShipToCity}</h4>
                                            </Col>
                                            <Col md={12} xs={24} className='ProfileContent'>
                                                <h4 className='heading2'>{t("State")}</h4>
                                                <h4>: {data?.ShipToStateProvinceCode}</h4>
                                            </Col>
                                            <Col md={12} xs={24} className='ProfileContent'>
                                                <h4 className='heading2'>{t("Country")}</h4>
                                                <h4>: {data?.ShipToCountryCode}</h4>
                                            </Col>
                                            <Col md={12} xs={24} className='ProfileContent'>
                                                <h4 className='heading2'>{t("Postal Code")}</h4>
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
                                        padding: "1%"
                                    }}
                                ><>
                                        <h2>{t("SHIPMENT DETAILS")}:</h2>
                                        <h3>{t("Packaging Type & Dimensions")}:</h3>
                                        <Table
                                            rowSelection={undefined}
                                            dataSource={data2a}
                                            columns={columns}
                                            scroll={{ x: true }}
                                            responsive={true}
                                            pagination={false}
                                        />
                                        <br />
                                        <h3>{t("Shpping Details")}:</h3>

                                        {data?.billed_weight !== null ? (<Table
                                            rowSelection={undefined}
                                            dataSource={[data, data]}
                                            columns={columns1}
                                            scroll={{ x: true }}
                                            responsive={true}
                                            pagination={false}
                                        />) : (<Table
                                            rowSelection={undefined}
                                            dataSource={[data]}
                                            columns={columns1}
                                            scroll={{ x: true }}
                                            responsive={true}
                                            pagination={false}
                                        />)}
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
                                        padding: "1%"
                                    }}
                                ><>
                                        <h2>{t("ELECTRONIC LABEL RECEIPT")}:</h2>



                                    </>
                                </Card>
                            </Col>
                            <Card
                                bordered={false}
                                style={{
                                    width: "100%",
                                    borderRadius: "1px",
                                    boxShadow:
                                        "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
                                }}

                            >
                                <div className="downloadButton">
                                    <Button onClick={handleDownload}>
                                        {t("DOWNLOD")}
                                    </Button>
                                    <Button style={{ marginLeft: "2%" }} onClick={handlePrintImage}>
                                        {t("PRINT")}
                                    </Button>
                                </div>
                                <div style={{ width: "100%", height: "max-content" }}>
                                    <Row className="box1" gutter={[16, 16]}>
                                        <Col md={24} xs={24}>
                                            <div>
                                                {confirmClick && (<Space direction="vertical" >
                                                    <div className="loader-overlay">
                                                        <Spin tip="Loading" size="large">

                                                        </Spin>
                                                    </div>
                                                </Space>)}
                                                <Document
                                                    file={pdfBlob}
                                                    onLoadSuccess={onDocumentLoadSuccess}
                                                >
                                                    {/* Render the first page of the PDF */}
                                                    <Page pageNumber={1} />
                                                </Document>
                                                <div className="downloadButton">
                                                    <p>{t("Number of pages")}: {numPages}</p>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Card>
                        </Row>
                    </Content>
                </div>)}
        </>
    )
}
export default SingleShip;