import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Col, Input, Row, Select, Table, Space, Spin } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { makeShipment1 } from '../../redux/createSlice/makeShipment';
import { GetServiceDescription } from './Data';
import { Transaction } from '../../redux/createSlice/Transaction';
import { getUserInfo } from '../../redux/createSlice/getSingleUser';
import { toast } from 'react-toastify';
const QuoteServicetable = ({
    address,
    city,
    postalCode,
    countrycode,
    address1,
    city1,
    postalCode1,
    countrycode1,
    ShipperAttentionName,
    ShipperPhoneNumber,
    ShipToAttentionName,
    ShipToNumber,
    ShipFromAttentionName,
    ShipFromNumber,
    transformedData1,

}) => {
    const quote = useSelector((state) => state.quote?.quotegen);
    const tableData = quote?.data?.RateResponse?.RatedShipment;
    const data25 = useSelector((state) => state.shipment?.shipment);
    const quote1 = JSON.parse(quote?.config?.data);
    const ship = quote1?.RateRequest?.Shipment;
    const dispatch = useDispatch();
    const user = useSelector((state) => state.getUser?.getUser?.data[0]);
    const [confirmClick, setConfirmClick] = useState(false);
    useEffect(() => {
        dispatch(getUserInfo());
    }, []);

    const handleShipNow = async (code, record, quote1) => {
        setConfirmClick(true);
        const ServiceCode = record?.Service?.Code;
        const ServiceDescription = (code1) => {
            return GetServiceDescription(code1);
        }
        const data = {
            ShipmentRequest: {
                Shipment: {
                    Shipper: {
                        Name: ship?.Shipper?.Name,
                        ShipperNumber: ship?.Shipper?.ShipperNumber,
                        AttentionName: ShipperAttentionName,
                        Phone: {
                            Number: ShipperPhoneNumber
                        },
                        Address: ship?.Shipper?.Address
                    },
                    ShipTo: {
                        Name: ship?.ShipTo?.Name,
                        AttentionName: ShipToAttentionName,
                        Phone: {
                            Number: ShipToNumber
                        },
                        Address: ship?.ShipTo?.Address
                    },
                    ShipFrom: {
                        Name: ship?.ShipFrom?.Name,
                        AttentionName: ShipFromAttentionName,
                        Phone: {
                            Number: ShipFromNumber
                        },
                        Address: ship?.ShipFrom?.Address
                    },
                    PaymentInformation: {
                        ShipmentCharge: {
                            Type: "01",
                            BillShipper: {
                                AccountNumber: ship?.Shipper?.ShipperNumber
                            }
                        }
                    },
                    Service: {
                        Code: ServiceCode,
                        Description: ServiceDescription(record?.Service?.Code)
                    },
                    NumOfPieces: ship?.NumOfPieces,
                    Package: transformedData1
                }
            }
        }
        if (user?.balance > record.TotalCharges?.MonetaryValue) {
            const response = await dispatch(makeShipment1(data))
            const status = response?.payload?.status;
            if (status === 200) {
                dispatch(Transaction((record.TotalCharges?.MonetaryValue)));
                dispatch(getUserInfo());
            }
        } else {
            toast.error("Please top up your wallet!");
        }
        setConfirmClick(false);
    }
    const unitOfMeasurementofPackageWeight = tableData[0]?.BillingWeight?.UnitOfMeasurement?.Code;
    const columns = [
        {
            title: "Service Code",
            dataIndex: ["Service", "Code"],
            key: "serviceCode",
        },
        {
            title: "Service Description",
            dataIndex: ["Service", "Code"],
            key: "serviceDescription",
            render: (code) => GetServiceDescription(code),
        },
        {
            title: "Billing Weight",
            dataIndex: ["BillingWeight", "Weight"],
            key: "billingWeight",
            render: (value, record) => (
                <>
                    {value} {record["BillingWeight"]["UnitOfMeasurement"]["Code"]}
                </>
            ),
        },
        {
            title: "Transportation Charges",
            dataIndex: ["TransportationCharges", "MonetaryValue"],
            key: "transportationCharges",
            render: (value, record) => (
                <>
                    {value} {record["TransportationCharges"]["CurrencyCode"]}
                </>
            ),
        },
        {
            title: "Service Options Charges",
            dataIndex: ["ServiceOptionsCharges", "MonetaryValue"],
            key: "serviceOptionsCharges",
            render: (value, record) => (
                <>
                    {value} {record["ServiceOptionsCharges"]["CurrencyCode"]}
                </>
            ),
        },
        {
            title: "Total Charges",
            dataIndex: ["TotalCharges", "MonetaryValue"],
            key: "totalCharges",
            render: (value, record) => (
                <>
                    {value} {record["TotalCharges"]["CurrencyCode"]}
                </>
            ),

        },
        {
            title: 'Package Weight',
            dataIndex: 'RatedPackage',
            key: 'packageWeight',
            render: (packageData) => {
                let totalWeight = 0;
                if (Array.isArray(packageData)) {
                    const weights = packageData.map((item) => parseFloat(item.Weight));
                    totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
                } else if (packageData && packageData.Weight) {
                    totalWeight = parseFloat(packageData.Weight);
                }

                return <span>{totalWeight} {unitOfMeasurementofPackageWeight}</span>;
            },
        },
        {
            title: "Buiseness Days In Transit",
            dataIndex: ["GuaranteedDelivery", "BusinessDaysInTransit"],
            key: "guaranteedDelivery",
        },
        {
            title: "Delivery By Time",
            dataIndex: ["GuaranteedDelivery", "DeliveryByTime"],
            key: "deliveryByTime",
        },
        {
            title: "Action",
            dataIndex: "Service.Code",
            key: "action",
            render: (code, record, quote1) => (
                <Button onClick={() => handleShipNow(code, record, quote1)}>
                    SHIP NOW
                </Button>
            ),
        },

    ];


    return (
        <div>
            {confirmClick && (<Space direction="vertical" >
                <div className="loader-overlay">
                    <Spin tip="Loading" size="large">

                    </Spin>
                </div>
            </Space>)}
            <Row className="box1" style={{ display: "flex" }}>
                <Col span={24} style={{ position: "relative" }}>
                    <h6>SHOWING RESULTS FOR</h6>
                    <b>{address}, {city}, {postalCode}, {countrycode} to {address1}, {city1}, {postalCode1}, {countrycode1} </b>
                </Col>
            </Row>
            <div className="Table1">
                <Table
                    rowSelection={undefined}
                    columns={columns}
                    dataSource={Object.values(tableData)}
                    scroll={{ x: true }}
                    responsive={true}
                    pagination={false}
                />
            </div>
            <Row className="box1" style={{ display: "flex" }}>
                <Col span={24} style={{ position: "relative" }}>
                    <h6 style={{ color: "red" }}><ExclamationCircleOutlined /> 11091 - Your invoice may vary from the displayed reference rates.</h6>
                </Col>
            </Row>
        </div>
    )
}

export default QuoteServicetable;