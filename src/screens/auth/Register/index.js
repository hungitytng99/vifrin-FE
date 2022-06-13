import { notification, Spin } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AVATAR_DEFAULT, REQUEST_STATE } from 'configs';
import { REGISTER, RESET_AUTH_STATE } from "redux/users/action";
import { useTranslation } from 'react-i18next';
import './Register.sass';
import './animated.css'

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { t } = useTranslation();
  const registerState = useSelector((state) => state.user.registerResponse);
  const history = useHistory();
  const dispatch = useDispatch();
  const onSubmit = (values) => {
    console.log("values: ", values);
    dispatch(REGISTER({ account: { ...values, avatarUrl: AVATAR_DEFAULT } }));
  };

  useEffect(() => {
    if (registerState.state === REQUEST_STATE.ERROR) {
      notification.error({
        message: t("fail"),
        description: t(registerState.message),
      });
      dispatch(RESET_AUTH_STATE());
    }

    if (registerState.state === REQUEST_STATE.SUCCESS) {
      notification.success({
        message: t("success"),
        description: t(registerState.message),
      });
      dispatch(RESET_AUTH_STATE());
      history.push("/auth/login");
    }
  }, [registerState, history, dispatch, t]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="auth__form">
      <div className="auth__header is-flex-col al-center ju-center">
        <div className="auth__header--label">{t("register")}</div>
      </div>
      <div className="auth__body is-flex-col">

        <div className="auth__label required">{t("fullName")}</div>
        <div className="input-effect">
          <input
            {...register('fullName', {
              required: true,
            })}
            className="effect effect__email"
            type="text"
            placeholder={t('enterYourFullname')}
            autoComplete="false"
          />
          <span className="focus-border">
            <i></i>
          </span>
        </div>
        {errors.fullName?.type === 'required' && (
          <div className="auth__error">{t("pleaseEnterYourFullname")}</div>
        )}
        <div className="auth__label required">{t("email")}</div>
        <div className="input-effect">
          <input
            {...register('email', {
              required: true,
            })}
            className="effect effect__email"
            type="text"
            placeholder={t('enterYourEmail')}
            autoComplete="false"
          />
          <span className="focus-border">
            <i></i>
          </span>
        </div>
        {errors.username?.type === 'required' && (
          <div className="auth__error">{t("pleaseEnterYourEmail")}</div>
        )}
        <div className="auth__label required">{t("username")}</div>
        <div className="input-effect">
          <input
            {...register('username', {
              required: true,
            })}
            className="effect effect__email"
            type="text"
            placeholder={t('enterYourUserName')}
            autoComplete="false"
          />
          <span className="focus-border">
            <i></i>
          </span>
        </div>
        {errors.username?.type === 'required' && (
          <div className="auth__error">{t("pleaseEnterYourUsername")}</div>
        )}
        <div className="auth__label required">{t("password")}</div>
        <div className="input-effect">
          <input
            {...register('password', {
              required: true,
            })}
            className="effect effect__email"
            type="password"
            placeholder={t('enterYourPassword')}
            autoComplete="false"
          />
          <span className="focus-border">
            <i></i>
          </span>
        </div>
        {errors.password?.type === 'required' && (
          <div className="auth__error">{t("pleaseEnterYourPassword")}</div>
        )}
        <button className="auth__box is-flex al-center ju-center">
          {registerState?.state === REQUEST_STATE.REQUEST ? <Spin /> : t("register")}
        </button>
      </div>
      <div style={{
        marginTop: '10px',
      }}>
        <span className="login__no-account"> {t("dontHaveAccount?")} </span>
        <Link className="login__sign-up" to="/auth/login">
          {t("signInNow")}
        </Link>
      </div>
    </form>
  );
};

export default Login;
