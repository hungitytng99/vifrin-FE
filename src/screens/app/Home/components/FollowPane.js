import { Link } from "react-router-dom";
import FollowCard from "../../../../components/FollowCard/FollowCard";
import { FOLLOW_API, MAIN_USER } from "../configs";
import FollowList from "./FollowList";
import "./FollowPane.scss";
function FollowPane() {
  return (
    <div className="follow-pane">
      <div className="follow-pane__user">
        <FollowCard user={MAIN_USER} control="Switch" sizeAvatar={60} />
      </div>
      <div className="follow-pane__text">
        <div className="follow-pane__text-suggestion">Suggestion For You</div>
        <Link to="#" className="follow-pane__text-all">
          See All
        </Link>
      </div>
      <div className="follow-pane__suggestion">
        <FollowList followList={FOLLOW_API} />
      </div>
      <div className="follow-pane__footer">
        {/* <Footer category={FooterCategory.FOOTER_CATEGORY_LIST_1} /> */}
      </div>
    </div>
  );
}
export default FollowPane;
