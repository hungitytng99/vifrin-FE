import { useState } from "react";
import { Link } from "react-router-dom";
import "./UserCard.sass";
import { CloseOutlined } from "@ant-design/icons";
import { AVATAR_DEFAULT } from "configs";

function UserCard(props) {
  const {
    user,
    sizeAvatar = 32,
    onClickCardAction = () => {},
    hasAction = true,
    destination = '',
  } = props;
  return (
    <div className="user-card">
      <Link to={`/profile/${user?.username}`} className="user-card__avatar">
        <img
          className="user-card__avatar-img"
          style={{ width: `${sizeAvatar}px`, height: `${sizeAvatar}px` }}
          src={user?.avatarUrl ?? AVATAR_DEFAULT}
          alt={"aaa"}
        />
      </Link>
      <div className="user-card__info">
        <div className="user-card__info-box">
          <a
            href={`/profile/${user?.username}`}
            className="user-card__info-username"
          >
            {user?.username}
          </a>
        </div>
        <div className="user-card__info-description">{user?.fullName}</div>
        <Link to={`/location/${destination?.id}`} className="user-card__info-description --link">{destination?.name}</Link>
      </div>
      {hasAction && (
        <button
          onClick={() => {
            onClickCardAction(user?.userId);
          }}
          className="user-card__btn-action"
        >
          <CloseOutlined style={{ color: "#777" }} />
        </button>
      )}
    </div>
  );
}
export default UserCard;
