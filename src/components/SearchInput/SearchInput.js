import { useState } from "react";
import "./SearchInput.sass";
function SearchInput() {
  return (
    <div className="search">
      <i className="search__icon fas fa-search"></i>
      <input className="search__input" type="text" placeholder="Search" />
    </div>
  );
}
export default SearchInput;
