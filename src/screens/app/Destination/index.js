import { Col, Rate, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { GET_COMMENTS_OF_DESTINATION, GET_DETAIL_LOCATION, GET_TOP_HOTELS_BY_DESTINATION } from "./redux/action";
import ShowMoreText from "react-show-more-text";
import { useTranslation } from "react-i18next";
import { Carousel } from "react-responsive-carousel";
import destinationDefaultImg from "assets/images/image_location_default.jpeg";
import Comment from "components/Comment/Comment";
import "./DestinationPage.sass";
import { Configs, REQUEST_STATE } from "configs";
import FullComponentLoading from "components/Loading/FullComponentLoading";
import TypeBox from "../Profile/pages/TypeBox";
import { isEmptyValue } from "utils/checkType";
import HotelItem from "screens/app/Destination/components/HotelItem"
import { CheckOutlined } from "@ant-design/icons";
import ReactImageGallery from "react-image-gallery";
import Destination from "assets/images/destination.png"
import AnalzyeComments from "./components/AnalzyeComments";

function LocationPage({ match, history }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const destination = useSelector((state) => state?.destination);
  const topHotels = useSelector((state) => state.destination?.topHotels);
  const totalHotels = useSelector((state) => state.destination?.totalHotels);
  const [currentCommentPage, setCurrentCommentPage] = useState(0);

  function viewMoreComments() {
    setCurrentCommentPage(currentCommentPage + 1);
    dispatch(GET_COMMENTS_OF_DESTINATION({
      id: match.params.id,
      page: currentCommentPage + 1,
      size: Configs.PAGE_SIZE_10,
    }));
  }

  useEffect(() => {
    dispatch(GET_DETAIL_LOCATION({
      id: match.params.id,
      page: currentCommentPage,
      size: Configs.PAGE_SIZE_10,
    }));
    dispatch(GET_TOP_HOTELS_BY_DESTINATION({
      destinationId: match.params.id,
      page: 0,
    }));
    dispatch(GET_COMMENTS_OF_DESTINATION({
      id: match.params.id,
      page: 0,
      size: Configs.PAGE_SIZE_10,
    }));
  }, [match.params.id, dispatch]);

  return (
    <div className="my-container destinationPage">
      {destination?.getDetailLocationState === REQUEST_STATE.REQUEST && (
        <FullComponentLoading bgColor="rgba(255,255,255,1)" />
      )}
      <div style={{
        display: "flex",
        flexDirection: "column",
      }}>
        <div
          className="destinationPageName"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {destination.detailLocation?.name}
          <img
            src={Destination}
            alt=""
            style={{
              width: "34px",
            }}
          />
        </div>
        <div style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "5px",
        }}>
          <Rate
            style={{
              fontSize: "20px",
              color: "#007bff",
            }}
            disabled
            defaultValue={destination.detailLocation?.averageScore ?? 5}
          />
          <div style={{
            marginBottom: "15px",
            margin: "6px 10px 0px 10px",
            textAlign: "center",
            fontSize: "24px",
            color: "#555"
          }}>&bull;</div>
          <div className="destinationPageCheckInCount">
            {destination.detailLocation?.checkInsCount}{" "}{t("peopleCheckInAtThisPlace")}
          </div>
        </div>
      </div>
      <Row
        gutter={10}
      >
        <div style={{ width: "100%" }}>
          {destination?.detailLocation?.medias?.length > 0 && <ReactImageGallery
            items={destination?.detailLocation?.medias.map(des => ({
              original: des?.url,
              thumbnail: des?.url,
            })) ?? []}
            slideDuration={300}
            infinite
            lazyLoad
          />}

          {destination.detailLocation?.medias?.length === 0 && (
            <img
              className="destinationPageDefaultImage protect-img"
              src={destinationDefaultImg}
              alt={destination?.detailLocation?.name}
            ></img>
          )}
        </div>
      </Row>
      <Row
        className="destinationPageInfo"
        style={{
          marginTop: "15px",
        }}
        gutter={10}

      >
        <Col span={16} className="destinationPageIntro">
          <div style={{
            fontSize: "24px",
            fontWeight: "bold",
            marginBottom: "5px",
          }}>
            {t("destination.intro")}
          </div>
          <ShowMoreText
            lines={4}
            more={t("showMore")}
            less={t("showLess")}
            className="destinationPageDescription"
            expanded={false}
          >
            {destination.detailLocation?.description}
          </ShowMoreText>
          {totalHotels > 0 && <div style={{
            marginRight: "18px",
            fontSize: "16px",
            textAlign: "start",
            maxWidth: "373px",
            minWidth: "300px",
          }}>
            <div>
              <span style={{
                fontWeight: 600,
                marginRight: "4px",
                fontSize: "24px",
              }}>
                {totalHotels}
              </span> {t("destination.luxuryAndCheapHotel")}
            </div>
            <div style={{
              display: "flex",
              alignItems: "center"
            }}>
              <CheckOutlined
                style={{
                  color: "#1890ff",
                  marginRight: "4px",
                }}
              />
              <span>
                <b>{t("destination.hundreds")}</b> {t("destination.outstandingUtils")}
              </span>
            </div>
            <div style={{
              display: "flex",
              alignItems: "center"
            }}>
              <CheckOutlined
                style={{
                  color: "#1890ff",
                  marginRight: "4px",
                }}
              />
              <span>
                <b>{t("destination.thoudsands")}</b> {t("destination.checkInPlaces")}
              </span>
            </div>
            <div style={{
              display: "flex",
              alignItems: "center"
            }}>
              <CheckOutlined
                style={{
                  color: "#1890ff",
                  marginRight: "4px",
                }}
              />
              <span>
                <b>{t("destination.more")}</b> {t("destination.cheapEatPlaces")}
              </span>
            </div>
          </div>}


        </Col>
        {topHotels.length > 0 && <Col span={8}>
          <div style={{
            display: "flex",
            flexDirection: "column",
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            padding: "15px",
            borderRadius: "10px",
          }}>
            <div style={{
              fontSize: '18px',
              fontWeight: "bold",
            }}>
              {t("destination.outstandingHotel")}
            </div>

            {
              (topHotels ?? []).map(hotel => {
                return hotel.medias[0] ? <HotelItem
                  hotel={hotel}
                /> : <div></div>;
              })
            }
          </div>
        </Col>}
      </Row>
      <Row
        style={{
          fontSize: "14px",
          marginTop: "40px",
        }}
        gutter={10}
      >
        <Col span={16}>
          <div className="destinationPageComment">
            <div className="destinationPageCommentList">
              <div className="destinationPageCommentTypeBox">
                <TypeBox
                  type="destination"
                  post={destination?.detailLocation}
                  hasRate={true}
                  page="destination"
                />
              </div>
              <div
                className="destinationPageCommentHeader"
              >
                {t("destination.listContributions")}
              </div>
              {destination?.listComments &&
                destination?.listComments.map((comment, index) => {
                  return (
                    <Comment
                      key={index}
                      comment={comment}
                      hasRate={true}
                      rate={comment?.star}
                    />
                  );
                })}
              {(destination?.listComments ?? []).length < destination?.totalComments && (
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "16px",
                  margin: "10px 0px 20px 0px",
                }}>
                  <div
                    className="destinationPageMoreComments"
                    style={{
                      textDecoration: "underline",
                    }}
                    onClick={viewMoreComments}
                  >
                    {t("destination.viewMoreComments")}
                  </div>
                  <div>
                    ({(destination?.listComments ?? []).length} {t("destination.of")} {destination?.totalComments})
                  </div>
                </div>
              )}
              {isEmptyValue(destination?.listComments) && (
                <div
                  className="flex-center"
                  style={{ color: "#777", marginTop: "6px", marginBottom: "30px" }}
                >
                  {t("destination.noPeopleRate")}
                </div>
              )}
            </div>
          </div>
        </Col>
        <Col
          span={8}
        >
          <AnalzyeComments />
        </Col>
      </Row>
      <div style={{
        height: "40px"
      }}>
      </div>
    </div>
  );
}

export default LocationPage;
