import { notification, Spin } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { REQUEST_STATE } from 'configs';
import { LOGIN, RESET_AUTH_STATE } from "redux/users/action";
import { useTranslation } from 'react-i18next';
import { isEmptyValue } from 'utils/checkType';
import './Login.sass';

const queryString = require("query-string");

const Login = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const history = useHistory();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    dispatch(
      LOGIN({ account: queryString.stringify(data), originalAccount: data })
    );
  };

  useEffect(() => {
    if (
      !isEmptyValue(
        user.profile?.access_token && user.user === REQUEST_STATE.SUCCESS
      )
    ) {
      dispatch(RESET_AUTH_STATE());
      history.push("/");
    }

    if (user.authState === REQUEST_STATE.ERROR) {
      notification.error({
        message: t("fail"),
        description: t("yourUsernameOrPasswordIsInvalid"),
      });
      dispatch(RESET_AUTH_STATE());
    }
  }, [user, history, dispatch, t]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="auth__form">
      <div className="auth__header is-flex-col al-center ju-center">
        <div className="auth__header--label">{t("login")}</div>
      </div>
      <div className="auth__body is-flex-col">
        <div className="auth__label required">{t("username")}</div>
        <div className="input-effect">
          <input
            {...register('username', {
              required: true,
            })}
            className="effect effect__email"
            type="text"
            placeholder={t('enterYourAccount')}
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
            {...register('password', { required: true })}
            className="effect effect__pw"
            type="password"
            placeholder={t("enterYourPassword")}
            autoComplete="false"
          />
          <span className="focus-border">
            <i></i>
          </span>
        </div>
        {errors.password?.type === 'required' && (
          <div className="auth__error">{t("pleaseEnterYourPassword")}</div>
        )}
        <button className="auth__box is-flex al-center ju-center" style={{ fontWeight: 'bold' }}>
          {user?.authState === REQUEST_STATE.REQUEST ? <Spin /> : t("login")}
        </button>
      </div>
      <div style={{
        marginTop: '10px',
      }}>
        <span className="login__no-account"> {t("dontHaveAccount?")} </span>
        <Link className="login__sign-up" to="/auth/register">
          {t("signUpNow")}
        </Link>
      </div>
    </form>
  );
};

export default Login;
