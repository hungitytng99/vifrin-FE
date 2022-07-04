import React from 'react';
import { Col, Rate, Row } from 'antd';
import { IMAGE_HOTEL_DEFAULT, IMAGE_LOCATION_DEFAULT } from 'configs';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import "./Style.sass"

function Component({
    hotel

}) {
    const history = useHistory();
    const { t } = useTranslation();
    function onClickItem() {
        // history.push(`/destination/${id}`)
    }
    return (
        <Row
            className="searchHotelItem"
            gutter={15}
            onClick={onClickItem}
        >
            <Col xs={4}>
                <div className="searchHotelImgBox">
                    <img
                        src={hotel?.medias[0]?.url ?? IMAGE_HOTEL_DEFAULT}
                        alt=""
                        className="searchHotelImg"
                    />
                </div>
            </Col>
            <Col xs={20} className="searchHotelDetail">
                <div className="searchHotelName">{hotel?.name}</div>
                <div className="searchHotelAddr">{hotel?.address}</div>
                <div className="searchHotelDesc">{hotel?.description}</div>
                <div className="searchHotelPrice">
                    <span style={{
                        textDecoration: "line-through",
                    }}>{hotel?.price}</span>
                    <span style={{
                        fontWeight: "bold",
                        color: "#007bff",
                        marginLeft: "6px",
                    }}>
                        {hotel?.salesPrice}
                    </span>
                </div>
                <div className="searchHotelRate">
                    <Rate
                        style={{
                            fontSize: "18px",
                            color: "#007bff",
                        }}
                        disabled
                        defaultValue={hotel?.averageScore ?? 5}
                    />
                </div>
            </Col>
        </Row>
    );
}

export default Component;