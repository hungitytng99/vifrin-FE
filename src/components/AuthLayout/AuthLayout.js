import { Divider, notification, Spin } from 'antd';
import React, { Children, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { REQUEST_STATE } from 'configs';
import { LOGIN, RESET_AUTH_STATE } from "redux/users/action";
import backgroundImage from 'assets/images/login/background.jpg';
import blockChain from 'assets/images/login/blockchain.png';
import block_1 from 'assets/images/login/block-1.jpg';
import block_2 from 'assets/images/login/block-2.jpg';
import block_3 from 'assets/images/login/block-3.jpg';
import block_4 from 'assets/images/login/block-4.jpg';
import block_5 from 'assets/images/login/block-5.jpg';
import block_6 from 'assets/images/login/block-6.png';
import block_7 from 'assets/images/login/block-7.jpg';
import block_8 from 'assets/images/login/block-8.jpg';
import block_9 from 'assets/images/login/block-9.jpg';
import block_10 from 'assets/images/login/block-10.jpg';
import location from 'assets/images/login/location.png';
import { useTranslation } from 'react-i18next';
import './AuthLayout.sass';
import './animated.css'

export default function Layout({ children }) {
    const { t } = useTranslation();

    return (
        <div
            className="login flex-center animated-block__area"
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                position: 'relative',
            }}
        >
            <ul className="animated-block__circles">
                <li
                    style={{
                        backgroundImage: `url(${block_1})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        position: 'relative',
                        objectFit: 'contain',
                        opacity: '0.7',
                    }}
                ></li>
                <li
                    style={{
                        backgroundImage: `url(${block_2})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        position: 'relative',
                        objectFit: 'contain',
                        opacity: '0.7',
                    }}
                ></li>
                <li
                    style={{
                        backgroundImage: `url(${block_3})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        position: 'relative',
                        objectFit: 'contain',
                        opacity: '0.7',
                    }}
                ></li>
                <li
                    style={{
                        backgroundImage: `url(${block_4})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        position: 'relative',
                        objectFit: 'contain',
                        opacity: '0.7',
                    }}
                ></li>
                <li
                    style={{
                        backgroundImage: `url(${block_5})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        position: 'relative',
                        objectFit: 'contain',
                        opacity: '0.7',
                    }}
                ></li>
                <li
                    style={{
                        backgroundImage: `url(${block_6})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        position: 'relative',
                        objectFit: 'contain',
                        opacity: '0.7',
                    }}
                ></li>
                <li
                    style={{
                        backgroundImage: `url(${block_7})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        position: 'relative',
                        objectFit: 'contain',
                        opacity: '0.7',
                    }}
                ></li>
                <li
                    style={{
                        backgroundImage: `url(${block_8})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        position: 'relative',
                        objectFit: 'contain',
                        opacity: '0.7',
                    }}
                ></li>
                <li
                    style={{
                        backgroundImage: `url(${block_9})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        position: 'relative',
                        objectFit: 'contain',
                        opacity: '0.7',
                    }}
                ></li>
                <li style={{
                    backgroundImage: `url(${block_10})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    position: 'relative',
                    objectFit: 'contain',
                    opacity: '0.7',
                }}></li>
            </ul>
            <div
                className="login__box"
                style={{
                    position: 'absolute',
                    zIndex: 99,
                }}
            >
                {children}
                <div className="auth__form --welcome">
                    <div
                        className="auth__welcome"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginRight: "25px",
                        }}
                    >
                        <span
                            style={{
                                marginRight: '6px',
                            }}
                        >
                            {t('welcomeTo')}
                        </span>
                        <div
                            style={{
                                position: 'relative',
                                width: '48px',
                                height: '45px',
                                marginTop: '1px',
                            }}
                        >
                            <span className="b4E__text">
                                <div>VIFRIN</div>
                                <div>VIFRIN</div>
                            </span>
                        </div>
                    </div>
                    <div className="auth__welcome-desc">
                        {t('socialNetworkToShareInformationAboutVietnamsBiggestTravelExperiences')}
                    </div>
                    <img className="auth__welcome-blockchain" src={location} alt="block-chain" />
                </div>
            </div>
        </div>
    );
};
