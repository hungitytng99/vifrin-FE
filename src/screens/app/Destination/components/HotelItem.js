import { Col, Modal, Rate, Row } from 'antd';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import HotelDetail from "components/HotelDetail"
import "./HotelItem.sass";
import 'antd/dist/antd.css';
import { PhoneOutlined } from '@ant-design/icons';

function HotelTopItem({
    hotel,
}) {
    const history = useHistory();
    const [visible, setVisible] = useState(false);

    function showDetailModal() {
        setVisible(true);
    };

    function hideModal() {
        setVisible(false);
    };

    return (
        <>
            <div
                className="hotelTopItem"
                onClick={showDetailModal}
            >
                <Row>
                    <Col xs={8} >

                        <img className="hotelTopItemImg" src={hotel?.medias[0]?.url} alt="avatar" />
                    </Col>
                    <Col xs={16}>
                        <div className="hotelTopItemDetail">
                            <div className="hotelTopItemName">
                                {hotel?.name}
                            </div>
                            <div className="hotelTopItemPrice">
                                <span>
                                    {hotel?.price} ~ {hotel?.salesPrice}
                                </span>
                            </div>
                            <div
                                className="hotelTopItemAddress"
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <span style={{
                                    marginRight: "4px",
                                    marginBottom: "6px",
                                }}>
                                    <PhoneOutlined />
                                </span>
                                {hotel?.phone}
                            </div>
                            <div className="hotelTopItemRating">
                                <Rate
                                    allowClear={false}
                                    disabled
                                    defaultValue={hotel?.averageScore}
                                    style={{ fontSize: "14px", color: "#007bff", }}
                                />
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
            <Modal
                visible={visible}
                footer={null}
                onCancel={hideModal}
                width="1100px"
            >
                <HotelDetail
                    hotel={hotel}
                />
            </Modal>
        </>

    );
}

export default HotelTopItem;