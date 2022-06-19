import React from 'react';
import { Col, Row } from 'antd';
import DestinationItem from './DestinationTopItem';
import "./DestinationTop.sass"
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useRef } from 'react';
import { useState } from 'react';

function TopDestination(props) {
    const { t } = useTranslation();
    const listDestinationRef = useRef();
    const listTopDestination = useSelector(state => state.homepage?.listTopDestinations) ?? [];
    const [currentScrollPosition, setCurrentScrollPosition] = useState(0);

    const scroll = (e, scrollOffset) => {
        listDestinationRef.current.scrollLeft += scrollOffset;
        setCurrentScrollPosition(listDestinationRef.current.scrollLeft);
        console.log('listDestinationRef.current.scrollLeft: ', listDestinationRef.current.scrollLeft);
        console.log('listDestinationRef.current?.offsetWidth: ', listDestinationRef.current?.offsetWidth);
        console.log('listDestinationRef.current?.offsetLeft: ', listDestinationRef.current?.offsetLeft);
        console.log('listDestinationRef.current?.clientWidth: ', listDestinationRef.current?.clientWidth);
        console.log('listDestinationRef.current?.clientLeft: ', listDestinationRef.current?.clientLeft);

    };

    return (
        <div className="topDestination">
            <div className="topDestinationText">
                {t("home.topAttractiveDestination")}
            </div>
            <div className="topDestinationList">

                {currentScrollPosition > 0 && <div className="topDestinationGoLeft" onClick={(e) => scroll(e, -listDestinationRef.current.offsetWidth)}>
                    <LeftOutlined />
                </div>}

                <div
                    className="topDestinationRow"
                    ref={listDestinationRef}
                >
                    {listTopDestination?.map((destination, index) => (
                        destination?.medias[0] ? <Col
                            xs={5}
                            key={destination?.id}
                            style={{
                                marginRight: "15px",
                            }}
                        >
                            <DestinationItem
                                ranking={index}
                                destination={destination}
                            />
                        </Col> : <div></div>
                    ))}
                </div>
                <div className="topDestinationGoRight" onClick={(e) => scroll(e, listDestinationRef.current.offsetWidth)}>

                    <RightOutlined />
                </div>
                {currentScrollPosition < listDestinationRef.current?.scrollRight && <div className="topDestinationGoRight" onClick={(e) => scroll(e, listDestinationRef.current.offsetWidth)}>
                    <RightOutlined />
                </div>}

            </div>
        </div>
    );
}

export default TopDestination;