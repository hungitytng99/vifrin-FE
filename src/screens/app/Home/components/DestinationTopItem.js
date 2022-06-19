import React from 'react';
import top1 from "assets/images/top-1.png"
import number2 from "assets/images/number-2.png"
import number3 from "assets/images/number-3.png"
import "./DestinationTopItem.sass"
import { useHistory } from 'react-router-dom';

function DestinationTopItem({
    ranking,
    destination,
}) {
    const history = useHistory();
    function onClickDestinationItem(id) {
        history.push(`/destination/${id}`)
    }

    return (
        <div
            className="destinationTopItem flex-center"
            onClick={() => onClickDestinationItem(destination?.id)}
        >
            <div className="destinationTopItemRanking">
                {
                    ranking === 0 && <img
                        src={top1}
                        alt="top1"
                        style={{
                            width: "44px",
                        }}
                    />
                }
                {
                    ranking === 1 && <img
                        src={number2}
                        alt="number2"
                        style={{
                            width: "34px",
                        }}
                    />
                }
                {
                    ranking === 2 && <img
                        src={number3}
                        alt="number3"
                        style={{
                            width: "34px",
                        }}
                    />
                }
            </div>

            <img className="destinationTopItemImg" src={destination.medias[0]?.url} alt="avatar" />
            <div className="destinationTopItemOverlay">
                <div className="destinationTopItemTitle">
                    {destination?.name}
                </div>
                <div className="destinationTopItemDesc">
                    {destination?.description}
                </div>
            </div>
        </div>
    );
}

export default DestinationTopItem;