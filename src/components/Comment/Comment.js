import { useState } from "react";
import { Link } from "react-router-dom";
import "./Comment.scss";
import ShowMoreText from "react-show-more-text";
import { useTranslation } from "react-i18next";
import TimeAgo from "javascript-time-ago";
import vi from "javascript-time-ago/locale/vi.json";
import en from "javascript-time-ago/locale/en.json";
import ReactTimeAgo from "react-time-ago";

TimeAgo.addDefaultLocale(vi);
TimeAgo.addLocale(en);
// 1. xu ly noi dung text qua dai ( chi gioi han ki tu hien thi).(chua lam)
// 2. xu ly comment cua comment
// 3.
function Comment({ comment }) {
  const { content, likesCount, postId, updatedAt, user } = comment;
  const { t } = useTranslation();
  // const replyed = reply.length;
  const [likeState, setLikeState] = useState(false);
  const [likedCount, setLikeCount] = useState(likesCount);
  // const [isViewReply, setIsViewReply] = useState(false);
  function handleLiked() {
    setLikeState(!likeState);
    if (!likeState) {
      setLikeCount(likedCount + 1);
    } else {
      setLikeCount(likedCount - 1);
    }
  }
  // function handleViewReply() {
  //     setIsViewReply(!isViewReply);
  // }
  return (
    <div className="comment-item">
      <div className="comment-box">
        <Link to={`/profile/${user?.username}`}>
          <img
            className="comment-box__avatar"
            src={user?.avatarUrl}
            alt={`avatar ${user.username}`}
          ></img>
        </Link>
        <div className="comment-box__content">
          <Link
            className="comment-box__content-user"
            to={`/profile/${user?.username}`}
          >
            {user?.username}
          </Link>
          <ShowMoreText
            lines={2}
            more={t("showMore")}
            less={t("showLess")}
            className="comment-box__content-comment"
            expanded={false}
          >
            {content}
          </ShowMoreText>
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
      <div className="interactive">
        <div className="interactive__item --date">
          <ReactTimeAgo date={updatedAt} locale="vi" />
        </div>
        {/* <div className="interactive__item --date">{dateCreated}</div> */}
        <div className="interactive__item --liked">
          {likedCount > 1 ? likedCount + " " + t('count.like') : likedCount + " " + t('count.likes')}
        </div>
        {/* <div className="interactive__item --reply">Reply</div> */}
      </div>
      {/* <div className="reply">
                {replyed > 0 ? <div className="reply__view" onClick={handleViewReply}>{isViewReply ? "Hide replies" : "View replies"} ({replyed})</div> : ""}
                <div className="reply__comment">
                    {isViewReply ? <CommentsList key={reply.user} listComments={reply} /> : ""}
                </div>
            </div> */}
    </div>
  );
}
export default Comment;
