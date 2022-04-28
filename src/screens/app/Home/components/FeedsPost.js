import React, { useEffect, useMemo, useRef, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import ControlModal from "./ControlModal";
import ReactTimeAgo from "react-time-ago";
import { useTranslation } from "react-i18next";
import ImageLoading from "components/ImageLoading/ImageLoading";
import { AVATAR_DEFAULT } from "configs";
import ReactModal from "react-modal";
import PostDetail from "screens/app/Profile/components/PostDetail";
import "./FeedsPost.sass";


const customStyles = {
  overlay: {
    zIndex: 1000,
    backgroundColor: "rgba(0,0,0,0.8)",
  },
  content: {
    top: "3%",
    left: "10%",
    right: "10%",
    bottom: "3%",
    borderRadius: "0px",
    padding: "0px",
    border: "none",
  },
};

function FeedsPost(props) {
  const { post } = props;
  const { t } = useTranslation();
  const [isLiked, setIsLiked] = useState(post?.likesCount);
  const [isFavourite, setIsFavourite] = useState(false);
  const [isOpenControl, setIsOpenControl] = useState(false);
  const [isShowDetailPost, setIsShowDetailPost] = useState(false);
  const [numLiked, setNumLiked] = useState(0);
  function handleLikedClick() {
    setIsLiked(!isLiked);
    isLiked ? setNumLiked(numLiked - 1) : setNumLiked(numLiked + 1);
  }
  function handleFavouriteClick() {
    setIsFavourite(!isFavourite);
  }
  function openControlModal() {
    document.body.style.overflow = "hidden";
    setIsOpenControl(true);
  }
  function closeControlModal() {
    document.body.style.overflow = "auto";
    setIsOpenControl(false);
  }
  function handleCloseDetailModal() {
    setIsShowDetailPost(false);
    // dispatch(RESET_DETAIL_PROFILE_STATE());
  }

  return (
    <div className="feeds-post">
      {/* <ControlModal
        modalIsOpen={isOpenControl}
        openModal={openControlModal}
        closeModal={closeControlModal}
        itemsList={CONTROL_LIST}
      /> */}
      <div className="post__user">
        <Link to={`/profile/${post?.user?.username}`}>
          <img
            className="post__user-avatar"
            src={post?.user?.avatarUrl ?? AVATAR_DEFAULT}
            alt="avatar-user"
          ></img>
        </Link>
        <div className="post__user-box">
          <div className="post__user-username">
            <Link to={`/profile/${post?.user?.username}`}>
              {post?.user?.username}
            </Link>
          </div>
          <Link
            className="post__user-location"
            to={`/location/${post?.destination?.id}`}
          >
            {post?.destination?.name}
          </Link>
        </div>
        <div className="post__user-control" onClick={openControlModal}>
          <i className="post__user-control --icon fas fa-ellipsis-h"></i>
        </div>
      </div>
      <Carousel showThumbs={false} emulateTouch={true}>
        {/* Lay min height of images => add to style to fix image view */}
        {post?.medias.map((media) => {
          return (
            <ImageLoading
              key={media?.id}
              className="feeds-post__img"
              src={media?.url}
              alt="img"
            ></ImageLoading>
          );
        })}
      </Carousel>
      <div className="feeds-post__text">
        <div className="post-interactive">
          <div className="post-interactive__group">
            {isLiked ? (
              <i
                className="post-interactive__icon --loved fas fa-heart"
                onClick={handleLikedClick}
              ></i>
            ) : (
              <i
                className="post-interactive__icon --love far fa-heart"
                onClick={handleLikedClick}
              ></i>
            )}
            <i className="post-interactive__icon --comment far fa-comment"></i>
            <i className="post-interactive__icon --share far fa-share-square"></i>
          </div>
          <div className="post-interactive__group">
            {!isFavourite ? (
              <i
                className="post-interactive__icon --bookmark far fa-bookmark"
                onClick={handleFavouriteClick}
              ></i>
            ) : (
              <i
                className="post-interactive__icon --bookmarked fas fa-bookmark"
                onClick={handleFavouriteClick}
              ></i>
            )}
          </div>
        </div>
        <div className="user-interactive">
          <div className="user-interactive__liked">
            <span>
              {numLiked} {t("likes")}
            </span>
          </div>
          <ReactTimeAgo
            className="user-interactive__time-created"
            date={post?.updatedAt}
            locale="vi"
          />
        </div>

        <div className="post-status">
          <Link
            to={`/profile/${post?.user?.username}`}
            className="post-status__username"
          >
            {post?.user?.username}
          </Link>
          <div className="post-status__status">{post?.content}</div>
        </div>
        <div className="feedPostShowDetailPost" onClick={() => setIsShowDetailPost(true)}>
          {post?.commentsCount > 0
            ? t("show") + " " + post?.commentsCount + " " + t("comments")
            : t("showDetailPost")}
        </div>
      </div>
      <ReactModal
        isOpen={isShowDetailPost}
        onRequestClose={handleCloseDetailModal}
        style={customStyles}
      >
        <PostDetail
          post={post}
          isShowDetailPost={isShowDetailPost}
          setIsShowDetailPost={setIsShowDetailPost}
        />
      </ReactModal>
    </div>
  );
}
export default FeedsPost;
