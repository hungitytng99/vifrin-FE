import React, { useEffect, useState, useRef } from "react";
import ReactModal from "react-modal";
import "./Profile.sass";
import { useTranslation } from "react-i18next";
import { Typography, Menu, Row, Col, Select } from "antd";
import { PieChartOutlined, DesktopOutlined, ContainerOutlined } from '@ant-design/icons';
import EditProfileForm from './EditProfileForm';

const { Title } = Typography;

const MenuItems = [
  {
    id: 1,
    title: 'User Info',
    icon: <PieChartOutlined />
  },
  // {
  //   id: 2,
  //   title: 'Options 2',
  //   icon: <DesktopOutlined />
  // },
]

function Profile(props) {
  const { t } = useTranslation();

  const handleClick = e => {
    console.log('click ', e);
  };

  return (
    <div className="profile">
      <Row>
        <Col span={8}>
          <Menu
            onClick={handleClick}
            style={{ width: 256 }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
          >
            {MenuItems.map(item => {
              return (
                <Menu.Item key={item.id} icon={item.icon}>
                  {item.title}
                </Menu.Item>
              )
            })}
          </Menu>
        </Col>
        <Col span={16}>
          <Title level={2}>{t("userInfo")}</Title>
          <EditProfileForm />
        </Col>
      </Row>
    </div>
  );
}
export default Profile;
