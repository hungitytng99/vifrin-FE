import Header from "components/Header/Header";
import "./HomePage.scss";
import FollowPane from "./components/FollowPane";
import { Col, Row } from "react-bootstrap";
import Feeds from "./components/Feeds";
import DailyPane from "./components/DailyPane";
import { Alert, Button } from "antd";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { BEEN_ALERT_UPDATE_PROFILE } from "configs";
import { isEmptyValue } from "utils/checkType";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { GET_LIST_SUGGEST_FOLLOWER } from "./redux/action";

function HomePage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  // var inFifteenMinutes = new Date(new Date().getTime() + 1 * 60 * 1000);
  function handleCloseAlertUpdateProfile() {
    Cookies.set(BEEN_ALERT_UPDATE_PROFILE, true, {
      expires: 3,
    });
  }

  function shouldShowAlertUpdateProfile() {
    if (!Cookies.get(BEEN_ALERT_UPDATE_PROFILE)) {
      if (
        isEmptyValue(user?.profile?.bio) ||
        isEmptyValue(user?.profile?.country) ||
        isEmptyValue(user?.profile?.phoneNumber) ||
        isEmptyValue(user?.profile?.gender) ||
        isEmptyValue(user?.profile?.dateOfBirth)
      ) {
        return true;
      }
    }
    return false;
  }

  useEffect(() => {
    dispatch(
      GET_LIST_SUGGEST_FOLLOWER({
        params: {
          size: 6,
        },
      })
    );
  }, [dispatch]);

  return (
    <div className="app-container">
      <div className="home-header">
        <Header />
      </div>
      <div className="content">
        <div className="my-container">
          <Row>
            <Col xl={8} lg={8} md={12} sm={12} xs={12}>
              {shouldShowAlertUpdateProfile() && (
                <div
                  className="homeAlertUpdateProfile"
                  style={{ marginTop: "15px" }}
                >
                  <Alert
                    message={t("updateYourProfileForTheBestExperience")}
                    type="warning"
                    showIcon
                    action={
                      <Button type="primary" size="small">
                        {t("updateNow")}
                      </Button>
                    }
                    closable
                    afterClose={handleCloseAlertUpdateProfile}
                  />
                </div>
              )}

              <div className="home-feeds">
                <div className="home-daily-post">
                  <DailyPane />
                </div>
                <div className="home-new-feed">
                  <Feeds />
                </div>
              </div>
            </Col>
            <Col xl={4} lg={4} md={0} sm={0} xs={0}>
              <div className="home-follows">
                <FollowPane
                  currentUser={{
                    ...user?.profile,
                    description: user?.profile?.fullName,
                  }}
                />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
