import { CheckOutlined, PhoneOutlined } from '@ant-design/icons';
import { Col, Rate, Row } from 'antd';
import { Carousel } from 'react-responsive-carousel';
import pools from "assets/images/utils/swimming-pool.png";
import restaurant from "assets/images/utils/cafe.png";
import park from "assets/images/utils/signage.png";
import elevator from "assets/images/utils/elevator.png";
import bathtub from "assets/images/utils/bathtub.png";
import airConditioner from "assets/images/utils/air-conditioner.png";
import wifi from "assets/images/utils/wifi.png";
import money from "assets/images/utils/money.png";
import map from "assets/images/utils/map.png";
import phone from "assets/images/utils/phone-call.png";
import "./Style.sass";
import { IMAGE_HOTEL_DEFAULT } from 'configs';
import ReactImageGallery from 'react-image-gallery';

function Page({
    hotel,
}) {
    return (
        <Row gutter={10}>
            <Col xs={14}>
                <ReactImageGallery
                    items={(hotel?.medias ?? []).map(media => ({
                        original: media?.url,
                        thumbnail: media?.url,
                    })) ?? []}
                    slideDuration={300}
                    infinite
                    lazyLoad
                    thumbnailPosition='left'
                />
            </Col>
            <Col xs={10}>
                <div className='hotelDetailDesc'>{hotel?.description}</div>
                <div className="hotelDetailAddress">
                    <div style={{
                        width: "33px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <img
                            src={map}
                            style={{
                                width: "22px",
                                marginRight: "5px",
                            }}
                        />
                    </div>
                    <span style={{
                        marginTop: "4px",
                        fontSize: "16px"
                    }}>
                        {hotel?.address}
                    </span>
                </div>
                <div className="hotelDetailRating">
                    <div style={{
                        width: "28px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <img
                            src={phone}
                            style={{
                                width: "22px",
                            }}
                        />
                    </div>
                    <span style={{
                        marginTop: "4px",
                        marginLeft: "4px",
                    }}>
                        {hotel?.phone}
                    </span>
                </div>

                <div
                    className="hotelDetailPrice"
                    style={{
                        marginTop: "4px"
                    }}
                >
                    <div style={{
                        width: "33px",
                        display: "flex",
                        justifyContent: "center",
                    }}>
                        <img
                            src={money}
                            style={{
                                width: "25px",
                                marginRight: "5px",
                            }}
                        />
                    </div>
                    <span>
                        {hotel?.price} ~ {hotel?.salesPrice}
                    </span>
                </div>
                <div style={{
                    fontSize: "18px",
                    fontWeight: 600,
                    marginTop: "10px",
                }}>
                    Tiện ích
                </div>
                <div className="hotelDetailUtils">
                    {hotel?.hasSwimmingPool && <div className="hotelDetailUtilsItem">
                        <img
                            src={pools}
                            style={{
                                width: "40px",
                            }}
                        ></img>
                        <CheckOutlined
                            className="hotelDetailUtilsStatus"
                            style={{
                                color: "green",
                                marginTop: "3px",
                            }}
                        />
                    </div>}
                    {
                        hotel?.hasRestaurant && <div className="hotelDetailUtilsItem">
                            <img
                                src={restaurant}
                                style={{
                                    width: "40px",
                                }}
                            ></img>
                            <CheckOutlined
                                className="hotelDetailUtilsStatus"
                                style={{
                                    color: "green",
                                    marginTop: "3px",
                                }}
                            />
                        </div>
                    }

                    {
                        hotel?.hasParking && <div className="hotelDetailUtilsItem">
                            <img
                                src={park}
                                style={{
                                    width: "40px",
                                }}
                            ></img>
                            <CheckOutlined
                                className="hotelDetailUtilsStatus"
                                style={{
                                    color: "green",
                                    marginTop: "3px",
                                }}
                            />
                        </div>
                    }

                    {
                        hotel?.hasElevator && <div className="hotelDetailUtilsItem">
                            <img
                                src={elevator}
                                style={{
                                    width: "40px",
                                }}
                            ></img>
                            <CheckOutlined
                                className="hotelDetailUtilsStatus"
                                style={{
                                    color: "green",
                                    marginTop: "3px",
                                }}
                            />
                        </div>
                    }

                    {
                        hotel?.hasBathroom && <div className="hotelDetailUtilsItem">
                            <img
                                src={bathtub}
                                style={{
                                    width: "40px",
                                }}
                            ></img>
                            <CheckOutlined
                                className="hotelDetailUtilsStatus"
                                style={{
                                    color: "green",
                                    marginTop: "3px",
                                }}
                            />
                        </div>
                    }

                    {
                        hotel?.hasAirConditioner && <div className="hotelDetailUtilsItem">
                            <img
                                src={airConditioner}
                                style={{
                                    width: "40px",
                                }}
                            ></img>
                            <CheckOutlined
                                className="hotelDetailUtilsStatus"
                                style={{
                                    color: "green",
                                    marginTop: "3px",
                                }}
                            />
                        </div>
                    }

                    {
                        hotel?.hasWifi && <div className="hotelDetailUtilsItem">
                            <img
                                src={wifi}
                                style={{
                                    width: "40px",
                                }}
                            ></img>
                            <CheckOutlined
                                className="hotelDetailUtilsStatus"
                                style={{
                                    color: "green",
                                    marginTop: "3px",
                                }}
                            />
                        </div>
                    }
                </div>
            </Col>
        </Row>
    );
}

export default Page;