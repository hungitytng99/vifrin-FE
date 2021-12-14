import React, { useEffect } from "react";
import { Form, Input, Button, Checkbox, notification } from "antd";
import "./Login.sass";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { isEmptyValue } from "utils/checkType";
import { LOGIN, RESET_AUTH_STATE } from "redux/users/action";
import logo from "assets/images/logo.svg";
import { REQUEST_STATE } from "configs";
const queryString = require("query-string");

function Login() {
  const authState = useSelector((state) => state.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const onFinish = (values) => {
    dispatch(LOGIN(queryString.stringify(values)));
  };

  useEffect(() => {
    if (
      !isEmptyValue(
        authState.profile?.access_token &&
          authState.authState === REQUEST_STATE.SUCCESS
      )
    ) {
      dispatch(RESET_AUTH_STATE());
      history.push("/");
    }

    if (authState.authState === REQUEST_STATE.ERROR) {
      notification.error({
        message: "Đăng nhập thất bại",
        description: "Tên tài khoản hoặc mật khẩu không chính xác"
      });
      dispatch(RESET_AUTH_STATE());
    }
  }, [authState, history, dispatch]);

  return (
    <div className="login" style={{ display: "flex", flexDirection: "column" }}>
      <img
        style={{ width: "250px", height: "70px", marginBottom: "15px" }}
        src={logo}
        alt="logo"
      />
      <div className="LOGIN__form">
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
            username: "hung",
            password: "123456",
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            style={{ marginBottom: "12px" }}
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            style={{ marginBottom: "12px" }}
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            style={{ marginBottom: "4px" }}
            wrapperCol={{
              offset: 9,
              span: 10,
            }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "8px",
            }}
          >
            <span className="LOGIN__no-account"> Don't have account? </span>
            <Link className="LOGIN__sign-up" to="/auth/register">
              Sign up now!
            </Link>
          </div>

          <Form.Item
            wrapperCol={{
              offset: 10,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Login;
