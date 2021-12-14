import React, { useState } from "react";
import "./PostEdit.sass";
import { Form, Input, Button, Upload, Spin } from "antd";
import UserCard from "../../../../components/UserCard/UserCard";
import { getBase64 } from "../../../../utils/media";
import { useTranslation } from "react-i18next";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { CREATE_POST, EDIT_POST } from "../redux/action";
import { REQUEST_STATE } from "../../../../configs";

const { TextArea } = Input;

function PostEdit({ post, user }) {
  console.log('user: ', user);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [postImages, setPostImages] = useState([...(post?.medias ?? [])]);
  const { t } = useTranslation();
  const profile = useSelector((state) => state.profile);

  function onEditPost(value) {
    dispatch(EDIT_POST({ post: { ...post, ...value } }));
  }
  async function handlePreviewProductImage(file) {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
  }

  function handleChangeUploadImage({ fileList }) {
    setPostImages(fileList);
  }

  return (
    <div className="postEdit">
      <div className="postEditUser">
        <UserCard user={user} sizeAvatar={36} hasAction={false} />
      </div>
      <div className="postEditPostForm">
        <Form
          name="basic"
          form={form}
          initialValues={{
            content: post?.content ?? "",
            medias: { fileList: postImages },
          }}
          onFinish={onEditPost}
          autoComplete="off"
          layout="inline"
          size="large"
        >
          <div style={{ width: "100%", marginBottom: "10px" }}>
            <Form.Item style={{ width: "100%" }} name="content">
              <TextArea
                rows={4}
                className="postEditInput"
                type="text"
                style={{ fontSize: "14px", border: "none", paddingLeft: "0px" }}
                placeholder={t("whatAreYouThinking?")}
              />
            </Form.Item>
          </div>
          <div style={{ width: "100%" }}>
            <Form.Item
              name="medias"
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (postImages.length === 0) {
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

          <div className="postEditSubmit">
            <Button
              disabled={
                postImages.length === 0 ||
                profile.editPostState === REQUEST_STATE.REQUEST
              }
              style={{ width: "100%" }}
              size="middle"
              type="primary"
              htmlType="submit"
            >
              {profile.editPostState === REQUEST_STATE.REQUEST ? (
                <Spin />
              ) : (
                t("editPost")
              )}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default PostEdit;
