import React, { useEffect, useMemo, useRef, useState } from "react";
import { Input } from "antd";
import "./TypeBox.sass";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_COMMENT_FROM_SOCKET,
  CREATE_NEW_COMMENT,
  RESET_CREATE_COMMENT_STATE,
} from "screens/app/Profile/redux/action";
import { v4 as uuidv4 } from "uuid";
import { COMMENT_SOCKET_URL, SENDING_SUCCESS_KEY } from "configs";
import { SOCKET_CREATE_COMMENT } from "configs/socket";
import SockJsClient from "react-stomp";


const { TextArea } = Input;
let commentSocket = null;
function TypeBox(props) {
  const {
    isFocusTextBox,
    post,
    user,
    scrollToBottomListComment = () => {},
    isShowDetailPost,
  } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const inputRef = useRef();
  const [displayEmoji, setDisplayEmoji] = useState(false);
  const [inputVal, setInputVal] = useState("");
  let commentSocketTopic = useMemo(
    () => [`/topic/comment/${post?.id}`],
    [post]
  );
  const profile = useSelector((state) => state.profile);
  function onCreateComment() {
    if (inputVal !== "") {
      const params = {
        postId: post.id,
        content: inputVal,
        user,
        commentId: uuidv4(),
        star: 0,
      };
      dispatch(CREATE_NEW_COMMENT({ comment: params }));
      scrollToBottomListComment();
      setInputVal("");
    }
  }

  useEffect(() => {
    console.log('commentSocket: ', commentSocket);
    // Khi tạo bình luận thành công => bootstrap bình luận đấy cho tất cả các client đang kết nối
    if (profile.comment?.status === SENDING_SUCCESS_KEY) {
      commentSocketTopic.forEach((topic) => {
        if (commentSocket.client.connected) {
          commentSocket.sendMessage(
            topic,
            JSON.stringify(SOCKET_CREATE_COMMENT(profile.comment))
          );
        }
      });
      dispatch(RESET_CREATE_COMMENT_STATE());
    }
  }, [profile.comment, dispatch, inputVal, user, commentSocketTopic, post?.id]);

  useEffect(() => {
    if (isFocusTextBox) {
      inputRef.current.focus();
    }
  }, [isFocusTextBox]);

  useEffect(() => {
    if (!isShowDetailPost) {
      console.log("DISCONNECTED HERE");
      console.log('commentSocket: ', commentSocket);

      if (commentSocket?.client?.connected) {
        // console.log('commentSocket: ', commentSocket);
      }
    }
  }, [isShowDetailPost]);

  return (
    <div className="type-box">
      <div className="emoji__box">
        <i
          className="type-box__emoji far fa-grin"
          onClick={() => setDisplayEmoji(!displayEmoji)}
        ></i>
      </div>
      <TextArea
        ref={inputRef}
        autoSize={{
          minRows: 1,
          maxRows: 4,
        }}
        placeholder={t("enterYourCommentHere")}
        className="typeBoxInput"
        value={inputVal}
        onChange={(e) => setInputVal(e.target.value)}
      />
      <button onClick={onCreateComment} className="type-box__btn-post">
        Post
      </button>
      <SockJsClient
        url={COMMENT_SOCKET_URL}
        topics={commentSocketTopic}
        onMessage={(msg) => {
          console.debug("MESSAGE", msg);
          if (user.username !== msg.data.user.username) {
            dispatch(ADD_COMMENT_FROM_SOCKET({ comment: msg.data }));
          }
        }}
        ref={(client) => {
          commentSocket = client;
        }}
        autoReconnect={false}
      />
    </div>
  );
}
export default TypeBox;
