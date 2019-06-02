import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';

const { Search } = Input;

const SearchBox = ({ onSearch }) => {
  return (
    <Search
      placeholder="input search text"
      onSearch={onSearch}
      style={{ width: 200 }}
    />
  );
};

SearchBox.propTypes = {
  onSearch: PropTypes.func.isRequired
};

export default SearchBox;
