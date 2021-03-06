import React, { useEffect, useMemo, useRef, useState } from "react";
import { Input, Rate } from "antd";
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
import { FrownOutlined, MehOutlined, SmileOutlined, CommentOutlined } from "@ant-design/icons";
import "./TypeBox.sass";


const { TextArea } = Input;
let commentSocket = null;

const customRatingIcons = {
  1: <FrownOutlined />,
  2: <FrownOutlined />,
  3: <MehOutlined />,
  4: <SmileOutlined />,
  5: <SmileOutlined />,
};


function TypeBox(props) {
  const {
    isFocusTextBox,
    post,
    user,
    scrollToBottomListComment = () => { },
    isShowDetailPost,
    type = "",
    hasRate = false,
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
  const [rate, setRate] = useState(5);
  function onCreateComment() {
    console.log('rate: ', rate);
    if (inputVal !== "") {
      if (type === "destination") {
        const params = {
          destinationId: post.id,
          content: inputVal,
          user,
          commentId: uuidv4(),
          star: rate,
        };
        dispatch(CREATE_NEW_COMMENT({ comment: params }));
        scrollToBottomListComment();
        setInputVal("");
      } else {
        const params = {
          postId: post.id,
          content: inputVal,
          user,
          commentId: uuidv4(),
          star: 0,
          updatedAt: new Date(),
        };
        dispatch(CREATE_NEW_COMMENT({ comment: params }));
        scrollToBottomListComment();
        setInputVal("");
      }
    }
  }

  function handleChangeRate(values) {
    setRate(values);
  }

  useEffect(() => {
    // Khi t???o b??nh lu???n th??nh c??ng => bootstrap b??nh lu???n ?????y cho t???t c??? c??c client ??ang k???t n???i
    if (profile?.comment?.status === SENDING_SUCCESS_KEY) {
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
  }, [
    profile?.comment,
    dispatch,
    inputVal,
    user,
    commentSocketTopic,
    post?.id,
  ]);

  useEffect(() => {
    if (isFocusTextBox) {
      inputRef.current.focus();
    }
  }, [isFocusTextBox]);

  useEffect(() => {
    if (!isShowDetailPost) {
      if (commentSocket?.client?.connected) {
        // console.log('commentSocket: ', commentSocket);
      }
    }
  }, [isShowDetailPost]);

  return (
    <>
      {hasRate && (
        <div style={{ paddingLeft: "15px", fontSize: "14px", display: "flex", alignItems: "center", }}>
          <span style={{
            marginTop: "5px",
          }}>
            {t('rate')}:
          </span>
          <Rate
            style={{
              fontSize: "20px",
              color: "#007bff",
              marginLeft: "10px",
            }}
            allowClear={false}
            defaultValue={5}
            onChange={handleChangeRate}
            character={({ index }) => customRatingIcons[index + 1]}
          />
        </div>
      )}
      <div className="type-box">
        <CommentOutlined
          className="type-box__emoji"
        />
        <div style={{
          height: "10px"
        }}></div>
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
        <button onClick={onCreateComment} className="type-box__btn-post flex-center">
          {t("profile.post")}
        </button>
        <SockJsClient
          url={COMMENT_SOCKET_URL}
          topics={commentSocketTopic}
          onMessage={(msg) => {
            console.debug("MESSAGE", msg);
            if (user?.username !== msg.data?.user?.username) {
              dispatch(ADD_COMMENT_FROM_SOCKET({ comment: msg.data }));
            }
          }}
          ref={(client) => {
            commentSocket = client;
          }}
          autoReconnect={false}
        />
      </div>
    </>
  );
}
export default TypeBox;
