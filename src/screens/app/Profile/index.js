import React, { useEffect } from "react";
import Profile from "./components/Profile";
import { useDispatch, useSelector } from "react-redux";
import {
  CHECK_ISCURRENT_USER,
  GET_LIST_POST_BY_USERNAME,
} from "./redux/action";

function Todos({ match }) {
  const user = useSelector((state) => state.user.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(CHECK_ISCURRENT_USER(user.username === match.params.username));
  }, [match.params.username, user.username, dispatch]);

  useEffect(() => {
    dispatch(GET_LIST_POST_BY_USERNAME({ username: match.params.username }));
  }, [match.params.username, dispatch]);

  return (
    <div className="my-container">
      <div className="profile-page">
        <div className="profile-page__profile">
          <div className="my-container">
            <Profile username={match.params.username} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Todos;
