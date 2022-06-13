import React, { useEffect, useState, useRef } from "react";
import { Col, Row } from "react-bootstrap";
import ReactModal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  DELETE_FOLLOW,
  FOLLOW,
  GET_LIST_FOLLOWER,
  GET_LIST_FOLLOWING,
  RESET_CREATE_POST_STATE,
  RESET_EDIT_POST_STATE,
  UNFOLLOW,
  UPDATE_AVATAR,
} from "../redux/action";
import "./Profile.sass";
import { CloseOutlined } from "@ant-design/icons";
import FollowCard from "components/FollowCard/FollowCard";
import { AVATAR_DEFAULT, REQUEST_STATE } from "configs";
import FullComponentLoading from "components/Loading/FullComponentLoading";
import { useTranslation } from "react-i18next";
import {
  BorderInnerOutlined,
  FlagOutlined,
  PlusSquareOutlined,
  FileImageOutlined,
} from "@ant-design/icons";
import PostCard from "./PostCard";
import { Tabs, Button, notification, Spin, Dropdown, Menu } from "antd";
import PostCreate from "./PostCreate";

const { TabPane } = Tabs;
const customStyles = {
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
    width: "400px",
    borderRadius: "10px",
    padding: "0px",
    border: "1px solid rgba(219,219,219,1)",
    animation: "zoominoutsinglefeatured 0.3s ease-out",
  },
};

