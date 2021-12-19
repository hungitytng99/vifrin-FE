import React, { useEffect, useState } from "react";
import "./PostCard.sass";
import {
  HeartOutlined,
  CommentOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import ReactModal from "react-modal";
import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  DELETE_POST,
  RESET_DETAIL_PROFILE_STATE,
  RESET_LIST_COMMENT_BY_POST,
} from "../redux/action";
import { useTranslation } from "react-i18next";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import PostEdit from "./PostEdit";
import { IMAGE_DEFAULT, REQUEST_STATE } from "configs";
import "./PostDetail.sass";
import PostDetail from "./PostDetail";

const customStyles = {
  overlay: {
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
  },
};
const customEditPostStyles = {
  overlay: {
    animation: "appear 0.3s linear",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "600px",
    borderRadius: "10px",
    padding: "0px",
    border: "1px solid rgba(219,219,219,1)",
    animation: "zoominoutsinglefeatured 0.3s ease-out",
  },
};
function PostCard({ post }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [isShowDetailPost, setIsShowDetailPost] = useState(false);
  const [isShowEditPost, setIsShowEditPost] = useState(false);
  const profile = useSelector((state) => state.profile);

  function handleCloseDetailModal() {
    setIsShowDetailPost(false);
    dispatch(RESET_DETAIL_PROFILE_STATE());
  }

  function onDeletePost(e) {
    e.stopPropagation();
    Modal.confirm({
      title: t("deletePost"),
      icon: <ExclamationCircleOutlined />,
      content: t("thisWillPermanentlyDeleteYourPost"),
      okText: t("Confirm"),
      cancelText: t("Cancel"),
      onOk: () => {
        dispatch(DELETE_POST({ id: post.id }));
      },
      destroyOnClose: true,
    });
  }

  function onEditPost(e) {
    e.stopPropagation();
    setIsShowEditPost(true);
  }

  useEffect(() => {
    if (isShowDetailPost) {
      document.body.style.overflow = "hidden";
      dispatch(RESET_LIST_COMMENT_BY_POST());
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isShowDetailPost, dispatch]);

  useEffect(() => {
    if (profile.editPostState === REQUEST_STATE.SUCCESS) {
      setIsShowEditPost(false);
    }
  }, [profile.editPostState, dispatch, t]);

  return (
    <>
      <div
        className="postCard flex-center"
        onClick={() => setIsShowDetailPost(true)}
      >
        {post.medias[0]?.mime.includes("image") ? (
          <img
            className="postCardImg"
            src={post.medias[0]?.url ?? IMAGE_DEFAULT}
            alt="avatar"
          />
        ) : (
          <video
            className="postCardImg"
            src={post.medias[0]?.url}
          ></video>
        )}

        <div className="postCardOverlay flex-center">
          {profile.isCurrentUser && (
            <div className="postCardOverlayAction">
              <DeleteOutlined
                onClick={onDeletePost}
                className="postCardOverlayActionDelete"
              />
              <EditOutlined
                onClick={onEditPost}
                className="postCardOverlayActionEdit"
              />
            </div>
          )}

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
        <PostDetail post={post} setIsShowDetailPost={setIsShowDetailPost} />
      </ReactModal>
      <ReactModal
        isOpen={isShowEditPost}
        onRequestClose={() => setIsShowEditPost(false)}
        style={customEditPostStyles}
      >
        <div className="profile_followers">
          <div className="profile_followers-header">
            <div className="profile_followers-header-text">{t("editPost")}</div>
            <div
              className="profile_followers-header-close"
              onClick={() => setIsShowEditPost(false)}
            >
              <CloseOutlined />
            </div>
          </div>
          <div className="profileCreatePost">
            <PostEdit post={post} user={post.user} />
          </div>
        </div>
      </ReactModal>
    </>
  );
}

export default PostCard;
