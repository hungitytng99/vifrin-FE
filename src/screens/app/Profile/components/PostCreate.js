import React, { useEffect, useState } from "react";
import "./PostCreate.sass";
import { Form, Input, Button, Upload, Spin } from "antd";
import UserCard from "../../../../components/UserCard/UserCard";
import { getBase64 } from "../../../../utils/media";
import { useTranslation } from "react-i18next";
import { PlusOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { CREATE_POST } from "../redux/action";
import { REQUEST_STATE } from "../../../../configs";
import { Select } from "antd";
import { apiSearchDestination } from "data-source/destination";

const { TextArea } = Input;
const { Option } = Select;

function PostCreate() {
  const [form] = Form.useForm();
  const user = useSelector((state) => state.user.profile);
  const dispatch = useDispatch();
  const [postImages, setPostImages] = useState([]);
  const { t } = useTranslation();
  const profile = useSelector((state) => state.profile);
  const [destinationOptions, setDestinationOptions] = useState([]);
  const [destinationSearchParams, setDestinationSearchParams] = useState("");

  function onAddPost(value) {
    console.log(value);
    dispatch(CREATE_POST(value));
  }
  async function handlePreviewProductImage(file) {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
  }

  async function handleSearchDestination(value) {
    if (value) {
      const resultSearch = await apiSearchDestination({ key: value });
      const listDestination = resultSearch.data.map((result) => ({
        value: result.id,
        text: result.name,
      }));
      setDestinationOptions(listDestination);
    } else {
      setDestinationOptions([]);
    }
  }

  function handleChangeDestination(value) {
    setDestinationSearchParams(() => value);
  }

  function handleChangeUploadImage({ fileList }) {
    setPostImages(fileList);
  }

  return (
    <div className="postCreate">
      <div className="postCreateUser">
        <UserCard user={user} sizeAvatar={36} hasAction={false} />
      </div>
      <div className="postCreatePostForm">
        <Form
          name="basic"
          form={form}
          initialValues={{}}
          onFinish={onAddPost}
          autoComplete="off"
          layout="inline"
          size="large"
        >
          <div style={{ width: "100%", marginBottom: "10px" }}>
            <Form.Item style={{ width: "100%" }} name="content">
              <TextArea
                rows={4}
                className="postCreateInput"
                type="text"
                style={{ fontSize: "14px", border: "none", paddingLeft: "0px" }}
                placeholder={t("whatAreYouThinking?")}
              />
            </Form.Item>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', width: "100%", marginBottom: "10px" }}>
            <EnvironmentOutlined style={{width: "5%", fontSize: '20px', marginRight: '6px', color: "#777"}} />
            <Form.Item style={{ width: "95%" }} name="destinationId">
              <Select
                showSearch
                value={destinationSearchParams}
                placeholder={t("pleaseEnterLocation")}
                defaultActiveFirstOption={false}
                style={{ fontSize: "14px" }}
                showArrow={false}
                filterOption={false}
                onSearch={handleSearchDestination}
                onChange={handleChangeDestination}
                notFoundContent={null}
              >
                {destinationOptions.map((destination) => (
                  <Option key={destination.value}>{destination.text}</Option>
                ))}
              </Select>
            </Form.Item>
          </div>

          <div style={{ width: "100%" }}>
            <Form.Item
              name="media"
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value) {
                      return Promise.reject(
                        new Error(t("youMustUploadAtLeast1Image"))
                      );
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <Upload
                accept="image/*"
                onPreview={handlePreviewProductImage}
                listType="picture-card"
                customRequest={({ onSuccess }) => onSuccess("ok")}
                fileList={postImages}
                onChange={handleChangeUploadImage}
              >
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>{t("uploadImages")}</div>
                </div>
              </Upload>
            </Form.Item>
          </div>

          <div className="postCreateSubmit">
            <Button
              disabled={
                postImages.length === 0 ||
                profile.createPostState === REQUEST_STATE.REQUEST
              }
              style={{ width: "100%" }}
              size="middle"
              type="primary"
              htmlType="submit"
            >
              {profile.createPostState === REQUEST_STATE.REQUEST ? (
                <Spin />
              ) : (
                t("addPost")
              )}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default PostCreate;
