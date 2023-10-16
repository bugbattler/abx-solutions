import { Space, Spin, Timeline } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Trackorder } from '../../redux/createSlice/TrackOrder';
import { useTranslation } from 'react-i18next';

const OrderTimeLine = ({ ship_id }) => {
    const { t } = useTranslation()

    const dispatch = useDispatch();
    const [deliveryData, setData] = useState({});

    const data1 = useSelector((state) => state.track?.track);
    useEffect(() => {
        dispatch(Trackorder(ship_id));
    }, [ship_id]);
    const error = useSelector((state) => state.track?.error);
    const loading = useSelector((state) => state.track?.loading);
    useEffect(() => {
        setData(data1);
    }, [data1, ship_id, error, loading])

    if (!deliveryData || !deliveryData.trackResponse || !deliveryData.trackResponse.shipment) {
        return (
            <>
                {loading ? (
                    <Space direction="vertical" className="bodyOfSpin1">
                        <Space>
                            <Spin tip="Loading" size="large">
                                <div className="content13" />
                            </Spin>
                        </Space>
                    </Space>
                ) : (<div>{t("No delivery data available.")}</div>)}
            </>)
    }

    const shipment = deliveryData.trackResponse.shipment[0];
    if (!shipment || !shipment.package || shipment.package.length === 0) {
        return (
            <>
                {loading ? (
                    <Space direction="vertical" className="bodyOfSpin1">
                        <Space>
                            <Spin tip="Loading" size="large">
                                <div className="content13" />
                            </Spin>
                        </Space>
                    </Space>
                ) : (<div>{t("No package data available.")}</div>)}
            </>)
    }

    const packageData = shipment.package[0];
    if (!packageData.activity || packageData.activity.length === 0) {
        return (
            <>
                {loading ? (
                    <Space direction="vertical" className="bodyOfSpin1">
                        <Space>
                            <Spin tip="Loading" size="large">
                                <div className="content13" />
                            </Spin>
                        </Space>
                    </Space>
                ) : (<div>{t("No activity data available.")}</div>)}
            </>)
    }


    const timelineItems = packageData.activity.map(activity => {
        const dateStr = activity.date;
        const timeStr = activity.time;
        const year = dateStr.slice(0, 4);
        const month = dateStr.slice(4, 6) - 1;
        const day = dateStr.slice(6, 8);
        const hour = timeStr.slice(0, 2);
        const minute = timeStr.slice(2, 4);
        const second = timeStr.slice(4, 6);
        const dateObj = new Date(year, month, day, hour, minute, second);

        const formattedDate = dateObj.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });

        const formattedTime = dateObj.toLocaleString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
        });

        const city = activity.location.address.city || '';
        const stateProvince = activity.location.address.stateProvince || '';
        const countryCode = activity.location.address.countryCode || '';

        return {
            key: activity.date + activity.time,
            title: activity.status.description,
            description: `${city && `${city}, `}${stateProvince && `${stateProvince}, `}${countryCode || ''}`,
            time: `${formattedDate}, ${formattedTime}`,
        };
    });
    timelineItems.reverse();
    const deldata = deliveryData?.trackResponse?.shipment[0].package[0];
    const trackingNo = deldata?.trackingNumber;
    const noOfPackages = deldata?.packageCount;
    const dateStr = deldata?.deliveryDate[0]?.date;
    const timeStr = deldata?.deliveryTime?.endTime;


    const year = dateStr?.slice(0, 4);
    const month = dateStr?.slice(4, 6) - 1;
    const day = dateStr?.slice(6, 8);
    const hour = timeStr?.slice(0, 2);
    const minute = timeStr?.slice(2, 4);
    const second = timeStr?.slice(4, 6);

    const dateObj = new Date(year, month, day, hour, minute, second);


    const formattedDate = dateObj?.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const formattedTime = dateObj?.toLocaleString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
    });

    return (
        <>
            {loading ? (
                <Space direction="vertical" className="bodyOfSpin1">
                    <Space>
                        <Spin tip="Loading" size="large">
                            <div className="content13" />
                        </Spin>
                    </Space>
                </Space>
            ) : (
                <>
                    {error ? (<div>{t("No delivery data available.")}</div>) : (<>
                        <p>{t("Inquiry No")} : {deliveryData?.trackResponse?.shipment[0]?.inquiryNumber}</p >
                        <p>{t("Tracking No")} : {trackingNo}</p>
                        <p>{t("No Of Packages")} : {noOfPackages}</p>
                        <p>{t("Delivery Date and Time")} : {formattedDate} , {formattedTime}</p>
                        <Timeline>
                            {timelineItems.map(item => (
                                <Timeline.Item key={item.key} color="blue">
                                    <p>{item.title}</p>
                                    <p>{item.description}</p>
                                    <p>{item.time}</p>
                                </Timeline.Item>
                            ))}
                        </Timeline></>
                    )}
                </>
            )}

        </>
    );
};

export default React.memo(OrderTimeLine);
