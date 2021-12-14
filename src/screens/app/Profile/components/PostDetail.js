import React, { useState } from "react";
import CommentsList from "screens/app/Home/components/CommentsList";
import { LIST_COMMENT } from "screens/app/Home/configs";
import { getMounthAndDay } from "../../../../utils/datetime";
import { Carousel } from "react-responsive-carousel";
import UserCard from "components/UserCard/UserCard";
import TypeBox from "screens/app/Home/components/TypeBox";
import { Link } from "react-router-dom";
import { Col, Divider, Row } from "antd";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

function PostDetail({ post }) {
  console.log('post: ', post);
  const { t } = useTranslation();
  const dispatch = useDispatch();

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

  return (
    <div className="postCardDetail" style={{ height: "100%" }}>
      <Row style={{ height: "100%" }}>
        <Col lg={16} className="postCardDetailImgBox flex-center">
          <Carousel showThumbs={false} emulateTouch={true}>
            {/* Lay min height of images => add to style to fix image view */}
            {post.medias.map((item) => {
              return <img key={item.id} src={item?.url} alt="img"></img>;
            })}
          </Carousel>
        </Col>
        <Col lg={8} className="postCardDetailComment">
          <div
            className="postCardCommentHeader"
            style={{ padding: "10px 10px 0px 10px" }}
          >
            <UserCard user={post.user} />
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
              {post.content && (
                <div className="postCardStatus">
                  <Link
                    to={`/profile/${post?.user?.username}`}
                    className="postCardStatusUsername"
                  >
                    {post?.user?.username}
                  </Link>
                  <div className="postCardStatusStatus">{post.content}</div>
                </div>
              )}
            </div>
            <div className="postCardCommentType">
              <TypeBox isFocusTextBox={isFocusComment} />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default PostDetail;
