import FullComponentLoading from "components/Loading/FullComponentLoading";
import { REQUEST_STATE } from "configs";
import React, { useCallback, useEffect, useState } from "react";
import Gallery from "react-photo-gallery";
import { useDispatch, useSelector } from "react-redux";
import CustomGalleryItem from "./components/CustomGalleryItem";
import { GET_EXPLORE_DESTINATIONS } from "./redux/action";

function Page({ match, history }) {
  const dispatch = useDispatch();
  const listPhotos = useSelector(state => state.explore?.listDestinations) ?? [];

  useEffect(() => {
    dispatch(GET_EXPLORE_DESTINATIONS({
      page: 0,
      size: 100,
    }));
  }, [])

  const imageRenderer = useCallback(
    ({ index, left, top, key, photo }) => (
      <CustomGalleryItem
        key={key}
        margin={"1px"}
        index={index}
        photo={photo}
        left={left}
        top={top}
      />
    ), []
  );

  return (
    <div>
      {
        listPhotos?.state === REQUEST_STATE.REQUEST && <FullComponentLoading
          opacity={0.5}
        />
      }
      {
        listPhotos?.state === REQUEST_STATE.SUCCESS && <Gallery
          photos={listPhotos?.data ?? []}
          renderImage={imageRenderer}
        />
      }

    </div>
  );
}

export default Page;