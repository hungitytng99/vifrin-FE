import { Col, Rate, Row } from "antd";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { GET_DETAIL_LOCATION } from "./redux/action";
import ShowMoreText from "react-show-more-text";
import { useTranslation } from "react-i18next";
import { Carousel } from "react-responsive-carousel";
import destinationDefaultImg from "assets/images/image_location_default.jpeg";
import Comment from "components/Comment/Comment";
import "./DestinationPage.sass";
import { REQUEST_STATE } from "configs";
import FullComponentLoading from "components/Loading/FullComponentLoading";
import TypeBox from "../Profile/pages/TypeBox";
import { isEmptyValue } from "utils/checkType";
import HotelItem from "screens/app/Destination/components/HotelItem"
import { CheckOutlined } from "@ant-design/icons";
import ReactImageGallery from "react-image-gallery";
import Destination from "assets/images/destination.png"

const images = [
  {
    original: 'https://picsum.photos/id/1018/1000/600/',
    thumbnail: 'https://picsum.photos/id/1018/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1015/1000/600/',
    thumbnail: 'https://picsum.photos/id/1015/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1019/1000/600/',
    thumbnail: 'https://picsum.photos/id/1019/250/150/',
  },
];

function LocationPage({ match, history }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const destination = useSelector((state) => state?.destination);
  console.log('destination?.detailLocation?.medias?: ', destination?.detailLocation?.medias);
  useEffect(() => {
    dispatch(GET_DETAIL_LOCATION({ id: match.params.id }));
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
      <Row>
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
      >
        <Col span={16} className="destinationPageIntro">
          <div style={{
            fontSize: "24px",
            fontWeight: "bold",
            marginBottom: "5px",
          }}>
            {/* {t("destination.intro")} */}
            Giới thiệu
          </div>
          <ShowMoreText
            lines={6}
            more={t("showMore")}
            less={t("showLess")}
            className="destinationPageDescription"
            expanded={false}
          >
            {destination.detailLocation?.description}
          </ShowMoreText>
          <div style={{
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
                +14
              </span>khách sạn cao cấp giá rẻ
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
                <b>Hàng trăm</b> tiện ích nổi bật
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
                <b>Hàng nghìn</b> địa điểm sống ảo
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
                <b>Nhiều</b> địa điểm ăn uống ngon bổ rẻ
              </span>
            </div>
          </div>

        </Col>
        <Col span={8}>
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
              Khách sạn nổi bật
            </div>
            <HotelItem />
            <HotelItem />
            <HotelItem />
            <HotelItem />
          </div>
        </Col>

      </Row>
      <Row style={{ fontSize: "14px", marginTop: "40px", }}>
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
                {/* {t("profile.listContribution")} */}
                Danh sách đóng góp
              </div>
              {destination.detailLocation?.listComment &&
                destination.detailLocation?.listComment.map((comment, index) => {
                  return (
                    <Comment
                      key={index}
                      comment={comment}
                      hasRate={true}
                      rate={comment?.star}
                    />
                  );
                })}
              {isEmptyValue(destination.detailLocation?.listComment) && (
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
        <Col span={8}>
          {/* {destination.detailLocation?.listComment && (
            <div>
              {t("totalRating")}:{" "}
              {destination.detailLocation?.listComment.length}
            </div>
          )}
          {isEmptyValue(destination.detailLocation?.listComment) ? (
            <div>{t("totalRating")}: 0</div>
          ) : (
            <></>
          )} */}
        </Col>
      </Row>
    </div>
  );
}

export default LocationPage;
