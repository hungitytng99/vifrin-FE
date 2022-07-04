import { Rate } from "antd";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import "./CustomGalleryItem.sass"

const cont = {
    backgroundColor: "#eee",
    cursor: "pointer",
    overflow: "hidden",
    position: "relative"
};

const CustomGalleryItem = ({
    photo,
    margin,
    direction,
    top,
    left,
}) => {

    const history = useHistory();

    function onClickPhotoItem() {
        history.push(`/destination/${photo?.id}`)
    }

    if (direction === "column") {
        cont.position = "absolute";
        cont.left = left;
        cont.top = top;
    }

    return (
        <div
            style={{ margin, height: photo.height, width: photo.width, ...cont }}
            className="customGalleryItem"
            onClick={onClickPhotoItem}
        >
            <img
                alt={photo.name}
                {...photo}
                // onClick={handleOnClick}
                className="customGalleryItemImg"
            />
            <div className="customGalleryItemOverlay">
                <Rate
                    disabled
                    style={{
                        fontSize: "14px",
                        color: "#007bff",
                    }}
                    defaultValue={photo?.average_score ?? 5}
                />
                <div className="customGalleryItemName">
                    {photo?.name}
                </div>
                <div className="customGalleryItemDesc text-over-flow-3">
                    {photo?.description}
                </div>
            </div>
        </div>
    );
};

export default CustomGalleryItem;
