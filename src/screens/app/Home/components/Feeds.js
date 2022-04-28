import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import FeedsPost from "./FeedsPost";
import "./Feeds.scss";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { HOMEPAGE_GET_FEED } from "../redux/action";
import { Spin } from "antd";
import { REQUEST_STATE } from "configs";
import FullComponentLoading from "components/Loading/FullComponentLoading";
import { t } from "i18next";

function Feeds() {
  const dispatch = useDispatch();
  const listPost = useSelector((state) => state.homepage?.listPostsInFeed) ?? [];
  const homepage = useSelector((state) => state?.homepage);
  const [pagination, setPagination] = useState({
    size: 14,
    page: 0,
  });

  function getPost() {
    dispatch(
      HOMEPAGE_GET_FEED({
        params: {
          ...pagination,
          size: pagination.size + 3,
        },
      })
    );
  }

  useEffect(() => {
    dispatch(HOMEPAGE_GET_FEED({ params: pagination }));
  }, [dispatch, pagination]);
  //   <h4 className="flex-center" style={{ padding: "10px" }}>
  //   Bạn đã xem hết tin trong ngày
  // </h4>
  return (
    <>
      {homepage?.getListPostsInFeedState === REQUEST_STATE.REQUEST && (
        <FullComponentLoading />
      )}
      <InfiniteScroll
        dataLength={listPost?.length}
        next={getPost}
        hasMore={listPost?.length < homepage?.total}
        loader={
          <div className="flex-center" style={{ padding: "10px 0px" }}>
            <Spin />
          </div>
        }
        endMessage={
          <div style={{ textAlign: "center", marginTop: "10px" }}>{t('yayYouHaveSeenItAll')}</div>
        }
      >
        {listPost?.map((i, index) => {
          return (
            <div key={i.id} className="feeds">
              <FeedsPost post={i}></FeedsPost>
            </div>
          );
        })}
      </InfiniteScroll>
    </>
  );
}

export default Feeds;
