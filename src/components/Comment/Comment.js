import { useState } from "react";
import { Link } from "react-router-dom";
import "./Comment.scss";
import ShowMoreText from "react-show-more-text";
import { useTranslation } from "react-i18next";
import ReactTimeAgo from "react-time-ago";
import { AVATAR_DEFAULT, I18LANGUAGE, SENDING_SUCCESS_KEY } from "configs";
import { Rate } from "antd";

// 1. xu ly noi dung text qua dai ( chi gioi han ki tu hien thi).(chua lam)
// 2. xu ly comment cua comment
// 3.
function Comment({ comment, hasRate = false, rate = 5 }) {
  const { content, likesCount, updatedAt, user } = comment;
  // console.log('comment: ', comment);
  const { t } = useTranslation();
  const [likeState, setLikeState] = useState(false);
  const [likedCount, setLikeCount] = useState(likesCount ?? 0);
  function handleLiked() {
    setLikeState(!likeState);
    if (!likeState) {
      setLikeCount(likedCount + 1);
    } else {
      setLikeCount(likedCount - 1);
    }
  }
  return (
    <div className="comment-item">
      <div className="comment-box">
        <Link to={`/profile/${user?.username}`} className="flex-center">
          <div className="comment-box__avatar-outer flex-center">
            <img
              className="comment-box__avatar"
              src={user?.avatarUrl ?? AVATAR_DEFAULT}
              alt={`avatar ${user?.username}`}
            ></img>
          </div>
        </Link>
        <div
          className="comment-box__content"
          style={{
            display: "flex",
            justifyContent: 'center',
            alignContent: 'center',
          }}
        >
          <div style={{
            display: "flex",
            alignContent: "center",
          }}>
            <Link
              className="comment-box__content-user"

              to={`/profile/${user?.username}`}
            >
              <span className="comment-box__content-username">
                {user?.username}
              </span>
            </Link>
            {hasRate && (
              <Rate allowClear={false} disabled value={rate} style={{ fontSize: "14px", color: "#007bff", }} />
            )}
          </div>
          <ShowMoreText
            lines={2}
            more={t("showMore")}
            less={t("showLess")}
            className="comment-box__content-comment"
            expanded={false}
          >
            {content}
          </ShowMoreText>
          <div className="interactive">
            <div className="interactive__item --date">
              {updatedAt && <ReactTimeAgo date={updatedAt} locale={localStorage.getItem(I18LANGUAGE)} />}
            </div>
            {updatedAt && (
              <div className="interactive__item --liked">
                {likedCount > 1
                  ? likedCount + " " + t("count.likes")
                  : likedCount + " " + t("count.like")}
              </div>
            )}
          </div>
        </div>
        {likeState ? (
          <i
            className="comment-box__icon-like --liked fas fa-heart"
            onClick={handleLiked}
          ></i>
        ) : (
          <i
            className="comment-box__icon-like far fa-heart"
            onClick={handleLiked}
          ></i>
        )}
      </div>

    </div>
  );
}
export default Comment;
