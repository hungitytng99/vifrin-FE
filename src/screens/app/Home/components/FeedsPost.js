import CommentsList from "./CommentsList";
import "./FeedsPost.scss";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { useState } from "react";
import { Link } from "react-router-dom";
import TypeBox from "./TypeBox";
import ControlModal from "./ControlModal";
import { CONTROL_LIST, LIST_COMMENT } from "../configs";

FeedsPost.defaultProps = {
  user: "ngoctrinh89",
  linkToUserPage: "#",
  avatar:
    "https://instagram.fhan3-3.fna.fbcdn.net/v/t51.2885-19/s150x150/160337107_782315219389156_6483106785446804796_n.jpg?tp=1&_nc_ht=instagram.fhan3-3.fna.fbcdn.net&_nc_ohc=pPrb2pG2YKIAX-a8k_3&ccb=7-4&oh=1fc3bbb55f7bc2b5733ab16278f8e383&oe=607F08FC&_nc_sid=4f375e",
  location: "Địa Trung Hải-Sun Premier Village Primavera",
  img_list: [
    "https://sc04.alicdn.com/kf/Hdc3bc028391c4b918f12c262f5b15921w.jpg",
  ],
  liked: 70211,
  status:
    "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
  comment: LIST_COMMENT,
  dateCreated: "February 17",
  isLikedProps: false,
  isFavouriteProps: false,
};
function FeedsPost(props) {
  const {
    user,
    linkToUserPage,
    avatar,
    location,
    img_list,
    liked,
    status,
    comment,
    dateCreated,
    isLikedProps,
    isFavouriteProps,
  } = props.post;
  const [isLiked, setIsLiked] = useState(isLikedProps);
  const [isFavourite, setIsFavourite] = useState(isFavouriteProps);
  const [isOpenControl, setIsOpenControl] = useState(false);
  const [numLiked, setNumLiked] = useState(liked);
  function handleLikedClick() {
    setIsLiked(!isLiked);
    isLiked ? setNumLiked(numLiked - 1) : setNumLiked(numLiked + 1);
  }
  function handleFavouriteClick() {
    setIsFavourite(!isFavourite);
  }
  function openControlModal() {
    document.body.style.overflow = "hidden";
    setIsOpenControl(true);
  }
  function closeControlModal() {
    document.body.style.overflow = "auto";
    setIsOpenControl(false);
  }
  return (
    <div className="feeds-post">
      <ControlModal
        modalIsOpen={isOpenControl}
        openModal={openControlModal}
        closeModal={closeControlModal}
        itemsList={CONTROL_LIST}
      />
      <div className="post__user">
        <Link to={linkToUserPage}>
          <img
            className="post__user-avatar"
            src={avatar}
            alt="avatar-user"
          ></img>
        </Link>
        <div className="post__user-box">
          <div className="post__user-username">
            <Link to={linkToUserPage}>{user}</Link>
          </div>
          <div className="post__user-location">{location}</div>
        </div>
        <div className="post__user-control" onClick={openControlModal}>
          <i className="post__user-control --icon fas fa-ellipsis-h"></i>
        </div>
      </div>
      <Carousel showThumbs={false} emulateTouch={true}>
        {/* Lay min height of images => add to style to fix image view */}
        {img_list.map((item) => {
          return (
            <img
              key={item}
              className="feeds-post__img"
              src={item}
              alt="img"
            ></img>
          );
        })}
      </Carousel>
      <div className="feeds-post__text">
        <div className="post-interactive">
          <div className="post-interactive__group">
            {isLiked ? (
              <i
                className="post-interactive__icon --loved fas fa-heart"
                onClick={handleLikedClick}
              ></i>
            ) : (
              <i
                className="post-interactive__icon --love far fa-heart"
                onClick={handleLikedClick}
              ></i>
            )}
            <i className="post-interactive__icon --comment far fa-comment"></i>
            <i className="post-interactive__icon --share far fa-share-square"></i>
          </div>
          <div className="post-interactive__group">
            {!isFavourite ? (
              <i
                className="post-interactive__icon --bookmark far fa-bookmark"
                onClick={handleFavouriteClick}
              ></i>
            ) : (
              <i
                className="post-interactive__icon --bookmarked fas fa-bookmark"
                onClick={handleFavouriteClick}
              ></i>
            )}
          </div>
        </div>
        <div className="user-interactive">
          <div className="user-interactive__liked">{numLiked} likes</div>
          <div className="user-interactive__time-created">{dateCreated}</div>
        </div>

        <div className="post-status">
          <Link to={linkToUserPage} className="post-status__username">
            {user}
          </Link>
          <div className="post-status__status">{status}</div>
        </div>
        <div className="post__comments-list">
          <CommentsList listComments={comment} />
        </div>
      </div>
      <div className="home__type-box">
        <TypeBox />
      </div>
    </div>
  );
}
export default FeedsPost;
