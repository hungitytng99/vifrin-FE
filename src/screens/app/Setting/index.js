import React, { useEffect } from "react";
import Profile from "./components/Profile";
import { useDispatch, useSelector } from "react-redux";
import {
  CHECK_ISCURRENT_USER,
  GET_DETAIL_USER_BY_USERNAME,
  GET_LIST_POST_BY_USERNAME,
} from "./redux/action";
import { REQUEST_STATE } from "configs";
import FullComponentLoading from "components/Loading/FullComponentLoading";

function Todos({ match }) {

  return (
    <div className="profile-page my-container">
      <Profile />
    </div>
  );
}

export default Todos;
