import React from 'react';
import { Col, Rate, Row } from 'antd';
import { IMAGE_LOCATION_DEFAULT } from 'configs';
import "./Style.sass"
import { useHistory } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

function Component({
    name,
    desc,
    img,
    rate,
    id,
    checkInsCount,

}) {
    const history = useHistory();
    const { t } = useTranslation();
    function onClickItem() {
        history.push(`/destination/${id}`)
    }
    return (
        <Row
            className="searchDestinationItem"
            gutter={15}
            onClick={onClickItem}
        >
            <Col xs={4}>
                <div className="searchDestinationImgBox">
                    <img
                        src={img ?? IMAGE_LOCATION_DEFAULT}
                        alt=""
                        className="searchDestinationImg"
                    />
                </div>
            </Col>
            <Col xs={20} className="searchDestinationDetail">
                <div className="searchDestinationName">{name}</div>
                <div className="searchDestinationDesc">{desc}</div>
                {rate > 0 ? <Rate
                    allowClear={false}
                    disabled
                    defaultValue={rate}
                    style={{
                        fontSize: "16px",
                        color: "#007bff",
                    }} /> : <div className="searchDestinationNoRating">{t("searchDestiantionItem.noRating")}</div>}
                <div className="searchDestinationTotalCheckins">
                    <UserOutlined />  <span 
                        style={{
                            margin: "4px 0px 0px 6px",
                        }}
                    >{checkInsCount} {t("peopleCheckInAtThisPlace")}</span>
                </div>

            </Col>
        </Row>
    );
}

export default Component;