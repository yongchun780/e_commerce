import React, { useState, useEffect } from 'react';

const ProductAPI = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data => setProducts(data.products)) // Set your products here
      .catch(error => console.error('Error fetching data: ', error));
  }, []);

  return (
    <div>
      {products.map(product => (
        <div key={product.id}>
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <img src={product.thumbnail} alt={product.title} />
          {/* Other product details */}
        </div>
      ))}
    </div>
  );
};

export default ProductAPI;
