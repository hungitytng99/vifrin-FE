import { AVATAR_DEFAULT } from "configs";
import { t } from "i18next";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { HOMEPAGE_FOLLOW } from "../redux/action";
import "./FollowSuggestion.sass";

function FollowSuggestion(props) {
  const { user, sizeAvatar = 32 } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [isShowFollow, setIsShowFollow] = useState(true);

  function onClickFollow() {
    dispatch(HOMEPAGE_FOLLOW({ userId: user.id }));
  }
  return (
    <div className="follow-suggestion-card">
      <Link to={`/profile/${user.username}`} className="follow-suggestion-card__avatar">
        <img
          className="follow-suggestion-card__avatar-img"
          style={{ width: `${sizeAvatar}px`, height: `${sizeAvatar}px` }}
          src={user?.avatarUrl ?? AVATAR_DEFAULT}
          alt={user?.username}
        />
      </Link>
      <div className="follow-suggestion-card__info">
        <div className="follow-suggestion-card__info-box">
          <Link
            to={`/profile/${user.username}`}
            className="follow-suggestion-card__info-username"
          >
            {user.username}
          </Link>
        </div>
        <div className="follow-suggestion-card__info-description">{user.fullName}</div>
      </div>

      {isShowFollow ? (
        <button
          onClick={() => {
            setIsShowFollow(false);
            onClickFollow(user.userId);
          }}
          className="follow-suggestion-card__btn-follow"
        >
          {t("follow")}
        </button>
      ) : (
        <button className="follow-suggestion-card__btn-followed" disabled>
          {t("followed")}
        </button>
      )}
    </div>
  );
}
export default FollowSuggestion;
