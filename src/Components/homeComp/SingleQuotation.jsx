import { Button, Card, Col, Layout, Modal, Row, Space, Spin, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { GetSingleQuotation } from '../../redux/createSlice/SingleQuotation';
import { RemoveQuotation } from '../../redux/createSlice/removeQuotation';
import { getAllsavedQuoatations } from '../../redux/createSlice/getSavedQuotations';
const { Content } = Layout;
import { useTranslation } from 'react-i18next';

const Singlequotation = () => {
  const { t } = useTranslation()

    const { id } = useParams();
    const data = useSelector((state) => state.getSingleQuotation?.getSingleQuotation?.data[0])

    const data1 = useSelector((state) => state.getSingleQuotation);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GetSingleQuotation(id));
    }, [id]);

    useEffect(() => {
        setLoading(data1.loading)
    }, [data1]);

    const [currentPage, setCurrentPage] = useState(1);

    const pageSize = 5;


    const navigate = useNavigate();
    const handleQuote = (id1) => {
        dispatch(GetSingleQuotation(id1));
        navigate(`/generate-order/${id1}`);
    }

    const columns = [
        {
            title: `${t("Sr. No.")}`,
            dataIndex: 'serialNumber',
            render: (_, __, index) => (index + 1),
        },
        {
            title: 'ID',
            dataIndex: 'quotation_id',
            key: 'quotation_id',
        },
        {
            title: `${t("Length")}`,
            dataIndex: 'PackagLength',
            key: 'PackagLength',
            render: (value, record) => {
                const dimensionCode = record.PackagTypeDimensionUnitCode || '';
                const PackagLength = value;
                return `${PackagLength} ${dimensionCode}`;
            },
        },
        {
            title: `${t('Height')}`,
            dataIndex: 'PackagHeight',
            key: 'PackagHeight',
            render: (value, record) => {
                const dimensionCode = record.PackagTypeDimensionUnitCode || '';
                const PackagHeight = value;
                return `${PackagHeight} ${dimensionCode}`;
            },
        },
        {
            title: `${t('Width')}`,
            dataIndex: 'PackagWidth',
            key: 'PackagWidth',
            render: (value, record) => {
                const dimensionCode = record.PackagTypeDimensionUnitCode || '';
                const PackagWidth = value;
                return `${PackagWidth} ${dimensionCode}`;
            },
        },
        {
            title: `${t('Weight')}`,
            dataIndex: 'PackageWeight',
            key: 'PackageWeight',
            render: (value, record) => {
                const dimensionCode = record.PackageWeightUnitCode || '';
                const PackageWeight = value;
                return `${PackageWeight} ${dimensionCode}`;
            },
        },
        {
            title: `${t('Packaging Type')}`,
            dataIndex: 'PackagingTypeCode',
            key: 'PackagingTypeCode',
            render: (value, record) => {
                const dimensionCode = record.PackagingTypeDescription || '';
                const PackagingTypeCode = value;
                return `${PackagingTypeCode}(${dimensionCode})`;
            },
        },
    ]


    const [shipmentId, setShipmentId] = useState(0);
    const [modalVisible1, setModalVisible1] = useState(false);
    const handleRemoveQuote = async () => {
        const res = await dispatch(RemoveQuotation(shipmentId));
        const res1 = await dispatch(getAllsavedQuoatations({ pageNo: currentPage, limit: pageSize }));
        navigate("/savedQuotations");
    }
    const handleRemoveQuotation = (record) => {
        setModalVisible1(true);
        setShipmentId(record);
    }

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
                                                <h4 className='heading2'>Number</h4>
                                                <h4>: {data?.ShipperNumber}</h4>
                                            </Col>
                                            <Col md={12} xs={24} className='ProfileContent'>
                                                <h4 className='heading2'>Phone Number</h4>
                                                <h4>: {data?.ShipperPhoneNumber}</h4>
                                            </Col>
                                            <Col md={12} xs={24} className='ProfileContent'>
                                                <h4 className='heading2'>Attention Name</h4>
                                                <h4>: {data?.ShipperAttentionName}</h4>
                                            </Col>
                                            <Col md={12} xs={24} className='ProfileContent'>
                                                <h4 className='heading2'>Address</h4>
                                                <h4>: {data?.ShipperAddressLine1} {data?.ShipperAddressLine2} {data?.ShipperAddressLine3} </h4>
                                            </Col>
                                            <Col md={12} xs={24} className='ProfileContent'>
                                                <h4 className='heading2'>City</h4>
                                                <h4>: {data?.ShipperCity}</h4>
                                            </Col>
                                            <Col md={12} xs={24} className='ProfileContent'>
                                                <h4 className='heading2'>State</h4>
                                                <h4>: {data?.ShipperStateProvinceCode}</h4>
                                            </Col>
                                            <Col md={12} xs={24} className='ProfileContent'>
                                                <h4 className='heading2'>County</h4>
                                                <h4>: {data?.ShipperCountryCode}</h4>
                                            </Col>
                                            <Col md={12} xs={24} className='ProfileContent'>
                                                <h4 className='heading2'>Postal Code</h4>
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
                                        <h2>SHIP FROM:</h2>
                                        <Row style={{ width: "100%" }}>

                                            <Col md={12} xs={24} className='ProfileContent'>
                                                <h4 className='heading2'>Name</h4>
                                                <h4>: {data?.ShipFromName}</h4>
                                            </Col>
                                            <Col md={12} xs={24} className='ProfileContent'>
                                                <h4 className='heading2'>Phone Number</h4>
                                                <h4>: {data?.ShipFromPhoneNumber}</h4>
                                            </Col>
                                            <Col md={12} xs={24} className='ProfileContent'>
                                                <h4 className='heading2'>Attention Name</h4>
                                                <h4>: {data?.ShipFromAttentionName}</h4>
                                            </Col>
                                            <Col md={12} xs={24} className='ProfileContent'>
                                                <h4 className='heading2'>Address</h4>
                                                <h4>: {data?.ShipFromAddressLine1} {data?.ShipFromAddressLine2} {data?.ShipFromAddressLine3}</h4>
                                            </Col>
                                            <Col md={12} xs={24} className='ProfileContent'>
                                                <h4 className='heading2'>City</h4>
                                                <h4>: {data?.ShipFromCity}</h4>
                                            </Col>
                                            <Col md={12} xs={24} className='ProfileContent'>
                                                <h4 className='heading2'>State</h4>
                                                <h4>: {data?.ShipFromStateProvinceCode}</h4>
                                            </Col>
                                            <Col md={12} xs={24} className='ProfileContent'>
                                                <h4 className='heading2'>County</h4>
                                                <h4>: {data?.ShipFromCountryCode}</h4>
                                            </Col>
                                            <Col md={12} xs={24} className='ProfileContent'>
                                                <h4 className='heading2'>Postal Code</h4>
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
                                        <h2>SHIP FROM:</h2>
                                        <Row style={{ width: "100%" }}>

                                            <Col md={12} xs={24} className='ProfileContent'>
                                                <h4 className='heading2'>Name</h4>
                                                <h4>: {data?.ShipFromName}</h4>
                                            </Col>
                                            <Col md={12} xs={24} className='ProfileContent'>
                                                <h4 className='heading2'>Phone Number</h4>
                                                <h4>: {data?.ShipFromPhoneNumber}</h4>
                                            </Col>
                                            <Col md={12} xs={24} className='ProfileContent'>
                                                <h4 className='heading2'>Attention Name</h4>
                                                <h4>: {data?.ShipFromAttentionName}</h4>
                                            </Col>
                                            <Col md={12} xs={24} className='ProfileContent'>
                                                <h4 className='heading2'>Address</h4>
                                                <h4>: {data?.ShipFromAddressLine1} {data?.ShipFromAddressLine2} {data?.ShipFromAddressLine3}</h4>
                                            </Col>
                                            <Col md={12} xs={24} className='ProfileContent'>
                                                <h4 className='heading2'>City</h4>
                                                <h4>: {data?.ShipFromCity}</h4>
                                            </Col>
                                            <Col md={12} xs={24} className='ProfileContent'>
                                                <h4 className='heading2'>State</h4>
                                                <h4>: {data?.ShipFromStateProvinceCode}</h4>
                                            </Col>
                                            <Col md={12} xs={24} className='ProfileContent'>
                                                <h4 className='heading2'>County</h4>
                                                <h4>: {data?.ShipFromCountryCode}</h4>
                                            </Col>
                                            <Col md={12} xs={24} className='ProfileContent'>
                                                <h4 className='heading2'>Postal Code</h4>
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
                                        <h2>SHIP TO:</h2>
                                        <Row style={{ width: "100%" }}>

                                            <Col md={12} xs={24} className='ProfileContent'>
                                                <h4 className='heading2'>Name</h4>
                                                <h4>: {data?.ShipToName}</h4>
                                            </Col>
                                            <Col md={12} xs={24} className='ProfileContent'>
                                                <h4 className='heading2'>Phone Number</h4>
                                                <h4>: {data?.ShipToPhoneNumber}</h4>
                                            </Col>
                                            <Col md={12} xs={24} className='ProfileContent'>
                                                <h4 className='heading2'>Attention Name</h4>
                                                <h4>: {data?.ShipToAttentionName}</h4>
                                            </Col>
                                            <Col md={12} xs={24} className='ProfileContent'>
                                                <h4 className='heading2'>Address</h4>
                                                <h4>: {data?.ShipToAddressLine1} {data?.ShipToAddressLine2} {data?.ShipToAddressLine3}</h4>
                                            </Col>
                                            <Col md={12} xs={24} className='ProfileContent'>
                                                <h4 className='heading2'>City</h4>
                                                <h4>: {data?.ShipToCity}</h4>
                                            </Col>
                                            <Col md={12} xs={24} className='ProfileContent'>
                                                <h4 className='heading2'>State</h4>
                                                <h4>: {data?.ShipToStateProvinceCode}</h4>
                                            </Col>
                                            <Col md={12} xs={24} className='ProfileContent'>
                                                <h4 className='heading2'>County</h4>
                                                <h4>: {data?.ShipToCountryCode}</h4>
                                            </Col>
                                            <Col md={12} xs={24} className='ProfileContent'>
                                                <h4 className='heading2'>Postal Code</h4>
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
                                        <h2>DIMENSIONS AND WEIGHT:</h2>
                                        <Table
                                            rowSelection={undefined}
                                            dataSource={[data]}
                                            columns={columns}
                                            scroll={{ x: true }}
                                            responsive={true}
                                            pagination={false}
                                        />

                                    </>
                                    <div className="btnsValidate">
                                        <Button type="primary" style={{ marginTop: "1%" }} onClick={() => handleQuote(data?.quotation_id)}>Generate Quotation</Button>
                                        <Button onClick={() => handleRemoveQuotation(data?.quotation_id)} style={{ marginTop: "1%", marginLeft: "1%", backgroundColor: "red", color: "white" }}>Remove Quotation</Button>
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                    </Content>
                </div>)}
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

export default Singlequotation;