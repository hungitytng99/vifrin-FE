import React, { useEffect, useState } from "react";
import "./PostCreate.sass";
import { Form, Input, Button, Upload, Spin } from "antd";
import UserCard from "../../../../components/UserCard/UserCard";
import { getBase64 } from "../../../../utils/media";
import { useTranslation } from "react-i18next";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { CREATE_POST } from "../redux/action";
import { Select } from "antd";
import { apiSearchDestination } from "data-source/destination";
import { REQUEST_STATE } from "configs";
import location from 'assets/images/login/location.png';
import icPlus from 'assets/images/ic_plus.png';
import icPicture from 'assets/images/ic_picture.png';
import icLocationRed from 'assets/images/ic_location_red.png';


const { TextArea } = Input;
const { Option } = Select;

const LIST_SELECTED_CONTENTS = {
  IMAGES: "IMAGES",
  LOCATION: "LOCATION",
}

function PostCreate() {
  const [form] = Form.useForm();
  const user = useSelector((state) => state.user.profile);
  const dispatch = useDispatch();
  const [postImages, setPostImages] = useState([]);
  const { t } = useTranslation();
  const profile = useSelector((state) => state.profile);
  const [destinationOptions, setDestinationOptions] = useState([]);
  const [destinationSearchParams, setDestinationSearchParams] = useState("");
  const [listSelectedContent, setListSelectedContent] = useState([LIST_SELECTED_CONTENTS.IMAGES]);
  const [currentSelectedDestination, setCurrentSelectedDestination] = useState("");

  function onAddPost(value) {
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
      if (resultSearch.data !== "") {
        const listDestination = resultSearch?.data?.map((result) => ({
          value: result.id,
          text: result.name,
        }));
        setDestinationOptions(listDestination);
      }
    } else {
      setDestinationOptions([]);
    }
  }

  function handleChangeDestination(value) {
    setDestinationSearchParams(value);
    let destination = destinationOptions.find(destination => destination.value.toString() === value.toString());
    setCurrentSelectedDestination({
      id: destination.value,
      name: destination.text,
    });
    handleSelectLocation();
  }

  function handleChangeUploadImage({ fileList }) {
    setPostImages(fileList);
  }

  function handleSelectPictures() {
    if (listSelectedContent.includes(LIST_SELECTED_CONTENTS.IMAGES)) {
      setListSelectedContent(listSelectedContent.filter(content => content !== LIST_SELECTED_CONTENTS.IMAGES));
    } else {
      setListSelectedContent([...listSelectedContent, LIST_SELECTED_CONTENTS.IMAGES]);
    }
  }

  function handleSelectLocation() {
    if (listSelectedContent.includes(LIST_SELECTED_CONTENTS.LOCATION)) {
      setListSelectedContent(listSelectedContent.filter(content => content !== LIST_SELECTED_CONTENTS.LOCATION));
    } else {
      setListSelectedContent([...listSelectedContent, LIST_SELECTED_CONTENTS.LOCATION]);
    }
  }

  return (
    <div className="postCreate">
      <div className="postCreateUser">
        <UserCard user={user} sizeAvatar={36} hasAction={false} destination={currentSelectedDestination} />
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
                style={{ fontSize: "16px", border: "none", paddingLeft: "0px" }}
                placeholder={t("whatAreYouThinking?")}
              />
            </Form.Item>
          </div>

          <div className="addContent">
            <div className="addContentHeader">
              <img
                src={icPlus}
                alt="ic plus"
                style={{
                  width: "28px",
                }}
              />
              <div className="addContentHeaderText">{t('addContent.addToPost')}</div>
            </div>
            <div className="addContentList">
              {/* <img
                className="addContentItem"
                src={icPicture}
                alt="ic pictures"
                style={{
                  height: "28px",
                }}
                onClick={() => handleSelectPictures()}
              /> */}
              <img
                className="addContentItem"
                src={icLocationRed}
                alt="ic location"
                style={{
                  height: "28px",
                }}
                onClick={() => handleSelectLocation()}
              />
            </div>
          </div>
          {listSelectedContent.includes(LIST_SELECTED_CONTENTS.LOCATION) && <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              margin: "10px 0px",
            }}
          >
            <img
              src={location}
              alt="location"
              style={{
                width: "5%",
                marginRight: "10px",
              }}
            />
            <Form.Item style={{ width: "93%" }} name="destinationId">
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
                {destinationOptions?.map((destination) => (
                  <Option key={destination.value}>{destination.text}</Option>
                ))}
              </Select>
            </Form.Item>
          </div>}

          {listSelectedContent.includes(LIST_SELECTED_CONTENTS.IMAGES) && <div style={{
            width: "100%",
            marginTop: "10px",

          }}>
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
                accept="image/*,video/*"
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
          </div>}


          <div className="postCreateSubmit">
            <Button
              disabled={
                postImages.length === 0 ||
                profile.createPostState === REQUEST_STATE.REQUEST
              }
              style={{ width: "100%", height: "40px", }}
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
