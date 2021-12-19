import React, { useEffect } from "react";
import { Form, Input, Button, Checkbox, notification, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { isEmptyValue } from "utils/checkType";
import { LOGIN, REGISTER, RESET_AUTH_STATE } from "redux/users/action";
import logo from "assets/images/logo.svg";
import { AVATAR_DEFAULT, REMEMBER_ACCOUNT_KEY, REQUEST_STATE } from "configs";
import { useTranslation } from "react-i18next";
import "./Register.sass";
import Password from "antd/lib/input/Password";

const queryString = require("query-string");

function Login() {
  const { t } = useTranslation();
  const registerState = useSelector((state) => state.user.registerResponse);
  const history = useHistory();
  const dispatch = useDispatch();
  const onFinish = (values) => {
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
      history.push("/auth/login");
    }
  }, [registerState, history, dispatch, t]);
  return (
    <div
      className="register"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <img
        style={{ width: "250px", height: "70px", marginBottom: "15px" }}
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
        onFinish={onFinish}
        autoComplete="off"
        className="registerForm"
      >
        <div className="registerWrapper">
          <Form.Item
            label={t("fullName")}
            name="fullName"
            style={{ marginBottom: "12px" }}
            rules={[
              {
                required: true,
                message: t("pleaseEnterYourFullName"),
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t("email")}
            name="email"
            style={{ marginBottom: "12px" }}
            rules={[
              {
                required: true,
                message: t("pleaseEnterYourEmail"),
              },
            ]}
          >
            <Input />
          </Form.Item>
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
            label={t("repassword")}
            name="repassword"
            style={{ marginBottom: "12px" }}
            required={true}
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value) {
                    return Promise.reject(
                      new Error(t("pleaseEnterYourPassword"))
                    );
                  }
                  if (getFieldValue("password") !== value) {
                    return Promise.reject(new Error(t("passwordMustMatch")));
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <div className="registerPolicy">
            {t("bySigningUp,youAgreeToOur")}{" "}
            <a
              href="/auth/login"
              style={{ fontWeight: "bold", color: "#979797" }}
            >
              {t("termsDataPolicy")}
            </a>{" "}
            {t("and")}{" "}
            <a
              href="/auth/login"
              style={{ fontWeight: "bold", color: "#979797" }}
            >
              {t("cookiesPolicy")}
            </a>
          </div>
          <Form.Item
            style={{ marginLeft: "20px" }}
            wrapperCol={{
              span: 24,
            }}
          >
            <Button
              disabled={registerState.state === REQUEST_STATE.REQUEST}
              style={{ width: "100%" }}
              type="primary"
              htmlType="submit"
            >
              {registerState.state === REQUEST_STATE.REQUEST ? (
                <Spin />
              ) : (
                t("register")
              )}
            </Button>
          </Form.Item>
        </div>
      </Form>
      <div className="registerRegister">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ marginRight: "4px" }}>{t("alreadyHaveAccount?")}</span>
          <Link className="register__sign-up" to="/auth/login">
            {t("signInNow")}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
