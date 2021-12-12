import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Comment.scss'
import CommentsList from '../../screens/app/Home/components/CommentsList';
import ShowMoreText from 'react-show-more-text';
Comment.defaultProps = {
    comment: {},
}
// 1. xu ly noi dung text qua dai ( chi gioi han ki tu hien thi).(chua lam)
// 2. xu ly comment cua comment
// 3.  
function Comment(props) {
    const { user, avatar, linkToUserPage, comment, reply, liked, isLiked, dateCreated } = props.comment;
    const replyed = reply.length;
    const [likeState, setLikeState] = useState(isLiked);
    const [likedCount, setLikeCount] = useState(liked);
    const [isViewReply, setIsViewReply] = useState(false);
    function handleLiked() {
        setLikeState(!likeState);
        if (!likeState) {
            setLikeCount(likedCount + 1);
        } else {
            setLikeCount(likedCount - 1);
        }
    }
    function handleViewReply() {
        setIsViewReply(!isViewReply);
    }
    return (
        <div className="comment-item">
            <div className="comment-box">
                <Link to={linkToUserPage}>
                    <img className="comment-box__avatar" src={avatar} alt="avatar"></img>
                </Link>
                <div className="comment-box__content">
                    <Link className="comment-box__content-user" to={linkToUserPage}>{user}</Link>
                    <ShowMoreText
                        /* Default options */
                        lines={2}
                        more='Show more'
                        less='Show less'
                        className='comment-box__content-comment'
                        expanded={false}
                    >
                       {comment}
                    </ShowMoreText>

                </div>
                {likeState ? <i className="comment-box__icon-like --liked fas fa-heart" onClick={handleLiked}></i> : <i className="comment-box__icon-like far fa-heart" onClick={handleLiked}></i>}
            </div>
            <div className="interactive">
                <div className="interactive__item --date">{dateCreated}</div>
                <div className="interactive__item --liked">{likedCount > 0 ? (likedCount > 1 ? likedCount + " likes" : likedCount + " like") : ""}</div>
                <div className="interactive__item --reply">Reply</div>
            </div>
            <div className="reply">
                {replyed > 0 ? <div className="reply__view" onClick={handleViewReply}>{isViewReply ? "Hide replies" : "View replies"} ({replyed})</div> : ""}
                <div className="reply__comment">
                    {isViewReply ? <CommentsList key={reply.user} listComments={reply} /> : ""}
                </div>
            </div>

        </div>
    )
}
export default Comment;