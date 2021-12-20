import { Spin } from "antd";
import { REQUEST_STATE } from "configs";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FollowCard from "../../../../components/FollowCard/FollowCard";
import "./FollowPane.scss";
import FollowSuggestion from "./FollowSuggestion";
function FollowPane({ currentUser = {} }) {
  const { t } = useTranslation();
  const homepage = useSelector((state) => state.homepage);

  return (
    <div className="follow-pane">
      <div className="follow-pane__user">
        <FollowCard user={currentUser} sizeAvatar={60} isShowAction={false} />
      </div>
      <div className="follow-pane__text">
        <div className="follow-pane__text-suggestion">
          {t("suggestionForYou")}
        </div>
        <Link to="#" className="follow-pane__text-all">
          {t("seeAll")}
        </Link>
      </div>
      <div className="follow-pane__suggestion">
        <span className="flex-center">
          {homepage.getListSuggestionState === REQUEST_STATE.REQUEST && (
            <Spin />
          )}
        </span>
        {homepage.listSuggestionUser.map((item) => {
          return (
            <FollowSuggestion
              key={item.username}
              user={item}
              isShowFollow={false}
            />
          );
        })}
      </div>
      <div className="follow-pane__footer">
        {/* <Footer category={FooterCategory.FOOTER_CATEGORY_LIST_1} /> */}
      </div>
    </div>
  );
}
export default FollowPane;
