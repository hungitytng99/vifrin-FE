import React, { useCallback, useEffect, useState } from "react";
import { Alert, Spin, Tabs } from "antd";
import "./SearchPage.sass"
import { useHistory } from "react-router-dom";
import { useQuery } from "hooks/custom";
import { SEARCH_BY_KEY } from "./redux/action";
import { useDispatch, useSelector } from "react-redux";
import { AVATAR_DEFAULT, IMAGE_HOTEL_DEFAULT, REQUEST_STATE } from "configs";
import FullComponentLoading from "components/Loading/FullComponentLoading";
import SearchDestinationItem from "screens/app/Search/components/SearchDestinationItem"
import SearchUserItem from "screens/app/Search/components/SearchUserItem"
import SearchHotelItem from "screens/app/Search/components/SearchHotelItem"
import { t } from "i18next";
const { TabPane } = Tabs;

function Page() {
  const history = useHistory();
  const dispatch = useDispatch();
  const query = useQuery();
  const searchResult = useSelector(state => state.search.result);

  const onChange = (key) => {
    console.log(key);
  };

  useEffect(() => {
    dispatch(SEARCH_BY_KEY({ key: query.get("key") }));
  }, [query.get("key"), dispatch])

  if (searchResult.state === REQUEST_STATE.REQUEST) {
    return <div
      className="flex-center"
      style={{
        marginTop: "60px",
      }}
    >
      <Spin size="large" />
    </div>
  }

  return (
    <div className="my-container searchPage">
      <div className="searchPageFor">
        Kết quả tìm kiếm cho "{query.get("key")}"
      </div>
      <Tabs
        defaultActiveKey="1"
        onChange={onChange}
        tabPosition="left"
      >
        <TabPane tab="Địa điểm" key="1">
          <div className="searchPageResultCount">
            <Alert
              message={t("searchPage.Total") + " " + (searchResult?.data?.destinations ?? []).length + " " + t("searchPage.results")}
              type="info"
              style={{
                fontSize: "16px",
              }}
            />
          </div>
          {(searchResult?.data?.destinations ?? []).map(destination => <SearchDestinationItem
            name={destination?.name}
            desc={destination?.description}
            rating={destination?.averageScore ?? 5}
            img={destination.medias[0]?.url}
            id={destination?.id}
            key={destination?.id}
            checkInsCount={destination.checkInsCount}
          />)}
        </TabPane>
        <TabPane tab="Người dùng" key="2">
          <div className="searchPageResultCount">
            <Alert
              message={t("searchPage.Total") + " " + (searchResult?.data?.users ?? []).length + " " + t("searchPage.results")}
              type="info"
              style={{
                fontSize: "16px",
              }}
            />
          </div>
          {(searchResult?.data?.users ?? []).map(user => <SearchUserItem
            name={user?.fullName}
            img={user?.avatarUrl ?? AVATAR_DEFAULT}
            id={user?.id}
            key={user?.id}
            username={user?.username}
          />)}
        </TabPane>
        <TabPane tab="Khách sạn" key="3">
          <div className="searchPageResultCount">
            <Alert
              message={t("searchPage.Total") + " " + (searchResult?.data?.hotels ?? []).length + " " + t("searchPage.results")}
              type="info"
              style={{
                fontSize: "16px",
              }}
            />
          </div>
          {(searchResult?.data?.hotels ?? []).map(hotel => <SearchHotelItem
            hotel={hotel}
          />)}
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Page;