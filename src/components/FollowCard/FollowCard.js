import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./FollowCard.sass";

FollowCard.defaultProps = {
  user: {},
  control: "Follow",
  sizeAvatar: 32,
};

function FollowCard(props) {
  const {
    user,
    headerActionText,
    cardActionText,
    sizeAvatar = 32,
    onClickHeaderAction = () => {},
    onClickCardAction = () => {},
  } = props;
  const [isShowFollow, setIsShowFollow] = useState(true);
  const [isShowUnFollow, setIsShowUnFollow] = useState(true);

  return (
    <div className="follow-card">
      <Link to={`/profile/${user.username}`} className="follow-card__avatar">
        <img
          className="follow-card__avatar-img"
          style={{ width: `${sizeAvatar}px`, height: `${sizeAvatar}px` }}
          src={user.avatarUrl}
          alt={user.username}
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
        <button className="follow-card__btn-unfollow -delete" disabled>
          Đã xóa
        </button>
      )}
    </div>
  );
}
export default FollowCard;
