import React from 'react';
import top1 from "assets/images/top-1.png"
import number2 from "assets/images/number-2.png"
import number3 from "assets/images/number-3.png"
import "./HotelItem.sass"
import { useHistory } from 'react-router-dom';
import { Col, Row } from 'antd';

function DestinationTopItem({
    ranking,
    destination,
}) {
    const history = useHistory();
    function onClickDotelItem(id) {

    }

    return (
        <div
            className="hotelTopItem"
            onClick={() => onClickDotelItem(destination?.id)}
        >
            <Row>
                <Col xs={8} >
                    <img className="hotelTopItemImg" src={"https://picsum.photos/300/300"} alt="avatar" />
                </Col>
                <Col xs={16}>
                    <div className="hotelTopItemDetail">
                        <div className="hotelTopItemName">
                            Khách sạn 3 con sâu
                        </div>
                        <div className="hotelTopItemRating">
                            5 sao
                        </div>
                        <div className="hotelTopItemPrice">
                            <span>400000</span>
                            <span>300000</span>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default DestinationTopItem;