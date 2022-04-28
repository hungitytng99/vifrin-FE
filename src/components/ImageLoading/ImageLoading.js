import React, { useEffect, useRef, useState } from "react";
import "./ImageLoading.sass";
import LoadingSpinner from "assets/images/Spinner-1s-200px.svg";
import noImageFound from "assets/images/no-image-found.png";

function ImageLoading(props) {
  const image = useRef(null);
  const [srcImage, setSrcImage] = useState(LoadingSpinner);
  const [isLoadComplete, setisLoadComplete] = useState(false);

  function preloadImage(imgSrc) {
    var objImagePreloader = new Image();
    objImagePreloader.src = imgSrc;
    if (objImagePreloader.complete) {
      setSrcImage(objImagePreloader.src);
      setisLoadComplete(true);
      objImagePreloader.onload = function () {};
    } else {
      objImagePreloader.onload = function () {
        setSrcImage(objImagePreloader.src);
        setisLoadComplete(true);
        objImagePreloader.onload = function () {};
      };
      objImagePreloader.onerror = (e) => {
        setSrcImage(noImageFound);
        setisLoadComplete(true);
        objImagePreloader.onload = function () {};
      };
    }
  }

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      preloadImage(props.src);
    }
    return () => {
      isMounted = false;
    };
  }, [props.src]);
  return isLoadComplete ? (
    <img {...props} ref={image} src={srcImage} alt=""></img>
  ) : (
    <img
      style={{ width: "50px", height: "500px" }}
      ref={image}
      src={LoadingSpinner}
      alt=""
    ></img>
  );
}

export default React.memo(ImageLoading);
