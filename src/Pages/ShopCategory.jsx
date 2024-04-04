import React, { useContext, useState, useEffect } from "react";
import "./CSS/ShopCategory.css";
import { ShopContext } from "../Context/ShopContext";
import Item from "../Components/Item/Item";
import FilterSidebar from "../Components/FilterSidebar/FilterSidebar";
import SortingBar from "../Components/SortingBar/SortingBar";
import { Input, Pagination } from "antd";

const ShopCategory = () => {
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const { Search } = Input;
  const { all_product } = useContext(ShopContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(all_product);
  const [sortOption, setSortOption] = useState("featured");
  const [filters, setFilters] = useState({
    category: [],
    gender: [],
    brand: [],
    price: [0, 100],
  });

  const handleSearch = (value) => {
    setSearchTerm(value.toLowerCase());
    setCurrentPage(1);
  };

  useEffect(() => {
    let updatedProducts = all_product;

    if (searchTerm) {
      updatedProducts = updatedProducts.filter((product) =>
        product.name.toLowerCase().includes(searchTerm)
      );
    }

    if (filters.category.length) {
      updatedProducts = updatedProducts.filter((product) =>
        filters.category.includes(product.category)
      );
    }

    if (filters.gender.length) {
      updatedProducts = updatedProducts.filter((product) =>
        filters.gender.includes(product.gender)
      );
    }

    if (filters.brand.length) {
      updatedProducts = updatedProducts.filter((product) =>
        filters.brand.includes(product.brand)
      );
    }

    updatedProducts = updatedProducts.filter(
      (product) =>
        product.new_price >= filters.price[0] &&
        product.new_price <= filters.price[1]
    );

    // Sorting logic
    switch (sortOption) {
      case "alphaAsc":
        updatedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "alphaDesc":
        updatedProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "priceAsc":
        updatedProducts.sort((a, b) => a.new_price - b.new_price);
        break;
      case "priceDesc":
        updatedProducts.sort((a, b) => b.new_price - a.new_price);
        break;
      default:
        break;
    }

    setFilteredProducts(updatedProducts);
    setCurrentPage(1);
  }, [searchTerm, filters, all_product, sortOption]);

  const handleSortChange = (value) => {
    setSortOption(value);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="shop-category">
      <div className="left-filterbar">
        <FilterSidebar filters={filters} setFilters={setFilters} />
      </div>
      <div className="items-right">
        <div className="search-and-sorting">
          <div className="search-container">
            <Search
              className="search-bar"
              placeholder="Search for climbing gear"
              onSearch={handleSearch}
              enterButton
            />
          </div>
          <div className="sorting-container">
            <SortingBar
              onSortChange={handleSortChange}
              productCount={filteredProducts.length}
            />
          </div>
        </div>

        <div className="shopcategory-products">
          {currentProducts.map((item) => (
            <Item
              key={item.id}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          ))}
        </div>
        <div className="pagination-container">
          <Pagination
            current={currentPage}
            onChange={paginate}
            total={filteredProducts.length}
            pageSize={itemsPerPage}
            showSizeChanger={false}
          />
        </div>
      </div>
    </div>
  );
};

export default ShopCategory;
