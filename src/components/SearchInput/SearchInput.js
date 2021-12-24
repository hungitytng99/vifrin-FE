import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./SearchInput.sass";
import { apiSearchUserAndDestination } from "data-source/search";
import { SearchOutlined } from "@ant-design/icons";
import { Col, Dropdown, Input, Row, Select, Menu } from "antd";
import { IMAGE_LOCATION_DEFAULT } from "configs";
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
    console.log("e.target.value: ", e.target.value);
    if (e.target.value) {
      const resultSearch = await apiSearchUserAndDestination({
        key: e.target.value,
      });
      console.log("resultSearch: ", resultSearch);
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
          avatar: result.avatar,
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
    if(searchParams === '') {
      setIsFocusSearch(false);
    } else {
      setIsFocusSearch(true);
    }
  }, [searchParams])

  return (
    <>
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
                      <Link to={`/profile/${user.value}`}>
                        <span>{user?.text}</span>
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
          prefix={<SearchOutlined />}
          onChange={handleSearchDestination}
          onBlur={() => {
            // setSearchParams("");
            // setUsers([]);
            // setDestinationOptions([]);
            // setIsFocusSearch(false);
          }}
          allowClear={true}
        />
      </Dropdown>
      {/* <Select
        className="search"
        showSearch
        value={searchParams}
        placeholder={t("searchOnVifrin")}
        style={{ fontSize: "14px" }}
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        onSearch={handleSearchDestination}
        onChange={handleChangeDestination}
        notFoundContent={null}
        suffixIcon={<SearchOutlined />}
      >
        {destinationOptions?.length > 0 && (
          <>
            <div className="searchInputResultTitle">{t("destination")}</div>
            {destinationOptions?.map((destination) => (
              <Option key={destination.value}>
                <Link to={`/location/${destination.value}`}>
                  <span>{destination?.text}</span>
                </Link>
              </Option>
            ))}
          </>
        )}
        {users?.length > 0 && (
          <>
            <div className="searchInputResultTitle">{t("users")}</div>
            {users?.map((user) => (
              <Link to={`/profile/${user.value}`}>
                <Option key={user.value}>{user.username}</Option>
              </Link>
            ))}
          </>
        )}
      </Select> */}
      {/* <div className="search">
        <i className="search__icon fas fa-search"></i>
        <input className="search__input" type="text" placeholder="Search" />
      </div> */}
    </>
  );
}
export default SearchInput;
