import { Col, Row } from "antd";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { GET_DETAIL_LOCATION } from "./redux/action";
import ShowMoreText from "react-show-more-text";
import { useTranslation } from "react-i18next";
import { Divider } from "antd";
import { Carousel } from "react-responsive-carousel";
import locationDefaultImg from "assets/images/image_location_default.jpeg";

import "./LocationPage.sass";

function LocationPage({ match, history }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const location = useSelector((state) => state.location);

  useEffect(() => {
    dispatch(GET_DETAIL_LOCATION({ id: match.params.id }));
  }, [match.params.id, dispatch]);

  return (
    <div className="my-container locationPage">
      <Row className="locationPageInfo">
        <Col span={8} style={{ paddingRight: "15px" }}>
          <div style={{ width: "100%" }}>
            <Carousel showThumbs={false} emulateTouch={true}>
              {location.detailLocation?.medias?.map((media) => {
                if (media?.mime.includes("image"))
                  return (
                    <div className="flex-center">
                      <img key={media.id} src={media?.url} alt="img"></img>
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
            {location.detailLocation?.medias?.length === 0 && (
              <img
                className="locationPageDefaultImage protect-img"
                src={locationDefaultImg}
                alt={location?.detailLocation?.name}
              ></img>
            )}
          </div>
        </Col>
        <Col span={16}>
          <div className="locationPageName">
            {location.detailLocation?.name}
          </div>
          <ShowMoreText
            lines={3}
            more={t("showMore")}
            less={t("showLess")}
            className="locationPageDescription"
            expanded={false}
          >
            {location.detailLocation?.description}
          </ShowMoreText>
          <div className="locationPageScore flex-center">
            {location.detailLocation?.averageScore}
          </div>
        </Col>
      </Row>
      <Divider />
      <Row>
        
      </Row>
    </div>
  );
}

export default LocationPage;