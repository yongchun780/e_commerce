import React from 'react';
import { Select } from 'antd';
import './SortingBar.css'; 

const { Option } = Select;

const SortingBar = ({ onSortChange, productCount }) => {
  return (
    <div className="sorting-bar">
      <span>{productCount} products | Sort by:&nbsp;&nbsp;</span>
      <Select defaultValue="featured" style={{ width: 200 }} onChange={onSortChange}>
        <Option value="featured">Featured</Option>
        <Option value="alphaAsc">Alphabetically, A-Z</Option>
        <Option value="alphaDesc">Alphabetically, Z-A</Option>
        <Option value="priceAsc">Price, low to high</Option>
        <Option value="priceDesc">Price, high to low</Option>
      </Select>
    </div>
  );
};

export default SortingBar;
