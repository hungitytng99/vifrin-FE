import React from 'react';
import { Col, Rate, Row } from 'antd';
import { IMAGE_LOCATION_DEFAULT } from 'configs';
import { useHistory } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import "./Style.sass"

function Component({
    name,
    username,
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
            className="searchUserItem"
            gutter={15}
            onClick={onClickItem}
        >
            <Col xs={4}>
                <div className="searchUserImgBox">
                    <img
                        src={img ?? IMAGE_LOCATION_DEFAULT}
                        alt=""
                        className="searchUserImg"
                    />
                </div>
            </Col>
            <Col xs={20} className="searchUserDetail">
                <div className="searchUserName">{name} <span style={{
                    fontWeight: 400,
                }}>({username})</span></div>
            </Col>
        </Row>
    );
}

export default Component;