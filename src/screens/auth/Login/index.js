import React, { useEffect } from "react";
import { Form, Input, Button, Checkbox, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { isEmptyValue } from "utils/checkType";
import { LOGIN, RESET_AUTH_STATE } from "redux/users/action";
import logo from "assets/images/logo.png";
import { REMEMBER_ACCOUNT_KEY, REQUEST_STATE } from "configs";
import { useTranslation } from "react-i18next";
import "./Login.sass";

const queryString = require("query-string");

function Login() {
  const { t } = useTranslation();
  const user = useSelector((state) => state.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const onFinish = (values) => {
    dispatch(
      LOGIN({ account: queryString.stringify(values), originalAccount: values })
    );
  };

  function getInitialValue() {
    if (user.registerResponse.data) {
      localStorage.removeItem(REMEMBER_ACCOUNT_KEY);
      return {
        username: user?.registerResponse?.data?.username,
      };
    }
    return JSON.parse(localStorage.getItem(REMEMBER_ACCOUNT_KEY));
  }

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
    <div className="login" style={{ display: "flex", flexDirection: "column" }}>
      <img
        style={{ height: "100px", marginBottom: "15px" }}
        src={logo}
        alt="logo"
      />
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={getInitialValue()}
        onFinish={onFinish}
        autoComplete="off"
        className="loginForm"
      >
        <div className="loginWrapper">
          <Form.Item
            label={t("username")}
            name="username"
            style={{ marginBottom: "12px" }}
            rules={[
              {
                required: true,
                message: t("pleaseEnterYourUsername"),
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={t("password")}
            name="password"
            style={{ marginBottom: "12px" }}
            rules={[
              {
                required: true,
                message: t("pleaseEnterYourPassword"),
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="remember"
            valuePropName="checked"
            style={{
              marginBottom: "4px",
              marginLeft: "20px",
            }}
            wrapperCol={{
              span: 24,
            }}
          >
            <Checkbox>{t("rememberMe")}</Checkbox>
          </Form.Item>
          <Form.Item
            style={{ marginLeft: "20px" }}
            wrapperCol={{
              span: 24,
            }}
          >
            <Button style={{ width: "100%" }} type="primary" htmlType="submit">
              {t("login")}
            </Button>
          </Form.Item>
        </div>
      </Form>
      <div className="loginRegister">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span className="login__no-account"> {t("dontHaveAccount?")} </span>
          <Link className="login__sign-up" to="/auth/register">
            {t("signUpNow")}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
