import React, { useEffect, useState } from "react";
import "./PostCard.sass";
import { HeartOutlined, CommentOutlined } from "@ant-design/icons";
import ReactModal from "react-modal";
import { Col, Divider, Row } from "antd";
import { useDispatch } from "react-redux";
import { RESET_DETAIL_PROFILE_STATE } from "../redux/action";
import UserCard from "components/UserCard/UserCard";
import TypeBox from "screens/app/Home/components/TypeBox";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CommentsList from "screens/app/Home/components/CommentsList";
import { LIST_COMMENT } from "screens/app/Home/configs";
import { getMounthAndDay } from "../../../../utils/datetime";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const customStyles = {
  overlay: {
    animation: "appear 0.3s linear",
    zIndex: 960,
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
    animation: "appear 0.1s ease-in",
  },
};
function PostCard({ post }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [isShowDetailPost, setIsShowDetailPost] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);
  const [numLiked, setNumLiked] = useState(post.likesCount);
  const [isFocusComment, setIsFocusComment] = useState(false);

  function handleLikedClick() {
    setIsLiked(!isLiked);
    isLiked ? setNumLiked(numLiked - 1) : setNumLiked(numLiked + 1);
  }
  function handleFavouriteClick() {
    setIsFavourite(!isFavourite);
  }

  function handleCommentClick() {
    setIsFocusComment(true);
  }

  function handleCloseDetailModal() {
    setIsShowDetailPost(false);
    dispatch(RESET_DETAIL_PROFILE_STATE());
  }

  useEffect(() => {
    if (isShowDetailPost) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isShowDetailPost]);

  return (
    <>
      <div
        className="postCard flex-center"
        onClick={() => setIsShowDetailPost(true)}
      >
        <img className="postCardImg" src={post.medias[0]?.url} alt="avatar" />
        <div className="postCardOverlay flex-center">
          <div className="postCardOverlayReaction flex-center">
            <HeartOutlined />
            <span style={{ marginLeft: "6px" }}>
              {post?.likesCount ? post?.likesCount : 0}
            </span>
          </div>

          <div
            className="postCardOverlayReaction flex-center"
            style={{ marginLeft: "20px" }}
          >
            <CommentOutlined />
            <span style={{ marginLeft: "6px" }}>
              {post?.commentsCount ? post?.commentsCount : 0}
            </span>
          </div>
        </div>
      </div>
      <ReactModal
        isOpen={isShowDetailPost}
        onRequestClose={handleCloseDetailModal}
        style={customStyles}
      >
        <div className="postCardDetail" style={{ height: "100%" }}>
          <Row style={{ height: "100%" }}>
            <Col lg={16} className="postCardDetailImgBox flex-center">
              <Carousel showThumbs={false} emulateTouch={true}>
                {/* Lay min height of images => add to style to fix image view */}
                {post.medias.map((item) => {
                  return (
                    <img
                      key={item.id}
                      className="feeds-post__img"
                      src={item.url}
                      alt="img"
                    ></img>
                  );
                })}
              </Carousel>
            </Col>
            <Col lg={8} className="postCardDetailComment">
              <div
                className="postCardCommentHeader"
                style={{ padding: "10px 10px 0px 10px" }}
              >
                <UserCard />
              </div>
              <Divider style={{ margin: "0px 0px 10px 0px" }} />
              <div className="postCardCommentBox">
                <div className="postCardCommentList">
                  <CommentsList listComments={LIST_COMMENT} />
                </div>
                <Divider style={{ margin: "10px 0px 10px 0px" }} />
                <div className="postCardInteractive">
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
                      <i
                        className="post-interactive__icon --comment far fa-comment"
                        onClick={handleCommentClick}
                      ></i>
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
                      {numLiked} {numLiked > 0 ? t("likes") : t("like")}
                    </div>
                    <div className="user-interactive__time-created">
                      {getMounthAndDay(post.updatedAt, t)}
                    </div>
                  </div>

                  <div className="postCardStatus">
                    <Link
                      to={`/profile/aaaa`}
                      className="postCardStatusUsername"
                    >
                      aaaa
                    </Link>
                    <div className="postCardStatusStatus">{post.content}</div>
                  </div>
                </div>
                <div className="postCardCommentType">
                  <TypeBox isFocusTextBox={isFocusComment} />
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </ReactModal>
    </>
  );
}

export default PostCard;
