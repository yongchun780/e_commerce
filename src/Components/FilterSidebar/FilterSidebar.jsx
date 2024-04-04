
import React from 'react';
import { Checkbox, Collapse, Slider } from 'antd';

const { Panel } = Collapse;

const FilterSidebar = ({ filters, setFilters }) => {
  // Destructure filters for convenience
  const { category, gender, brand} = filters;

  // Handle changes for each filter type
  const handleCategoryChange = (checkedValues) => {
    setFilters({ ...filters, category: checkedValues });
  };

  const handleGenderChange = (checkedValues) => {
    setFilters({ ...filters, gender: checkedValues });
  };

  const handleBrandChange = (checkedValues) => {
    setFilters({ ...filters, brand: checkedValues });
  };

  const handlePriceChange = (value) => {
    setFilters({ ...filters, price: value });
  };

  return (
    <div className="filter-sidebar">
      <div className="filter-header">Filter Products</div>
      <Collapse defaultActiveKey={['1', '2', '3', '4']}>
        <Panel header="Category" key="1">
          <Checkbox.Group
            options={['climbing shoes', 'accessaries']}
            value={category}
            onChange={handleCategoryChange}
          />
        </Panel>
        <Panel header="Gender" key="2">
          <Checkbox.Group
            options={['men', 'women', 'unisex']}
            value={gender}
            onChange={handleGenderChange}
          />
        </Panel>
        <Panel header="Brand" key="3">
          <Checkbox.Group
            options={['La Sportiva', 'Scarpa', 'Five Ten', 'Black Diamond', 'Ocun', 'Boreal', 'Evolv', 'Street', 'Mad Rock', '8b+']}
            value={brand}
            onChange={handleBrandChange}
          />
        </Panel>
        <Panel header="Price" key="4">
          <Slider
            range
            marks={{ 0: '$0', 100: '$100' }} 
            defaultValue={[0, 200]}
            onAfterChange={handlePriceChange}
          />
        </Panel>
      </Collapse>
    </div>
  );
};

export default FilterSidebar;
