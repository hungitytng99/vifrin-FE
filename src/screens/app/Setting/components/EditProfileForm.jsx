import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { useTranslation } from "react-i18next";
import { Button, notification, Form, Input, DatePicker, Select } from "antd";
import { useSelector } from "react-redux";
import { apiUpdateUserProfile, apiGetUserProfile } from "data-source/users";
import moment from "moment";

const { Option } = Select;

ReactModal.setAppElement("#root");

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

const openNotification = (Title = "", Content = "") => {
  notification.open({
    message: Title,
    description: Content,
    onClick: () => null,
    placement: "topRight",
  });
};

const dateFormat = "YYYY-MM-DD";

function EditProfileForm() {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const user = useSelector((state) => state.user.profile);
  const [loading, setLoading] = useState(false);
  const fillForm = (data = {}) => {
    form.setFieldsValue({
      bio: data?.bio,
      email: data?.email,
      fullName: data?.fullName,
      username: user.username || "",
      phoneNumber: data.phoneNumber,
      gender: data?.gender,
      dateOfBirth: moment(data?.dateOfBirth),
    });
  };
  useEffect(() => {
    if (user.username) {
      setLoading(true);
      apiGetUserProfile(user.username)
        .then((res) => {
          if (res.state === "SUCCESS") {
            fillForm(res.data);
          } else {
            openNotification(t("getUserInfo"), res.message);
          }
        })
        .catch((error) => {
          openNotification(t("getUserInfo"), t("cannotGetUserInfo"));
          console.log("error", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [user, t]);

  const onFinish = (values) => {
    const params = {
      ...values,
      dateOfBirth: values["dateOfBirth"].format("YYYY-MM-DD"),
    };

    setLoading(true);
    apiUpdateUserProfile(params)
      .then((res) => {
        if (res.state === "SUCCESS") {
          openNotification(t("editUserInfo"), t("editProfileSuccess"));
        } else {
          openNotification(t("editUserInfo"), res.message);
        }
      })
      .catch((error) => {
        openNotification(t("editUserInfo"), t("editProfileError"));
        console.log("error", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Form
      {...layout}
      form={form}
      name="nest-messages"
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      <Form.Item
        name={"username"}
        label={t("profile.username")}
        preserve={true}
      >
        <Input disabled={true} />
      </Form.Item>
      <Form.Item
        name={"fullName"}
        label={t("profile.name")}
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={"email"}
        label="Email"
        rules={[{ required: true, type: "email" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item name={"dateOfBirth"} label="Date of birth">
        <DatePicker format={dateFormat} />
      </Form.Item>
      {/* <Form.Item name={['user', 'age']} label="Age" rules={[{ type: 'number', min: 0, max: 99 }]}>
              <InputNumber />
            </Form.Item> */}
      <Form.Item name={"phoneNumber"} label={t("profile.phoneNumber")}>
        <Input />
      </Form.Item>
      <Form.Item name={"gender"} label={t("profile.gender")}>
        <Select style={{ width: 80, margin: "0 8px" }} onChange={() => null}>
          <Option value="MALE">Male</Option>
          <Option value="FEMALE">Female</Option>
        </Select>
      </Form.Item>
      <Form.Item name={"bio"} label={t("profile.bio")}>
        <Input.TextArea />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button
          type="primary"
          htmlType="submit"
          disabled={loading}
          loading={loading}
        >
          {t("Confirm")}
        </Button>
      </Form.Item>
    </Form>
  );
}

export default EditProfileForm;
