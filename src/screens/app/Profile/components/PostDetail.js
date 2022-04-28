import React, { useEffect, useMemo, useRef, useState } from "react";
import { getMounthAndDay } from "../../../../utils/datetime";
import { Carousel } from "react-responsive-carousel";
import UserCard from "components/UserCard/UserCard";
import { Link } from "react-router-dom";
import { Col, Divider, Row } from "antd";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import {
  GET_LIST_COMMENT_BY_POST, LIKE_A_POST,
} from "../redux/action";
import { useSelector } from "react-redux";
import Comment from "components/Comment/Comment";
import { REQUEST_STATE } from "configs";
import FullComponentLoading from "components/Loading/FullComponentLoading";
import "./PostDetail.sass";
import TypeBox from "./TypeBox";

function PostDetail({ post, isShowDetailPost, setIsShowDetailPost }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isLiked, setIsLiked] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);
  const [numLiked, setNumLiked] = useState(post.likesCount);
  const [isFocusComment, setIsFocusComment] = useState({ focus: false });
  const comments =
    useSelector((state) => state.profile?.listCommentByPost) ?? [];
  const profile = useSelector((state) => state.profile);
  const user = useSelector((state) => state.user.profile);
  const bottomListCommentRef = useRef(null);


  function handleLikedClick() {
    setIsLiked(!isLiked);
    isLiked ? setNumLiked(numLiked - 1) : setNumLiked(numLiked + 1);
    dispatch(LIKE_A_POST({
      postId: post.id,
    }))
  }
  function handleFavouriteClick() {
    setIsFavourite(!isFavourite);
  }

  function handleCommentClick() {
    setIsFocusComment({ focus: true });
  }

  const AlwaysScrollToBottom = () => {
    useEffect(() => bottomListCommentRef.current.scrollIntoView());
    return <div ref={bottomListCommentRef} />;
  };

  function scrollToBottomListComment() {
    bottomListCommentRef.current.scrollIntoView({ behavior: "smooth" });
  }
  useEffect(() => {
    dispatch(GET_LIST_COMMENT_BY_POST({ id: post.id }));
  }, [dispatch, post.id]);

  return (
    <div className="postDetail" style={{ height: "100%" }}>
      <Row style={{ height: "100%" }}>
        <Col lg={16} className="postDetailImgBox flex-center">
          <Carousel showThumbs={false} emulateTouch={true}>
            {/* Lay min height of images => add to style to fix image view */}
            {post.medias.map((media) => {
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
        </Col>
        <Col lg={8} className="postDetailComment">
          <div
            className="postDetailCommentHeader"
            style={{ padding: "10px 10px 0px 10px" }}
          >
            <UserCard
              user={post.user}
              onClickCardAction={() => setIsShowDetailPost(false)}
              destination={post?.destination}
            />
          </div>
          <Divider style={{ margin: "0px 0px 10px 0px" }} />
          <div className="postDetailCommentBox">
            {profile?.getListCommentByPostState === REQUEST_STATE.REQUEST ? (
              <FullComponentLoading />
            ) : (
              <div className="postDetailCommentList">
                {comments.length === 0 && (
                  <div className="postDetailNoComment">
                    {t("thisPostHasNoComment")}
                  </div>
                )}
                {comments.map((comment, index) => {
                  return <Comment key={index} comment={comment} />;
                })}
                <AlwaysScrollToBottom />
              </div>
            )}
            <Divider style={{ margin: "10px 0px 10px 0px" }} />
            <div className="postDetailInteractive">
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
                <div className="postDetailStatus">
                  <Link
                    to={`/profile/${post?.user?.username}`}
                    className="postDetailStatusUsername"
                  >
                    {post?.user?.username}
                  </Link>
                  <div className="postDetailStatusStatus">{post.content}</div>
                </div>
              )}
            </div>
            <div className="postDetailCommentType">
              <TypeBox
                user={user}
                post={post}
                isFocusTextBox={isFocusComment}
                scrollToBottomListComment={scrollToBottomListComment}
                isShowDetailPost={isShowDetailPost}
              />
            </div>
          </div>
        </Col>
      </Row>
      
    </div>
  );
}

export default PostDetail;
