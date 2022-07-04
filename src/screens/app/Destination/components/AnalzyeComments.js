import { Rate } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

function AnalzyeComments(props) {
    const analyzeComments = useSelector((state) => state?.destination.detailLocation?.analyzeComments);
    const { t } = useTranslation();

    return (
        <div style={{
            marginLeft: "20px"
        }}>
            <div style={{
                fontSize: "22px",
                fontWeight: "600",
            }}>
                {t("analyzeComment.analyzeComments")}
            </div>
            <div style={{
                display: "flex",
                alignItems: "center",
            }}>
                <div
                    style={{
                        width: "122px",
                    }}>
                    <Rate
                        style={{
                            fontSize: "18px",
                            color: "#007bff",
                        }}
                        disabled
                        defaultValue={5}
                    />
                </div>
                <div style={{
                    fontSize: "18px",
                    marginTop: "4px",
                    marginLeft: "10px",
                }}>
                    {analyzeComments?.fiveStar}  {t("analyzeComment.rate")}
                </div>
            </div>
            <div style={{
                display: "flex",
                alignItems: "center",
            }}>
                <div
                    style={{
                        width: "122px",
                    }}>
                    <Rate
                        style={{
                            fontSize: "18px",
                            color: "#007bff",
                        }}
                        disabled
                        defaultValue={4}
                    />
                </div>
                <div style={{
                    fontSize: "18px",
                    marginTop: "4px",
                    marginLeft: "10px",
                }}>
                    {analyzeComments?.fourStar}  {t("analyzeComment.rate")}
                </div>
            </div>
            <div style={{
                display: "flex",
                alignItems: "center",
            }}>
                <div
                    style={{
                        width: "122px",
                    }}>
                    <Rate
                        style={{
                            fontSize: "18px",
                            color: "#007bff",
                        }}
                        disabled
                        defaultValue={3}
                    />
                </div>
                <div style={{
                    fontSize: "18px",
                    marginTop: "4px",
                    marginLeft: "10px",
                }}>
                    {analyzeComments?.threeStar}  {t("analyzeComment.rate")}
                </div>
            </div>
            <div style={{
                display: "flex",
                alignItems: "center",
            }}>
                <div
                    style={{
                        width: "122px",
                    }}>
                    <Rate
                        style={{
                            fontSize: "18px",
                            color: "#007bff",
                        }}
                        disabled
                        defaultValue={2}
                    />
                </div>
                <div style={{
                    fontSize: "18px",
                    marginTop: "4px",
                    marginLeft: "10px",
                }}>
                    {analyzeComments?.twoStar}  {t("analyzeComment.rate")}
                </div>
            </div>
            <div style={{
                display: "flex",
                alignItems: "center",
            }}>
                <div
                    style={{
                        width: "122px",
                    }}>
                    <Rate
                        style={{
                            fontSize: "18px",
                            color: "#007bff",
                        }}
                        disabled
                        defaultValue={1}
                    />
                </div>
                <div style={{
                    fontSize: "18px",
                    marginTop: "4px",
                    marginLeft: "10px",
                }}>
                    {analyzeComments?.oneStar}  {t("analyzeComment.rate")}
                </div>
            </div>
        </div>
    );
}

export default AnalzyeComments;