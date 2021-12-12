import { useState } from "react";
import { Link } from "react-router-dom";
import "./UserCard.sass";
import { MoreOutlined } from "@ant-design/icons";

function UserCard(props) {
  const { user, sizeAvatar = 32, onClickCardAction = () => {} } = props;
  const [isShowCardAction, setIsShowCardAction] = useState(true);

  return (
    <div className="user-card">
      {/* <Link to={`/profile/${user?.username}`} className="user-card__avatar">
        <img
          className="user-card__avatar-img"
          style={{ width: `${sizeAvatar}px`, height: `${sizeAvatar}px` }}
          src={user?.avatarUrl}
          alt={user?.username}
        />
      </Link>
      <div className="user-card__info">
        <div className="user-card__info-box">
          <Link
            to={`/profile/${user?.username}`}
            className="user-card__info-username"
          >
            {user?.username}
          </Link>
        </div>
        <div className="user-card__info-description">{user?.description}</div>
      </div>

      <button
        onClick={() => {
          setIsShowCardAction(false);
          onClickCardAction(user.userId);
        }}
        className="user-card__btn-unfollow"
      >
        Action
      </button> */}

      <Link to={`/profile/aaa`} className="user-card__avatar">
        <img
          className="user-card__avatar-img"
          style={{ width: `${sizeAvatar}px`, height: `${sizeAvatar}px` }}
          src={
            "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg"
          }
          alt={"aaa"}
        />
      </Link>
      <div className="user-card__info">
        <div className="user-card__info-box">
          <Link to={`/profile/aaa`} className="user-card__info-username">
            {"aaaaa"}
          </Link>
        </div>
        <div className="user-card__info-description">{"Manh Hung"}</div>
      </div>

      <button
        onClick={() => {
          setIsShowCardAction(true);
          onClickCardAction(user.userId);
        }}
        className="user-card__btn-action"
      >
        <MoreOutlined />
      </button>
    </div>
  );
}
export default UserCard;
