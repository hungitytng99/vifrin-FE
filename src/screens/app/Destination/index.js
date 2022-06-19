import { Col, Row } from "antd";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { GET_DETAIL_LOCATION } from "./redux/action";
import ShowMoreText from "react-show-more-text";
import { useTranslation } from "react-i18next";
import { Divider } from "antd";
import { Carousel } from "react-responsive-carousel";
import destinationDefaultImg from "assets/images/image_location_default.jpeg";
import Comment from "components/Comment/Comment";
import "./LocationPage.sass";
import { REQUEST_STATE } from "configs";
import FullComponentLoading from "components/Loading/FullComponentLoading";
import TypeBox from "../Profile/pages/TypeBox";
import { isEmptyValue } from "utils/checkType";
import { CREATE_NEW_COMMENT_SUCCESS } from "../Profile/redux/action";

function LocationPage({ match, history }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const destination = useSelector((state) => state?.destination);

  useEffect(() => {
    dispatch(GET_DETAIL_LOCATION({ id: match.params.id }));
  }, [match.params.id, dispatch]);

  return (
    <div className="my-container destinationPage">
      {destination?.getDetailLocationState === REQUEST_STATE.REQUEST && (
        <FullComponentLoading bgColor="rgba(255,255,255,1)" />
      )}
      <Row className="destinationPageInfo">
        <Col span={8} style={{ paddingRight: "15px" }}>
          <div style={{ width: "100%" }}>
            <Carousel showThumbs={false} emulateTouch={true}>
              {destination.detailLocation?.medias?.map((media) => {
                if (media?.mime.includes("image"))
                  return (
                    <div
                      style={{ width: "100%", height: "180px" }}
                      className="flex-center"
                    >
                      <img
                        style={{ width: "100%", objectFit: "cover" }}
                        key={media.id}
                        src={media?.url}
                        alt="img"
                      ></img>
                    </div>
                  );
                else
                  return (
                    <div>
                      <video src={media?.url} controls height="100%"></video>
                      <div style={{ height: "20px" }}></div>
                    </div>
                  );
              })}
            </Carousel>
            {destination.detailLocation?.medias?.length === 0 && (
              <img
                className="destinationPageDefaultImage protect-img"
                src={destinationDefaultImg}
                alt={destination?.detailLocation?.name}
              ></img>
            )}
          </div>
        </Col>
        <Col span={16}>
          <div className="destinationPageName">
            {destination.detailLocation?.name}
          </div>
          <ShowMoreText
            lines={3}
            more={t("showMore")}
            less={t("showLess")}
            className="destinationPageDescription"
            expanded={false}
          >
            {destination.detailLocation?.description}
          </ShowMoreText>
          <div className="destinationPageScore flex-center">
            {destination.detailLocation?.averageScore}
          </div>
          <div className="destinationPageCheckInCount">
            {t("destination.haved")} {destination.detailLocation?.checkInsCount}{" "}
            {t("peopleCheckInAtThisPlace")}
          </div>
        </Col>
      </Row>
      <Divider style={{ margin: "10px" }} />
      <Row style={{ fontSize: "14px" }}>
        <Col span={8}>
          {destination.detailLocation?.listComment && (
            <div>
              {t("totalComments")}:{" "}
              {destination.detailLocation?.listComment.length}
            </div>
          )}
          {isEmptyValue(destination.detailLocation?.listComment) ? (
            <div>{t("totalComments")}: 0</div>
          ) : (
            <></>
          )}
        </Col>
        <Col span={16}>
          <div className="destinationPageComment">
            
            <div className="destinationPageCommentList">
              <div>
                <TypeBox
                  type="destination"
                  post={destination?.detailLocation}
                  hasRate={true}
                  page="destination"
                />
              </div>
              <div
              className="destinationPageCommentHeader"
              style={{ fontSize: "14px" }}
            >
              {t("profile.listPeopleRate")}
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
                  style={{ color: "#777", marginTop: "6px" }}
                >
                  {t("destination.noPeopleRate")}
                </div>
              )}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default LocationPage;
