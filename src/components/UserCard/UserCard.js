import { useState } from "react";
import { Link } from "react-router-dom";
import "./UserCard.sass";
import { MoreOutlined } from "@ant-design/icons";
import { AVATAR_DEFAULT } from "../../configs";

function UserCard(props) {
  const {
    user,
    sizeAvatar = 32,
    onClickCardAction = () => {},
    hasAction = true,
  } = props;
  const [isShowCardAction, setIsShowCardAction] = useState(true);

  return (
    <div className="user-card">
      <Link to={`/profile/aaa`} className="user-card__avatar">
        <img
          className="user-card__avatar-img"
          style={{ width: `${sizeAvatar}px`, height: `${sizeAvatar}px` }}
          src={AVATAR_DEFAULT}
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
      {hasAction && (
        <button
          onClick={() => {
            setIsShowCardAction(true);
            onClickCardAction(user.userId);
          }}
          className="user-card__btn-action"
        >
          <MoreOutlined />
        </button>
      )}
    </div>
  );
}
export default UserCard;