const customAddPostStyles = {
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
ReactModal.setAppElement("#root");

function Profile(props) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const profile = useSelector((state) => state.profile);
  const [isShowListFollowers, setIsShowListFollowers] = useState(false);
  const [isShowListFollowing, setIsShowListFollowing] = useState(false);
  const [isShowAddPost, setIsShowAddPost] = useState(false);
  const uploadAvatarInput = useRef();

  function onClickListFollower(userId) {
    dispatch(GET_LIST_FOLLOWER({ userId }));
    setIsShowListFollowers(true);
  }

  function onClickListFollowing(userId) {
    dispatch(GET_LIST_FOLLOWING({ userId }));
    setIsShowListFollowing(true);
  }

  function onFollow(userId) {
    dispatch(FOLLOW({ userId }));
  }
  function onDeleteFollow(userId) {
    dispatch(DELETE_FOLLOW({ userId }));
  }
  function onUnFollow(userId) {
    dispatch(UNFOLLOW({ userId }));
  }

  function onClickAvatar({ key }) {
    console.log("key: ", key);
    switch (key) {
      case "0":
        uploadAvatarInput.current.click();
        break;
      default:
        break;
    }
  }

  function onInputAvatarChange(e) {
    dispatch(UPDATE_AVATAR({ newAvatar: e.target.files[0] }));
  }

  useEffect(() => {
    if (profile.createPostState === REQUEST_STATE.SUCCESS) {
      setIsShowAddPost(false);
      notification.success({
        message: t("successfull!"),
        description: t("youCreateAPostSuccessfully!"),
      });
      dispatch(RESET_CREATE_POST_STATE());
    }
  }, [profile.createPostState, dispatch, t]);

  useEffect(() => {
    if (profile.editPostState === REQUEST_STATE.SUCCESS) {
      notification.success({
        message: t("successfull!"),
        description: t("youEditPostSuccessfully!"),
      });
      dispatch(RESET_EDIT_POST_STATE());
    }
  }, [profile.editPostState, dispatch, t]);

  const menu = (
    <Menu onClick={onClickAvatar}>
      <Menu.Item key="0">
        <input
          ref={uploadAvatarInput}
          type="file"
          style={{ display: "none" }}
          onChange={onInputAvatarChange}
          accept="image/*"
        />
        <div style={{ display: "flex", alignItems: "center" }}>
          <FileImageOutlined style={{ fontSize: "17px", marginRight: "5px" }} />
          <span>{t("changeAvatar")}</span>
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <div className="profile">
        <Row>
          <Col lg={4} style={{ maxHeight: "250px" }}>
            <div className="profile__avatar flex-center">
              {profile.getDetailUserState === REQUEST_STATE.SUCCESS &&
                (profile.isCurrentUser ? (
                  <Dropdown
                    overlay={menu}
                    trigger={["click"]}
                  >
                    <img
                      onClick={() => console.log("CLICK")}
                      className="profileAvatarImg"
                      src={
                        profile.profileUserByUsername?.avatarUrl ??
                        AVATAR_DEFAULT
                      }
                      alt="avatar"
                    />
                  </Dropdown>
                ) : (
                  <img
                    onClick={() => console.log("CLICK HERE")}
                    src={
                      profile.profileUserByUsername?.avatarUrl ?? AVATAR_DEFAULT
                    }
                    alt="avatar"
                  />
                ))}
            </div>
          </Col>
          <Col lg={8}>
            <div className="profile__info">
              <div className="profile__info-box">
                <div className="profile__info-username">
                  {profile.profileUserByUsername?.username}
                </div>
                {profile.isCurrentUser ? (
                  <>
                    <div className="profile__info-edit">
                      <Link to="/setting">{t("editProfile")}</Link>
                    </div>
                    <div className="profile__info-setting">
                      <i className="profile__info-setting-icon fas fa-tools"></i>
                    </div>
                  </>
                ) : (
                  // check xem currentuser co theo doi khong
                  <>
                    <Button style={{ marginLeft: "10px" }} type="ghost">
                      {t("inbox")}
                    </Button>
                  </>
                )}
              </div>
              <div className="profile__info-box --mid">
                <div className="profile__info-detail">
                  {profile.listPostByUsername?.length > 1 ? (
                    <div>{t("posts")}</div>
                  ) : (
                    <div>{t("post")}</div>
                  )}
                  <span>{profile.listPostByUsername?.length}</span>
                </div>
                <div
                  className="profile__info-detail  --hover"
                  onClick={() =>
                    onClickListFollower(profile.profileUserByUsername.id)
                  }
                >
                  {profile.profileUserByUsername?.followersCount > 1 ? (
                    <div>{t("profile.contributions")}</div>
                  ) : (
                    <div>{t("profile.contributions")}</div>
                  )}
                  <span>100</span>
                </div>
                <div
                  className="profile__info-detail  --hover"
                  onClick={() =>
                    onClickListFollower(profile.profileUserByUsername.id)
                  }
                >
                  {profile.profileUserByUsername?.followersCount > 1 ? (
                    <div>{t("followers")}</div>
                  ) : (
                    <div>{t("follower")}</div>
                  )}
                  <span>{profile.profileUserByUsername?.followersCount}</span>
                </div>

                <div
                  className="profile__info-detail --hover"
                  onClick={() =>
                    onClickListFollowing(profile.profileUserByUsername.id)
                  }
                >
                  {profile.profileUserByUsername?.followingsCount > 1 ? (
                    <div>{t("followings")}</div>
                  ) : (
                    <div>{t("following")}</div>
                  )}
                  <span>{profile.profileUserByUsername?.followingsCount}</span>
                </div>
              </div>
              <div className="profile__info-box">
                <div className="profile__info-detail">
                  <span>{profile.profileUserByUsername?.fullName}</span>
                </div>
              </div>
              <div className="profile__info-box">
                <div className="profile__info-detail">
                  <p>{profile.profileUserByUsername?.bio}</p>
                </div>
              </div>
              {profile.isCurrentUser ? (
                <div className="profile__info-box">
                  <Button
                    type="primary"
                    className="flex-center"
                    onClick={() => setIsShowAddPost(true)}
                  >
                    <PlusSquareOutlined
                      style={{ fontSize: "18px", marginBottom: "2px" }}
                    />
                    <span>{t("addPost")}</span>
                  </Button>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </Col>
        </Row>
        <Row style={{ marginTop: "10px" }}>
          <Tabs defaultActiveKey="1">
            <TabPane
              tab={
                <span className="flex-center">
                  <BorderInnerOutlined />
                  {t("profile.uppercase.posts")}
                </span>
              }
              key="1"
            >
              <Row>
                {profile.getListPostByUsernameState ===
                  REQUEST_STATE.REQUEST && <Spin />}
                {profile.listPostByUsername.length === 0 &&
                  profile.getListPostByUsernameState ===
                  REQUEST_STATE.SUCCESS &&
                  (profile.isCurrentUser ? (
                    <div style={{ paddingLeft: '15px' }}>{t("youHaveNotCreatedPostsYet")}</div>
                  ) : (
                    <div style={{ paddingLeft: '15px' }}>{t("thisPersonHavenotCreatedPost")}</div>
                  ))}
                {profile.listPostByUsername.map((post) => {
                  return (
                    <Col key={post.id} lg={4} style={{ marginBottom: "10px" }}>
                      <PostCard post={post} />
                    </Col>
                  );
                })}
              </Row>
            </TabPane>
            <TabPane
              tab={
                <span className="flex-center">
                  <FlagOutlined />
                  {t("savedPosts")}
                </span>
              }
              key="2"
            >
              {t("youDontSaveAnyPosts")}
            </TabPane>
          </Tabs>
        </Row>

        <ReactModal
          isOpen={isShowListFollowers}
          onRequestClose={() => setIsShowListFollowers(false)}
          style={customStyles}
        >
          <div className="profile_followers">
            <div className="profile_followers-header">
              <div className="profile_followers-header-text">
                {t("follower")}
              </div>
              <div
                className="profile_followers-header-close"
                onClick={() => setIsShowListFollowers(false)}
              >
                <CloseOutlined />
              </div>
            </div>
            <ul className="profile_followers-list">
              {profile.getListFollowerState === REQUEST_STATE.REQUEST && (
                <FullComponentLoading />
              )}
              {profile?.listFollowers.length > 0 ? (
                profile?.listFollowers.map((user) => {
                  user.description = user.fullName;
                  return (
                    <FollowCard
                      onClick={() => setIsShowListFollowers(false)}
                      key={user.id}
                      user={user}
                      cardActionText="Xóa"
                      headerActionText="Theo dõi"
                      onClickHeaderAction={onFollow}
                      onClickCardAction={onDeleteFollow}
                    />
                  );
                })
              ) : (
                <div style={{ textAlign: "center" }}>
                  {t("nobodyFollowYou")}
                </div>
              )}
            </ul>
          </div>
        </ReactModal>

        <ReactModal
          isOpen={isShowListFollowing}
          onRequestClose={() => setIsShowListFollowing(false)}
          style={customStyles}
        >
          <div className="profile_followers">
            <div className="profile_followers-header">
              <div className="profile_followers-header-text">
                {t("follower")}
              </div>
              <div
                className="profile_followers-header-close"
                onClick={() => setIsShowListFollowing(false)}
              >
                <CloseOutlined />
              </div>
            </div>
            <ul className="profile_followers-list">
              {profile.getListFollowingState === REQUEST_STATE.REQUEST && (
                <FullComponentLoading />
              )}
              {profile?.listFollowing.length > 0 ? (
                profile?.listFollowing.map((user) => {
                  user.description = user.fullName;
                  return (
                    <FollowCard
                      onClick={() => setIsShowListFollowing(false)}
                      key={user.id}
                      user={user}
                      cardActionText="Hủy theo dõi"
                      onClickCardAction={onUnFollow}
                    />
                  );
                })
              ) : (
                <div style={{ textAlign: "center" }}>
                  {t("nobodyFollowYou")}
                </div>
              )}
            </ul>
          </div>
        </ReactModal>

        <ReactModal
          isOpen={isShowAddPost}
          onRequestClose={() => setIsShowAddPost(false)}
          style={customAddPostStyles}
        >
          <div className="profile_followers">
            <div className="profile_followers-header">
              <div className="profile_followers-header-text">
                {t("createNewPost")}
              </div>
              <div
                className="profile_followers-header-close"
                onClick={() => setIsShowAddPost(false)}
              >
                <CloseOutlined />
              </div>
            </div>
            <div className="profileCreatePost">
              <PostCreate />
            </div>
          </div>
        </ReactModal>

        <ReactModal
          isOpen={isShowAddPost}
          onRequestClose={() => setIsShowAddPost(false)}
          style={customAddPostStyles}
        >
          <div className="profile_followers">
            <div className="profile_followers-header">
              <div className="profile_followers-header-text">
                {t("createNewPost")}
              </div>
              <div
                className="profile_followers-header-close"
                onClick={() => setIsShowAddPost(false)}
              >
                <CloseOutlined />
              </div>
            </div>
            <div className="profileCreatePost">
              <PostCreate />
            </div>
          </div>
        </ReactModal>
      </div>
    </>
  );
}
export default Profile;
