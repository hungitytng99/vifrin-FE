import React, { useEffect } from "react";
import Profile from "./pages/Profile";
import { useDispatch, useSelector } from "react-redux";
import {
  CHECK_ISCURRENT_USER,
  GET_DETAIL_USER_BY_USERNAME,
  GET_LIST_POST_BY_USERNAME,
} from "./redux/action";
import { REQUEST_STATE } from "configs";
import FullComponentLoading from "components/Loading/FullComponentLoading";

function Todos({ match }) {
  const user = useSelector((state) => state.user.profile);
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(CHECK_ISCURRENT_USER(user.username === match.params.username));
  }, [match.params.username, user.username, dispatch]);

  useEffect(() => {
    dispatch(GET_LIST_POST_BY_USERNAME({ username: match.params.username }));
  }, [match.params.username, dispatch]);

  useEffect(() => {
    dispatch(GET_DETAIL_USER_BY_USERNAME({ username: match.params.username }));
  }, [match.params.username, dispatch]);

  return (
    <div className="profile-page my-container">
      {profile.deletePostState === REQUEST_STATE.REQUEST && (
        <FullComponentLoading bgColor="rgba(255,255,255,0.8)" />
      )}
      {profile.uploadAvatarState === REQUEST_STATE.REQUEST && (
        <FullComponentLoading bgColor="rgba(255,255,255,0.8)" />
      )}
      <Profile username={match.params.username} />
    </div>
  );
}

export default Todos;
