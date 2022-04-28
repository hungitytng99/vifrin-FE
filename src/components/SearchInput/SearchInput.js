import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./SearchInput.sass";
import { apiSearchUserAndDestination } from "data-source/search";
import { SearchOutlined } from "@ant-design/icons";
import { Col, Dropdown, Input, Row, Select, Menu } from "antd";
import { AVATAR_DEFAULT, IMAGE_LOCATION_DEFAULT } from "configs";
import { Link } from "react-router-dom";

const { Option } = Select;

function SearchInput() {
  const { t } = useTranslation();
  const [destinationOptions, setDestinationOptions] = useState([]);
  const [users, setUsers] = useState([]);
  const [isFocusSearch, setIsFocusSearch] = useState(false);
  const [searchParams, setSearchParams] = useState("");

  async function handleSearchDestination(e) {
    setSearchParams(() => e.target.value);
    if (e.target.value) {
      const resultSearch = await apiSearchUserAndDestination({
        key: e.target.value,
      });
      if (resultSearch.data !== "") {
        const listDestinations = resultSearch?.data?.destinations?.map(
          (result) => ({
            value: result.id,
            text: result.name,
            medias: result?.medias[0] ?? IMAGE_LOCATION_DEFAULT,
          })
        );
        const listUsers = resultSearch?.data?.users?.map((result) => ({
          value: result.id,
          text: result.username,
          fullName: result.fullName,
          avatarUrl: result.avatarUrl,
        }));
        setUsers(listUsers?.slice(0, 5) ?? []);
        setDestinationOptions(listDestinations?.slice(0, 4) ?? []);
      } else {
        setUsers([]);
        setDestinationOptions([]);
      }
    } else {
      setDestinationOptions([]);
    }
  }

  useEffect(() => {
    if (searchParams === "") {
      setIsFocusSearch(false);
    } else {
      setIsFocusSearch(true);
    }
  }, [searchParams]);

  return (
    <div style={{
      marginTop: "10px",
    }}>
      <Dropdown
        visible={isFocusSearch}
        overlay={
          <Menu onClick={(a) => console.log(a)}>
            {destinationOptions?.length > 0 && (
              <>
                <div className="searchInputResultTitle">{t("destination")}</div>
                {destinationOptions?.map((destination) => (
                  <Menu.Item key={destination.value}>
                    <Link to={`/location/${destination.value}`}>
                      <span>{destination?.text}</span>
                    </Link>
                  </Menu.Item>
                ))}
              </>
            )}
            {users?.length > 0 && (
              <>
                <div className="searchInputResultTitle">{t("users")}</div>
                {users?.length > 0 &&
                  users?.map((user) => (
                    <Menu.Item key={user.value}>
                      <Link to={`/profile/${user.text}`}>
                        <Col span={24}>
                          <div style={{ width: '50px', height: '50px' }}>
                            <img
                              style={{ width: "100%", height: "100%", borderRadius: "50%" }}
                              src={user?.avatarUrl ?? AVATAR_DEFAULT}
                              alt="result"
                            />
                            <span style={{ marginLeft: '6px' }}>{user?.text}</span>
                          </div>
                        </Col>
                      </Link>
                    </Menu.Item>
                  ))}
              </>
            )}
            {destinationOptions.length === 0 && users?.length === 0 && (
              <div className="flex-center" style={{ padding: "8px" }}>
                {t("noResult")}
              </div>
            )}
          </Menu>
        }
        placement="bottomRight"
      >
        <Input
          value={searchParams}
          placeholder={t("searchWithVifrin")}
          prefix={<SearchOutlined style={{
            fontSize: "20px",
            marginRight: "4px",
          }}/>}
          onChange={handleSearchDestination}
          onBlur={() => { }}
          allowClear={true}
          size="large"
          style={{
            borderRadius: "6px",
          }}
        />
      </Dropdown>
    </div>
  );
}
export default SearchInput;
