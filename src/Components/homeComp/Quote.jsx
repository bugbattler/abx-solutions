import { Button, Card, Col, Layout, Row, Form, Input, Radio, Select, Modal, Table, Space, Spin, Dropdown } from 'antd';
import { DimensionUnitCode2, GetServiceDescription, PackageWeightUnitCode2, PackagingTypeDescription2, packagingTypeCode2, shippingMethods } from './Data';
const { Content } = Layout;
import React, { useEffect, useRef, useState } from 'react';
import QuoteShipFrom from './QuoteShipFrom';
import QuoteShipTo from './QuoteShipTo';
import { useDispatch, useSelector } from 'react-redux';
import ShipmentFinal from './ShipmentFinal';
import Cookies from 'js-cookie';
import { useNavigate, useParams } from 'react-router-dom';
import { GetSingleQuotation } from '../../redux/createSlice/SingleQuotation';
import { getUserInfo } from '../../redux/createSlice/getSingleUser';
import { v4 as uuidv4 } from 'uuid';
import { getQuoteAsync } from '../../redux/createSlice/getQuote';
import { getShipperDetailsThunk } from '../../redux/createSlice/Shipper';
import { useTranslation } from 'react-i18next';
const Quote = React.memo(() => {
    const { t } = useTranslation()
   
    const containerRef = useRef(null);
    const [form] = Form.useForm();
    const { id } = useParams();
    const [shipperInfo, setShipperInfo] = useState(null);
    const dispatch = useDispatch();
    const [PackagTypeDimensionUnitCode, setPackagTypeDimensionUnitCode] = useState("CM");
    const [PackageWeightUnitCode, setPackageWeightUnitCode] = useState("KGS");
    const [PackagTypeDimensionUnitDescription, setPackagTypeDimensionUnitDescription1] = useState("Centimeters");
    const [PackageWeightUnitDescription, setPackageWeightUnitDescription1] = useState("Kilograms");
    const [bill, setBill] = useState(false);
    const shipment = useSelector((state) => state.shipment?.shipment);
    const [shipmentData, setShipmentData] = useState("");
    const [ShipToAttentionName, setShiptoAttentionName] = useState("");
    const [ShipToPhoneNumber, setShipToPhoneNumber] = useState("");
    const [ShipFromAttentionName, setShipfromAttentionname] = useState("");
    const [ShipFromPhoneNumber, setShipfromPhoneNumber] = useState("");
    const [modalVisible1, setModalVisible1] = useState(false);
    const [deleteKey, setDeleteKey] = useState(null)
    const isLoading = useSelector((state) => state.login?.isLoading);
    const [confirmClick, setConfirmClick] = useState(false);
    const [shipperId, setShipperId] = useState(6);

    const [shipperFilteredData, setShipperFilteredData] = useState(null);


    useEffect(() => {
        getShipperInfo();
    }, []);

    useEffect(() => {
        const filterData = shipperInfo?.filter((element) => element?.id === shipperId);
        if (filterData) {
            setShipperFilteredData(filterData[0]);
        }
    }, [shipperId]);




    const getShipperInfo = async () => {
        const response = await dispatch(getShipperDetailsThunk());
        const data = await response?.payload?.data?.data;
        setShipperInfo(data);
    }

    useEffect(() => {
        if (shipment?.status === 200) {
            setBill(true)
        } else {
            setBill(false);
        }
    }, [shipment]);




    const spinnerConfirm = () => {
        setConfirmClick(true);
    }

    const stopSpinnerConfirm = () => {
        setConfirmClick(false);
    }

    const handleClearAll = () => {
        form.resetFields();
    }

    const data23a = useSelector((state) => state.singleShip?.getSingleShip?.data[0]);
    const [data23, setData23] = useState(null);
    const data1a = useSelector((state) => state.singleShip?.getSingleShip?.data);
    const [data4a, setData4a] = useState(null);

    useEffect(() => {
        if (data1a?.length > 1) {
            setData4a(data1a)
        } else {
            setData4a([data23])
        }
    }, [data23, data1a]);

    useEffect(() => {
        console.log(id);
        if (id) {
            setData23(data23a)
        }
        if (id === undefined) {
            setData23(null);
        }
    }, [id]);

    const data1 = useSelector((state) => state.getSingleQuotation);
    const [loading, setLoading] = useState(true);
    const [servicecode, setServiceCode] = useState(data23?.ServiceDescription);
    const [serviceCodeDiscription, setServiceCodedescription] = useState(data23?.ServiceDescription);
    const data = [];
    const [dataSource, setDataSource] = useState([
        {
            key: 1,
            serialNumber: '',
            packagLength: '',
            packagWidth: '',
            packagHeight: '',
            packageWeight: '',
            packagingTypeCode: '02',
            NumOfPieces: 1,
        },
    ]);

    const datasetting = async () => {
        const arr = [];
        await data4a?.forEach((item) => {
            arr.push({
                key: uuidv4(),
                serialNumber: "",
                packagLength: item?.PackagLength,
                packagWidth: item?.PackagWidth,
                packagHeight: item?.PackagHeight,
                packageWeight: item?.PackageWeight,
                packagingTypeCode: item?.PackagingTypeCode,
                packagingTypeDescription: item?.PackagingTypeDescription,
                NumOfPieces: 1
            });
        });
        await setDataSource(arr);
    }


    const duplicateDataSource = [];

    dataSource.forEach((item) => {
        const numOfPieces = item.NumOfPieces || 1;

        for (let i = 1; i <= numOfPieces; i++) {
            // Create a new object with the same properties as the item
            const duplicatedItem = {
                ...item,
                NumOfPieces: i, // Set the NumOfPieces as the serial number
            };
            duplicateDataSource.push(duplicatedItem);
        }
    });


    useEffect(() => {
        if (data23) {
            datasetting();
            setPackagTypeDimensionUnitCode(data23?.PackagTypeDimensionUnitCode);
            setPackageWeightUnitCode(data23?.PackageWeightUnitCode);
            setPackagTypeDimensionUnitDescription1(data23?.PackagTypeDimensionUnitDescription);
            setServiceCode(data23?.ServiceCode);
            setServiceCodedescription(data23?.ServiceDescription);
            setPackageWeightUnitDescription1(data23?.PackageWeightUnitDescription);
        } else {
            setPackagTypeDimensionUnitCode("CM");
            setPackageWeightUnitCode("KGS");
            setPackagTypeDimensionUnitDescription1("Centimeters");
            setServiceCode("11");
            setServiceCodedescription("UPS Standard");
            setPackageWeightUnitDescription1("Kilograms");
            PackagingTypeDescription2
        }
    }, [id, data23, data4a]);


    const handleInputChange = (e, key, fieldName) => {
        const value = e.target.value;
        const updatedDataSource = dataSource.map((item) => {
            if (item.key === key) {
                return {
                    ...item,
                    [fieldName]: value,
                };
            }
            return item;
        });
        setDataSource(updatedDataSource);
    };

    const handleSelectChange = (value, key) => {
        const updatedDataSource = dataSource.map((item) => {
            if (item.key === key) {
                return {
                    ...item,
                    packagingTypeCode: value,
                    packagingTypeDescription: packagingTypeCode2.find(
                        (option) => option.value === value
                    ).label,
                };
            }
            return item;
        });
        setDataSource(updatedDataSource);
    };
    const handleAddRow = () => {
        const newRow = {
            key: uuidv4(), // Generate unique ID for the new row
            packagingTypeCode: "02",
            packagingTypeDescription: "Package",
            packagLength: "",
            packagWidth: "",
            packagHeight: "",
            packageWeight: "",
        };

        const newDataSource = JSON.parse(JSON.stringify(dataSource));
        newDataSource.push(newRow);
        setDataSource(newDataSource);
    };

    const handleDeleteRow = () => {
        setDataSource((prevDataSource) => prevDataSource.filter((row) => row.key !== deleteKey));
        setModalVisible1(false);
    };

    const transformedData = duplicateDataSource?.map((item) => {
        return {
            Packaging: {
                Code: item.packagingTypeCode,
                Description: packagingTypeCode2.find(
                    (option) => option.value === item.packagingTypeCode
                ).label
            },
            Dimensions: {
                UnitOfMeasurement: {
                    Code: PackagTypeDimensionUnitCode,
                    Description: PackagTypeDimensionUnitDescription
                },
                Length: Math.ceil(item.packagLength).toString(),
                Width: Math.ceil(item.packagWidth).toString(),
                Height: Math.ceil(item.packagHeight).toString()
            },
            PackageWeight: {
                UnitOfMeasurement: {
                    Code: PackageWeightUnitCode,
                    Description: PackageWeightUnitDescription
                },
                Weight: item.packageWeight
            },
        };
    });



    let totalNumOfPieces = 0;

    duplicateDataSource.forEach((record) => {
        const numOfPieces = Number(record.NumOfPieces);
        if (!isNaN(numOfPieces)) {
            totalNumOfPieces += numOfPieces;
        }
    });

    const navigate = useNavigate();
    useEffect(() => {
        if (id) {
            navigate(`/generate-order/${id}`)
        } else {
            navigate(`/generate-order`)
        }
    }, [id]);

    useEffect(() => {
        dispatch(GetSingleQuotation(id));
    }, [id]);

    useEffect(() => {
        setLoading(data1.loading)
    }, [data1]);


    const columns = [
        {
            title: `${t("Sr. No.")}`,
            dataIndex: 'serialNumber',
            render: (_, __, index) => (
                <Form.Item
                    rules={[{ required: true, message: 'Package Length is required' }]}

                >
                    {index + 1}
                </Form.Item>
            ),
        },
        {
            title: `${t("Length")} (${PackagTypeDimensionUnitCode || `CM`})`,
            dataIndex: 'packagLength',
            render: (_, record) => (
                <Form.Item
                    name={`packageLength_${record.key}`}
                    rules={[{ required: true, message: 'Package Length is required' }]}
                    initialValue={record?.packagLength || 0}
                >
                    <Input
                        value={record.packagLength}
                        onChange={(e) => handleInputChange(e, record.key, 'packagLength')}
                        type="number"
                        placeholder='Enter Package Length'
                        style={{ width: '80px' }}
                    />
                </Form.Item>
            ),
        },
        {
            title: `${t("Width")} (${PackagTypeDimensionUnitCode || `CM`})`,
            dataIndex: 'packagWidth',
            render: (_, record) => (
                <Form.Item
                    name={`packagWidth${record.key}`}
                    rules={[{ required: true, message: 'Package Width is required' }]}
                    initialValue={record?.packagWidth || 0}
                >
                    <Input
                        value={record.packagWidth}
                        onChange={(e) => handleInputChange(e, record.key, 'packagWidth')}
                        type="number"
                        placeholder='Enter Package Width'
                        style={{ width: '80px' }}
                    />
                </Form.Item>
            ),
        },
        {
            title: `${t("Height")} (${PackagTypeDimensionUnitCode || `CM`})`,
            dataIndex: 'packagHeight',
            render: (_, record) => (
                <Form.Item
                    name={`packagHeight${record.key}`}
                    rules={[{ required: true, message: 'Package Height is required' }]}
                    initialValue={record?.packagHeight || 0}
                >
                    <Input
                        value={record.packagHeight}
                        onChange={(e) => handleInputChange(e, record.key, 'packagHeight')}
                        type="number"
                        placeholder='Enter Package Height'
                        style={{ width: '80px' }}
                    />
                </Form.Item>
            ),
        },
        {
            title: `${t("Weight")} (${PackageWeightUnitCode || `KGS`})`,
            dataIndex: 'packageWeight',
            render: (_, record) => (
                <Form.Item
                    name={`packageWeight${record.key}`}
                    rules={[{ required: true, message: 'Package Weight is required' }]}
                    initialValue={record?.packageWeight || 0}
                >
                    <Input
                        value={record.packageWeight}
                        onChange={(e) => handleInputChange(e, record.key, 'packageWeight')}
                        type="number"
                        placeholder='Enter Package Weight'
                        style={{ width: '80px' }}
                    />
                </Form.Item>
            ),
        },
        {
            title: `${t("Type")}`,
            dataIndex: 'packagingTypeCode',
            render: (_, record) => (
                <Form.Item
                    name={`packagingType_${record.key}`}
                    rules={[{ required: true, message: 'Packaging Type is required' }]}
                    initialValue={record?.packagingTypeCode || "02"}
                >
                    <Select
                        placeholder="Select Type Of Packaging"
                        onChange={(value) => handleSelectChange(value, record.key)}
                        style={{ width: '150px' }}
                        value={record?.packagingTypeCode || "02"}
                    >
                        {packagingTypeCode2.map((option) => (
                            <Option key={option.value} value={option.value}>
                                {option.label}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
            ),
        },
        {
            title: `${t("No Of Pieces")}`,
            dataIndex: 'NumOfPieces',
            render: (_, record) => (
                <Form.Item
                    name={`quantity_${record.key}`}
                    rules={[
                        { required: true, message: 'Quantity is required' }
                    ]}
                    initialValue={record?.NumOfPieces || 1}
                >
                    <Input
                        onChange={(e) => handleInputChange(e, record.key, 'NumOfPieces')}
                        type="number"
                        placeholder="Enter Quantity"
                        style={{ width: '60px' }}
                    />
                </Form.Item>
            ),
        },
        {
            title: `${t("Actions")}`,
            dataIndex: 'actions',
            render: (_, record) => (
                <Form.Item>
                    <Button type="primary" danger ghost onClick={() => {
                        setModalVisible1(true)
                        setDeleteKey(record.key)
                    }}>
                        {t("DELETE")}
                    </Button>
                </Form.Item>
            ),
        }
    ];

    const handleServicodeChange = async (value) => {
        setServiceCode(value);
        const serviceDesc = () => {
            return GetServiceDescription(value);
        }
        setServiceCodedescription(serviceDesc)
    }

    const handleShipperId = async (value) => {
        setShipperId(value);
    }



    useEffect(() => {
        dispatch(getUserInfo());
    }, []);

    const [saveQuotData, setSavedQuoteData] = useState(null);

    const validationConfirm = async (e) => {
        setBill(false);
        setConfirmClick(true);
        const {
            ShipToName,
            ShipToAttentionName,
            ShipToPhoneNumber,
            ShipToAddressLine1,
            ShipToAddressLine2,
            ShipToAddressLine3,
            ShipToCity,
            ShipToStateProvinceCode,
            ShipToPostalCode,
            ShipToCountryCode,
            ShipFromName,
            ShipFromAttentionName,
            ShipFromPhoneNumber,
            ShipFromAddressLine1,
            ShipFromAddressLine2,
            ShipFromAddressLine3,
            ShipFromCity,
            ShipFromStateProvinceCode,
            ShipFromPostalCode,
            ShipFromCountryCode
        } = e;

        setShiptoAttentionName(e.ShipToAttentionName);
        setShipToPhoneNumber(e.ShipToPhoneNumber);
        setShipfromAttentionname(e.ShipFromAttentionName);
        setShipfromPhoneNumber(e.ShipFromPhoneNumber);
        let totalWeight = 0;
        transformedData.forEach((index) => {
            if (index?.PackageWeight?.Weight) {
                totalWeight += parseFloat(index.PackageWeight.Weight);
            }
        });


        const data = {
            ShipmentRequest: {
                Shipment: {
                    Shipper: {
                        Name: shipperFilteredData?.ShipperName || data23?.ShipperName,
                        ShipperNumber: shipperFilteredData?.ShipperNumber || data23?.ShipperNumber,
                        AttentionName: shipperFilteredData?.ShipperAttentionName || data23?.ShipperAttentionName,
                        Shipper_id: shipperId || data23?.Shipper_id,
                        Phone: {
                            Number: shipperFilteredData?.ShipperPhoneNumber || data23?.ShipperPhoneNumber
                        },
                        Address: {
                            AddressLine: [
                                shipperFilteredData?.ShipperAddressLine1 || data23?.ShipperAddressLine1,
                                shipperFilteredData?.ShipperAddressLine2 || data23?.ShipperAddressLine2,
                                shipperFilteredData?.ShipperAddressLine3 || data23?.ShipperAddressLine3
                            ],
                            City: shipperFilteredData?.ShipperCity || data23?.ShipperCity,
                            StateProvinceCode: shipperFilteredData?.ShipperStateProvinceCode || data23?.ShipperStateProvinceCode,
                            PostalCode: shipperFilteredData?.ShipperPostalCode || data23?.ShipperPostalCode,
                            CountryCode: shipperFilteredData?.ShipperCountryCode || data23?.ShipperCountryCode
                        }
                    },

                    ShipTo: {
                        Name: ShipToName,
                        AttentionName: ShipToAttentionName,
                        Phone: {
                            Number: ShipToPhoneNumber
                        },
                        Address: {
                            AddressLine: [
                                ShipToAddressLine1,
                                ShipToAddressLine2,
                                ShipToAddressLine3
                            ],
                            City: ShipToCity,
                            StateProvinceCode: ShipToStateProvinceCode,
                            PostalCode: ShipToPostalCode,
                            CountryCode: ShipToCountryCode
                        }
                    },
                    ShipFrom: {
                        Name: ShipFromName,
                        AttentionName: ShipFromAttentionName,
                        Phone: {
                            Number: ShipFromPhoneNumber
                        },
                        Address: {
                            AddressLine: [
                                ShipFromAddressLine1,
                                ShipFromAddressLine2,
                                ShipFromAddressLine3
                            ],
                            City: ShipFromCity,
                            StateProvinceCode: ShipFromStateProvinceCode,
                            PostalCode: ShipFromPostalCode,
                            CountryCode: ShipFromCountryCode
                        }
                    },
                    PaymentInformation: {
                        ShipmentCharge: {
                            Type: "01",
                            BillShipper: {
                                AccountNumber: "B34912"
                            }
                        }
                    },
                    Service: {
                        Code: servicecode,
                        Description: serviceCodeDiscription
                    },
                    NumOfPieces: totalNumOfPieces,
                    Package: transformedData,
                    Description: "UPS Premier"
                }
            }
        }

        setShipmentData(data);
        setSavedQuoteData(data);
        const response = await dispatch(getQuoteAsync(data))
        const status = await response?.payload?.success;
        if (status === true) {
            setBill(true);
        }
        setConfirmClick(false);
    }

    const info = shipmentData?.ShipmentRequest?.Shipment;

    useEffect(() => {
        if (containerRef?.current && bill) {
            // Scroll to the bottom smoothly
            containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });

            // Set scrollTop to scroll to the bottom instantly (if needed)
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [bill])



    useEffect(() => {
        if (data23) {
            const filterData = shipperInfo?.filter((element) => element?.id === data23?.Shipper_id);
            if (filterData) {
                setShipperFilteredData(filterData[0]);
            }
            setServiceCode(data23?.ServiceCode);
            const serviceDesc = () => {
                return GetServiceDescription(data23?.ServiceCode);
            }
            setServiceCodedescription(serviceDesc);
        } else if (shipperInfo) {
            setShipperFilteredData(shipperInfo[0]);
            setServiceCode("11");
            const serviceDesc = () => {
                return GetServiceDescription("11");
            }
            setServiceCodedescription(serviceDesc);

        }
    }, [shipperInfo, data23])

    return (
        <>

            {confirmClick && (<Space direction="vertical" >
                <div className="loader-overlay">
                    <Spin tip="Loading" size="large">

                    </Spin>
                </div>
            </Space>)}
            <Modal
                title="DELETE ROW"
                visible={modalVisible1}
                onOk={handleDeleteRow}
                onCancel={() => {
                    setModalVisible1(false)
                }}
            >
                <p>Are you sure you want to Delete?</p>
            </Modal>
            {isLoading === true ?
                (<Space direction="vertical" className="bodyOfSpin">
                    <Space>
                        <Spin tip="Loading" size="large">
                            <div className="content12" />
                        </Spin>
                    </Space>
                </Space>) :
                (<div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start",
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
                            <Form form={form} onFinish={validationConfirm} className="login-form" >

                                <Col md={24} xs={24} className="trackBox shippingBox1">
                                    <Card
                                        bordered={false}
                                        style={{
                                            width: "100%",
                                            borderRadius: "1px",
                                            boxShadow:
                                                "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
                                        }}
                                    >
                                        <Row>
                                            <QuoteShipFrom id={id} />
                                            <QuoteShipTo id={id} />
                                        </Row>

                                        <hr />
                                        <Card
                                            bordered={false}
                                            style={{
                                                width: '100%',
                                                borderRadius: '1px',
                                                boxShadow:
                                                    'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px',
                                            }}
                                        >
                                            <Row className="box1" style={{ display: 'flex' }}>
                                                <Col span={24} style={{ position: 'relative' }}>
                                                    <h6>{t("SHIPPER DETAILS")}</h6>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md={16} xs={24}>
                                                    <div className='packagingUnit' style={{ display: "flex", alignItems: "center", margin: "1%", marginLeft: "2%" }}>
                                                        <span className='headingofLabel1'>{t("Select Shipper")}</span>
                                                        <span className="dotofShip">:</span>
                                                        <Select
                                                            onChange={handleShipperId}
                                                            className='ServiceCodeSelect'
                                                            placeholder="Please Choose Shipper"
                                                            value={data23?.Shipper_id || shipperFilteredData?.id}
                                                        >
                                                            {shipperInfo?.map((option) => (
                                                                <Option key={option.id} value={option.id}>
                                                                    {option.ShipperName}
                                                                </Option>
                                                            ))}
                                                        </Select>
                                                    </div>
                                                </Col>
                                            </Row>
                                            {(shipperFilteredData || data23) &&
                                                <Row style={{ marginLeft: "2%", margin: "1%" }}>
                                                    <Col md={12} xs={24}>
                                                        <div className="shipperInfoXY">
                                                            <span className="headingofLabel1">{t("Shipper Name")}</span>
                                                            <span className="dotofShip">:</span>
                                                            <span>{shipperFilteredData?.ShipperName || data23?.ShipperName}</span>
                                                        </div>
                                                    </Col>
                                                    <Col md={12} xs={24}>
                                                        <div className="shipperInfoXY">
                                                            <span className="headingofLabel1">{t("Shipper Attention Name")}</span>
                                                            <span className="dotofShip">:</span>
                                                            <span>{shipperFilteredData?.ShipperAttentionName || data23?.ShipperAttentionName} </span>
                                                        </div>
                                                    </Col>
                                                    <Col md={12} xs={24}>
                                                        <div className="shipperInfoXY">
                                                            <span className="headingofLabel1">{t("Phone Number")}</span>
                                                            <span className="dotofShip">:</span>
                                                            <span>{shipperFilteredData?.ShipperPhoneNumber || data23?.ShipperPhoneNumber}</span>
                                                        </div>
                                                    </Col>
                                                    <Col md={12} xs={24}>
                                                        <div className="shipperInfoXY">
                                                            <span className="headingofLabel1">{t("Shipper Number")}</span>
                                                            <span className="dotofShip">:</span>
                                                            <span>{shipperFilteredData?.ShipperNumber || data23?.ShipperNumber}</span>
                                                        </div>
                                                    </Col>
                                                    <Col md={12} xs={24}>
                                                        <div className="shipperInfoXY">
                                                            <span className="headingofLabel1">{t("Address")}</span>
                                                            <span className="dotofShip">:</span>
                                                            <span>
                                                                {shipperFilteredData?.ShipperAddressLine1 || data23?.ShipperAddressLine1}
                                                                {shipperFilteredData?.ShipperAddressLine2 || data23?.ShipperAddressLine2}
                                                                {shipperFilteredData?.ShipperAddressLine3 || data23?.ShipperAddressLine3}
                                                            </span>
                                                        </div>
                                                    </Col>
                                                    <Col md={12} xs={24}>
                                                        <div className="shipperInfoXY">
                                                            <span className="headingofLabel1">{t("City")}</span>
                                                            <span className="dotofShip">:</span>
                                                            <span>{shipperFilteredData?.ShipperCity || data23?.ShiipperCity} </span>
                                                        </div>
                                                    </Col>
                                                    <Col md={12} xs={24}>
                                                        <div className="shipperInfoXY">
                                                            <span className="headingofLabel1">{t("State Province Code")}</span>
                                                            <span className="dotofShip">:</span>
                                                            <span>{shipperFilteredData?.ShipperStateProvinceCode || data23?.ShipperStateProvinceCode} </span>
                                                        </div>
                                                    </Col>
                                                    <Col md={12} xs={24}>
                                                        <div className="shipperInfoXY">
                                                            <span className="headingofLabel1">{t("Country Code")}</span>
                                                            <span className="dotofShip">:</span>
                                                            <span>{shipperFilteredData?.ShipperCountryCode || data23?.ShipperCountryCode} </span>
                                                        </div>
                                                    </Col>
                                                    <Col md={12} xs={24}>
                                                        <div className="shipperInfoXY">
                                                            <span className="headingofLabel1">{t("Postal Code")}</span>
                                                            <span className="dotofShip">:</span>
                                                            <span>{shipperFilteredData?.ShipperPostalCode || data23?.ShipperPostalCode} </span>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            }
                                        </Card>
                                        <hr />
                                        <Card
                                            bordered={false}
                                            style={{
                                                width: '100%',
                                                borderRadius: '1px',
                                                boxShadow:
                                                    'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px',
                                            }}
                                        >
                                            <Row className="box1" style={{ display: 'flex' }}>
                                                <Col span={24} style={{ position: 'relative' }}>
                                                    <h6>{t("DIMENSIONS & WEIGHT")}</h6>
                                                </Col>
                                            </Row>
                                            <div className="login-form">

                                                <Row>
                                                    <Col md={12} xs={24}>

                                                        <div className='packagingUnit'>
                                                            <span className='headingofLabel1'>{t("Dimensions Measurement Unit")}</span>
                                                            <span className="dotofShip">:</span>
                                                            <Form.Item
                                                                name="PackagTypeDimensionUnitCode"
                                                                className="select1"
                                                                rules={[{ required: true, message: "Required Dimension Measurement Unit Code" }]}
                                                                initialValue={data23?.PackagTypeDimensionUnitCode ? data23?.PackagTypeDimensionUnitCode : PackagTypeDimensionUnitCode}
                                                            >
                                                                <Radio.Group
                                                                    onChange={(e) => {
                                                                        const selectedOption2 = DimensionUnitCode2.find(option => option.value === e.target.value);
                                                                        setPackagTypeDimensionUnitDescription1(selectedOption2.label);
                                                                        setPackagTypeDimensionUnitCode(selectedOption2.value)
                                                                    }}
                                                                >
                                                                    {DimensionUnitCode2.map((option) => (
                                                                        <Radio key={option.value} value={option.value}>
                                                                            {option.value}
                                                                        </Radio>
                                                                    ))}
                                                                </Radio.Group>
                                                            </Form.Item>
                                                        </div>
                                                    </Col>
                                                    <Col md={12} xs={24}>
                                                        <div className='packagingUnit'>
                                                            <span className="headingofLabel1">{t("Weight Measurement Unit")}</span>
                                                            <span className="dotofShip">:</span>
                                                            <Form.Item
                                                                name="PackageWeightUnitCode"
                                                                className="select1"
                                                                rules={[{ required: true, message: "Required Weight Measurement Unit Code" }]}
                                                                initialValue={data23?.PackageWeightUnitCode ? data23?.PackageWeightUnitCode : PackageWeightUnitCode}
                                                            >
                                                                <Radio.Group onChange={(e) => {
                                                                    const selectedOption3 = PackageWeightUnitCode2.find(option => option.value === e.target.value);
                                                                    setPackageWeightUnitDescription1(selectedOption3.label);
                                                                    setPackageWeightUnitCode(selectedOption3.value)
                                                                }}
                                                                >
                                                                    {PackageWeightUnitCode2.map((option) => (
                                                                        <Radio key={option.value} value={option.value}>
                                                                            {option.value}
                                                                        </Radio>
                                                                    ))}
                                                                </Radio.Group>
                                                            </Form.Item>
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <Table
                                                    rowSelection={undefined}
                                                    dataSource={dataSource}
                                                    columns={columns}
                                                    scroll={{ x: true }}
                                                    responsive={true}
                                                    pagination={false}
                                                />
                                                <Button type="primary" onClick={handleAddRow} style={{ marginTop: "3%", marginRight: "2%" }}>
                                                    {t("ADD")}
                                                </Button>
                                                <Row>
                                                    <Col md={16} xs={24}>
                                                        <div className='packagingUnit' style={{ display: "flex", alignItems: "center", marginTop: "05%" }}>
                                                            <span className='headingofLabel1'>{t("Select Service")}</span>
                                                            <span className="dotofShip">:</span>
                                                            <Select
                                                                onChange={handleServicodeChange}
                                                                className='ServiceCodeSelect'
                                                                placeholder="Please Choose Service"
                                                                value={servicecode}
                                                            >
                                                                {shippingMethods.map((option) => (
                                                                    <Option key={option.value} value={option.value}>
                                                                        {option.label}
                                                                    </Option>
                                                                ))}
                                                            </Select>
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <div className="btnsValidate">
                                                    <Form.Item
                                                        name="remember"
                                                        valuePropName="checked"
                                                        initialValue={true}
                                                    >
                                                        <Button
                                                            htmlType="submit"
                                                            style={{ backgroundColor: 'red', color: 'white', fontWeight: 480 }}
                                                            onClick={handleClearAll}
                                                        >
                                                            {t("CLEAR ALL")}
                                                        </Button>
                                                    </Form.Item>
                                                    {/* <Form.Item
                                                        name="remember"
                                                        className="btnValidate"
                                                        valuePropName="checked"
                                                        initialValue={true}
                                                        style={{ marginLeft: "2%" }}
                                                    >
                                                        <Button key="ok" type="primary" className='btnSaveQuote' onClick={async () => {
                                                            await validationConfirm1();
                                                            await handleSave();
                                                        }}>
                                                            Save Details
                                                        </Button>
                                                    </Form.Item> */}
                                                    <Form.Item
                                                        name="remember"
                                                        className="btnValidate"
                                                        valuePropName="checked"
                                                        initialValue={true}
                                                        style={{ marginLeft: "2%" }}
                                                    >
                                                        <Button type="primary" htmlType="submit">
                                                            {t("GENERATE ORDER")}
                                                        </Button>
                                                    </Form.Item>
                                                </div>
                                            </div>
                                        </Card>
                                        <div style={{ padding: "1%" }}>
                                            <span>
                                                <span style={{ fontWeight: "bold" }}>{t("Please Note")} :</span>
                                                <span>
                                                    {t("Your dimensions will be rounded up to the next whole numbers to ensure accurate pricing based on the information provided.")}
                                                </span>
                                            </span>
                                        </div>
                                    </Card>
                                </Col>

                            </Form>

                            {(bill === true) && (info) ? (<div className="login-form" ref={containerRef}>
                                <Col md={24} xs={24} className="trackBox shippingBox1">
                                    <ShipmentFinal ShipFromAttentionName={ShipFromAttentionName} ShipFromPhoneNumber={ShipFromPhoneNumber} ShipFromName={info?.ShipFrom?.Name} ShipFromAddressLine1={info?.ShipFrom?.Address?.AddressLine} ShipFromCity={info?.ShipFrom?.Address?.City} ShipFromStateProvinceCode={info?.ShipFrom?.Address?.StateProvinceCode} ShipFromPostalCode={info?.ShipFrom?.Address?.PostalCode} ShipFromCountryCode={info?.ShipFrom?.Address?.CountryCode} ShipToAttentionName={ShipToAttentionName} ShipToPhoneNumber={ShipToPhoneNumber} ShipToName={info?.ShipTo?.Name}
                                        ShipToAddressLine1={info?.ShipTo?.Address?.AddressLine} ShipToCity={info?.ShipTo?.Address?.City} ShipToStateProvinceCode={info?.ShipTo?.Address?.StateProvinceCode} ShipToPostalCode={info?.ShipTo?.Address?.PostalCode} ShipToCountryCode={info?.ShipTo?.Address?.CountryCode} ShipMentType={info?.Description} serviceSelected={serviceCodeDiscription} serviceCode={servicecode} spinner={spinnerConfirm} spinnerStop={stopSpinnerConfirm}
                                        savedQuoteData={saveQuotData} />
                                </Col>
                            </div>) : null}
                        </Row>
                    </Content>
                </div>)}
        </>
    )
});

export default Quote;