import { AVATAR_DEFAULT } from "configs";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./FollowCard.sass";

function FollowCard(props) {
  const {
    user,
    headerActionText,
    cardActionText,
    sizeAvatar = 32,
    onClickHeaderAction = () => { },
    onClickCardAction = () => { },
    onClick = () => { },
    isShowAction = true,
    isShowBoxShadowStyle = false,
  } = props;
  const [isShowFollow, setIsShowFollow] = useState(true);
  const [isShowUnFollow, setIsShowUnFollow] = useState(isShowAction);

  return (
    <div
      onClick={onClick}
      className="follow-card"
      style={isShowBoxShadowStyle ? {
        padding: '8px',
        borderRadius: '10px',
        boxShadow: 'rgba(0, 0, 0, 0.08) 0px 6px 16px -8px, rgba(0, 0, 0, 0.05) 0px 9px 28px 0px, rgba(0, 0, 0, 0.03) 0px 12px 48px 16px'
      } : {}}
    >
      <Link to={`/profile/${user.username}`} className="follow-card__avatar">
        <img
          className="follow-card__avatar-img"
          style={{ width: `${sizeAvatar}px`, height: `${sizeAvatar}px` }}
          src={user?.avatarUrl ?? AVATAR_DEFAULT}
          alt={user?.username}
        />
      </Link>
      <div className="follow-card__info">
        <div className="follow-card__info-box">
          <Link
            to={`/profile/${user.username}`}
            className="follow-card__info-username"
          >
            {user.username}
          </Link>
          {!user.following && isShowFollow && (
            <button
              onClick={() => {
                setIsShowFollow(false);
                onClickHeaderAction(user.userId);
              }}
              className="follow-card__btn-follow"
            >
              {headerActionText}
            </button>
          )}
        </div>
        <div className="follow-card__info-description">{user.description}</div>
      </div>

      {cardActionText && isShowUnFollow ? (
        <button
          onClick={() => {
            setIsShowUnFollow(false);
            onClickCardAction(user.userId);
          }}
          className="follow-card__btn-unfollow"
        >
          {cardActionText}
        </button>
      ) : (
        isShowUnFollow && (
          <button className="follow-card__btn-unfollow -delete" disabled>
            Đã xóa
          </button>
        )
      )}
    </div>
  );
}
export default FollowCard;
