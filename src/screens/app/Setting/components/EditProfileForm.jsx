import React, { useEffect, useState, useRef } from "react";
import ReactModal from "react-modal";
import { useTranslation } from "react-i18next";
import {
  Tabs,
  Button,
  notification,
  Form,
  Input,
  InputNumber,
  Menu,
  Row,
  Col,
  Select,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { apiUpdateUserProfile, apiGetUserProfile } from "data-source/users";

const { Option } = Select;

const { TabPane } = Tabs;
const customStyles = {
  overlay: {
    animation: "appear 0.3s linear",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "400px",
    borderRadius: "10px",
    padding: "0px",
    border: "1px solid rgba(219,219,219,1)",
    animation: "zoominoutsinglefeatured 0.3s ease-out",
  },
};

const customAddPostStyles = {
  overlay: {
    animation: "appear 0.3s linear",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "600px",
    borderRadius: "10px",
    padding: "0px",
    border: "1px solid rgba(219,219,219,1)",
    animation: "zoominoutsinglefeatured 0.3s ease-out",
  },
};
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

function EditProfileForm() {
  const [form] = Form.useForm();
  const user = useSelector((state) => state.user.profile);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user.username) {
      setLoading(true);
      apiGetUserProfile(user.username)
        .then((res) => {
          if (res.state === "SUCCESS") {
            fillForm(res.data);
          } else {
            openNotification("Get user info", res.message);
          }
        })
        .catch((error) => {
          openNotification("Get user info", "Cannot get user info");
          console.log("error", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [user]);

  const fillForm = (data = {}) => {
    form.setFieldsValue({
      bio: data?.bio,
      email: data?.email,
      fullName: data?.fullName,
      username: user.username || "",
      phoneNumber: data.phoneNumber,
      gender: data?.gender,
    });
  };

  const onFinish = (values) => {
    setLoading(true);
    apiUpdateUserProfile(values)
      .then((res) => {
        if (res.state === "SUCCESS") {
          openNotification("Get user info", "Edit user info successful");
        } else {
          openNotification("Get user info", res.message);
        }
      })
      .catch((error) => {
        openNotification("Get user info", "Error editing user info");
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
      <Form.Item name={"username"} label="Username" preserve={true}>
        <Input disabled={true} />
      </Form.Item>
      <Form.Item name={"fullName"} label="Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item
        name={"email"}
        label="Email"
        rules={[{ required: true, type: "email" }]}
      >
        <Input />
      </Form.Item>
      {/* <Form.Item name={['user', 'age']} label="Age" rules={[{ type: 'number', min: 0, max: 99 }]}>
              <InputNumber />
            </Form.Item> */}
      <Form.Item name={"phoneNumber"} label="Phone Number">
        <Input />
      </Form.Item>
      <Form.Item name={"gender"} label="Gender">
        <Select style={{ width: 80, margin: "0 8px" }} onChange={() => null}>
          <Option value="MALE">Male</Option>
          <Option value="FEMAIL">Female</Option>
        </Select>
      </Form.Item>
      <Form.Item name={"bio"} label="Bio">
        <Input.TextArea />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button
          type="primary"
          htmlType="submit"
          disabled={loading}
          loading={loading}
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default EditProfileForm;
